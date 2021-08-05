# Themisto
Hi there! This is Themisto, a NodeJs service developed in Typescript that uses [Puppeteer](https://www.npmjs.com/package/puppeteer/v/1.11.0-next.1547527073587) to perform web crawling.

Themisto has only one endpoint to be able to ask you to perform a search, but BEWARE, you have to be authenticated.

## How to ask Themisto to search
To perform a search, it is as simple as making a POST request to https://themisto-sirena.herokuapp.com/api/job with a body of the following type
`{
id: string,
searchData: {
query: string,
provider: string,
callbackUrl: string
}
`
After Themisto does its search, it will return the result of it in the `response`.
