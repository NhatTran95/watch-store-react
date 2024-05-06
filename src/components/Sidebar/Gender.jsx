import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import filtersSlice from '../../redux-toolkit/filtersSlice';
import { filtersSelector } from '../../store/selector';

const genderList = [
    { 'value': "MEN", 'name': "NAM" },
    { 'value': "WOMEN", 'name': "NỮ" },
    { 'value': "COUPLE", 'name': "CẶP ĐÔI" },
]
export default function Gender() {
    const [collapse, setCollapse] = useState(false)
    const disPatch = useDispatch();
    const { gender } = useSelector(filtersSelector)
    return (
        <div className='accordion-item py-2 d-flex flex-column'>
            <h5 className='accordion-header'>
                <span role='button' className={`accordion-button ${collapse ? 'collapsed' : ''}`}
                    onClick={() => setCollapse(!collapse)}>
                    GIỚI TÍNH
                </span>
            </h5>
            {
                collapse && (
                    <div className="form-group ms-2">
                        {
                            genderList.map((g, index) => (
                                <div key={index} className="form-check">
                                    <input className="form-check-input" type="checkbox" value={g.value} id={`g_${index}`}
                                        defaultChecked={gender.includes(g.value) ? true : false}
                                        onClick={() => disPatch(filtersSlice.actions.setSearchGender(g.value))} />
                                    <label className="form-check-label"
                                        htmlFor={`g_${index}`}
                                        role='button'
                                    >{g.name}</label>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}
