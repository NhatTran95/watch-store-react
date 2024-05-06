import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filtersSelector } from '../../store/selector';
import filtersSlice from '../../redux-toolkit/filtersSlice';
const prices = [
    { "value": "All", "name": "Tất cả" },
    { "value": "0,2", "name": "Dưới 2tr" },
    { "value": "2,3", "name": "Từ 2tr đến 3tr" },
    { "value": "3,4", "name": "Từ 3tr đến 4tr" },
    { "value": "4,5", "name": "Từ 4tr đến 5tr" },
    { "value": "5,5", "name": "Trên 5tr" },
]

export default function Price() {
    const [collapse, setCollapse] = useState(false)
    const disPatch = useDispatch();
    const { price } = useSelector(filtersSelector)
    return (
        <div className='accordion-item py-2 d-flex flex-column justify-content-center'>
            <h5 className='accordion-header'>
                <span role='button'
                    className={`accordion-button ${collapse ? 'collapsed' : ''}`}
                    onClick={() => setCollapse(!collapse)}>
                    GIÁ
                </span>
            </h5>
            {
                collapse && (
                    <div className='form-group'>
                        {
                            prices.map((p, index) => (
                                <div key={p.value} className='form-check py-1 ms-2'>
                                    <input type="radio"
                                        className='form-check-input'
                                        name='price'
                                        id={`price_${index}`}
                                        value={p.value}
                                        defaultChecked={p.value === price} 
                                        onChange={() => disPatch(filtersSlice.actions.setSearchPrice(p.value))}/>
                                    <label htmlFor={`price_${index}`}
                                        role='button'
                                        className={`form-check-label ${p.value === price ? 'text-decoration-underline fw-bolder' : ''}`}>
                                        {p.name}
                                    </label>
                                </div>
                            ))
                        }

                    </div>
                )
            }
        </div>
    )
}
