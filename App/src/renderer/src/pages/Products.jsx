import { useEffect, useState } from 'react'
import { Box, Stack } from '@mui/material'
import { ProductsRequest } from '../requests/products'
import { FiltersBar } from '../components/pages/products/filtersBar'
import { Product } from '../components/pages/products/product'

const productsRequest = new ProductsRequest()

const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const response = await productsRequest.getProducts()
      setProducts(response.data)
    }

    getProducts()
  }, [])

  return (
    <Box>
      <Stack direction="row" gap="25px" alignItems="start" justifyContent="center">
        <FiltersBar />
        <Stack flexGrow={1} gap="25px" overflow={'auto'}>
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}

export { Products }
