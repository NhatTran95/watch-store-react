import React, { useEffect, useMemo, useState } from 'react'
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { filteredProductsSelector } from '../../store/selector';
import { fetchDataThunkAction } from '../../redux-toolkit/productsSlice';
import Pagination from '../pagination/pagination';

export default function Products() {
    const dispatch = useDispatch();
    const filteredProducts = useSelector(filteredProductsSelector);

    useEffect(() => {
        dispatch(fetchDataThunkAction())
    }, [])

    let PageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([])

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        setProducts(filteredProducts.slice(firstPageIndex, lastPageIndex));
        // return filteredProducts.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredProducts]);

    return (
        <>
            <div className="py-2 d-flex flex-column justify-content-center ">
                <h5>DANH SÁCH SẢN PHẨM</h5>
                <div className='row'>
                    {
                        products?.map(product => (
                            <Product key={product.id} product={product} />
                        ))
                    }
                </div>
            </div>
            <div className='d-flex justify-content-center'>
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={filteredProducts.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>

        </>
    )
}
