import type { ReactNode } from "react";

type JsonLd = Record<string, unknown>;

type ContainerProps = {
  children: ReactNode;
  jsonLd?: JsonLd;
  mainClassName?: string;
};

export function Container({
  children,
  jsonLd,
  mainClassName = "py-16 px-0 sm:px-[10%] md:px-[16%] lg:px-[20%] xl:px-[25%] flex flex-col gap-8",
}: ContainerProps) {
  return (
    <div className="relative min-h-screen max-w-screen font-sans">
      {jsonLd ? (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd).replace(/</g, "\\u003c")}
        </script>
      ) : null}
      <div className="absolute top-0 bottom-0 left-0 w-4 sm:w-[10%] md:w-[16%] lg:w-[20%] xl:w-[25%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)] opacity-50 -z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-4 sm:w-[10%] md:w-[16%] lg:w-[20%] xl:w-[25%] bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)] opacity-50 -z-10" />

      <div className="absolute top-0 bottom-0 left-0 pl-4 sm:pl-[10%] md:pl-[16%] lg:pl-[20%] xl:pl-[25%] w-px border-r border-dashed border-border pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 pr-4 sm:pr-[10%] md:pr-[16%] lg:pr-[20%] xl:pr-[25%] w-px border-l border-dashed border-border pointer-events-none" />

      <main className={mainClassName}>{children}</main>
    </div>
  );
}
