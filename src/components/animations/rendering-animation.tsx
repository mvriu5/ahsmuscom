import { useEffect, useRef, useState } from "react";

export function RenderingAnimation() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const items = [
    {
      title: "SSG",
      pros: ["Fast", "SEO-ready"],
      cons: ["Rebuilds"],
    },
    {
      title: "SSR",
      pros: ["Fresh", "Dynamic"],
      cons: ["Server cost"],
    },
    {
      title: "ISR",
      pros: ["Fast + updates", "Balanced"],
      cons: ["Slight stale window"],
    },
  ];

  useEffect(() => {
    if (!isVisible) return;

    setVisibleCount(0);
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      setVisibleCount(current);
      if (current >= items.length) {
        clearInterval(interval);
      }
    }, 260);

    return () => clearInterval(interval);
  }, [isVisible, items.length]);

  return (
    <section
      ref={sectionRef}
      className="my-4 rounded-md bg-muted/30 p-2 shadow-sm ring ring-border"
    >
      <div className="grid gap-1 md:grid-cols-3">
        {items.map((item, index) => (
          <article
            key={item.title}
            className="p-1 transition-all duration-700 ease-out"
            style={{
              opacity: visibleCount > index ? 1 : 0,
              transform: visibleCount > index ? "translateY(0)" : "translateY(18px)",
            }}
          >
            <h4 className="mb-1 text-lg font-semibold">{item.title}</h4>
            <ul className="space-y-1 text-md">
              {item.pros.map((pro) => (
                <li key={pro} className="grid grid-cols-[14px_1fr] items-start gap-1 font-mono tracking-tighter">
                  <span className="text-emerald-600">+</span>
                  <span className="">{pro}</span>
                </li>
              ))}
              {item.cons.map((con) => (
                <li key={con} className="grid grid-cols-[14px_1fr] items-start gap-1 font-mono tracking-tighter">
                  <span className="text-rose-600">-</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
