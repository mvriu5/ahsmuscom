import { Section } from "@/components/section"
import { LayoutThreeColumnFreeIcons } from "@hugeicons/core-free-icons"
import { ActivityCalendar, ThemeInput } from 'react-activity-calendar'

type Contribution = {
    date: string
    count: number
    level: 0 | 1 | 2 | 3 | 4
}

export async function HeatmapSection() {
    let contributions: Contribution[] = []
    let emptyDays = 0

    try {
        const username = "mvriu5"
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)

        if (!response.ok) throw new Error("Failed to fetch contributions")

        const data = await response.json()

        if (data.contributions) {
            const allContributions: Contribution[] = data.contributions
            const contributionsByDate = new Map(allContributions.map(c => [c.date, c]))
            const endDate = new Date()
            const startDate = new Date()
            startDate.setDate(endDate.getDate() - 364)

            const last365daysContributions: Contribution[] = []
            const currentDate = new Date(startDate)
            while (currentDate <= endDate) {
                const dateStr = currentDate.toISOString().split("T")[0]
                const contrib = contributionsByDate.get(dateStr)
                last365daysContributions.push(contrib || { date: dateStr, count: 0, level: 0 })
                currentDate.setDate(currentDate.getDate() + 1)
            }

            contributions = last365daysContributions

            if (contributions.length > 0) {
                const firstDay = new Date(contributions[0].date)
                emptyDays = firstDay.getUTCDay()
            }
        }
    } catch (error) {
        const totalDays = 365

        contributions = Array.from({ length: totalDays }, (_, i) => {
            const date = new Date()
            date.setDate(date.getDate() - (totalDays - i))
            const rand = Math.random()
            const level = rand > 0.8
                ? ((Math.floor(Math.random() * 4) + 1) as Contribution["level"])
                : 0

            return {
                date: date.toISOString().split("T")[0],
                count: level > 0 ? Math.floor(Math.random() * 10) : 0,
                level: level,
            }
        })
    }

    const minimalTheme: ThemeInput = {
        dark: ['hsl(0, 0%, 94%)', 'mediumseagreen'],
    }

    return (
        <Section title="04 Github Activity">
            <div className="overflow-x-auto pb-4">
                <ActivityCalendar data={contributions} theme={minimalTheme} />
            </div>
        </Section>
    )
}
