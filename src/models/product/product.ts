export interface IProduct {
	sku: string;
	name: string;
	price: string;
	originalPrice: string;
	category: ICategory;
	description?: string;
	images: string[];
	related: string[]
}

export interface ProductDTO {
	sku: string;
	name: string;
	price: string;
	originalPrice: string;
	category: string;
	description?: string;
	images: string[];
	related: string[]
}

export interface ICategory {
	id?: string,
	name: string
}