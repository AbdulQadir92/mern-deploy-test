import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    const idElement = useRef();
    const titleElement = useRef();
    const priceElement = useRef();
    const editForm = useRef();

    const abortController = new AbortController();
    useEffect(() => {
        fetch('http://localhost:4000/api/products/' + id, {
            signal: abortController.signal
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch data');
                }
                return res.json();
            })
            .then(data => {
                setProduct(data);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    const deleteProduct = () => {
        const productId = idElement.current.innerText;
        fetch('http://localhost:4000/api/products/' + productId, {
            method: 'DELETE'
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not delete the product');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                navigate('/');
            })
            .catch(error => console.log(error))
    }

    const fillForm = () => {
        editForm.current.classList.remove('d-none');
        editForm.current.title.value = titleElement.current.innerText;
        editForm.current.price.value = priceElement.current.innerText;
    }

    const updateProduct = (e) => {
        e.preventDefault();
        const title = editForm.current.title.value;
        const price = editForm.current.price.value;
        const productId = idElement.current.innerText;

        fetch('http://localhost:4000/api/products/' + productId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, price })
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not update data');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                editForm.current.reset();
                editForm.current.classList.add('d-none');
                idElement.current.innerText = data.newProduct._id;
                titleElement.current.innerText = data.newProduct.title;
                priceElement.current.innerText = data.newProduct.price;
                console.log();
            })
            .catch(error => console.log(error))
    }

    return (
        <div id="productDetails">
            {product &&
                <div className="product-card details-card">
                    <div className="details-holder">
                        <div className="d-none" ref={idElement}>{product._id}</div>
                        <div ref={titleElement}>{product.title}</div>
                        <div ref={priceElement}>{product.price}</div>
                    </div>
                    <div className="del-btn-div">
                        <button className="btn edit-btn" onClick={fillForm}>Edit</button>
                        <button className="btn del-btn" onClick={deleteProduct}>delete</button>
                    </div>
                </div>
            }

            <form className="product-form d-none" ref={editForm} onSubmit={updateProduct}>
                <div>
                    <label className="inp-label" htmlFor="title">Title</label>
                    <input className="inp" type="text" id="title" required="required" />
                </div>
                <div>
                    <label className="inp-label" htmlFor="price">Price</label>
                    <input className="inp" type="number" id="price" required="required" />
                </div>
                <div className="add-btn">
                    <input className="btn" type="submit" value="Save" />
                </div>
            </form>

        </div>
    )
}

export default ProductDetails
