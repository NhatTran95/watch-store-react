import React from 'react'

export default function Footer() {
  return (
    <div
      style={{ backgroundColor: "#00334e", color: 'white' }}
      className='d-flex '>
      <div className='col-3 p-5'>
        <img src="src/assets/logo_1.png" style={{ width: "53%" }} />
        <div>
          <h6>Hotline: 099.999.9999</h6>
        </div>
      </div>

      <div className='col-6 d-flex p-5 justify-content-between'>
        <div>
          <h6>HỆ THỐNG CỬA HÀNG</h6>
          <p>TP.Hồ Chí Minh</p>
          <p>Hà Nội</p>
          <p>Huế</p>
          <p>Đà Nẵng</p>
          <p>Hải Phòng</p>
        </div>
        <div>
          <h6>THÔNG TIN</h6>
          <p>Thông tin liên hệ</p>
          <p>Vận chuyển - giao nhận</p>
          <p>Tra cứ u bảo hành</p>
          <p>Điều khoản sử dụng</p>
        </div>
        <div>
          <h6>CHÍNH SÁCH</h6>
          <p>Chính sách đổi trả</p>
          <p>Chính sách bảo hành</p>
        </div>
      </div>
      <div className='col-3 p-5'>
        <h6>VỀ CHÚNG TÔI</h6>
        <img src="src/assets/footer.png" style={{width: "60%"}}/>
        <img src="src/assets/footer_1.png" style={{width: "60%"}}/>
      </div>
    </div>
  )
}
