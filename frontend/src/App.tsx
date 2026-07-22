import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/templates/Layout'
import { HomePage } from './components/pages/HomePage'
import { CatalogPage } from './components/pages/CatalogPage'
import { ProductPage } from './components/pages/ProductPage'
import { SuggestProductPage } from './components/pages/SuggestProductPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/add-product" element={<SuggestProductPage />} />
      </Route>
    </Routes>
  )
}

export default App
