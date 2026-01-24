"use client"

import * as React from "react"
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"
import { cn } from "@/utils/cn"

interface HoverCardInstanceContextValue {
  shouldKeepOpenRef: React.MutableRefObject<boolean>
  setShouldKeepOpen: (value: boolean) => void
  isPointerOverTriggerRef: React.MutableRefObject<boolean>
  isPointerOverContentRef: React.MutableRefObject<boolean>
  openHoverCard: () => void
  delay: number
  followCursor: boolean
  cursorPosition: { x: number; y: number } | null
  setCursorPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number } | null>
  >
}

const HoverCardInstanceContext =
  React.createContext<HoverCardInstanceContextValue>({
    shouldKeepOpenRef: { current: false },
    setShouldKeepOpen: () => {},
    isPointerOverTriggerRef: { current: false },
    isPointerOverContentRef: { current: false },
    openHoverCard: () => {},
    delay: 600,
    followCursor: false,
    cursorPosition: null,
    setCursorPosition: () => {},
  })

type PrimitiveRootProps = React.ComponentPropsWithoutRef<
  typeof PreviewCardPrimitive.Root
>

interface HoverCardProps
  extends Omit<PrimitiveRootProps, "open" | "onOpenChange"> {
  open?: boolean
  onOpenChange?: (open: boolean, details?: any) => void
    followCursor?: boolean
    delay?: number
}

function HoverCard(rawProps: HoverCardProps) {
  const {
    open: controlledOpen,
    onOpenChange,
    delay = 600,
    followCursor = false,
    ...props
  } = rawProps
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const [cursorPosition, setCursorPosition] = React.useState<{
    x: number
    y: number
  } | null>(null)

  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen

  // Refs locales para cada instancia de HoverCard
  const shouldKeepOpenRef = React.useRef(false)
  const isPointerOverTriggerRef = React.useRef(false)
  const isPointerOverContentRef = React.useRef(false)

  const setShouldKeepOpen = React.useCallback((value: boolean) => {
    shouldKeepOpenRef.current = value
  }, [])

  const openHoverCard = React.useCallback(() => {
    if (isControlled) {
      onOpenChange?.(true)
    } else {
      setUncontrolledOpen(true)
    }
  }, [isControlled, onOpenChange])

  function handleOpenChange(nextOpen: boolean, eventDetails: any) {
    // Lógica para mantener abierto si el mouse está sobre el trigger o el contenido
    if (!nextOpen) {
      if (
        isPointerOverTriggerRef.current ||
        isPointerOverContentRef.current ||
        shouldKeepOpenRef.current
      ) {
        if (isControlled) {
          onOpenChange?.(true)
        } else {
          setUncontrolledOpen(true)
        }
        return
      }
    }

    if (!isControlled) {
      setUncontrolledOpen(nextOpen)
    }

    if (nextOpen) {
      setShouldKeepOpen(true)
    } else {
      setShouldKeepOpen(false)
    }

    onOpenChange?.(nextOpen, eventDetails)
  }

  return (
    <HoverCardInstanceContext.Provider
      value={{
        shouldKeepOpenRef,
        setShouldKeepOpen,
        isPointerOverTriggerRef,
        isPointerOverContentRef,
        openHoverCard,
        delay,
        followCursor,
        cursorPosition,
        setCursorPosition,
      }}
    >
      <PreviewCardPrimitive.Root
        data-slot="hover-card"
        open={isOpen}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </HoverCardInstanceContext.Provider>
  )
}

type HoverCardTriggerProps = React.ComponentPropsWithoutRef<
  typeof PreviewCardPrimitive.Trigger
>

