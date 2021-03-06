import React, { useEffect } from 'react';
import { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';



  
  

const Shop = () => {
    // const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    document.title = "All products"

    useEffect(() => {
        fetch('https://desolate-island-15765.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])


    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://desolate-island-15765.herokuapp.com/productsByKeys',{
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, [])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count)
    }

    

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.length === 0 &&  <img src="https://miro.medium.com/max/1600/0*ptDX0HfJCYpo9Pcs.gif" alt=""/>
                }

                {
                    products.map(pd => <Product
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct} product={pd}></Product>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-btn">Review Order</button>
                    </Link>
                </Cart>
                <h3>This is cart</h3>
                <h5>Order Summary : {cart.length}</h5>
            </div>



        </div>
    );
};

export default Shop;