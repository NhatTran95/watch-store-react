import React, { useState } from 'react'

export default function DrContact() {
    const [showDropdown, setShowDropdown] = useState(false);
    return (
        <div
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            style={{padding: '10px' }}>
            <h6 className={`${showDropdown ? 'nav-active' : ''}`}>LIÊN HỆ</h6>
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

                        <div className="dropdown-item"
                            style={{ borderBottom: '0.1px solid #dee2e6' }}
                        >
                            Giới thiệu Nhật Watch
                        </div>

                        <div className="dropdown-item"
                            style={{ borderBottom: '' }}
                        >
                            Thông tin liên hệ
                        </div>


                    </div>
                )
            }
        </div>
    )
}
