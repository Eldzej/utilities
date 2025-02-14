# utilities/printPdf
Simple PuppeteerJS script to print page as PDF.

* Enter page URL as command line param
  * ex. `node printA4.js https://localhost:5173/pdf`
  * Uses `https://localhost:5173/pdf` as fallback in case URL is not provided
* When using `printCustom.js`, you can set custom `width`/`height` as needed by providing them as parameters
  * ex. `node printA4.js 500 500 https://localhost:5173/pdf`
