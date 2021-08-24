import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { TimeSeries } from '../models/time-series.model';
import { Observable } from 'rxjs';
import { MapData } from '../models/map-data';
import { map } from 'rxjs/operators';
import { MapUtil } from '../utils/MapUtil';
@Injectable({
  providedIn: 'root',
})
export class WaterService {
  constructor(private http: HttpClient) { }
  /**
   * Queries map data from USGS
   * @param state 
   * State (Location) to query data
   * @returns 
   * MapData
   */
  getMapDataByState(state): Observable<MapData> {
    const url = environment.usgsApi + '?format=json&stateCd=' + state + '&parameterCd=00060,00065&siteStatus=all';
    const t = performance.now();
    return this.http.get<TimeSeries[]>(url)
      .pipe(map((res: any) => {
        console.log(url + ": " + (performance.now() - t) + " milliseconds.");
        return MapUtil.createMapData(res.value.timeSeries);
      }));
  }
}
