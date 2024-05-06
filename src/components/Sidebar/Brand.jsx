import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { brandsSelector, filtersSelector} from '../../store/selector';
import { fetchBrandsThunkAction } from '../../redux-toolkit/brandsSlice';
import filtersSlice from '../../redux-toolkit/filtersSlice';


export default function Brand() {
    const [collapse, setCollapse] = useState(false)
    const dispatch = useDispatch();
    const brandList = useSelector(brandsSelector);
    const {brand} = useSelector(filtersSelector)

    useEffect(() => {
        dispatch(fetchBrandsThunkAction())
    },[])

    return (
        <div className='accordion-item py-2 d-flex flex-column'>
            <h5 className='accordion-header'>
                <span role='button' className={`accordion-button ${collapse ? 'collapsed' : ''}`}
                    onClick={() => setCollapse(!collapse)}>
                    THƯƠNG HIỆU
                </span>
            </h5>
            {
                collapse && (
                    <div className='form-group'>
                        {
                            brandList?.data?.map(item => (
                                <button key={item.id}
                                    className={`btn btn-sm btn-outline-secondary me-1 mb-1 ${item.name === brand ? 'active' : ''}`}
                                    type='button'
                                    onClick={() => dispatch(filtersSlice.actions.setSearchBrand(item.name))}
                                    >
                                    {item.name}
                                </button>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}
