import {
    Map,
    MapMarker,
    MapTileLayer
} from "@/components/ui/map"
import { Section } from "../section"

export function MapSection() {
    return (
        <Section title="05 Location">
            <div className="h-48 overflow-hidden rounded-md border border-border">
                <Map center={[51.327, 12.374]} zoom={12}>
                    <MapTileLayer/>
                    <MapMarker position={[51.347, 12.374]}/>
                </Map>
            </div>
        </Section>
    )
}
