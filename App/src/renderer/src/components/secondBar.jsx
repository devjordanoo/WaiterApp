import { Container, Box } from '@mui/material'
import { useLocation } from 'react-router-dom'

const SecondBar = () => {
  const { pathname } = useLocation()
  const pageTitle = pathname.split('/')[1]

  const title = {
    products: 'Produtos'
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: '#545454',
        color: 'white',
        position: 'sticky',
        top: 64,
        zIndex: 1000
      }}
    >
      <Container sx={{ paddingY: 2 }}>
        <h1 style={{ letterSpacing: '2px', fontSize: '1.4rem' }}>
          {title[pageTitle] ?? 'WaiterApp'}
        </h1>
      </Container>
    </Box>
  )
}

export { SecondBar }
