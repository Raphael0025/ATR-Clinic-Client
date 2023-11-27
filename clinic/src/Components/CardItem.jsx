import React from 'react'
import { IconPark } from 'assets/SvgIcons'
import { useCart } from 'Context/CartContext'

const CardItem = ({data}) => {
    const { addToCart } = useCart()
    
    return ( 
        <div key={data._id} className='card m-3 d-flex align-items-center item-card border border-success border-3' style={{backgroundColor: '#00FF3812'}}>
            <img src={data.product_img } alt='prod' className='p-3' width='60%' />
            <div className='card-body w-100 rounded-2 detail bg-light text-light d-flex justify-content-between align-items-center'>
                <div>
                    <h5 className='card-title  text-dark m-0 text-wrap w-100'>{data.item_name}</h5>
                    <p className='card-text text-dark fs-6'>P {data.unit_price}.00</p>
                </div>
                <div>
                    <button style={{fontSize: '12px'}} className='rounded-2 btn btn-sm btn-outline-success' onClick={() => addToCart(data)} data-bs-target="#addItem" data-bs-toggle="modal">
                    <IconPark path={'mdi:cart-plus'} size={32} /> Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default CardItem