import { IProduct } from "../product/product";

export interface JobDTO {
	id: string;
	searchData: {
		query: string;
		provider: string;
		options?: {
			user: string;
			password: string;
		}
		callbackUrl: string;
	}
}

export interface IResponseJob {
	id: string;
	products?: IProduct[];
	error?: any;
}