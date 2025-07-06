import Link from 'next/link'
import { PageWrap } from '@/app/components/pageWrap/pageWrap'

export default function Home() {
  return (
    <PageWrap>
      <div className="
        relative h-64
        flex items-center justify-center
      
      ">
      <div className="absolute top-1/2 transform -translate-y-1/2">
        <p>台積電的頁面這裏喔: </p>
        <p><Link href="/analysis/2330/monthly-revenue">/analysis/2330/monthly-revenue</Link></p>
      </div>
    </div>
    </PageWrap>
  );
}
