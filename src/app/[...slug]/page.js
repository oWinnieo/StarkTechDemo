import { PageWrap } from '@/app/components/pageWrap/pageWrap'
import { AreaTitle } from "@/app/components/areaTitle/areaTitle";
import { AreaContent } from '@/app/components/areaContent/areaContent'
import { tipContent } from '@lib/dataConst/index';
import { fetchStockData } from '@lib/util/getData';
import { CompTip } from '@/app/components/compTip/compTip';
import { CompRevenue } from '@/app/components/compRevenue/compRevenue'
import CheckIconErrorOutline from '@mui/icons-material/ErrorOutline';
// import {
//     StockInfoItem,
// } from '@lib/dataConst/index';

// type PageSlugProps = {
//   params: {
//     slug: string[];
//   };
// };

export default async function PageSlug ({ params }) {
    const paramsArr = await params
    const slug = paramsArr.slug

    const [group, id, catg] = slug

    const token = process.env.TOKEN

    const stockInfo = await fetchStockData({
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
                    >
                        <CheckIconErrorOutline />
                    </CompTip>
                }
            </PageWrap>
        </div>
    )
}
