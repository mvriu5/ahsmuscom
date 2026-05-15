"use client"

import {
    Map,
    MapMarker,
    MapTileLayer,
} from "@/components/ui/map"

export function LocationMap() {
    return (
        <>
            <div className="h-full md:hidden">
                <Map center={[48.55, 12.376]} zoom={5}>
                    <MapTileLayer />
                    <MapMarker position={[51.347, 12.376]} />
                </Map>
            </div>map
            <div className="hidden h-full md:block">
                <Map center={[49.927, 12.376]} zoom={5}>
                    <MapTileLayer />
                    <MapMarker position={[51.347, 12.376]} />
                </Map>
            </div>
        </>
    )
}
