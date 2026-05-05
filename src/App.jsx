import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import Products from './components/Products'
import ProductDetails from './components/ProductDetails'
import AddProduct from './components/AddProduct'
import EditProduct from './components/EditProduct'

function App() {

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/new" element={<AddProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />
      </Routes>
    </>
  );
}

export default App
