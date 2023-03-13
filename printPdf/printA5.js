const puppeteer = require('puppeteer');

async function startBrowser() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    return {browser, page};
}

async function closeBrowser(browser) {
    return browser.close();
}

async function html2pdf(url) {
    const {browser, page} = await startBrowser();
    await page.goto(url, {
        waitUntil: 'networkidle0'
    });
    await page.pdf({
        path: 'printPdfA5.pdf',
        width: 559,
        height: 794,
        deviceScaleFactor: 3.125,
        printBackground: true,
        scale: 1,
        landscape: false,
        pageRanges: "1"
    });
}

(async () => {
    const url = process.argv.slice(2)[0];

    if(url.length > 0) {
        await html2pdf(url);
    } else {
        await html2pdf('https://localhost:5173/pdf');
    }

    process.exit(1);
})();
