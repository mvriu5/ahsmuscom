"use client"

import { BookerEmbed } from "@calcom/atoms"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog"
import { buttonVariants } from "./ui/button"
import { cn } from "@/utils/cn"
import { Calendar01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function Booker() {
    return (
        <Dialog>
            <DialogTrigger className={cn(buttonVariants({ size: "sm", variant: "outline" }))} render={
                <div className="flex items-center gap-2">
                    <HugeiconsIcon icon={Calendar01Icon} />
                    <p>Schedule a Meeting</p>
                </div>
            }/>
            <DialogContent className={"w-screen!"}>
                <DialogHeader className="sr-only">Cal Meeting Booker</DialogHeader>
                <BookerEmbed
                    eventSlug={"15min"}
                    view={"MONTH_VIEW"}
                    username={"mvriu5"}
                    customClassNames={{
                        bookerContainer: "border-subtle border h-full w-full",
                    }}
                    onCreateBookingSuccess={() => {
                        console.log("booking created successfully")
                    }}
                />
            </DialogContent>

        </Dialog>

    )
}
