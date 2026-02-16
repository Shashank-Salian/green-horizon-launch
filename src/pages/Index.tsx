import { useEffect, useRef } from "react";
import gsap from "gsap";
import heroBg from "@/assets/hero-bg.jpg";

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
