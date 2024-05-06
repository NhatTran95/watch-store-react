import React, { useEffect, useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import Star from "../Star/Star";
import { toast } from "react-toastify";
import { priceAfterDiscount } from "../../help/help";
import { useDispatch } from "react-redux";
import cartSlice from "../../redux-toolkit/cartSlice";

function Product({ product }) {
    product = {
        ...product,
        newPrice: priceAfterDiscount(product.price, product.discountPercentage)
    }

    const disPatch = useDispatch();
    const addProductToCart = (product) => {
        disPatch(cartSlice.actions.addToCart(product))
    }


    return (
        <div className="col-md-3 mb-4" >
            <div className="card d-flex align-items-center pt-4" style={{ height: '450px' }}>
                <img src={product?.images[0].url}
                    className="card-image-top" alt=""
                    style={{ width: "90%" }}
                />
                <div className="w-100 px-4 py-2">
                    <p className="fw-bolder text-center m-0" style={{ height: '50px' }}>{product?.brand.name} - {product?.title}</p>

                    {/* <p className="m-0" style={{ fontSize: '12px' }}>{product?.description}</p> */}

                    <div className="text-center mb-3">

                        <Star star={product?.rating} />

                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="fs-10 badge bg-success">
                            {product?.stock} In stock
                        </div>
                        <div className="fs-10 badge bg-danger">
                            {product?.discountPercentage ? 'On sale' : ''}
                        </div>
                        <FaCartArrowDown
                            size={20}
                            className="btn-cart"
                            role="button"
                            onClick={() => addProductToCart(product)}
                        />
                    </div>

                    <div className={`${product?.discountPercentage ? 'd-flex align-items-center justify-content-between my-3' : 'text-center my-3'}`}>
                        {
                            product?.discountPercentage ?
                                <del className="line-through me-2">{product?.price.toLocaleString()}</del>
                                : <del></del>
                        }
                        <span className="fs-4 text-danger fw-bolder">{product.newPrice.toLocaleString()} đ</span>
                    </div>


                </div>
            </div>
        </div>

    )
}

export default Product;