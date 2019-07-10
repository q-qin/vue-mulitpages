export interface Storecitys {
  groupCode: string;
  checked: boolean;
  groupList: {
    checked: boolean;
    regionId: number;
    stores: string;
    regionName: string;
    regionNamePY: string;
  }[];
}

export interface Cityschild {
  checked: boolean;
  regionId: number;
  stores: string;
  regionName: string;
  regionNamePY: string;
}

export interface Areacitys {
  storeId: number;
  storeName: string;
}
