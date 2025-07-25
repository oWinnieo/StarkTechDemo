'use client'
import React, { useEffect, useState, useMemo, useCallback, SyntheticEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
    TextField,
    Autocomplete,
    CircularProgress,
    InputAdornment,
} from '@mui/material';
import {
    CompAlertAutoDismiss
} from '@/app/components/compAlertAutoDismiss/compAlertAutoDismiss'
import SearchIcon from '@mui/icons-material/Search';
import { fetchStockData } from '@lib/util/getData';
import { StockInfoItem, tipContent, FetchDataParams } from '@lib/dataConst/index';
import debounce from 'lodash.debounce';
import { useStore, SearchState } from '@store/useStore';
import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

import './compSearchBar.scss'

type SearchBarProps = {
  token: string | undefined;
};

export const CompSearchBar: React.FC<SearchBarProps> = ({ token }) => {
    const theme = useTheme();
    const router = useRouter();
    const urlGroup = useStore((state: SearchState) => state.group);
    const urlCatg = useStore((state: SearchState) => state.catg);
    const [loading, setLoading] = useState(false);
    const [valueSearch, setValueSearch] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [tipForOptions, setTipForOptions] = useState('')
    const [stockInfo, setStockInfo] = useState<StockInfoItem[] | null>(null)
    const fetchData = useCallback(async ({ id }: FetchDataParams = {}): Promise<void> => {
        setLoading(true)
        setTipForOptions('')

        const res = await fetchStockData<StockInfoItem>({
            dataset: 'TaiwanStockInfo',
            ...(id ? { data_id: id } : {}),
            token: token
        });
        setLoading(false)
        if (res.msg === 'success' && res.status === 200) {
            setStockInfo([
                ...res.data.slice(0, 30)
            ])
        } else {
            setTipForOptions(res.error ? res.error : '')
            setStockInfo([])
        }
    }, [
        token
    ])
    
    const onFocusSearchBar = () => {
        fetchData({id: valueSearch})
    }
    const debouncedChange = useMemo(() => 
        debounce((val: string) => {
            setValueSearch(val);
        }, 300)
    , []);

    const debouncedFetch = useMemo(() => debounce((keyword: string) => {
        fetchData({ id: keyword });
    }, 300), [fetchData]);
    const onChangeSearchInput = (event: SyntheticEvent, newValue: string) => {
        setInputValue(newValue);
        debouncedFetch(newValue);
    };

    const onSelectOption = (event: SyntheticEvent, selectedValue: string | null) => {
        setLoading(true)
        if (!selectedValue) return;
        const stockId = selectedValue.split(' - ')[0];
        if (stockId) {
            router.push(`/${urlGroup}/${stockId}/${urlCatg}`);
        }
    };

    useEffect(() => {
        if (!valueSearch) return
        fetchData({id: valueSearch})
    }, [valueSearch, fetchData])
    useEffect(() => {
        return () => {
            debouncedChange.cancel();
        };
    }, [debouncedChange]);
    useEffect(() => {
        setLoading(false)
    }, [])
    const StyledOption = styled('li')(({ theme }) => {
        return ({
            padding: '8px 12px',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f0f0f0',
            },
        })
    });
    return (
        <div className="compSearchBar">
            
            <Autocomplete
                freeSolo
                fullWidth
                options={(stockInfo ?? []).map(v => `${v.stock_id} - ${v.stock_name}`)}
                inputValue={inputValue}
                onInputChange={onChangeSearchInput} 
                onChange={onSelectOption}
                loading={loading}
                onFocus={onFocusSearchBar}
                noOptionsText={loading ?
                    tipContent.loading :
                    (tipForOptions ? tipForOptions : tipContent.noData)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder="輸入台/美股代號,查看公司價值"
                        size="small"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                            <>
                                {loading ? (
                                <CircularProgress color="inherit" size={20} />
                                ) : (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                                )}
                                {params.InputProps.endAdornment}
                            </>
                            ),
                        }}
                        sx={{
                            '& .MuiInputBase-root': {
                            backgroundColor: theme && theme.palette && theme?.palette?.mode === 'dark' ? '#2c2c2c' : '#fff',
                            padding: '4px 8px',
                            height: '2.5em',
                            },
                        }}
                    />
                )}
                renderOption={(props, option, { index }) => {
                    const [stockId, stockName] = option.split(' - ')
                    return (
                        <StyledOption
                            {...props}
                            className='autocomplete-option'
                            key={`option-${index}`}
                        >
                            <span key={`option-${index}-id`} className="focus">{stockId}</span>
                            <span key={`option-${index}-name`}>{stockName}</span>
                        </StyledOption>
                    )
                }}
            />
            {
                tipForOptions && <CompAlertAutoDismiss message={tipForOptions} severity="error" duration={3000} />
            }
        </div>
    )
}