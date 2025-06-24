const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  try {
    console.log('🚀 Starting PDF export...');
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Đường dẫn tuyệt đối tới file index.html
    const filePath = 'file://' + path.resolve(__dirname, 'index.html');
    console.log('📄 Loading HTML from:', filePath);
    
    await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Đợi fonts load xong
    await page.evaluateHandle('document.fonts.ready');
    
    // Xuất PDF không có margin vì HTML đã có padding 0.7in rồi
    await page.pdf({
      path: 'PhanHongDat_Harvard_CV.pdf',
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: false
    });

    await browser.close();
    console.log('✅ Xuất PDF thành công! File: PhanHongDat_Harvard_CV.pdf');
    
  } catch (error) {
    console.error('❌ Lỗi khi xuất PDF:', error.message);
    process.exit(1);
  }
})(); 