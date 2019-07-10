export interface ConstructTs {
  code: number;
  message: string;
  data: {
    totalStores: number;
    totalAmount: number;
    storeTypeList: {
      storeTypeId: string;
      storeTypeName: string;
      stores: string;
      storePercent: string
    }
  }
}

export interface SaleTs {
  totalCourseSales: number;
  totalCourseAmount: number;
  courseOrderTypeList: SaleItemTs[]
}

export interface SaleItemTs {
  courseTypeId: string;
  courseTypeName: string;
  courseAmount: string;
  courseAmountPercent: string;
  courseOrdersPercent: string;
  courseOrders: string;
}