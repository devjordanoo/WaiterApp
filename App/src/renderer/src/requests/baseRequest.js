import Axios from 'axios'

class BaseRequest {
  constructor() {
    this._request = Axios.create({
      baseURL: 'http://localhost:3001/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Security-Policy':
          "default-src 'self'; connect-src 'self' http://localhost:3001; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;"
      }
    })
  }
}

export { BaseRequest }
