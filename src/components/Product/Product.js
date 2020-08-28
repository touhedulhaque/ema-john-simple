import React from 'react';
import { FaCartPlus } from "react-icons/fa";
import './Product.css';
const Product = (props) => {
    // console.log(props.product);
    const { img, name, seller, price, stock } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <br />
                <p><small>by : {seller}</small></p>
                <p>CHF <strong>{price}</strong></p>
                <br />
                <p><small>Only {stock} left in stock - order now</small></p>
                <button
                    className="main-btn"
                    onClick={() => props.handleAddProduct(props.product)}>
                        <FaCartPlus /> Add to Cart</button>
            </div>


        </div>
    );
};

export default Product;