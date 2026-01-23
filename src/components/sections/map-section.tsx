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
