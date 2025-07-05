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
    // grid place-items-center
    // flex items-center justify-center
    // grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]
    
  );
}
