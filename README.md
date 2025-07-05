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

## 🔍 細節的說明

### ✅ 本地測試過程中：

1. 在頂部 `Search` 框，點擊輸入框會觸發獲取股票列表。  
   > 由於列表有數千條，**目前僅取前 30 條顯示**，避免卡頓與頻繁請求。

2. 在 `Search` 框等幾個調用 API 的地方，請求過於頻繁時會出現 `402` 錯誤。  
   > 推測原因為使用免費會員的 Token 限制。  
   > 已設置簡單的報錯提示（Tip），例如：輸入框下方會顯示「資料獲取錯誤」。

3. Token 設置在 **環境變量中**，透過 `process.env.TOKEN` 調用。

---

### 🛠️ 技術棧

- Next.js `15.3.4`
- TypeScript
- **MUI**（實作簡單的 `Dark / Light` 主題切換）
- Zustand（狀態管理）
- Sass（CSS 預處理器）
- Lodash（使用 `lodash.debounce`）
- **ECharts**（繪製數據圖表）
- Day.js（處理時間格式）

---

### 📌 完成頁面功能

對照 Figma 設計稿 ➜  
[🔗 Figma 設計稿連結（簡版）](https://www.figma.com/design/nBCCS3g1xFDJnFShBBuVZB/Stark-Tech%E5%89%8D%E7%AB%AF%E8%A9%95%E6%B8%AC--%E7%B0%A1%E7%89%88-?node-id=0-1&p=f)

目前已實作以下功能模組：

- ✅ 現在頁面顯示的股票資料
- ✅ 數據圖表（ECharts）
- ✅ 數據表格
- ✅ 股票切換下拉選單（Autocomplete）

---

### 🧩 補充：API 資料行為

#### 1. 搜尋結果重複（例：2330）
- 搜索 `2330`，會出現兩筆名稱同為「台積電」的股票，但 `industry_category` 不同。
- 目前尚未做顯示層的去重處理。

#### 2. 搜尋結果名稱不一致（例：5450）
- 搜索 `5450`，會出現兩筆股票：一個為「寶聯通」，一個為「南良」。
- 推測可能是歷史資料異動或同代號但不同市場分類。

#### 3. 下拉框點擊搜到的某一條紀錄,跳轉速度本地看跟網絡速度有關,待更多測試看看

#### 4. [...slug]/page.js, 這個文件因為有個報錯暫時找不到解決方案就先改為js,
```bash
    報錯內容:
    Type error: Type 'PageSlugProps' does not satisfy the constraint 'PageProps'.
    Types of property 'params' are incompatible.
    Type '{ slug: string[]; }' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]
```
