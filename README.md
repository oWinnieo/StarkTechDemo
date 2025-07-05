## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## 細節的說明

本地測試過程中,
1.在頂部search框,點擊輸入框會觸發獲取股票列表,由於有幾千條,暫時設置獲取前30條顯示
2.在頂部search框等幾個調用接口的地方, 調用頻繁的時候, 會出現402報錯, 猜測可能是因為時免費會員的token的緣故,因此設置了簡單的報錯tip, 比如: 在輸入框的下方一點會出現tip提示數據獲取錯誤信息等
3.token放於環境變量中
4.技術棧用到:
    a) Next 15.3.4
    b) Typescript
    c) Mui (做了簡單的 dark和light主題切換)
    d) Zustand
    e) Sass
    f) lodash
    g) eChart
    h) dayjs
5.目前完成的部分是:https://www.figma.com/design/nBCCS3g1xFDJnFShBBuVZB/Stark-Tech%E5%89%8D%E7%AB%AF%E8%A9%95%E6%B8%AC--%E7%B0%A1%E7%89%88-?node-id=0-1&p=f
這個頁面中列出的功能點
    a) 現在頁面的股票
    b) 數據圖表
    c) 數據表格
    d) 切換股票的下拉選單
6.補充:
    a) 接口的疑問:
        1) 搜2330會搜索出兩個名字都是 台積電 的股票, 但分類不同, 暫不確定更具邏輯, 暫時沒做顯示的去重
        2) 搜5450會搜出兩個名字不同的股票,一個寶聯通,一個南良
