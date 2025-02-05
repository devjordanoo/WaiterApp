import { useEffect, useState } from 'react'
import { Box, Stack, Pagination } from '@mui/material'
import { ProductsRequest } from '../requests/products'
import { FiltersBar } from '../components/pages/products/filtersBar'
import { Product } from '../components/pages/products/product'
import { useSearchParams } from 'react-router-dom'
import { NoResults } from '../components/pages/products/noResults'
import { Informations } from '../components/pages/products/Informations'

const productsRequest = new ProductsRequest()

const Products = () => {
  const [searchParams] = useSearchParams()

  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(searchParams.get('page') || 1)
  const [search] = useState(searchParams.get('s') || '')

  useEffect(() => {
    const getProducts = async () => {
      const response = await productsRequest.getProducts(currentPage, search)

      setProducts(response.data.data)
      setTotal(response.data.total)
      setCurrentPage(response.data.currentPage)
    }

    getProducts()
  }, [currentPage])

  const renderProducts = () => {
    if (products.length > 0) {
      return products.map((product) => <Product key={product.id} product={product} />)
    }

    return <NoResults />
  }

  return (
    <Box>
      <Stack direction="row" gap="25px" alignItems="start" justifyContent="center">
        <FiltersBar />
        <Stack flexGrow={1} gap="25px" marginBottom="25px">
          <Informations />
          <Stack direction="column" gap="25px">
            {renderProducts()}
          </Stack>
          <Stack alignItems="center" gap="25px">
            <Pagination
              count={(total / 10 + 1).toFixed(0)}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export { Products }