function HoverCardTrigger(rawProps: HoverCardTriggerProps) {
  const {
    onClick,
    onPointerDown,
    onPointerLeave,
    onPointerEnter,
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
    onPointerMove,
    ...props
  } = rawProps
  const {
    setShouldKeepOpen,
    isPointerOverTriggerRef,
    isPointerOverContentRef,
    openHoverCard,
    delay,
    followCursor,
    setCursorPosition,
  } = React.useContext(HoverCardInstanceContext)

  const longPressTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const isTouchActiveRef = React.useRef(false)

  React.useEffect(() => {
    return () => {
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current)
      }
    }
  }, [])

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation()
      onClick?.(event as any)
    },
    [onClick],
  )

  const handlePointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      setShouldKeepOpen(true)
      isPointerOverTriggerRef.current = true
      event.stopPropagation()
      onPointerDown?.(event as any)
    },
    [onPointerDown, setShouldKeepOpen],
  )

  const handlePointerEnter = React.useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      setShouldKeepOpen(true)
      isPointerOverTriggerRef.current = true
      onPointerEnter?.(event as any)
    },
    [onPointerEnter, setShouldKeepOpen],
  )

  const handlePointerLeave = React.useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      isPointerOverTriggerRef.current = false
      if (!isPointerOverContentRef.current) {
        setShouldKeepOpen(false)
      }
      onPointerLeave?.(event as any)
    },
    [onPointerLeave, setShouldKeepOpen, isPointerOverContentRef],
  )

  const handleTouchStart = React.useCallback(
    (event: React.TouchEvent<HTMLElement>) => {
      isTouchActiveRef.current = true
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current)
      }

      longPressTimeoutRef.current = setTimeout(() => {
        if (isTouchActiveRef.current) {
          setShouldKeepOpen(true)
          isPointerOverTriggerRef.current = true
          openHoverCard()
          // En mobile, el preventDefault evita el menú contextual al hacer long press
          if (event.cancelable) event.preventDefault()
        }
      }, delay)

      onTouchStart?.(event as any)
    },
    [onTouchStart, setShouldKeepOpen, openHoverCard, delay],
  )

  const handleTouchEnd = React.useCallback(
    (event: React.TouchEvent<HTMLElement>) => {
      isTouchActiveRef.current = false
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current)
        longPressTimeoutRef.current = null
      }
      onTouchEnd?.(event as any)
    },
    [onTouchEnd],
  )

  const handleTouchCancel = React.useCallback(
    (event: React.TouchEvent<HTMLElement>) => {
      isTouchActiveRef.current = false
      if (longPressTimeoutRef.current) {
        clearTimeout(longPressTimeoutRef.current)
        longPressTimeoutRef.current = null
      }
      onTouchCancel?.(event as any)
    },
    [onTouchCancel],
  )

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (followCursor) {
        setCursorPosition({ x: event.clientX, y: event.clientY })
      }
      onPointerMove?.(event as any)
    },
    [followCursor, setCursorPosition, onPointerMove],
  )

  return (
    <PreviewCardPrimitive.Trigger
      data-slot="hover-card-trigger"
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onPointerMove={handlePointerMove}
      {...props}
    />
  )
}

interface HoverCardContentProps
  extends React.ComponentPropsWithoutRef<typeof PreviewCardPrimitive.Popup> {
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  align?: "start" | "center" | "end"
  alignOffset?: number
}

function HoverCardContent(props: HoverCardContentProps) {
  const {
    className = "",
    side = "bottom",
    sideOffset = 4,
    align = "center",
    alignOffset = 4,
    onPointerEnter,
    onPointerLeave,
    ...rest
  } = props
  const {
    setShouldKeepOpen,
    isPointerOverTriggerRef,
    isPointerOverContentRef,
    followCursor,
    cursorPosition,
  } = React.useContext(HoverCardInstanceContext)

  const handlePointerEnter = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      setShouldKeepOpen(true)
      isPointerOverContentRef.current = true
      onPointerEnter?.(event as any)
    },
    [onPointerEnter, setShouldKeepOpen],
  )

  const handlePointerLeave = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      isPointerOverContentRef.current = false
      if (!isPointerOverTriggerRef.current) {
        setShouldKeepOpen(false)
      }
      onPointerLeave?.(event as any)
    },
    [onPointerLeave, setShouldKeepOpen, isPointerOverTriggerRef],
  )

  const popupContent = (
    <PreviewCardPrimitive.Popup
      data-slot="hover-card-content"
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-foreground text-background w-72 rounded-lg p-2.5 text-xs/relaxed shadow-md ring-1 duration-100 z-50 origin-(--transform-origin) outline-hidden",
        className,
      )}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      {...rest}
    />
  )

  if (followCursor && cursorPosition) {
    return (
      <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
        <PreviewCardPrimitive.Positioner
          className="isolate z-50"
          style={{
            position: "fixed",
            left: cursorPosition.x,
            top: cursorPosition.y,
            transform: "translate(10px, 10px)",
          }}
        >
          {popupContent}
        </PreviewCardPrimitive.Positioner>
      </PreviewCardPrimitive.Portal>
    )
  }

  return (
    <PreviewCardPrimitive.Portal data-slot="hover-card-portal">
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        {popupContent}
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  )
}

HoverCard.displayName = "HoverCard"
HoverCardTrigger.displayName = "HoverCardTrigger"
HoverCardContent.displayName = "HoverCardContent"

export { HoverCard, HoverCardTrigger, HoverCardContent }
