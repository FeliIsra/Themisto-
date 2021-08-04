import { crawlEasy } from "./crawlEasy"
import { crawlMeli } from "./crawlMeli"

export const searchCrawl: any = {
	'easy': crawlEasy,
	'meli': crawlMeli
}