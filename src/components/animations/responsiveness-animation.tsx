"use client";

import { useEffect, useState } from "react";

type ViewportState = "mobile" | "desktop" | "tablet";

const states: Array<{
  key: ViewportState;
  label: string;
  width: number;
  height: number;
}> = [
  { key: "mobile", label: "Mobile", width: 170, height: 310 },
  { key: "desktop", label: "Desktop", width: 420, height: 240 },
  { key: "tablet", label: "Tablet", width: 220, height: 340 },
];

export function ResponsivenessAnimation() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % states.length);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  const current = states[index];

  return (
    <section className="my-4 min-h-[380px] flex items-center justify-center rounded-md bg-muted/30 p-2 shadow-sm ring ring-border">
        <div
          className="overflow-hidden rounded-md border border-border/80 bg-background shadow transition-all duration-700 ease-in-out"
          style={{
            width: `${current.width}px`,
            height: `${current.height}px`,
          }}
        >
          <div className="h-8 border-b border-border/70 bg-muted/50 px-3">
            <div className="flex h-full items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-400/80" />
              <span className="h-2 w-2 rounded-full bg-amber-400/80" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
              <span className="ml-2 text-[10px] text-muted-foreground">ahsmus.com</span>
            </div>
          </div>

          <div
            className={`grid h-[calc(100%-2rem)] gap-2 p-2 transition-all duration-700 ${
              current.key === "desktop" ? "grid-cols-[1fr_2fr]" : "grid-cols-1"
            }`}
          >
            <div className="space-y-2 rounded border border-border/70 bg-muted/30 p-2">
              <div className="h-2.5 w-2/3 rounded bg-border/80" />
              <div className="h-2.5 w-1/2 rounded bg-border/70" />
              <div className="h-2.5 w-3/4 rounded bg-border/60" />
            </div>

            <div className="grid auto-rows-fr gap-2">
              <div className="rounded border border-border/70 bg-muted/30 p-2">
                <div className="mb-1.5 h-2.5 w-1/3 rounded bg-border/80" />
                <div className="h-2.5 w-5/6 rounded bg-border/70" />
              </div>
              <div className="rounded border border-border/70 bg-muted/30 p-2">
                <div className="mb-1.5 h-2.5 w-1/2 rounded bg-border/80" />
                <div className="h-2.5 w-2/3 rounded bg-border/70" />
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
