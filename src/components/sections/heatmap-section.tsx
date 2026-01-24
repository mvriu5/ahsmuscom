"use client"

import { Section } from "@/components/section"
import { Activity, ActivityCalendar, ThemeInput } from 'react-activity-calendar'

const minimalTheme: ThemeInput = {
    dark: ['hsl(0, 0%, 94%)', 'mediumseagreen'],
}

export function HeatmapSection({ contributions }: { contributions: Activity[] }) {
    return (
        <Section title="05 Github Activity">
            <div className="overflow-x-auto pb-4">
                <ActivityCalendar
                    data={contributions}
                    theme={minimalTheme}
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
