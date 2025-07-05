import { PageWrap } from '@/app/components/pageWrap/pageWrap'
import { AreaTitle } from "@/app/components/areaTitle/areaTitle";
import { AreaContent } from '@/app/components/areaContent/areaContent'
import { tipContent } from '@lib/dataConst/index';
import { fetchStockData } from '@lib/util/getData';
import { CompTip } from '@/app/components/compTip/compTip';
import { CompRevenue } from '@/app/components/compRevenue/compRevenue'
// import {
//     StockInfoItem,
// } from '@lib/dataConst/index'; wtest

// type PageSlugProps = {
//   params: {
//     slug: string[];
//   };
// };

export default async function PageSlug ({ params }) {
    // : PageSlugProps wtest
    // @ts-expect-error 需要忽略類型錯誤，因為 Next.js 目前的 params 類型定義有問題
    const paramsArr = await params
    // @ts-expect-error 需要忽略類型錯誤，因為 Next.js 目前的 params 類型定義有問題
    const slug = paramsArr.slug
    // const slug = params.slug as string[];
    const [group, id, catg] = slug

    const token = process.env.TOKEN

    // wtest check
    // const fetchData = async () => {
    //     const res = 
    //     return res
    // }
    const stockInfo = await fetchStockData({ // wtest <StockInfoItem>
            dataset: 'TaiwanStockInfo',
            data_id: id,
            token: token
        });
    
    return (
        <div className="pageSlug">
            <PageWrap>
                {
                    stockInfo?.msg === 'success' && stockInfo?.status === 200 ?
                    <>
                        <AreaTitle
                            title={stockInfo ? `${stockInfo?.data?.[0]?.stock_name}(${id})` : 'loading'}
                        />
                        <AreaContent>
                            <CompRevenue
                                token={token}
                                id={id}
                                group={group}
                                catg={catg}
                                stockInfo={stockInfo}
                            />
                        </AreaContent>
                    </> :
                    <CompTip
                        tip={tipContent.getDataFailed}
                    />
                }
            </PageWrap>
        </div>
    )
}
