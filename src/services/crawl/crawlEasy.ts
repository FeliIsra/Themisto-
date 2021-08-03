import { IProduct } from "../../models/product/product";

const puppeteer = require('puppeteer');

export const crawlEasy = async (query: string) => {
	const browser = await puppeteer.launch({
		headless: false,
		slowMo: 50,
	})
	const page = await browser.newPage()
	await page.setViewport({ width: 1600, height: 1200 });
	await page.goto('https://www.easy.com.ar');
	await page.waitForSelector('input[name=searchTerm]');
	await page.$eval('input[name=searchTerm]', (el: { value: string; }, value: string) => el.value = value, query);
	await page.click('a[id=WC_CachedHeaderDisplay_button_1]');
	await page.waitForSelector('#WC_CatalogSearchResultDisplay_div_6_1')
	await page.click('#WC_CatalogSearchResultDisplay_div_6_1' )
	
	await page.waitForSelector('body')
	await page.waitForSelector('#product-right')
	await page.waitForSelector('#fotorama-p')
	await page.waitForSelector('#Description')
	const response: IProduct = await page.evaluate(() => {
		let product: IProduct = {
			sku: document.body.querySelector('#product-right > div.product-top-data > div.prod-sku > span:nth-child(2)').textContent,
			name: document.body.querySelector('#product-right > h1').textContent,
			originalPrice: document.body.querySelector('#product-right > div.prod-price-container > div > h4').textContent,
			price: document.body.querySelector('#product-right > div.prod-price-container > div.pdp-price.regular-price > h4').textContent,
			category: {name: document.body.querySelector('#Description > div.product-attributes.section-container > table > tbody > tr:nth-child(1) > td.attribute-value').textContent},
			description: document.body.querySelector('#Description > div.product-longdescription.section-container > div').textContent,
			images: [document.body.querySelector('#fotorama-p > div > div > div.fotorama__stage__shaft > div > img').getAttribute('src')],
			related: []
		}	

		return product
	}) 
	await browser.close();

	return response
}
