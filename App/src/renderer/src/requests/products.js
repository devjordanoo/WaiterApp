import { BaseRequest } from './baseRequest'

class ProductsRequest extends BaseRequest {
  async getProducts(page = 1, search = '') {
    try {
      const response = await this._request.get(`/products?page=${page}&s=${search}`)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}

export { ProductsRequest }
