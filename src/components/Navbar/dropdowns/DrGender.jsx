import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { brandsSelector, materialsSelector } from '../../../store/selector';
import { fetchBrandsThunkAction } from '../../../redux-toolkit/brandsSlice';
import { fetchMaterialsThunkAction } from '../../../redux-toolkit/materialsSlice';
import { priceList } from '../../../help/help';

export default function DrGender({gender}) {
    const [showDropdown, setShowDropdown] = useState(false);
    const dispatch = useDispatch();
    const brandList = useSelector(brandsSelector);
    const materials = useSelector(materialsSelector);
    const prices = priceList;
    
    useEffect(() => {
        dispatch(fetchBrandsThunkAction());
        dispatch(fetchMaterialsThunkAction())
    },[])

  return (
    <div
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            style={{padding: '10px' }}>
                
            <h6 className={`${showDropdown ? 'nav-active' : ''}`}>{gender.name}</h6>
            {
                showDropdown && (
                    <div
                        className="dropdown-menu d-flex justify-content-center"
                        style={{
                            cursor: 'pointer', 
                            display: "block",
                            position: "absolute",
                            marginTop: "10px",
                            left: '110px',
                            right: '110px',
                            // width: "100vw",
                            gap: "100px"

                        }}>
                        <div>
                            <h6 className='text-center'>THƯƠNG HIỆU</h6>
                            {
                                brandList?.data?.filter(item => item.name !== 'All').map((item, index) => (
                                    <div className="dropdown-item"
                                        key={item.name}
                                        
                                    >{item.name}</div>
                                ))
                            }
                        </div>

                        <div>
                            <h6 className='text-center'>CHẤT LIỆU</h6>
                            {
                                materials?.data?.filter(item => item.name !== 'All').map((item, index) => (
                                    <div className="dropdown-item"
                                        key={item.id}
                                        
                                    >{item.name}</div>
                                ))
                            }
                        </div>

                        <div>
                            <h6 className='text-center'>GIÁ</h6>
                            {
                                prices.map((item, index) => (
                                    <div className="dropdown-item"
                                        key={item.value}
                                        
                                    >{item.name}</div>
                                ))
                            }
                        </div>

                    </div>
                )
            }
        </div>
  )
}
