// generate-php-env.js
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import { resolve } from 'path';

const GeneratePhpEnv = () => ({
  name: 'generate-php-env',
  configResolved(config) {
    const rootPath = resolve(process.cwd());
    
    const envFilePath = resolve(rootPath, 'env-config.php');

    // 如果是 production 環境
    if (process.env.NODE_ENV === 'production') {
      // 如果檔案存在，則刪除
      if (existsSync(envFilePath)) {
        unlinkSync(envFilePath);
        console.log(`Deleted: ${envFilePath}`);
      }
      return; // 結束此插件在 production 的執行
    }

    // 生成 env-config.php
    const phpContent = `<?php
$ENV = array(
  'NODE_ENV' => '${process.env.NODE_ENV}',
  // 添加其他需要的環境變數
);`
    writeFileSync(envFilePath, phpContent);
  }
});

export { GeneratePhpEnv };