import { SourceInfo } from "./source-info.model";
export interface TimeSeries {
  siteCode: any;
  variable: any;
  name: string;
  sourceInfo: SourceInfo;
  values: {
    censorCode: any[];
    method: {
      methodDescription: string;
      methodID: number;
    }[];
    offset: any[];
    qualifier: {
      network: string;
      qualifierCode: string;
      qualifierDescription: string;
      qualifierID: number;
      vocabulary: string;
    }[];
    value: {
      dateTime: string;
      qualifiers: string[];
      value: string;
    }[];
  }[];
}
