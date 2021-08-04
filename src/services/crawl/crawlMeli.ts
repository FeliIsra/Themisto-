import { IProduct } from "../../models/product/product";

const puppeteer = require('puppeteer');

export const crawlMeli = async (query: string) => {
	let products: IProduct[] = []

	const browser = await puppeteer.launch({
		headless: true,
		slowMo: 100,
	})
	const page = await browser.newPage()
	await page.setViewport({ width: 1600, height: 1200 });
	await page.goto('https://www.mercadolibre.com.ar');
	await page.waitForSelector('body > header > div > form > input')
	await page.$eval('body > header > div > form > input', (el: { value: string; }, value: string) => el.value = value, query);
	await page.click('body > header > div > form > button > div');

	await page.waitForSelector('#root-app')
	const cantProducts = await page.evaluate(() => {
		return document.body.querySelector('#root-app > div > div.ui-search-main.ui-search-main--only-products > section > ol').childElementCount
	})
	
	for (let i = 1; i <= cantProducts; i++) { 
		await page.waitForSelector('#root-app')
		await page.click(`#root-app > div > div.ui-search-main.ui-search-main--exhibitor.ui-search-main--only-products > section > ol > li:nth-child(${i}) > div > div > div.ui-search-result__image > a > div > div > div > div > div > img`)

		await page.waitForSelector('#root-app')
		
		const loadProduct: IProduct = await page.evaluate(() => {
			let product: any = {
				sku: document.body.querySelector('#root-app > div > div.ui-pdp-container.ui-vip-core.ui-pdp-container--bottom > div.ui-pdp-container__row.ui-pdp-container__row--denounce > div > p > span').textContent,
				name: document.body.querySelector('#root-app > div > div.ui-pdp-container.ui-pdp-container--pdp > div > div.ui-pdp-container__col.col-1.ui-pdp-container--column-right.mt-16.pr-16.ui-pdp--relative > div > div.ui-pdp-container__row.ui-pdp-component-list.pr-16.pl-16 > div > div.ui-pdp-container__row.ui-pdp-container__row--header > div > div.ui-pdp-header__title-container > h1').textContent,
				originalPrice: document.body.querySelector('#root-app > div > div.ui-pdp-container.ui-pdp-container--pdp > div > div.ui-pdp-container__col.col-1.ui-pdp-container--column-right.mt-16.pr-16.ui-pdp--relative > div > div.ui-pdp-container__row.ui-pdp-component-list.pr-16.pl-16 > div > div.ui-pdp-container__row.ui-pdp-container__row--price > div > s > span.price-tag-amount > span.price-tag-fraction')?.textContent || '',
				price: document.body.querySelector('#root-app > div > div.ui-pdp-container.ui-pdp-container--pdp > div > div.ui-pdp-container__col.col-1.ui-pdp-container--column-right.mt-16.pr-16.ui-pdp--relative > div > div.ui-pdp-container__row.ui-pdp-component-list.pr-16.pl-16 > div > div.ui-pdp-container__row.ui-pdp-container__row--price > div > div.ui-pdp-price__second-line > span.price-tag.ui-pdp-price__part > span.price-tag-amount > span.price-tag-fraction').textContent,
				category: {name: document.body.querySelector('#root-app > div > div.ui-pdp-container.ui-pdp-container--top > div > div > div.ui-pdp-container__row.ui-vip-grouped-header > div.ui-pdp-breadcrumb > ul > li:nth-child(4) > a').textContent},
				description: document.body.querySelector('#root-app > div > div.ui-pdp-container.ui-pdp-container--pdp > div > div.ui-pdp-container__col.col-2.ui-pdp-container--column-left.pb-40 > div.ui-pdp-container__col.col-1.ui-vip-core-container--content-left > div.ui-pdp-container__row.ui-pdp-container__row--description > div > p').textContent,
			}	
			return product
		}) 
		
		const cantImages = await page.evaluate(() => {
			return document.body.querySelector('#root-app > div > div.ui-pdp-container.ui-pdp-container--pdp > div > div.ui-pdp-container__col.col-2.ui-pdp-container--column-left.pb-40 > div.ui-pdp-container__row > div > div > div > div.ui-pdp-gallery__column').getElementsByClassName('ui-pdp-gallery__wrapper').length
		})

		let loadImages = []
		for(let j=3; j <= (cantImages * 2 + 1); j+=2) {
			const loadImage = await page.evaluate((j: number) => {
				return document.body.querySelector(`#root-app > div > div.ui-pdp-container.ui-pdp-container--pdp > div > div.ui-pdp-container__col.col-2.ui-pdp-container--column-left.pb-40 > div.ui-pdp-container__row > div > div > div > div.ui-pdp-gallery__column > span:nth-child(${j}) > label > div > div > img`).getAttribute('src');
			}, j)
			loadImages.push(loadImage);		
		}
		loadProduct.images = loadImages;

		const cantRelated = await page.evaluate(() => {
			return document.body.querySelector('#root-app > div > div.ui-pdp-container.ui-pdp-container--pdp > div > div.ui-pdp-container__col.col-2.ui-pdp-container--column-left.pb-40 > div.ui-pdp-container__col.col-1.ui-vip-core-container--content-left > div.ui-pdp-container__row.ui-pdp-container__row--carousel-above > div > div.carousel-container.arrow-visible > div > div > div').getElementsByClassName('slick-active').length
		})

		let loadRelated = []
		for(let k=1; k <= cantRelated; k++) {
			const related = await page.evaluate((k: number) => {
				return document.body.querySelector(`#root-app > div > div.ui-pdp-container.ui-pdp-container--pdp > div > div.ui-pdp-container__col.col-2.ui-pdp-container--column-left.pb-40 > div.ui-pdp-container__col.col-1.ui-vip-core-container--content-left > div.ui-pdp-container__row.ui-pdp-container__row--carousel-above > div > div.carousel-container.arrow-visible > div > div > div > div:nth-child(${k}) > div > a`).getAttribute('href');
			}, k)
			loadRelated.push(related)
		}
		loadProduct.related = loadRelated;
	
		products.push(loadProduct)
		await page.goBack();
	}
	
	await browser.close();
	return products 
}
