import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { Navbar } from './components/navbar'
import { SecondBar } from './components/secondBar'

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <SecondBar pageTitle="WaiterApp" />
      <Container sx={{ marginTop: 4 }}>{children}</Container>
    </>
  )
}

export { Layout }
