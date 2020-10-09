import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useState } from 'react';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [loading, setLoading]= useState(true)
    const [product, setProduct]=useState({});
    document.title = "Single Product Details"

    useEffect(() => {
        fetch('https://desolate-island-15765.herokuapp.com/product/'+productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data)
            setLoading(false)
        })
    },[productKey])
    // const product = fakeData.find(pd => pd.key === productKey);
    return (
        <div>
            <h1>Your Product Details</h1>
            {
                loading ? <img src="https://thumbs.gfycat.com/ArtisticShoddyKudu-small.gif" alt=""/> : <Product showAddToCart={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetail;