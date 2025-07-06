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
  data: T[];
  error?: string;
};

const fetchStockData = async <T> (params: FetchStockDataParams): Promise<FetchStockDataResponse<T>> => {
    const query = new URLSearchParams(params as Record<string, string>);
    const url = `https://api.finmindtrade.com/api/v4/data?${query.toString()}`;
    try {
        const res = await fetch(url, {
            cache: 'no-store',
        });
        
        if (!res.ok) {
            throw new Error('Failed to fetch stock data');
        }
        return res.json();
    } catch (error) {
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