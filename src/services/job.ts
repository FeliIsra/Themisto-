import { IResponseJob, JobDTO } from "../models/job/jobDTO"
import { IProduct } from "../models/product/product"

export const executeJob = (job: JobDTO): IResponseJob => {

	// TODO: Aca llamo a poopetter

	// Devuelvo todos los productos con el ID

	const product: IProduct = {
		name: "product",
		description: "description",
		originalPrice: 4,
		category: {name: "category"},
		images: ["img1", "img2"],
		related: ["related1", "related2"]
	}

	console.log(job.id)

	return {
		id: job.id,
		products: [product]
	}
}