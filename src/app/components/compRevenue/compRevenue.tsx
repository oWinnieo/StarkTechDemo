'use client'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { formatToThousandsWithCommas } from '@lib/util/formatter';
import { fetchStockData } from '@lib/util/getData';
import { BasicDatePicker } from '@/app/components/compDatePicker/compDatePicker'
import { DataChart } from '@/app/components/dataChart/dataChart'
import { DataTable } from '@/app/components/dataTable/dataTable'
import { CompTip } from '@/app/components/compTip/compTip';
import { tipContent } from '@lib/dataConst/index';
import {
    StockInfoResponse,
    DataItem,
    EnhancedDataItem,
    ApiResponse,
    GetDateParams,
    DateValidParams
} from '@lib/dataConst/index';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/CheckCircle';
import dayjs, { Dayjs } from 'dayjs';
import CircularProgress from '@mui/material/CircularProgress';
import CheckIconErrorOutline from '@mui/icons-material/ErrorOutline';
import { useStore, SearchState } from '@store/useStore';
import './compRevenue.scss'

type CompRevenueProps = {
  token?: string;
  id: string;
  group: string;
  catg: string;
  stockInfo: StockInfoResponse
}

export const CompRevenue: React.FC<CompRevenueProps> = ({ token, id, group, catg, stockInfo }) => {
    const setGroup = useStore((state: SearchState) => state.setGroup);
    const setCatg = useStore((state: SearchState) => state.setCatg);
    const startDateDefault = dayjs('2024-01-01')
    const endDateDefault = dayjs('2024-12-31')
    const startDateDefaultLastYear = startDateDefault.subtract(1, 'year');
    const endDateDefaultLastYear = endDateDefault.subtract(1, 'year');
    
    const [startDate, setStartDate] = useState<Dayjs | null>(startDateDefault);
    const [endDate, setEndDate] = useState<Dayjs | null>(endDateDefault)
    const [startDateLastYear, setStartDateLastYear] = useState<Dayjs | null>(startDateDefaultLastYear)
    const [endDateLastYear, setEndDateLastYear] = useState<Dayjs | null>(endDateDefaultLastYear)
    const [tipDate, setTipDate] = useState('')

    const [dataThisYear, setDataThisYear] = useState<ApiResponse | null>(null)
    const [dataLastYear, setDataLastYear] = useState<ApiResponse | null>(null)
    const [data, setData] = React.useState<EnhancedDataItem[] | null>(null);
    const [loading, setLoading] = useState(true)
    const [loaded, setLoaded] = useState(false)
    const [tipDataFailed, setTipDataFailed] = useState('')

    const setTipContent = () => {
        return loading ? tipContent.loading :
        (
            tipDataFailed === '' ?
            tipContent.noData : tipContent.getDataFailed
        )
    }
    const getDateStart = ({ date }: GetDateParams): void => {
        setStartDate(date)
    }
    const getDateEnd = ({ date }: GetDateParams): void => {
        setEndDate(date)
    }

    const dateValidation = ({ startDate, endDate }: DateValidParams): void => {
        if (!startDate || !endDate || startDate > endDate) {
            setTipDate('Start date must be less than end date')
        } else {
            setTipDate('')
            setStartDateLastYear(startDate.subtract(1, 'year'))
            setEndDateLastYear(endDate.subtract(1, 'year'))
        }
    }

    
    useEffect(() => {
        if (loaded && dataThisYear?.data && dataLastYear?.data) {
            const dataModify: EnhancedDataItem[] = dataThisYear.data.map((v: DataItem, index: number) => {
                return ({
                revenueMonthThisYear: formatToThousandsWithCommas(v.revenue),
                revenueMonthGrowthRageByYear: dataLastYear.data[index] && dataLastYear.data[index]?.revenue !== 0 ? (
                    Math.round(
  ((v.revenue - dataLastYear.data[index].revenue) / dataLastYear.data[index].revenue) * 10000
) / 100
                ) : 100,
                ...v,
            })
        });
            setData(dataModify)
        }
    }, [loaded, dataThisYear, dataLastYear])
    useEffect(() => {
        dateValidation({ startDate, endDate })
    }, [startDate, endDate])
    const fetchData = useCallback(async () => {
        setLoading(true)

        const resThisYear = await fetchStockData<DataItem>({
            dataset: 'TaiwanStockMonthRevenue',
            data_id: id,
            start_date: startDate?.format('YYYY-MM-DD'),
            end_date: endDate?.format('YYYY-MM-DD'),
            token: token
        });
        setDataThisYear(resThisYear)

        const resLastYear = await fetchStockData<DataItem>({
            dataset: 'TaiwanStockMonthRevenue',
            data_id: id,
            start_date: startDateLastYear?.format('YYYY-MM-DD'),
            end_date: endDateLastYear?.format('YYYY-MM-DD'),
            token: token
        });
        setDataLastYear(resLastYear)
        setLoading(false)
        
        if (resThisYear.status === 200 && resThisYear.msg === 'success'
        && resLastYear.status === 200 && resLastYear.msg === 'success') {
            setLoaded(true)
            setTipDataFailed('')
        } else {
            setTipDataFailed(tipContent.getDataFailed)
            setData([])
        }
    }, [
        id, startDate, endDate, startDateLastYear, endDateLastYear, token, setDataThisYear, setDataLastYear, setLoaded, setTipDataFailed, setData
    ])
    useEffect(() => {
        fetchData()
    }, [startDateLastYear, endDateLastYear, fetchData])
    const memoizedData = useMemo(() => {
        if (!data) return null;
        return data;
    }, [data]);
    useEffect(() => {
        fetchData()
        setGroup(group)
        setCatg(catg)
    }, [fetchData, group, catg, setGroup, setCatg])

    return (
        <div className="compRevenue">
            <div className="areaDate">
                <div className="areaPicker">
                    <BasicDatePicker
                        name="開始日期"
                        date={startDate}
                        getDate={getDateStart}
                    />
                    <BasicDatePicker
                        name="結束日期"
                        date={endDate}
                        getDate={getDateEnd}
                    />
                </div>
                {
                    tipDate && <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
                        {tipDate}
                    </Alert>
                }
            </div>
            {
                loading ? 
                <CompTip
                        tip={setTipContent()}
                >
                    <CircularProgress color="inherit" />
                </CompTip> :
                (
                    loaded && memoizedData && memoizedData?.length > 0 ?
                    (
                        <>
                            <DataChart
                                data={memoizedData}
                                year={2024}
                                stockInfo={stockInfo}
                            />
                            <DataTable
                                data={memoizedData}
                            />
                        </>
                    ) : <CompTip
                        tip={setTipContent()}
                    >
                        <CheckIconErrorOutline />
                    </CompTip>
                )
            }
        </div>
    )
}