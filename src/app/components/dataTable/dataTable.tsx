'use client'
import React, { useEffect, useRef } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material';
import dayjs from 'dayjs';
import {
    EnhancedDataItem,
    ThemeItem,
    TableRowItem,
    TableCellContentProps
} from '@lib/dataConst/index'
import './dataTable.scss'

type DataChartProps = {
    data: EnhancedDataItem[] | null;
    theme?: ThemeItem | null;
};

function createData(label: string, ...values: number[] | string[]): TableRowItem {
    return { label, values };
}

const TableCellTitle: React.FC<DataChartProps> = ({ data, theme }) => {
    if (!data) return false
    return (
        <>
            <TableCell
                sx={{
                    position: 'sticky',
                    left: 0,
                    backgroundColor: theme && theme.palette && theme?.palette?.mode === 'dark' ? '#2c2c2c' : '#fff',
                    zIndex: 2,
                    minWidth: 200,
                    maxWidth: 200,
                }}
            >年度月份</TableCell>
            {
                data.map((v, index) => {
                    return (
                        <TableCell key={`tableCell-${index}`} align="right">{dayjs(v.date).subtract(1, 'M').format('YYYYMM')}</TableCell>
                    )
                })
            }
        </>
    )
}

const TableCellContent: React.FC<TableCellContentProps> = ({ row, theme }) => {
    return (
        <>
            <TableCell
                sx={{
                    position: 'sticky',
                    left: 0,
                    backgroundColor: theme && theme.palette && theme?.palette?.mode === 'dark' ? '#2c2c2c' : '#fff',
                    zIndex: 2,
                    minWidth: 200,
                    maxWidth: 200,
                }}
                component="th" scope="row">{row.label}</TableCell>
            {row.values.map((v: number | string, i: number) => <TableCell key={i}>{v}</TableCell>)}
        </>
    )
}

export const DataTable: React.FC<DataChartProps> = ({ data }) => {
    const theme = useTheme();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
    }, [data]);

    const dataRevenueMonthThisYear = data && data.map(v => v.revenueMonthThisYear)
    const dataRevenueMonthGrowthRageByYear = data && data.map(v => v.revenueMonthGrowthRageByYear)
    const rows: TableRowItem[] = [
        createData('每月營收', ...((dataRevenueMonthThisYear ?? []).filter((v): v is string => v !== undefined))),
        createData('單月營收年增率(%)', ...((dataRevenueMonthGrowthRageByYear ?? []).filter((v): v is number => v !== undefined))),
    ];
    return (
        <div className="dataTable">
            <div className="areaTable">
                <TableContainer component={Paper} ref={scrollRef}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCellTitle
                                data={data}
                                theme={theme}
                            />
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.label}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCellContent
                                    row={row}
                                    theme={theme}
                                />
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className='areaTip'>
                <p>圖表單位:千元,數據來自公開資訊觀測站</p>
                <p>網頁圖表歡迎轉貼引用,請註明出處為財報狗</p>
            </div>
        </div>
            
  );
}
