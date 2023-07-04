const puppeteer = require('puppeteer');

async function startBrowser() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    return {browser, page};
}

async function closeBrowser(browser) {
    return browser.close();
}

async function html2pdf(url, width, height) {
    const {browser, page} = await startBrowser();
    await page.goto(url, {
        waitUntil: 'networkidle0'
    });
    await page.pdf({
        path: `printPdfCustom_${width}_${height}.pdf`,
        width: width,
        height: height,
        printBackground: true,
        displayHeaderFooter: false,
        scale: 1,
        landscape: false,
        pageRanges: ""
    });
}

(async () => {
    const url = process.argv.slice(2)[0];
    let width = process.argv.slice(2)[1];
    let height = process.argv.slice(2)[2];

    if (typeof width === 'undefined') {
        width = 1
    }

    if (typeof height === 'undefined') {
        height = 1
    }

    if(url.length > 0) {
        await html2pdf(url, width, height);
    } else {
        await html2pdf('https://localhost:5173/pdf', width, height);
    }

    process.exit(1);
})();

