"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function TileLayout() {
	const containerRef = useRef<HTMLDivElement>(null);
	const r1 = useRef<HTMLDivElement>(null);
	const r2 = useRef<HTMLDivElement>(null);
	const r3 = useRef<HTMLDivElement>(null);
	const animationRef = useRef<gsap.core.Timeline>();

	const getDimensions = () => {
		const container = containerRef.current;
		if (!container) return null;

		const rect = container.getBoundingClientRect();
		const gap = 10;
		const leftW = (rect.width - gap) / 2;
		const rightW = leftW;
		const topH = (rect.height - gap) / 2;
		const bottomH = topH;

		return { rect, leftW, rightW, topH, bottomH, gap };
	};

	const initPositions = () => {
		const dims = getDimensions();
		if (!dims) return;

		const { leftW, rightW, topH, bottomH, gap } = dims;

		// Set initial positions
		gsap.set(r1.current, {
			x: 0,
			y: 0,
			width: leftW,
			height: dims.rect.height,
			force3D: true,
		});

		gsap.set(r2.current, {
			x: leftW + gap,
			y: 0,
			width: rightW,
			height: topH,
			force3D: true,
		});

		gsap.set(r3.current, {
			x: leftW + gap,
			y: topH + gap,
			width: rightW,
			height: bottomH,
			force3D: true,
		});
	};

	const createAnimation = () => {
		const dims = getDimensions();
		if (!dims) return;

		const { leftW, rightW, topH, bottomH, gap, rect } = dims;

		// Kill existing animation
		if (animationRef.current) {
			animationRef.current.kill();
		}

		const tl = gsap.timeline({
			repeat: -1,
			defaults: {
				duration: 0.8,
				ease: "power2.inOut",
				force3D: true,
			},
		});

		// Animation sequence - simplified and direct
		tl.to(
			r1.current,
			{ x: leftW + gap, y: topH + gap, width: rightW, height: bottomH },
			"step1",
		)
			.to(
				r3.current,
				{ x: 0, y: 0, width: leftW, height: rect.height },
				"step1",
			)
			.to({}, { duration: 0.5 })

			.to(
				r1.current,
				{ x: leftW + gap, y: 0, width: rightW, height: topH },
				"step2",
			)
			.to(
				r2.current,
				{ x: leftW + gap, y: topH + gap, width: rightW, height: bottomH },
				"step2",
			)
			.to({}, { duration: 0.5 })

			.to(
				r3.current,
				{ x: leftW + gap, y: 0, width: rightW, height: topH },
				"step3",
			)
			.to(
				r1.current,
				{ x: 0, y: 0, width: leftW, height: rect.height },
				"step3",
			)
			.to({}, { duration: 0.5 })

			.to(
				r2.current,
				{ x: leftW + gap, y: 0, width: rightW, height: topH },
				"step4",
			)
			.to(
				r3.current,
				{ x: leftW + gap, y: topH + gap, width: rightW, height: bottomH },
				"step4",
			)
			.to({}, { duration: 0.5 })

			.to(
				r1.current,
				{ x: leftW + gap, y: 0, width: rightW, height: topH },
				"step5",
			)
			.to(
				r2.current,
				{ x: 0, y: 0, width: leftW, height: rect.height },
				"step5",
			)
			.to({}, { duration: 0.5 })

			.to(
				r1.current,
				{ x: leftW + gap, y: topH + gap, width: rightW, height: bottomH },
				"step6",
			)
			.to(
				r3.current,
				{ x: leftW + gap, y: 0, width: rightW, height: topH },
				"step6",
			)
			.to({}, { duration: 1 });

		animationRef.current = tl;
	};

	const startAnimation = () => {
		initPositions();
		createAnimation();
	};

	useEffect(() => {
		// Small delay to ensure DOM is ready
		const timer = setTimeout(startAnimation, 100);

		const handleResize = () => {
			// Debounce resize events
			clearTimeout(timer);
			setTimeout(startAnimation, 100);
		};

		window.addEventListener("resize", handleResize, { passive: true });

		return () => {
			clearTimeout(timer);
			window.removeEventListener("resize", handleResize);
			if (animationRef.current) {
				animationRef.current.kill();
			}
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="relative w-full aspect-[3/2] overflow-hidden"
		>
			<div
				ref={r1}
				className="absolute border-2 border-primary rounded-md will-change-transform"
				style={{ backfaceVisibility: "hidden" }}
			/>
			<div
				ref={r2}
				className="absolute border-2 border-primary/40 rounded-md will-change-transform"
				style={{ backfaceVisibility: "hidden" }}
			/>
			<div
				ref={r3}
				className="absolute border-2 border-primary/40 rounded-md will-change-transform"
				style={{ backfaceVisibility: "hidden" }}
			/>
		</div>
	);
}
