export interface IProduct {
	name: string;
	originalPrice: number;
	category: ICategory;
	description?: string;
	images: string[];
	related: string[]
}

export interface ProductDTO {
	name: string;
	originalPrice: number;
	category: string;
	description?: string;
	images: string[];
	related: string[]
}

export interface ICategory {
	id?: string,
	name: string
}