import BaseApicall from '../global/baseApiCall';
import {
  AllCategoryResponseModel,
  PaginationQuery,
  ProductModel,
  ProductsResponseModel,
} from './types';

export async function GetProducts(query?: PaginationQuery): Promise<any> {
  return new Promise((resolve, reject) => {
    BaseApicall({
      controller: 'products',
      method: 'get',
      query: query ?? {},
      baseUrl: 'https://dummyjson.com',
      onSuccess: async (data: ProductsResponseModel) => {
        resolve(data);
      },
      onError: (x: any) => {
        reject(x);
      },
    });
  });
}

export async function GetAllCategories(): Promise<any> {
  return new Promise((resolve, reject) => {
    BaseApicall({
      controller: 'products',
      action: 'categories',
      method: 'get',
      baseUrl: 'https://dummyjson.com',
      onSuccess: async (data: AllCategoryResponseModel[]) => {
        resolve(data);
      },
      onError: (x: any) => {
        reject(x);
      },
    });
  });
}

export async function GetProductDetail(productId: number): Promise<any> {
  return new Promise((resolve, reject) => {
    BaseApicall({
      controller: `products/${productId}`,
      method: 'get',
      baseUrl: 'https://dummyjson.com',
      onSuccess: async (data: ProductModel) => {
        resolve(data);
      },
      onError: (x: any) => {
        reject(x);
      },
    });
  });
}
