import { useState } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import DrBrand from "./dropdowns/DrBrand";
import DrGender from "./dropdowns/DrGender";
import DrContact from "./dropdowns/DrContact";
import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../redux-toolkit/filtersSlice";
import { genderList } from "../../help/help";
import { cartSelector } from "../../store/selector";
import { Link } from "react-router-dom";




export default function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const disPatch = useDispatch();
    const { cartDetails } = useSelector(cartSelector)

    return (
        <div className='container'>
            <div className="row">

                <div className="col-lg-5 col-md-5 col-sm-12 py-2 d-flex align-items-center justify-content-center">
                    <img src="src\assets\logo_2.png" style={{ width: "40%" }} />
                </div>

                <div className="col-lg-7 col-md-7 col-sm-12 d-flex align-items-center justify-content-between">
                    <form className="d-flex align-items-center">
                        <input
                            type="search"
                            placeholder="Tìm kiếm ..."
                            className="form-control"
                            style={{ paddingRight: "200px", color: "gray" }}
                            onInput={(e) => disPatch(filtersSlice.actions.setSearchText(e.target.value))}

                        />
                        <FaSearch size={15} style={{ marginLeft: "-25px", color: "gray" }} />
                    </form>
                    <div className="d-flex align-items-center">
                        {
                            cartDetails?.length ? (
                                <Link to={"/cart"} className="position-relative">
                                    <FaShoppingCart size={20} style={{ color: "black" }} className="" role="button" />
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {cartDetails?.length}
                                    </span>
                                </Link>
                            ) : (
                                <FaShoppingCart size={20} style={{ color: "black" }} className="" role="button" />
                            )
                        }

                        <div
                            className="ms-3"
                            id="user-profile"
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                            style={{ cursor: 'pointer', padding: '10px' }}>
                            <FaUser
                                size={20}
                                style={{ color: 'blue' }}
                                className="me-2"
                            />
                            {
                                showDropdown && (
                                    <div
                                        className="dropdown-menu my-1"
                                        style={{
                                            display: "block",
                                            position: "absolute",
                                            right: 10,
                                            left: "auto"
                                        }}>
                                        <button className="dropdown-item">Tai khoan</button>
                                        <button className="dropdown-item">Don hang</button>
                                        <button className="dropdown-item">Dang xuat</button>
                                    </div>
                                )
                            }
                        </div>

                    </div>

                </div>
            </div >
            <div className="d-flex justify-content-center" style={{ gap: '100px', borderBottom: '0.1px solid #dee2e6' }}>
                <DrBrand />
                {
                    genderList.map((g, index) => (
                        <DrGender key={index} gender={g} />
                    ))
                }
                <DrContact />
            </div>


        </div>
    )
}