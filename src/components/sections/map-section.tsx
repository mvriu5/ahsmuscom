"use client"

import {
    Map,
    MapMarker,
    MapRef,
    MapTileLayer,
    MapZoomControl,
    MarkerContent
} from "@/components/ui/map"
import { useEffect, useRef, useState } from "react"
import { Section } from "../section"

export function MapSection() {
    const [mapStyle, setMapStyle] = useState<unknown>(null)

    const mapRef = useRef<MapRef>(null)

    useEffect(() => {
        const loadAssets = async () => {
            const res = await fetch("https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json")
            const style = await res.json()
            //eslint-disable-next-line
            style.layers = style.layers.filter((layer: any) => layer.type !== 'symbol')
            setMapStyle({ light: style, dark: style })
        }

        loadAssets()
    }, [])

    return (
        <Section title="05 Location">
            <div className="h-68 overflow-hidden rounded-md border border-border">
                <Map center={[49.927, 12.376]} zoom={5}>
                    <MapTileLayer />
                        <MapMarker position={[51.347, 12.376]}>
                    </MapMarker>
                </Map>
            </div>
        </Section>
    )
}
