"use client";
import { useEffect, useRef, useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- CONSTANTS (Optimization: Define once) ---
const TIMINGS = [
  { phase: 0, delay: 0 },
  { phase: 1, delay: 500 },     // Spawn 1
  { phase: 2, delay: 1500 },    // Spawn 2
  { phase: 3, delay: 2500 },    // Spawn 3
  { phase: 4, delay: 3500 },    // Swap
  { phase: 5, delay: 5000 },    // Expand
  { phase: 6, delay: 6500 },    // Despawn 3
  { phase: 7, delay: 7500 },    // Despawn 2
  { phase: 8, delay: 8500 },    // Despawn 1
];
const TOTAL_DURATION = 9500;

// Shared Styles
const CARD_BASE = "absolute flex items-center justify-center text-4xl font-bold rounded-xl transition-colors will-change-[left,top,width,height,opacity,transform]";
const CARD_ACTIVE = "border-4 border-primary bg-primary/10 text-primary shadow-2xl z-20";
const CARD_INACTIVE = "border-2 border-primary/20 bg-background text-primary/20 z-10";

// Utility for cleaner classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ============================================================================
// 1. TILING LAYOUT
// ============================================================================
function TileLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);
  const r3 = useRef<HTMLDivElement>(null);
  
  const [phase, setPhase] = useState(0);
  const [loopKey, setLoopKey] = useState(0);

  // Setup Transitions
  useEffect(() => {
    [r1, r2, r3].forEach(ref => {
      if (ref.current) {
        // Optimization: Unified transition string
        ref.current.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      }
    });
  }, []); 

  // Main Logic
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const gap = 16; 
      
      const halfW = (width - gap) / 2;
      const halfH = (height - gap) / 2;
      const rightX = halfW + gap;
      const bottomY = halfH + gap;

      const set = (el: HTMLDivElement | null, x: number, y: number, w: number, h: number, visible: boolean, active: boolean) => {
        if (!el) return;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.width = `${w}px`;
        el.style.height = `${h}px`;
        
        el.style.opacity = visible ? "1" : "0";
        el.style.transform = visible ? "scale(1)" : "scale(0.9)"; 
        
        // Optimization: Use pre-defined classes to reduce string interpolation overhead
        el.className = cn(CARD_BASE, active ? CARD_ACTIVE : CARD_INACTIVE);
      };

      // Layout Phases
      if (phase === 0) { // Init
        set(r1.current, 0, 0, width, height, false, false);
        set(r2.current, rightX, 0, halfW, height, false, false);
        set(r3.current, rightX, bottomY, halfW, halfH, false, false);
      } else if (phase === 1) { // Spawn 1
        set(r1.current, 0, 0, width, height, true, true);
        set(r2.current, rightX, 0, halfW, height, false, false);
        set(r3.current, rightX, bottomY, halfW, halfH, false, false);
      } else if (phase === 2) { // Spawn 2
        set(r1.current, 0, 0, halfW, height, true, false); 
        set(r2.current, rightX, 0, halfW, height, true, true);
        set(r3.current, rightX, bottomY, halfW, halfH, false, false);
      } else if (phase === 3) { // Spawn 3
        set(r1.current, 0, 0, halfW, height, true, false);
        set(r2.current, rightX, 0, halfW, halfH, true, false);
        set(r3.current, rightX, bottomY, halfW, halfH, true, true);
      } else if (phase === 4) { // Swap
        set(r1.current, rightX, bottomY, halfW, halfH, true, false);
        set(r2.current, rightX, 0, halfW, halfH, true, false);
        set(r3.current, 0, 0, halfW, height, true, true);
      } else if (phase === 5) { // Re-Swap
        set(r1.current, 0, 0, halfW, height, true, true);
        set(r2.current, rightX, 0, halfW, halfH, true, false);
        set(r3.current, rightX, bottomY, halfW, halfH, true, false);
      } else if (phase === 6) { // Despawn 3
        set(r1.current, 0, 0, halfW, height, true, true);
        set(r2.current, rightX, 0, halfW, height, true, false);
        set(r3.current, rightX, bottomY, halfW, halfH, false, false);
      } else if (phase === 7) { // Despawn 2
        set(r1.current, 0, 0, width, height, true, true);
        set(r2.current, rightX, 0, halfW, height, false, false);
        set(r3.current, rightX, bottomY, halfW, halfH, false, false);
      } else if (phase === 8) { // Despawn 1
        set(r1.current, 0, 0, width, height, false, false);
        set(r2.current, rightX, 0, halfW, height, false, false);
        set(r3.current, rightX, bottomY, halfW, halfH, false, false);
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current as Element);
    return () => ro.disconnect();
  }, [phase]);

  // Loop Timing
  useEffect(() => {
    const timeouts = TIMINGS.map(t => setTimeout(() => setPhase(t.phase), t.delay));
    const loop = setTimeout(() => setLoopKey(k => k + 1), TOTAL_DURATION);
    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(loop);
    };
  }, [loopKey]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden p-4">
      {/* FIX: Initial opacity-0 prevents the "glitch" */}
      <div ref={r1} className="absolute opacity-0">1</div>
      <div ref={r2} className="absolute opacity-0">2</div>
      <div ref={r3} className="absolute opacity-0">3</div>
    </div>
  );
}

