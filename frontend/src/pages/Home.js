import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {

    const [products, setProducts] = useState(null);
    const navigate = useNavigate();

    const abortController = new AbortController();
    useEffect(() => {
        fetch('http://localhost:4000/api/products', {
            signal: abortController.signal
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch data');
                }
                return res.json();
            })
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.log(error);
            })

        return () => abortController.abort();
    }, [])

    const productDetails = (id) => {
        navigate('/productDetails/' + id);
    }

    return (
        <div id="home">
            <h1 className="products-heading">Products</h1>
            <ul className="products-ul">
                {products && products.map(product => (
                    <li key={product._id} className="product-card" onClick={() => productDetails(product._id)}>
                        <div>{product.title}</div>
                        <div>${product.price}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home