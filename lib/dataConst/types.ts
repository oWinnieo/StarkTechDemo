import { Dayjs } from 'dayjs';

export interface StockInfoItem {
  industry_category: string;
  stock_id: string;
  stock_name: string;
  type: string;
  date: string;
}

export type DataItem = {
    country: string;
    date: string;
    revenue: number;
    revenue_month: number;
    revenue_year: number;
    stock_id: string;
};

export interface StockInfoResponse {
  msg: string;
  status: number;
  data: StockInfoItem[];
}

// export interface DataItem {
//   country: string;
//   date: string;
//   revenue: number;
//   revenue_month: number;
//   revenue_year: number;
//   stock_id: string;
// }

// export interface EnhancedDataItem extends DataItem {
//   revenueMonthThisYear: string;  // formatToThousandsWithCommas 返回字符串
//   revenueMonthGrowthRageByYear: number;
// }

export type ApiResponse = {
  status: number;
  msg: string;
  data: EnhancedDataItem[];
};

export type GetDateParams = {
  date: Dayjs | null;
};

export type DateValidParams = {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
};

export type FetchDataParams = {
  id?: string; // 可為 string，也可以不傳（undefined）
};




export type EnhancedDataItem = DataItem & {
    revenueMonthThisYear?: string;
    revenueMonthGrowthRageByYear?: number;
};


export type paletteItem = {
    mode: 'light' | 'dark';
}

export type ThemeItem = {
    palette?: paletteItem
}

export type TableRowItem = {
  label: string;
  values: (number | string)[];
};

export type TableCellContentProps = {
  row: TableRowItem;
  theme?:  ThemeItem | null;
};
