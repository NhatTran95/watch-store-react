import React, { useState } from 'react'

const prices = [
    { "value": "0,2", "name": "Dưới 2tr" },
    { "value": "2,3", "name": "Từ 2tr đến 3tr" },
    { "value": "3,4", "name": "Từ 3tr đến 4tr" },
    { "value": "4,5", "name": "Từ 4tr đến 5tr" },
    { "value": "5,5", "name": "Trên 5tr" },
]

export default function DrPrice() {
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <div
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            style={{ padding: '10px' }}>
            <h6 className={`${showDropdown ? 'nav-active' : ''}`}>GIÁ</h6>
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
                                prices.map((item, index) => (
                                    <div className="dropdown-item"
                                        key={item.value}
                                        style={{ borderBottom: `${index === prices.length - 1 ? '' : '0.1px solid #dee2e6'}` }}
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
