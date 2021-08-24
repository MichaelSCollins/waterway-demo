import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MapStyle } from './models/map-style.model';
import { MarkerData } from './models/marker-data.model';
import { InfoBoxProperty } from './models/info-box-property.model';
import { WaterService } from './services/water.service';
import { MapData } from './models/map-data';
import { MapUtil } from './utils/MapUtil';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  // Map Options
  center: google.maps.LatLngLiteral = {
    lat: 38.2527,
    lng: -85.7585,
  };
  mapOptions: google.maps.MapOptions = {
    styles: MapStyle,
    mapTypeId: 'roadmap',
    streetViewControl: false,
    mapTypeControl: false,
    zoomControl: true,
    disableDoubleClickZoom: false,
    maxZoom: 18,
    minZoom: 8,
  };
  markerOptions: google.maps.MarkerOptions = {
    icon: '../assets/water-sym_32.png',
    // animation: google.maps.Animation.DROP
  }
  mapData: MapData;
  selectedSiteName: string;
  selectedSiteCode: string;
  markers: Array<MarkerData> = new Array<MarkerData>();
  infoBoxProperties: Map<string, InfoBoxProperty[]> = new Map<string, InfoBoxProperty[]>(); // Use this hash map to keep O(n) Complexity

  // View Data
  loading: Boolean = true;

  constructor(private waterService: WaterService) { }

  ngOnInit(): void {
    // Show Loading Screen
    this.loading = true;
    // Fetch Map Data For Both States
    this.waterService.getMapDataByState('ky').subscribe((kyData: MapData) => {
      this.waterService.getMapDataByState('in').subscribe((inData: MapData) => {
        const t = performance.now();
        // Combine Results
        this.mapData = MapUtil.mergeMapData(kyData, inData);
        console.log("Merge Results:", (performance.now() - t) + " milliseconds")
        // Show Google Map
        this.loading = false;
      })
    })
  }

  /**
   * Opens Info Window at marker with markerData
   * @param marker 
   * @param markerData 
   */
  openInfoWindow(marker: MapMarker, markerData: MarkerData): void {
    this.selectedSiteName = markerData.title;
    this.selectedSiteCode = markerData.id;
    this.infoWindow.open(marker);
  }
}
