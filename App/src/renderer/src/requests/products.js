import { BaseRequest } from './baseRequest'

class ProductsRequest extends BaseRequest {
  async getProducts() {
    try {
      const response = await this._request.get('/products')
      return response
    } catch (error) {
      console.log(error)
    }
  }
}

export { ProductsRequest }
