import { IResponseJob, JobDTO } from "../models/job/jobDTO"
import { IProduct } from "../models/product/product"
import { searchCrawl } from "./crawl/provider";


export const executeJob = async (job: JobDTO): Promise<IResponseJob> => {
	let products: IProduct[];

	try {
		const provider: string = job.searchData.provider;
		products = await searchCrawl[provider](job.searchData.query)
	} catch (e) {
		console.log(e)	

		return {
			id: job.id,
			error: job.id
		}
	}

	return {
		id: job.id,
		products: products
	}
}
