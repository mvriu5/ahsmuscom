"use client";

import { useEffect, useState } from "react";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

type MetricCardProps = {
  title: string;
  displayValue: number;
  suffix: string;
  score: number;
  decimals: number;
  color: string;
  trackColor: string;
};

function MetricCard({
  title,
  displayValue,
  suffix,
  score,
  decimals,
  color,
  trackColor,
}: MetricCardProps) {
  const data = [
    {
      metric: title,
      score,
      fill: color,
    },
  ];

  const config = {
    score: {
      label: title,
      color,
    },
  } satisfies ChartConfig;

  return (
      <div className="relative">
        <ChartContainer config={config} className="mx-auto h-40 w-full max-w-[220px] aspect-square">
          <RadialBarChart
            data={data}
            startAngle={90}
            endAngle={-270}
            innerRadius="70%"
            outerRadius="100%"
            barSize={14}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar
              dataKey="score"
              cornerRadius={999}
              background={{ fill: trackColor }}
              isAnimationActive={false}
            />
          </RadialBarChart>
        </ChartContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-neuton tabular-nums">
            {displayValue.toFixed(decimals)}
            {suffix}
          </span>
          <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
            {title}
          </span>
        </div>
      </div>
  );
}

export function CwvAnimation() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const animationDurationMs = 2000;
    const holdDurationMs = 3200;
    const restartDelayMs = 700;

    let rafId: number | undefined;
    let holdTimeout: ReturnType<typeof setTimeout> | undefined;
    let restartTimeout: ReturnType<typeof setTimeout> | undefined;

    const runCycle = () => {
      const start = performance.now();

      const tick = (now: number) => {
        const nextProgress = Math.max(
          0,
          Math.min((now - start) / animationDurationMs, 1)
        );
        setProgress(nextProgress);

        if (nextProgress < 1) {
          rafId = requestAnimationFrame(tick);
          return;
        }

        holdTimeout = setTimeout(() => {
          setProgress(0);
          restartTimeout = setTimeout(runCycle, restartDelayMs);
        }, holdDurationMs);
      };

      rafId = requestAnimationFrame(tick);
    };

    runCycle();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (holdTimeout) clearTimeout(holdTimeout);
      if (restartTimeout) clearTimeout(restartTimeout);
    };
  }, []);

  const clsValue = 0.04 * progress;
  const lcpValue = 2.3 * progress;
  const clsScore = 96 * progress;
  const lcpScore = 87 * progress;

  return (
      <div className="grid gap-3 md:grid-cols-2 my-4 rounded-md bg-muted/30 p-2 shadow-sm ring ring-border">
        <MetricCard
          title="CLS"
          displayValue={clsValue}
          suffix=""
          score={clsScore}
          decimals={2}
          color="hsl(142 72% 35%)"
          trackColor="hsl(142 45% 88%)"
        />
        <MetricCard
          title="LCP"
          displayValue={lcpValue}
          suffix="s"
          score={lcpScore}
          decimals={1}
          color="hsl(217 85% 56%)"
          trackColor="hsl(217 55% 90%)"
        />
      </div>
  );
}
