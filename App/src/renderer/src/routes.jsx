import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './layout'
import { Home } from './pages/Home'
import { Products } from './pages/Products'

const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/products',
    element: <Products />
  }
]

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
