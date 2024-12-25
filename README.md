# Vite 主題 - unocss
跟據 `_s`, or `underscores`，進行擴充的主題，提供 vite 相關功能進行開發。 
主題參考來源: https://underscores.me/

## Node.js 版本
  - 專案的 Node.js 版本需為 v16 以上
  - 查看自己版本指令：`node -v`


## 指令列表
- `npm install` - 初次下載該範例專案後，需要使用 npm install 來安裝套件
- `npm run dev` - 執行開發模式
  - 運行後，即可開啟處於開發模式 wordpress 的本機網址
- `npm run build` - 執行編譯模式（css 不會最小化處理）
- `npm run bundle` - 執行編譯模式 （css 會進行最小化處理）

## 資料夾結構
  - assets # 靜態資源放置處
    - scss # SCSS 的樣式放置處
    - js # JavaScript 程式碼放置處

  - inc 
    - vite-setting.php # vite 相關設定

  - js 
    - generate-php-env.js # vite 環境變數處理

  - src
    - vite.entry.js # vite 開發模式 js 進入點
    - main.js # vite 主要 js 進入點
    
  - uno.config.ts # unocss 設定檔
  
  - vite.config.js # vite 設定檔

### 注意事項
- .gitignore 檔案是用來忽略掉不該上傳到 GitHub 的檔案（例如 node_modules），請不要移除 .gitignore

## 開發模式的監聽
vite 專案執行開發模式 `npm run dev` 後即會自動監聽，不需要使用 `Live Sass Compiler` 的 `Watch SCSS` 功能