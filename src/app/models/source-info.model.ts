export interface SourceInfo {
    geoLocation: {
      geogLocation: {
        latitude: number;
        longitude: number;
        srs: string;
      };
    };
    siteName: string;
    siteProperty: {
      value: string;
      name: string;
    }[];
    siteType: any[];
    siteCode: any[]
};
