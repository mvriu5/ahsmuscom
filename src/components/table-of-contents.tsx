"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { TextAlignLeftIcon } from "@hugeicons/core-free-icons"
import { useWebHaptics } from "web-haptics/react"

interface TocEntry {
	_key: string
	_type: "block"
	style: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
	children: {
		_key: string
		_type: "span"
		text: string
	}[]
}

interface TableOfContentsProps {
	headings: TocEntry[]
}

const throttle = (func: () => void, delay: number) => {
	let timeoutId: ReturnType<typeof setTimeout> | null = null
	let lastExec = 0

	return () => {
		const elapsed = Date.now() - lastExec
		const execute = () => {
			func()
			lastExec = Date.now()
		}

		if (timeoutId) {
			clearTimeout(timeoutId)
		}

		if (elapsed > delay) {
			execute()
		} else {
			timeoutId = setTimeout(execute, delay - elapsed)
		}
	}
}

export function TableOfContents({ headings }: TableOfContentsProps) {
	const [activeIds, setActiveIds] = useState<string[]>([])
	const mobileTocRef = useRef<HTMLUListElement>(null)
	const desktopTocRef = useRef<HTMLUListElement>(null)
	const [barStyle, setBarStyle] = useState({ top: 0, height: 0, opacity: 0 })
	const [isOpen, setIsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    const { trigger } = useWebHaptics()

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 1023px)") // Tailwind's lg breakpoint
		const handleMediaChange = (e: MediaQueryListEvent | { matches: boolean }) => {
			setIsMobile(e.matches)
			setIsOpen(!e.matches) // Default to open on desktop, closed on mobile
		}

		handleMediaChange(mediaQuery)
		mediaQuery.addEventListener("change", handleMediaChange)

		return () => mediaQuery.removeEventListener("change", handleMediaChange)
	}, [])

	useEffect(() => {
		const elements = headings
			.map(heading => {
				const id = heading.children[0].text.toLowerCase().replace(/\s+/g, "-")
				return document.getElementById(id)
			})
			.filter((el): el is HTMLElement => el !== null)

		if (elements.length === 0) return

		const handleScroll = () => {
			const newActiveIds = elements
				.filter(el => {
					const rect = el.getBoundingClientRect()
					const viewportHeight = window.innerHeight
					// Consider an element "active" when it's in the middle 70% of the viewport
					const topOffset = viewportHeight * 0.15
					const bottomOffset = viewportHeight * 0.85
					return rect.top < bottomOffset && rect.bottom > topOffset
				})
				.map(el => el.id)

			setActiveIds(newActiveIds)
		}

		const throttledHandler = throttle(handleScroll, 100)

		window.addEventListener("scroll", throttledHandler)
		handleScroll() // Initial check

		return () => {
			window.removeEventListener("scroll", throttledHandler)
		}
	}, [headings])

	useEffect(() => {
		const currentRef = isMobile ? mobileTocRef : desktopTocRef
		if (!currentRef.current) return

		if (activeIds.length === 0) {
			setBarStyle(prev => ({ ...prev, opacity: 0 }))
			return
		}

		const listItems = Array.from(currentRef.current.querySelectorAll("li"))
		const activeElements = activeIds
			.map(id => listItems.find(item => item.id === `toc-${id}`))
			.filter((el): el is HTMLLIElement => el !== null && el !== undefined)

		if (activeElements.length === 0) {
			setBarStyle(prev => ({ ...prev, opacity: 0 }))
			return
		}

		const sortedActiveElements = activeElements.sort(
			(a, b) => a.offsetTop - b.offsetTop,
		)
		const firstElement = sortedActiveElements[0]
		const lastElement =
			sortedActiveElements[sortedActiveElements.length - 1]

		const top = firstElement.offsetTop
		const bottom = lastElement.offsetTop + lastElement.offsetHeight
		const height = bottom - top

		setBarStyle({ top, height, opacity: 1 })
	}, [activeIds, isOpen, isMobile])

	if (headings.length === 0) {
		return null
	}

	return (
		<>
			{/* Mobile: Floating button and slide-out drawer */}
			<div className="lg:hidden">
				<div className="fixed top-4 left-6 z-40">
					<button
                        onClick={() => {
                            trigger("heavy")
                            setIsOpen(true)
                        }}
						className="h-10 flex items-center justify-center gap-2 rounded-lg border bg-background/20 shadow-sm backdrop-blur-sm px-2"
						aria-label="Open Table of Contents"
					>
    					<HugeiconsIcon
    						icon={TextAlignLeftIcon}
    						size={14}
    						strokeWidth={3}
    						className="text-gray-600"
    					/>
    					<h3 className="font-semibold">Content</h3>
					</button>
				</div>
				{/* Overlay */}
				<div
					className={cn(
						"fixed inset-0 z-40 bg-black/20 backdrop-blur-sm",
						isOpen && isMobile
							? "visible opacity-100"
							: "invisible opacity-0",
						"transition-all duration-300",
					)}
					onClick={() => setIsOpen(false)}
				/>
				{/* Drawer */}
				<div
					className={cn(
						"fixed top-0 left-0 bottom-0 z-50 w-3/4 max-w-xs transform bg-background p-6",
						isOpen && isMobile ? "translate-x-0" : "-translate-x-full",
						"transition-transform duration-300 ease-in-out",
					)}
				>
					<div className="flex items-center gap-2 mb-2">
						<HugeiconsIcon
							icon={TextAlignLeftIcon}
							size={14}
							strokeWidth={3}
							className="text-gray-600"
						/>
						<h3 className="font-semibold">Content</h3>
					</div>
					<ul
						ref={mobileTocRef}
						className="relative ml-px max-h-[calc(100vh-7rem)] overflow-y-auto border-l border-neutral-200 dark:border-neutral-700"
					>
						<div
							className="absolute w-0.5 rounded-full bg-foreground transition-all duration-300 ease-in-out"
							style={{ ...barStyle }}
						/>
						{headings.map(heading => {
							const id = heading.children[0].text
								.toLowerCase()
								.replace(/\s+/g, "-")
							const text = heading.children[0].text
							return (
								<li key={heading._key} id={`toc-${id}`}>
									<a
										href={`#${id}`}
                                        onClick={() => {
                                            trigger("soft")
                                            if(isMobile) setIsOpen(false)
                                        }}
										className={cn(
											"block py-1 pl-4 text-sm lg:text-xs text-muted-foreground transition-colors hover:text-foreground",
											activeIds.includes(id) && "text-foreground",
										)}
									>
										{text}
									</a>
								</li>
							)
						})}
					</ul>
				</div>
			</div>

			{/* Desktop: Sticky sidebar */}
			<div className="hidden lg:block sticky top-8 mt-2">
				<div className="flex items-center gap-2 mb-2">
					<HugeiconsIcon
						icon={TextAlignLeftIcon}
						size={14}
						strokeWidth={3}
						className="text-gray-600"
					/>
					<h3 className="font-semibold">Content</h3>
				</div>
				<ul
					ref={desktopTocRef}
					className="relative border-l border-neutral-200 dark:border-neutral-700"
				>
					<div
						className="absolute w-0.5 rounded-full bg-foreground transition-all duration-300 ease-in-out"
						style={{ left: "-1.5px", ...barStyle }}
					/>
					{headings.map(heading => {
						const id = heading.children[0].text
							.toLowerCase()
							.replace(/\s+/g, "-")
						const text = heading.children[0].text
						return (
							<li key={heading._key} id={`toc-${id}`}>
								<a
									href={`#${id}`}
									className={cn(
										"block py-1 pl-4 text-sm lg:text-xs text-muted-foreground transition-colors hover:text-foreground",
										activeIds.includes(id) && "text-foreground",
									)}
								>
									{text}
								</a>
							</li>
						)
					})}
				</ul>
			</div>
		</>
	)
}
