import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { brandsSelector} from '../../../store/selector';
import { fetchBrandsThunkAction } from '../../../redux-toolkit/brandsSlice';

export default function DrBrand() {
    const [showDropdown, setShowDropdown] = useState(false);

    const dispatch = useDispatch();
    const brandList = useSelector(brandsSelector);

    useEffect(() => {
        dispatch(fetchBrandsThunkAction())
    },[])

    return (
        <div
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            style={{padding: '10px' }}>
            <h6 className={`${showDropdown ? 'nav-active' : ''}`}>THƯƠNG HIỆU</h6>
            {
                showDropdown && (
                    <div
                        className="dropdown-menu"
                        style={{
                            cursor: 'pointer', 
                            display: "block",
                            position: "absolute",
                            marginTop: "10px",
                            left: 'auto',
                            // width: "100vw",
                            // gap: "100px"

                        }}>
                        <div>
                            {
                                brandList?.data?.filter(item => item.name !== 'All').map((item, index) => (
                                    <div className="dropdown-item"
                                        key={item.name}
                                        style={{ borderBottom: `${index === brandList?.data?.length - 2 ? '' : '0.1px solid #dee2e6'}` }}
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
