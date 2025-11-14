"use client";

import { useEffect, useRef } from "react";

export function ScrollerLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const width = container.clientWidth;
      const height = container.clientHeight;
      const gap = 20;

      // Set track width (3 windows + gaps)
      track.style.width = width * 3 + gap * 2 + "px";
      track.style.height = height + "px";
      track.style.position = "relative";

      const set = (el: HTMLDivElement | null, x: number) => {
        if (!el) return;
        el.style.position = "absolute";
        el.style.left = x + "px";
        el.style.top = "0";
        el.style.width = width + "px";
        el.style.height = height + "px";
      };

      set(leftRef.current, 0);
      set(centerRef.current, width + gap);
      set(rightRef.current, width * 2 + gap * 2);

      // Show center window first
      container.scrollLeft = width + gap;
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current as Element);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[3/2] overflow-x-scroll overflow-y-hidden scroll-smooth"
    >
      {/* Track makes space for 3 windows */}
      <div ref={trackRef}>

        <div
          ref={leftRef}
          className="border-2 border-primary/40 rounded-md absolute"
        />

        <div
          ref={centerRef}
          className="border-2 border-primary rounded-md absolute"
        />

        <div
          ref={rightRef}
          className="border-2 border-primary/40 rounded-md absolute"
        />
        
      </div>
    </div>
  );
}
