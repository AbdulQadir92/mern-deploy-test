import { useNavigate } from 'react-router-dom'


const AddProduct = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const price = e.target.price.value;

        fetch('http://localhost:4000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, price })
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not save data');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                e.target.reset();
                navigate('/');
            })
            .catch(error => console.log(error))
    }

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <div>
                <label className="inp-label" htmlFor="title">Title</label>
                <input className="inp" type="text" id="title" required="required" />
            </div>
            <div>
                <label className="inp-label" htmlFor="price">Price</label>
                <input className="inp" type="number" id="price" required="required" />
            </div>
            <div className="add-btn">
                <input className="btn" type="submit" value="Add" />
            </div>
        </form>
    )
}

export default AddProduct
