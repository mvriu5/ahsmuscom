"use client"

import { Section } from "@/components/section"
import { Activity, ActivityCalendar, ThemeInput } from 'react-activity-calendar'

const minimalTheme: ThemeInput = {
    light: ['hsl(0, 0%, 92%)', 'mediumseagreen'],
}

export function HeatmapSection({ contributions }: { contributions: Activity[] }) {
    return (
        <Section title="05 Github Activity">
            <div className="overflow-x-auto pb-4">
                <ActivityCalendar
                    data={contributions}
                    colorScheme="light"
                    theme={minimalTheme}
                    labels={{
                        totalCount: "{{count}} contributions in the last year"
                    }}
                    tooltips={{
                        activity: {
                            text: (activity: Activity) => `${activity.count} contributions on ${activity.date}`
                        },
                        colorLegend: {
                            text: level => `Activity level ${level + 1}`
                        },
                    }}
                />
            </div>
        </Section>
    )
}
