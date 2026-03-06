import {
    Map,
    MapMarker,
    MapTileLayer,
    MapZoomControl,
} from "@/components/ui/map"
import { Section } from "../section"

export function MapSection() {
    return (
        <Section title="06 Location">
            <div className="h-48 md:h-68 overflow-hidden rounded-md border border-border">
                <div className="h-full md:hidden">
                    <Map center={[48.55, 12.376]} zoom={5}>
                        <MapTileLayer />
                        <MapMarker position={[51.347, 12.376]} />
                    </Map>
                </div>
                <div className="hidden h-full md:block">
                    <Map center={[49.927, 12.376]} zoom={5}>
                        <MapTileLayer />
                        <MapMarker position={[51.347, 12.376]} />
                    </Map>
                </div>
            </div>
        </Section>
    )
}