// ============================================================================
// 2. SCROLLER LAYOUT
// ============================================================================
function ScrollerLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  
  const [animationPhase, setAnimationPhase] = useState(0);
  const [loopKey, setLoopKey] = useState(0);

  // Setup Transitions
  useEffect(() => {
    // Items
    [leftRef, centerRef, rightRef].forEach(ref => {
      if (ref.current) {
        ref.current.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      }
    });
    // Track
    if (trackRef.current) {
      trackRef.current.style.transition = "width 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      // Optimization: Hint browser about changes
      trackRef.current.style.willChange = "width, transform";
    }
  }, []);

  // Main Logic
  useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const width = container.clientWidth;
      
      // Responsive Gap Calculation
      const GAP = Math.min(20, width * 0.05);
      const halfScreen = 50;
      const phase = animationPhase;

      // Track Logic (Absolute Positioning Fix)
      const isExpandedTrack = phase >= 3 && phase <= 5;
      const trackMultiplier = isExpandedTrack ? 1.5 : 1.0;
      
      track.style.width = (width * trackMultiplier) + "px";
      track.style.height = "100%";
      track.style.position = "absolute"; 
      track.style.top = "0";
      track.style.left = "0";

      // Transform Logic
      let scrollTargetPercent = 0;
      if (phase === 3 || phase === 4 || phase === 5) {
        scrollTargetPercent = 50;
      }
      const scrollX = (width * scrollTargetPercent) / 100;
      track.style.transform = `translateX(-${scrollX}px)`;

      // Window Logic
      const set = (el: HTMLDivElement | null, xPercent: number, widthPercent: number, visible: boolean = true, active: boolean = false) => {
        if (!el) return;
        const rawX = (width * xPercent) / 100;
        const rawW = (width * widthPercent) / 100;

        const isVisuallyFirst = xPercent === scrollTargetPercent;
        const isVisuallyLast = (xPercent + widthPercent) === (scrollTargetPercent + 100);

        const actualX = isVisuallyFirst ? rawX : rawX + (GAP / 2);
        let actualWidth = rawW;
        if (!isVisuallyFirst) actualWidth -= (GAP / 2);
        if (!isVisuallyLast) actualWidth -= (GAP / 2);

        actualWidth = Math.max(actualWidth, 0);

        el.style.position = "absolute";
        el.style.left = actualX + "px";
        el.style.top = "0px";
        el.style.width = actualWidth + "px";
        el.style.height = "100%";
        el.style.opacity = visible ? "1" : "0";
        el.style.transform = visible ? "scale(1)" : "scale(0.9)";
        
        el.className = cn(CARD_BASE, active ? CARD_ACTIVE : CARD_INACTIVE);
      };

      // Phase States
      if (phase === 0) {
        set(leftRef.current, 0, halfScreen, false, false);
        set(centerRef.current, 100, halfScreen, false, false);
        set(rightRef.current, 200, halfScreen, false, false);
      } else if (phase === 1) {
        set(leftRef.current, 25, halfScreen, true, true);
        set(centerRef.current, 100, halfScreen, false, false);
        set(rightRef.current, 200, halfScreen, false, false);
      } else if (phase === 2) {
        set(leftRef.current, 0, halfScreen, true, false);
        set(centerRef.current, 50, halfScreen, true, true);
        set(rightRef.current, 200, halfScreen, false, false);
      } else if (phase === 3) {
        set(leftRef.current, 0, halfScreen, true, false);
        set(centerRef.current, 50, halfScreen, true, false);
        set(rightRef.current, 100, halfScreen, true, true);
      } else if (phase === 4) {
        set(leftRef.current, 0, halfScreen, true, false);
        set(centerRef.current, 100, halfScreen, true, false); 
        set(rightRef.current, 50, halfScreen, true, true);
      } else if (phase === 5) {
        set(rightRef.current, 50, 100, true, true);
        set(centerRef.current, 150, halfScreen, true, false);
        set(leftRef.current, -50, halfScreen, true, false);
      } else if (phase === 6) {
        set(rightRef.current, 50, halfScreen, false, false);
        set(centerRef.current, 50, halfScreen, true, true);
        set(leftRef.current, 0, halfScreen, true, false);
      } else if (phase === 7) {
        set(leftRef.current, 25, halfScreen, true, true);
        set(centerRef.current, 50, halfScreen, false, false);
        set(rightRef.current, 50, halfScreen, false, false);
      } else if (phase === 8) {
        set(leftRef.current, 25, halfScreen, false, false);
        set(centerRef.current, 50, halfScreen, false, false);
        set(rightRef.current, 50, halfScreen, false, false);
      }
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current as Element);
    return () => ro.disconnect();
  }, [animationPhase]);

  // Loop Timing
  useEffect(() => {
    const timeouts = TIMINGS.map(t => setTimeout(() => setAnimationPhase(t.phase), t.delay));
    const loop = setTimeout(() => setLoopKey(prev => prev + 1), TOTAL_DURATION);
    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(loop);
    };
  }, [loopKey]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {/* FIX: Initial absolute/opacity-0 on track and items prevents glitch */}
      <div ref={trackRef} className="absolute top-0 left-0 w-full h-full">
        <div ref={leftRef} className="absolute opacity-0">1</div>
        <div ref={centerRef} className="absolute opacity-0">2</div>
        <div ref={rightRef} className="absolute opacity-0">3</div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. MAIN COMPONENT
// ============================================================================
export function MangoLayouts() {
  const [activeLayout, setActiveLayout] = useState<'tiling' | 'scroller'>('tiling');

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex justify-end">
        <div className="inline-flex rounded-full bg-muted p-1 border border-border">
          <button
            onClick={() => setActiveLayout('tiling')}
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-full transition-all cursor-pointer",
              activeLayout === 'tiling' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Tiling
          </button>
          <button
            onClick={() => setActiveLayout('scroller')}
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-full transition-all cursor-pointer",
              activeLayout === 'scroller' ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Scroller
          </button>
        </div>
      </div>

      <div className="relative w-full aspect-[3/2] overflow-hidden rounded-xl border border-border bg-background/50 shadow-sm">
        {activeLayout === 'tiling' && <TileLayout />}
        {activeLayout === 'scroller' && <ScrollerLayout />}
      </div>
    </div>
  );
}
