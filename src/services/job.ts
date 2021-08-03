import { IResponseJob, JobDTO } from "../models/job/jobDTO"
import { IProduct } from "../models/product/product"
import { searchCrawl } from "./crawl/provider";


export const executeJob = async (job: JobDTO): Promise<IResponseJob> => {
	let product: IProduct;

	try {
		const provider: string = job.searchData.provider;
		product = await searchCrawl[provider](job.searchData.query)
	} catch {
		return {
			id: job.id,
			error: job.id
		}
	}

	return {
		id: job.id,
		products: [product]
	}
}
