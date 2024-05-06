import React from 'react'
import Brand from './Brand'
import Material from './Material'
import Price from './Price'
import Gender from './Gender'

export default function Sidebar() {
  return (
    <div className='d-flex flex-column h-100'>
      <h5 className='my-2'>BỘ LỌC</h5>
      <div className='accordion accodion-flush'>
        <Brand />
        <Material />
        <Price />
        <Gender />
      </div>
    </div>
  )
}
