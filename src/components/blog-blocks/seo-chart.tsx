"use client";

export function SeoChart() {
  const data = [
    { label: "Technical SEO", value: 92 },
    { label: "Content Quality", value: 84 },
    { label: "Core Web Vitals", value: 78 },
    { label: "Backlink Profile", value: 69 },
  ];

  return (
    <section className="my-8 rounded-md border border-dashed border-border p-5">
      <h3 className="mb-4 text-2xl font-neuton">SEO Chart</h3>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>{item.label}</span>
              <span className="font-mono">{item.value}%</span>
            </div>
            <div className="h-2 rounded-full bg-border/40">
              <div
                className="h-2 rounded-full bg-[#2b7fff] transition-all duration-700"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
