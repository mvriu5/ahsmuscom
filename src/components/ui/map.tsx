"use client"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { cn } from "@/lib/utils"
import { Location06Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type {
    DivIconOptions,
    LatLngExpression,
    Map as LeafletMap,
    Marker,
    Popup,
    TileLayer
} from "leaflet"
import "leaflet/dist/leaflet.css"
import {
    MinusIcon,
    PlusIcon
} from "lucide-react"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
    type ReactNode,
    type Ref
} from "react"
import { renderToString } from "react-dom/server"
import {
    useMap,
    useMapEvents,
    type MapContainerProps,
    type MarkerProps,
    type PopupProps,
    type TileLayerProps
} from "react-leaflet"
import "react-leaflet-markercluster/styles"

const LeafletMapContainer = dynamic(
    async () => (await import("react-leaflet")).MapContainer,
    { ssr: false }
)
const LeafletTileLayer = dynamic(
    async () => (await import("react-leaflet")).TileLayer,
    { ssr: false }
)
const LeafletMarker = dynamic(
    async () => (await import("react-leaflet")).Marker,
    { ssr: false }
)
const LeafletPopup = dynamic(
    async () => (await import("react-leaflet")).Popup,
    { ssr: false }
)

function Map({
    zoom = 15,
    maxZoom = 18,
    className,
    ...props
}: Omit<MapContainerProps, "zoomControl"> & {
    center: LatLngExpression
    ref?: Ref<LeafletMap>
}) {
    return (
        <LeafletMapContainer
            zoom={zoom}
            maxZoom={maxZoom}
            attributionControl={false}
            zoomControl={false}
            className={cn(
                "z-40 size-full min-h-96 flex-1 rounded-sm",
                className
            )}
            {...props}
        />
    )
}

interface MapTileLayerOption {
    name: string
    url: string
    attribution?: string
}

interface MapLayersContextType {
    registerTileLayer: (layer: MapTileLayerOption) => void
    tileLayers: MapTileLayerOption[]
    selectedTileLayer: string
    setSelectedTileLayer: (name: string) => void
}

const MapLayersContext = createContext<MapLayersContextType | null>(null)

function MapTileLayer({
    name = "Default",
    url,
    attribution,
    darkUrl,
    darkAttribution,
    ...props
}: Partial<TileLayerProps> & {
    name?: string
    darkUrl?: string
    darkAttribution?: string
    ref?: Ref<TileLayer>
}) {
    const map = useMap()
    if (map.attributionControl) {
        map.attributionControl.setPrefix("")
    }

    const context = useContext(MapLayersContext)
    const DEFAULT_URL =
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
    const DEFAULT_DARK_URL =
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"

    const { resolvedTheme } = useTheme()
    const resolvedUrl =
        resolvedTheme === "dark"
            ? (darkUrl ?? url ?? DEFAULT_DARK_URL)
            : (url ?? DEFAULT_URL)
    const resolvedAttribution =
        resolvedTheme === "dark" && darkAttribution
            ? darkAttribution
            : (attribution ??
              '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>')

    useEffect(() => {
        if (context) {
            context.registerTileLayer({
                name,
                url: resolvedUrl,
                attribution: resolvedAttribution,
            })
        }
    }, [context, name, url, attribution, resolvedAttribution, resolvedUrl])

    if (context && context.selectedTileLayer !== name) {
        return null
    }

    return (
        <LeafletTileLayer
            url={resolvedUrl}
            attribution={resolvedAttribution}
            {...props}
        />
    )
}

function MapMarker({
    icon = <HugeiconsIcon icon={Location06Icon} className="size-8 text-destructive fill-destructive/40"/>,
    iconAnchor = [12, 12],
    bgPos,
    popupAnchor,
    tooltipAnchor,
    ...props
}: Omit<MarkerProps, "icon"> &
    Pick<
        DivIconOptions,
        "iconAnchor" | "bgPos" | "popupAnchor" | "tooltipAnchor"
    > & {
        icon?: ReactNode
        ref?: Ref<Marker>
    }) {
    const { L } = useLeaflet()
    if (!L) return null

    return (
        <LeafletMarker
            icon={L.divIcon({
                html: renderToString(icon),
                iconAnchor,
                ...(bgPos ? { bgPos } : {}),
                ...(popupAnchor ? { popupAnchor } : {}),
                ...(tooltipAnchor ? { tooltipAnchor } : {}),
            })}
            riseOnHover
            {...props}
        />
    )
}

function MapZoomControl({ className, ...props }: React.ComponentProps<"div">) {
    const map = useMap()
    const [zoomLevel, setZoomLevel] = useState(map.getZoom())

    useMapEvents({
        zoomend: () => {
            setZoomLevel(map.getZoom())
        },
    })

    return (
        <MapControlContainer className={cn("top-1 left-1", className)}>
            <ButtonGroup
                orientation="vertical"
                aria-label="Zoom controls"
                {...props}>
                <Button
                    type="button"
                    size="icon-sm"
                    variant="secondary"
                    aria-label="Zoom in"
                    title="Zoom in"
                    className="border"
                    disabled={zoomLevel >= map.getMaxZoom()}
                    onClick={() => map.zoomIn()}>
                    <PlusIcon />
                </Button>
                <Button
                    type="button"
                    size="icon-sm"
                    variant="secondary"
                    aria-label="Zoom out"
                    title="Zoom out"
                    className="border"
                    disabled={zoomLevel <= map.getMinZoom()}
                    onClick={() => map.zoomOut()}>
                    <MinusIcon />
                </Button>
            </ButtonGroup>
        </MapControlContainer>
    )
}

function MapControlContainer({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const { L } = useLeaflet()
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!L) return
        const element = containerRef.current
        if (!element) return
        L.DomEvent.disableClickPropagation(element)
        L.DomEvent.disableScrollPropagation(element)
    }, [L])

    return (
        <div
            ref={containerRef}
            className={cn("absolute z-1000 size-fit cursor-default", className)}
            {...props}
        />
    )
}

function useLeaflet() {
    const [L, setL] = useState<typeof import("leaflet") | null>(null)

    useEffect(() => {
        if (L) return
        if (typeof window !== "undefined") {
            if (!L) {
                //eslint-disable-next-line
                setL(require("leaflet"))
            }
        }
    }, [L])

    return { L }
}


export {
    Map,
    MapMarker,
    MapTileLayer,
    MapZoomControl,
}
