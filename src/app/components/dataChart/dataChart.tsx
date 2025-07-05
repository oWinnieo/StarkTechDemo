'use client'
import React, { useRef, useEffect, useCallback } from 'react';
import { StockInfoResponse, EnhancedDataItem } from '@lib/dataConst/index'
import { formatToThousandsWithCommas } from '@lib/util/formatter';
import * as echarts from 'echarts';
import { useTheme } from '@mui/material';
import './dataChart.scss'

type DataChartProps = {
    data: EnhancedDataItem[] | null;
    year: number;
    stockInfo: StockInfoResponse;
};

type TooltipParam = {
  seriesName: string;
  data: number;
  axisValue: string;
};

export const DataChart: React.FC<DataChartProps> = ({ data, stockInfo }) => {
    const theme = useTheme();
    const chartRef = useRef<HTMLDivElement>(null);
    
    const dataBar = data && data.map(v => v.revenue)
    const dataLine = data && data.map(v => v.revenueMonthGrowthRageByYear)

    const dataXAxis = data && data.map(v => `${v.revenue_year}/${v.revenue_month}`)
    const tip1 = '每月營收（千元）'
    const tip2 = '年增率（%）'
    const colorTxtDark = '#ccc'
    const colorTxtLight = '#333'
    const chartDraw = useCallback(
        () => {
            if (chartRef.current && data) {
                const chartInstance = echarts.init(chartRef.current);
                chartInstance.setOption({
                    title: {
                        text: stockInfo ? `${stockInfo.data[0].stock_name}(${stockInfo.data[0].stock_id})` : '',
                        textStyle: {
                            color: theme && theme.palette && theme?.palette?.mode === 'dark' ? colorTxtDark : colorTxtLight,
                            fontSize: 18,
                            fontWeight: 'bold',
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                        },
                        formatter: function (params: TooltipParam[]) { // wtest check
                            const date = params[0].axisValue; // x軸的值，如 '2024/1'
                            const revenue = params.find(p => p.seriesName === tip1)?.data ?? 0;
                            const growth = params.find(p => p.seriesName === tip2)?.data ?? 0;

                            const revenueFormatted = formatToThousandsWithCommas(revenue) + ' 千元';
                            const growthFormatted = `${growth}%`;

                            return `${date}<br/>
                            營收：${revenueFormatted}<br/>
                            年增率：${growthFormatted}`;
                        },
                    },
                    legend: {
                        top: 30,
                        data: [tip1, tip2],
                        // const isDark = theme.palette.mode === 'dark';
                        textStyle: {
                            color: theme && theme.palette && theme?.palette?.mode === 'dark' ? colorTxtDark : colorTxtLight,
                            fontSize: 16,
                        },
                    },
                    xAxis: { 
                        type: 'category',
                        data: dataXAxis
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '每月營收',
                            position: 'left',
                            axisLabel: {
                                formatter: (val: number) => `${(val / 1000).toLocaleString()}`, // 轉為千元
                                // revenueMonthThisYear
                            },
                        },
                        {
                            type: 'value',
                            name: '年增率',
                            position: 'right',
                            axisLabel: {
                                formatter: '{value} %', // 显示百分号
                            },
                        },
                    ],
                    series: [
                        {
                            name: tip1,
                            type: 'bar',
                            data: dataBar,
                            yAxisIndex: 0,
                        },
                        {
                            name: tip2,
                            type: 'line',
                            data: dataLine,
                            yAxisIndex: 1,
                        },
                    ],
                });
                // 组件卸载时销毁实例
                return () => chartInstance.dispose();
            }
        },
        [data, chartRef, dataBar, dataLine, dataXAxis, stockInfo, theme]
    )
    useEffect(() => {
        chartDraw()
    }, [data, chartDraw]); // wtest check 110:8  Warning: React Hook useEffect has a missing dependency: 'chartDraw'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
    useEffect(() => {
        chartDraw()
    }, [theme.palette.mode, chartDraw]);
    if (!data) return false
    // return ;

    return (
        <div className="dataChart">
            <div ref={chartRef} style={{ width: '100%', height: 400 }} />
        </div>
    )
    
}
