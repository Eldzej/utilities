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
        path: 'printPdfDL.pdf',
        width: 794,
        height: 374,
        printBackground: true,
        displayHeaderFooter: false,
        scale: 1,
        landscape: false,
        pageRanges: ""
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

