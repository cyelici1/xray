const express = require('express');
const app = express();
const { exec } = require('child_process');

// پورت را از متغیر محیطی Render می خواند (معمولاً 10000 به بالا، اما Xray باید 8080 را ببیند)
const PORT = process.env.PORT || 8080;

// 1. سرور HTTP برای فعال نگه داشتن سرویس
app.get('/', (req, res) => {
  res.send('VLESS/WS Proxy is Active!');
});

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`);
});

// 2. دانلود و اجرای هسته Xray
// از ورژن 1.8.6 استفاده شده.
exec('curl -L -o xray.zip https://github.com/XTLS/Xray-core/releases/download/v1.8.6/Xray-linux-64.zip && unzip -o xray.zip xray && rm xray.zip', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error downloading Xray: ${error.message}`);
        return;
    }
    console.log(`Xray downloaded. Output: ${stdout}`);
    
    // اجرای Xray با فایل پیکربندی config.json 
    exec('./xray -config config.json', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running Xray: ${error.message}`);
            return;
        }
        console.log(`Xray core started.`);
    });
});
