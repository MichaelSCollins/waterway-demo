import { InfoBoxProperty } from "../models/info-box-property.model";
import { MarkerData } from "../models/marker-data.model";
import { TimeSeries } from "../models/time-series.model";
import { MapData } from "../models/map-data";

export class MapUtil {
    /**
     * Creates MapData from USGS Time Series Data
     * @param timeSeries 
     * USGS Time Series to be converted.
     * @returns
     * MapData
     */
    static createMapData(timeSeries: Array<TimeSeries>): MapData {
        const mapData: MapData = {
            markers: [],
            infoBoxProperties: new Map<string, InfoBoxProperty[]>()
        }
        const t = performance.now();
        timeSeries.forEach(ts => {
            // Get most recent site code
            const siteCode = ts.sourceInfo.siteCode[0]?.value;
            // If site code hasn't been used add marker 
            if (!mapData.infoBoxProperties.get(siteCode)) {
                const marker: MarkerData = {
                    position: new google.maps.LatLng(
                        ts.sourceInfo.geoLocation.geogLocation.latitude,
                        ts.sourceInfo.geoLocation.geogLocation.longitude
                    ),
                    title: ts.sourceInfo.siteName,
                    id: siteCode
                }
                // Add site marker
                mapData.markers.push(marker);
                // initialize InfoBoxProperty array at site code in hashmap
                mapData.infoBoxProperties.set(siteCode, []);
            }

            // Create InfoBoxProperty from TimeSeries
            const infoBoxProperty: InfoBoxProperty = {
                name: ts.variable.variableName.replace("&#179;", "³"), // Fix USGS Formatting
                value: ts.values[0]?.value[0]?.value // Get Most Recent Value
            }

            // Add info box property to the hashmap by site code
            const prevProps = mapData.infoBoxProperties.get(siteCode);
            mapData.infoBoxProperties.set(siteCode, [...prevProps, infoBoxProperty]);
        })
        console.log("Post Processing(" + timeSeries.length + "): " + (performance.now()-t) + " milliseconds.")
        return mapData;
    }

    /**
     * Merges two MapData objects
     * @param a 
     * @param b 
     * @returns Merged MapData
     */
    static mergeMapData(a: MapData, b: MapData): MapData {
        return {
            markers: a.markers.concat(b.markers),
            infoBoxProperties: new Map([...Array.from(a.infoBoxProperties.entries()), ...Array.from(b.infoBoxProperties.entries())])
        }
    }
}