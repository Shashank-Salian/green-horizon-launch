import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";

const LEAF_COUNT = 15;

const LeafParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const leaves: HTMLDivElement[] = [];
    const symbols = ["🍃", "🌿", "☘️", "🍀"];

    for (let i = 0; i < LEAF_COUNT; i++) {
      const leaf = document.createElement("div");
      leaf.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      leaf.style.position = "absolute";
      leaf.style.fontSize = `${12 + Math.random() * 16}px`;
      leaf.style.opacity = "0";
      leaf.style.pointerEvents = "none";
      leaf.style.willChange = "transform, opacity";
      container.appendChild(leaf);
      leaves.push(leaf);

      const animateLeaf = () => {
        const startX = Math.random() * window.innerWidth;
        const drift = (Math.random() - 0.5) * 300;
        const duration = 8 + Math.random() * 10;

        gsap.set(leaf, {
          x: startX,
          y: -30,
          rotation: Math.random() * 360,
          opacity: 0,
        });

        gsap.to(leaf, {
          y: window.innerHeight + 30,
          x: startX + drift,
          rotation: `+=${180 + Math.random() * 360}`,
          opacity: 0.15 + Math.random() * 0.25,
          duration,
          ease: "none",
          onComplete: animateLeaf,
          onUpdate: function () {
            const progress = this.progress();
            if (progress < 0.1) gsap.set(leaf, { opacity: progress * 4 * (0.15 + Math.random() * 0.1) });
            else if (progress > 0.85) gsap.set(leaf, { opacity: (1 - progress) * 6 * 0.3 });
          },
        });
      };

      // Stagger start times
      gsap.delayedCall(Math.random() * 8, animateLeaf);
    }

    return () => {
      leaves.forEach((l) => l.remove());
      gsap.killTweensOf(leaves);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-[5] overflow-hidden pointer-events-none" />;
};

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const comingRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Set initial states
    gsap.set([logoRef.current, comingRef.current, dividerRef.current, taglineRef.current], {
      opacity: 0,
    });
    gsap.set(bgRef.current, { scale: 1.2, opacity: 0 });
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(logoRef.current, { y: -40 });
    gsap.set(comingRef.current, { y: 60, scale: 0.9 });
    gsap.set(dividerRef.current, { scaleX: 0 });
    gsap.set(taglineRef.current, { y: 30 });

    // Animate
    tl.to(bgRef.current, { opacity: 1, scale: 1, duration: 2.5, ease: "power2.out" })
      .to(overlayRef.current, { opacity: 1, duration: 1.5 }, 0.3)
      .to(logoRef.current, { opacity: 1, y: 0, duration: 1.2 }, 1)
      .to(comingRef.current, { opacity: 1, y: 0, scale: 1, duration: 1.4 }, 1.3)
      .to(dividerRef.current, { opacity: 1, scaleX: 1, duration: 1 }, 2)
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 1 }, 2.2);
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Overlay */}
      <div ref={overlayRef} className="absolute inset-0 hero-overlay" />

      {/* Floating Leaves */}
      <LeafParticles />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        <h2
          ref={logoRef}
          className="mb-6 font-display text-lg font-semibold tracking-[0.3em] uppercase text-primary md:text-xl"
        >
          Green Energy News
        </h2>

        <h1
          ref={comingRef}
          className="text-glow font-display text-5xl font-black leading-tight text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Coming soon...
        </h1>

        <div ref={dividerRef} className="leaf-divider my-8 w-48 md:w-72" />

        <p
          ref={taglineRef}
          className="max-w-md text-center font-body text-sm font-light leading-relaxed text-muted-foreground md:text-base"
        >
          Powering the future with sustainable stories. Stay tuned for the launch.
        </p>
      </div>
    </div>
  );
};

export default Index;
