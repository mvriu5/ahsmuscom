"use client";

import { useEffect, useRef, useState } from "react";
import { TextMorph } from "torph/react";

const states = [
  {
    label: "Users get the UI after hydration.",
    progress: "8%",
  },
  {
    label: "Initial crawl: Limited HTML & incomplete metadata.",
    progress: "40%",
  },
  {
    label: "Rendering queue: JavaScript processing",
    progress: "62%",
  },
  {
    label: "Indexing: Content or metadata can be delayed",
    progress: "92%",
  },
] as const;

export function CrawlAnimation() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [currentStateIndex, setCurrentStateIndex] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) {
      setCurrentStateIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStateIndex((prevIndex) => (prevIndex + 1) % states.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [isInView]);

  const step = isInView ? currentStateIndex + 1 : 0;
  const phaseLabel = isInView ? states[currentStateIndex].label : "";
  const progressWidth = isInView ? states[currentStateIndex].progress : "0%";
  const progressColor = step === 2 || step === 3 ? "#f59e0b" : "#2b7fff";
  const progressShadow =
    step === 2 || step === 3
      ? "0 0 0 4px rgba(245, 158, 11, 0.16)"
      : "0 0 0 4px rgba(43, 127, 255, 0.14)";

  return (
    <div
      ref={sectionRef}
      className="my-4 rounded-md bg-muted/30 p-3 shadow-sm ring ring-border"
    >
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 grid grid-cols-3 items-start text-center text-xs">
          <div>
            <div className="mb-2 inline-block rounded border border-border/80 px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
              Client
            </div>
            <p className={step >= 1 ? "text-foreground" : "text-muted-foreground"}>
              Browser Render
            </p>
          </div>
          <div>
            <div className="mb-2 inline-block rounded border border-border/80 px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
              Googlebot
            </div>
            <p
              className={
                step === 2 || step === 3 ? "text-amber-500" : "text-muted-foreground"
              }
            >
              Render Queue
            </p>
          </div>
          <div>
            <div className="mb-2 inline-block rounded border border-border/80 px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
              Index
            </div>
            <p className={step === 4 ? "text-foreground" : "text-muted-foreground"}>
              Search Results
            </p>
          </div>
        </div>

        <div className="relative h-8">
          <div className="absolute left-[8%] top-3 h-2 w-[84%] overflow-hidden rounded-full bg-border/60">
            <div
              className="h-full rounded-full transition-all duration-1800ms ease-linear"
              style={{
                width: progressWidth,
                backgroundColor: progressColor,
                boxShadow: progressShadow,
              }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-3 max-w-2xl overflow-hidden px-2 text-center">
        <TextMorph className="block text-sm leading-relaxed text-secondary-foreground/75 transition-[background,transform] duration-500 ease-in-out will-change-transform">
          {phaseLabel}
        </TextMorph>
      </div>
    </div>
  );
}
