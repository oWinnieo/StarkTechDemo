type FetchStockDataParams = {
    dataset: string;
    data_id?: string;
    start_date?: string;
    end_date?: string;
    token?: string;
};

type FetchStockDataResponse<T> = {
  msg: 'success' | 'fail';
  status: number;
//   data: DataItem[] | StockInfoItem[];
  data: T[]; // wtest check
  error?: string;
};

const fetchStockData = async <T> (params: FetchStockDataParams): Promise<FetchStockDataResponse<T>> => {
    const query = new URLSearchParams(params as Record<string, string>);
    const url = `https://api.finmindtrade.com/api/v4/data?${query.toString()}`;
    console.log('wtest url', url)
    try {
        const res = await fetch(url, {
            cache: 'no-store',
        });
        
        if (!res.ok) {
            throw new Error('Failed to fetch stock data');
        }
        console.log('res wtest', res)

        return res.json();
    } catch (error) {
        console.log('wtest err report', JSON.stringify(error))
        return {
            msg: 'fail',
            status: 500,
            data: [],
            error: String(error),
        };
    }
};

export {
    fetchStockData
}