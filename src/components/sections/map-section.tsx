"use client"

import {
    Map,
    MapMarker,
    MapRef,
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
            <div className="h-48 overflow-hidden rounded-md border border-border">
                {!!mapStyle &&
                    <Map ref={mapRef} center={[51.327, 12.374]} zoom={12} styles={mapStyle}>
                        <MapMarker longitude={51.347} latitude={12.374}>
                            <MarkerContent>
                                <div className="size-4 rounded-full bg-primary border-2 border-white shadow-lg" />
                            </MarkerContent>
                        </MapMarker>
                    </Map>
                }
            </div>
        </Section>
    )
}
