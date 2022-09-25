import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import AddProduct from './pages/AddProduct'

// Components
import Header from './components/Header'

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            <Route path="/addProduct" element={<AddProduct />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
