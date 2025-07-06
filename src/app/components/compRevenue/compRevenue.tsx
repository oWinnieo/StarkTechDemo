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
    const endDateDefault = dayjs()
    const startDateDefault = endDateDefault.subtract(11, 'M')
    
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
    type CalcRevenueParams = {
        index: number,
        dataThisYear: ApiResponse,
        dataLastYear?: ApiResponse
    }
    const calcRevenueMonthGrowthRageByYear = ({ index, dataThisYear, dataLastYear }: CalcRevenueParams) => {
        let result
        if (dataThisYear.data?.[index] && dataLastYear?.data?.[index]
            && dataThisYear.data?.[index].revenue !== 0
            && dataLastYear.data?.[index].revenue !== 0) {
            result = Math.round(
                ((dataThisYear.data[index].revenue - dataLastYear.data[index].revenue) / dataLastYear.data[index].revenue) * 10000
            ) / 100
        } else if (dataThisYear.data?.[index]?.revenue === 0 && dataLastYear?.data?.[index]?.revenue === 0) {
            result = 0
        } else if (dataThisYear.data?.[index]?.revenue === 0) {
            result = -100
        } else if (dataLastYear?.data?.[index]?.revenue === 0) {
            result = 100
        } else if (!dataThisYear.data?.[index]) {
            result = '無'
        } else {
            result = 100
        }
        return result
    }
    const calcRevenueMonthThisYear = ({ index, dataThisYear }: CalcRevenueParams) => {
        let result
        if (dataThisYear.data[index]?.revenue) {
            result = formatToThousandsWithCommas(dataThisYear.data[index].revenue)
        } else if (dataThisYear.data[index]?.revenue === 0) {
            result = 0
        } else {
            result = '無'
        }
        return result
    }

    
    
    useEffect(() => {
        dateValidation({ startDate, endDate })
    }, [startDate, endDate])
    const fetchData = useCallback(async () => {
        setLoading(true)

        const resThisYear = await fetchStockData<DataItem>({
            dataset: 'TaiwanStockMonthRevenue',
            data_id: id,
            start_date: startDate?.add(1, 'M')?.format('YYYY-MM-DD'),
            end_date: endDate?.add(1, 'M')?.format('YYYY-MM-DD'),
            token: token
        });
        setDataThisYear(resThisYear)

        const resLastYear = await fetchStockData<DataItem>({
            dataset: 'TaiwanStockMonthRevenue',
            data_id: id,
            start_date: startDateLastYear?.add(1, 'M').format('YYYY-MM-DD'),
            end_date: endDateLastYear?.add(1, 'M').format('YYYY-MM-DD'),
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
        if (loaded && dataThisYear?.data && dataLastYear?.data) {
            const dataModify: EnhancedDataItem[] = dataLastYear.data.map((v: DataItem, index: number) => {
                return ({
                revenueMonthThisYear: calcRevenueMonthThisYear({ index, dataThisYear }),
                revenueMonthGrowthRageByYear: calcRevenueMonthGrowthRageByYear({ index, dataThisYear, dataLastYear }),
                ...dataThisYear.data[index],
                revenue_year: dataThisYear.data[index]?.revenue_year ? dataThisYear.data[index].revenue_year : dataLastYear.data[index].revenue_year + 1,
                revenue_month: dataThisYear.data[index]?.revenue_month ? dataThisYear.data[index]?.revenue_month : dataLastYear.data[index]?.revenue_month,
                date: dataThisYear.data[index]?.date ?
                    dataThisYear.data[index]?.date :
                    `${dataLastYear.data[index].revenue_year + 1}-${dataLastYear.data[index]?.revenue_month < 9 ?
                        ('0' + (dataLastYear.data[index]?.revenue_month + 1)) :
                        (dataLastYear.data[index]?.revenue_month + 1)
                    }-01`
            })
        });
        
            setData(dataModify)
        }
    }, [loaded, dataThisYear, dataLastYear])
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