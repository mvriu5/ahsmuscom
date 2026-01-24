"use client"

import Cal from "@calcom/embed-react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "./ui/dialog"
import { buttonVariants } from "./ui/button"
import { cn } from "@/utils/cn"
import { Calendar01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { ScrollArea } from "./ui/scroll-area"

export function Booker() {
    return (
        <Dialog>
            <DialogTrigger
                className={cn(
                    buttonVariants({ size: "xs", variant: "outline" }),
                    "bg-blue-100 border-blue-300 text-blue-500 hover:text-blue-500 hover:bg-blue-200"
                )}
                render={
                    <div className="flex items-center gap-2">
                        <HugeiconsIcon icon={Calendar01Icon} />
                        <p>Schedule a Meeting</p>
                    </div>
                }
            />
            <DialogContent className={"p-0 overflow-hidden h-1/2 min-w-1/2"} showCloseButton={false}>
                <ScrollArea className="h-full">
                    <DialogHeader className="sr-only">Cal Meeting Booker</DialogHeader>
                    <Cal calLink="mvriu5/15min" config={{ theme: "light", layout: "month_view" }} className="w-full h-full border-0 ring-0 outline-0"/>
                </ScrollArea>
            </DialogContent>

        </Dialog>

    )
}
