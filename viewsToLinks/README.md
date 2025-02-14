# utilities/viewsToLinks
Script to generate HTML list of pages in your project
Enter the relative path to your project's pages folder as command line param
* (ex. `node viewsToLinks.js "../../my-example-project/src/pages"`)

You can add a third parameter to get all URLs prefixed with specific text (e.g. a address where the project lives)
* (ex. `node viewsToLinks.js "../../my-example-project/src/pages" "https://my.example.com/"`)
* uses `/` as default
