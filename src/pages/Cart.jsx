import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import MainLayout from '../layout/MainLayout'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch, useSelector } from 'react-redux'
import { cartSelector } from '../store/selector'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import cartSlice, { chekoutThunkAction } from '../redux-toolkit/cartSlice';

const schema = yup.object({
    fullName: yup.string().required(),
    mobile: yup.string().required(),
    email: yup.string().email().required(),
    address: yup.string().required()
})

export default function Cart() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const dispatch = useDispatch();
    const { cartId, customerInfo, cartInfo, cartDetails } = useSelector(cartSelector)

    const handleIncrementQuantity = (cartItem) => {
        if (cartItem?.quantity < cartItem?.stock) {
            dispatch(cartSlice.actions.incrementQuantity(cartItem.id))
        }
        else {
            toast.warning(`You can not by this product over ${cartItem?.stock}`)
        }
    }

    const handleDescrementQuantity = (cartItem) => {
        if (cartItem?.quantity > 1) {
            dispatch(cartSlice.actions.descrementQuantity(cartItem.id))
        }
        else {
            toast.warning('You can not descrement quantity less than 1')
        }
    }

    const handleRemoveCartItem = (cartItem) => {
        Swal.fire({
            title: `Are you sure to remove ${cartItem?.title}?`,
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(cartSlice.actions.removeCartItem(cartItem?.id))
                toast.info(`${cartItem?.title} remove from cart succeed`)
            }
        })
    }

    const handleCreateBill = async (values) => {
        Swal.fire({
            title: `Are you sure to checkout cart?`,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                const data = {
                    total: cartInfo.total,
                    orderDate: cartInfo.orderDate,
                    billDetails: cartDetails.map(p => {
                        const { id, quantity, amount } = p;
                        return { idProduct: id, quantity, amount }
                    }),
                    customerInfo: {
                        ...values
                    }
                }
                console.log(data);
                dispatch(chekoutThunkAction(data))
                toast.info(`cart checkout succeed`)
                reset()
            }
        })

    }
    return (
        <MainLayout>
            <div className="container my-3 mt-5 border">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className=" py-2">Cart Detail</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-8">
                        <table className="table cart-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th className="text-end">Price</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-end">Total</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartDetails?.map((cartItem) => (
                                        <tr key={cartItem.id}>
                                            <td style={{ maxWidth: '200px' }}>
                                                <div className="d-flex align-items-center">
                                                    <img className="product-image" src={cartItem.images[0].url} alt="" />
                                                    <div className="d-inline">
                                                        <div className="d-block fw-bolder mb-2">{cartItem?.title.toLocaleUpperCase()}</div>
                                                        <div className="d-block">{cartItem?.brand.name.toLocaleUpperCase()}</div>
                                                    </div>
                                                </div>

                                            </td>
                                            <td className="text-end">
                                                {(cartItem?.newPrice.toLocaleString())} đ
                                            </td>
                                            <td >
                                                <div className="cart-quantity-wrap">
                                                    <div className="cart-quantity">
                                                        <span
                                                            role="button"
                                                            onClick={() => handleDescrementQuantity(cartItem)}
                                                        >-</span>
                                                        <span>{cartItem?.quantity}</span>
                                                        <span
                                                            role="button"
                                                            onClick={() => handleIncrementQuantity(cartItem)}
                                                        >+</span>
                                                    </div>
                                                </div>

                                            </td>
                                            <td className="text-end">
                                                {(cartItem?.amount.toLocaleString())} đ
                                            </td>
                                            <td>
                                                <div className="action-wrap">
                                                    <span className="btn-remove"
                                                        onClick={() => handleRemoveCartItem(cartItem)}
                                                    >&times;</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                        <div className="row col-md-12">
                            <Link to={'/'}>
                                <FaArrowLeft /> Countinue shopping
                            </Link>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-4" style={{ minWidth: '300px' }}>
                        <div className="order-summary p-3">
                            <h3 className="border-bottom py-2">Order Summary</h3>

                            <div className="d-flex align-items-center justify-content-between mt-2 py-2">
                                <span className="fs-6">Total</span>
                                <span className="fw-bolder fs-6">{(cartInfo?.total.toLocaleString())} đ</span>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit(handleCreateBill)}>
                            <div className="customer-info p-3">
                                <h3 className="border-bottom py-2">Customer Info</h3>
                                <div className="form-group mb-3">
                                    <label className="form-label">Fullname</label>
                                    <input type="text"
                                        className={`${errors.fullName?.message ? 'is-invalid' : ''} form-control`}
                                        placeholder="Fullname"
                                        {...register('fullName')}
                                    />
                                    <span className="invalid-feedback">{errors.fullName?.message}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Address</label>
                                    <input type="text"
                                        className={`${errors.address?.message ? 'is-invalid' : ''} form-control`}
                                        placeholder="Address"
                                        {...register('address')}
                                    />
                                    <span className="invalid-feedback">{errors.address?.message}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="text"
                                        className={`${errors.email?.message ? 'is-invalid' : ''} form-control`}
                                        placeholder="Email"
                                        {...register('email')}
                                    />
                                    <span className="invalid-feedback">{errors.email?.message}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label className="form-label">Mobile</label>
                                    <input type="text"
                                        className={`${errors.mobile?.message ? 'is-invalid' : ''} form-control`}
                                        placeholder="Mobile"
                                        {...register('mobile')}
                                    />
                                    <span className="invalid-feedback">{errors.mobile?.message}</span>
                                </div>
                            </div>
                            <div className="py-3 bg-success mt-2 d-flex align-items-center justify-content-center text-white btn-checkout my-3">
                                <button type="submit" className="btn btn-block flex-grow-1">
                                    CHECKOUT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
