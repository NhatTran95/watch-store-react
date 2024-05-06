import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { materialsSelector } from '../../../store/selector';
import { fetchMaterialsThunkAction } from '../../../redux-toolkit/materialsSlice';

export default function DrMaterial() {
    const [showDropdown, setShowDropdown] = useState(false);

    const dispatch = useDispatch();
    const materials = useSelector(materialsSelector)

    useEffect(() => {
        dispatch(fetchMaterialsThunkAction())
    },[])
    console.log(materials);

    return (
        <div
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            style={{padding: '10px' }}>
            <h6 className={`${showDropdown ? 'nav-active' : ''}`}>CHẤT LIỆU</h6>
            {
                showDropdown && (
                    <div
                        className="dropdown-menu"
                        style={{
                            cursor: 'pointer', 
                            display: "block",
                            position: "absolute",
                            marginTop: "10px",
                            left: "auto"
                        }}>
                        <div>
                            {
                                materials?.data?.filter(item => item.name !== 'All').map((item, index) => (
                                    <div className="dropdown-item"
                                        key={item.id}
                                        style={{ borderBottom: `${index === materials?.data?.length - 2 ? '' : '0.1px solid #dee2e6'}` }}
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
