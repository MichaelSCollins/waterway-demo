import { InfoBoxProperty } from "./info-box-property.model";
import { MarkerData } from "./marker-data.model";

export interface MapData {
  markers: Array<MarkerData>,
  infoBoxProperties: Map<string, Array<InfoBoxProperty>>
}