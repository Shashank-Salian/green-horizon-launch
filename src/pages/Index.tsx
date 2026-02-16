import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";

const LEAF_COUNT = 15;
const WIND_LEAF_COUNT = 6;

const LeafParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const leaves: HTMLDivElement[] = [];
    const symbols = ["🍃", "🌿", "☘️", "🍀"];

    // Vertical falling leaves
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

      gsap.delayedCall(Math.random() * 8, animateLeaf);
    }

    // Wind-blown horizontal leaves (cartoon swirl)
    for (let i = 0; i < WIND_LEAF_COUNT; i++) {
      const leaf = document.createElement("div");
      leaf.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      leaf.style.position = "absolute";
      leaf.style.fontSize = `${18 + Math.random() * 14}px`;
      leaf.style.opacity = "0";
      leaf.style.pointerEvents = "none";
      leaf.style.willChange = "transform, opacity";
      container.appendChild(leaf);
      leaves.push(leaf);

      const animateWindLeaf = () => {
        const startY = window.innerHeight * (0.2 + Math.random() * 0.6);
        const amplitude = 40 + Math.random() * 60;
        const duration = 5 + Math.random() * 4;
        const totalWidth = window.innerWidth + 200;
        const waves = 2 + Math.floor(Math.random() * 2);
        const peakOpacity = 0.3 + Math.random() * 0.15;
        const spinTotal = 720 + Math.random() * 360;

        gsap.set(leaf, { x: -80, y: startY, rotation: 0, opacity: 0 });

        const proxy = { progress: 0 };
        gsap.to(proxy, {
          progress: 1,
          duration,
          ease: "none",
          onUpdate: () => {
            const p = proxy.progress;
            const currentX = -80 + p * totalWidth;
            const swirlY = startY + Math.sin(p * Math.PI * waves) * amplitude;
            const rot = p * spinTotal;
            const fade = p < 0.12 ? p / 0.12 : p > 0.85 ? (1 - p) / 0.15 : 1;
            gsap.set(leaf, {
              x: currentX,
              y: swirlY,
              rotation: rot,
              opacity: fade * peakOpacity,
            });
          },
          onComplete: () => {
            gsap.delayedCall(3 + Math.random() * 8, animateWindLeaf);
          },
        });
      };

      gsap.delayedCall(1 + Math.random() * 10, animateWindLeaf);
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
