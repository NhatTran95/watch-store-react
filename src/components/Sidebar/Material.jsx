import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filtersSelector, materialsSelector } from '../../store/selector';
import { fetchMaterialsThunkAction } from '../../redux-toolkit/materialsSlice';
import filtersSlice from '../../redux-toolkit/filtersSlice';

export default function Material() {
    const [collapse, setCollapse] = useState(false)
    const dispatch = useDispatch();
    const materials = useSelector(materialsSelector)
    const {material} = useSelector(filtersSelector)

    useEffect(() => {
        dispatch(fetchMaterialsThunkAction())
    },[])

    return (
        <div className='accordion-item py-2 d-flex flex-column justify-content-center'>
            <h5 className='accordion-header'>
                <span role='button'
                    className={`accordion-button ${collapse ? 'collapsed' : ''}`}
                    onClick={() => setCollapse(!collapse)}>
                    CHẤT LIỆU
                </span>
            </h5>
            {
                collapse && (
                    <div className='form-group'>
                        {
                            materials?.data?.map((mat, index) => (
                                <div key={mat.id} className='form-check py-1 ms-2'>
                                    <input type="radio"
                                        className='form-check-input'
                                        name='material'
                                        id={`mat_${index}`}
                                        value={mat.name}
                                        defaultChecked={mat.name === material} 
                                        onChange={() => dispatch(filtersSlice.actions.setSearchMaterial(mat.name))}
                                        />
                                    <label htmlFor={`mat_${index}`}
                                        role='button'
                                        className={`form-check-label ${mat.name === material ? 'text-decoration-underline fw-bolder' : ''}`}>
                                            {mat.name}
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
