import { Section } from "@/components/section"
import { cn } from "@/utils/cn"

export function HeatmapSection() {
    // Generate dummy data for the last 365 days
    // 52 weeks * 7 days
    const weeks = 52;
    const daysPerWeek = 7;
    
    // Create a matrix of contributions [week][day]
    // 0 = no contribution, 1-4 = levels of contribution
    const contributionData = Array.from({ length: weeks }, () => 
        Array.from({ length: daysPerWeek }, () => {
            const rand = Math.random();
            if (rand > 0.8) return Math.floor(Math.random() * 4) + 1;
            return 0;
        })
    );

    const getColor = (level: number) => {
        switch (level) {
            case 1: return "bg-green-200 dark:bg-green-900";
            case 2: return "bg-green-300 dark:bg-green-700";
            case 3: return "bg-green-400 dark:bg-green-500";
            case 4: return "bg-green-500 dark:bg-green-400";
            default: return "bg-gray-100 dark:bg-gray-800";
        }
    };

    return (
        <Section title="04 Github Activity">
            <div className="w-full overflow-x-auto pb-4">
                <div className="min-w-fit flex gap-1">
                    {contributionData.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-1">
                            {week.map((level, dayIndex) => (
                                <div 
                                    key={dayIndex} 
                                    className={cn(
                                        "size-3 rounded-[2px]", 
                                        getColor(level)
                                    )}
                                    title={`${level} contributions`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                    <span>Less</span>
                    <div className="size-3 rounded-[2px] bg-gray-100 dark:bg-gray-800" />
                    <div className="size-3 rounded-[2px] bg-green-200 dark:bg-green-900" />
                    <div className="size-3 rounded-[2px] bg-green-300 dark:bg-green-700" />
                    <div className="size-3 rounded-[2px] bg-green-400 dark:bg-green-500" />
                    <div className="size-3 rounded-[2px] bg-green-500 dark:bg-green-400" />
                    <span>More</span>
                </div>
            </div>
        </Section>
    )
}
