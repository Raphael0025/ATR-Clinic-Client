import React, { useState, useEffect } from 'react'
import { IconPark } from 'assets/SvgIcons'
import { useCart } from 'Context/CartContext'
 
const AddToCart = () => { 
    const { itemData } = useCart()

    const [item, setItem] = useState({
        item_id: '',
        item_name: '',
        qty: 1,
        unit_price: 1,
        total_amount: 0,
        shipping: 'For Delivery'
    })

    useEffect(() => {
        // Update item_name, item_id, unit_price when itemData changes
        setItem((prevItem) => ({ ...prevItem, item_name: itemData.item_name, item_id: itemData._id, unit_price: itemData.unit_price, }));
    
        // Update total_amount whenever qty or unit_price changes
        setItem((prevItem) => ({ ...prevItem, total_amount: prevItem.qty * prevItem.unit_price, }));
    }, [itemData, item.qty, item.unit_price]);
    
    const handleDecrement = () => { 
        setItem((prevItem) => ({ ...prevItem, qty: Math.max(1, prevItem.qty - 1) }))
    }

    const handleIncrement = () => {
        setItem((prevItem) => ({ ...prevItem, qty: prevItem.qty + 1 }))
    }

    const handleQuantityChange = (event) => {
        // Ensure the quantity is a positive integer
        const newQuantity = Math.max(1, parseInt(event.target.value, 10) || 1);
        setItem((prevItem) => ({ ...prevItem, qty: newQuantity }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Add your form submission logic here using formData
        const response = await fetch('/api/cart', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        console.log(json)

        if(!response.ok){
            alert('Cart Item Not Uploaded')
            setItem({
                item_name: '',
                qty: 1,
                unit_price: 1,
                total_amount: 0,
                shipping: 'For Delivery'
            })
        }
        if(response.ok){
            alert('Cart Item Uploaded')
            setItem({
                item_name: '',
                qty: 1,
                unit_price: 1,
                total_amount: 0,
                shipping: 'For Delivery'
            })
        }
    }

    return (
        <div className={`modal fade`} id="addItem" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden={true}>
            <div className="modal-dialog">
                <div className="modal-content" style={{background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.175)'}}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-6 text-success" id="staticBackdropLabel">Add To Cart</h1>
                        <button type="button" onClick={() => setItem({...item, qty: 1, shipping: 'For Delivery'})} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} className='d-flex flex-column gap-2 text-success'>
                            <div className='d-flex gap-2'>
                                <div>
                                {itemData.product_img && <img alt='product' src={itemData.product_img} width={'100%'} />}
                                </div>
                                <div className='d-flex flex-column gap-3'>
                                    <h4 className='fw-bold'>{itemData.item_name}</h4>
                                    <div className='d-flex flex-column'>
                                        <h6 className='fw-bold'>Quantity</h6>
                                        <div className='d-flex'>
                                            <button type='button' className='btn btn-sm btn-outline-secondary' onClick={handleDecrement}><IconPark path={'ic:round-minus'} /></button>
                                            <input type='number' onChange={handleQuantityChange} id='qty' min={1} value={item.qty} className='text-center bg-light rounded-3 w-25' />
                                            <button type='button' className='btn btn-sm btn-outline-secondary' onClick={handleIncrement}><IconPark path={'ic:round-plus'} /></button>
                                        </div>
                                        {itemData.qty === 0 ? (<pre className='text-danger fst-italic m-0'>*Out of Stock</pre>) : ''}
                                    </div>
                                    <div className='d-flex gap-2'>
                                        <button type='button' onClick={() => setItem({...item, shipping: 'For Pick-up'})} className={`w-100 btn ${item.shipping === 'For Pick-up' ? 'btn-success' : 'btn-outline-success'} btn-sm`}>For Pick-up</button>
                                        <button type='button' onClick={() => setItem({...item, shipping: 'For Delivery'})} className={`w-100 btn ${item.shipping === 'For Delivery' ? 'btn-success' : 'btn-outline-success'} btn-sm`}>For Delivery</button>
                                    </div>
                                </div>
                            </div>
                            <div className='py-2 px-0 d-flex flex-column modal-footer gap-2'>
                                <button type='submit' data-bs-dismiss="modal" className={`w-100 btn ${itemData.qty === 0 ? 'btn-outline-secondary disabled' : 'btn-outline-success'} py-2 px-3 text-uppercase `}>Add to Cart <IconPark path={'iconoir:add-to-cart'} size={18} /></button>
                                <button type='submit' data-bs-dismiss="modal" className={`w-100 btn ${itemData.qty !== 0 ? 'btn-outline-secondary disabled' : 'btn-outline-success'} py-2 px-3 text-uppercase `}>Pre-Order <IconPark path={'ph:basket-bold'} size={18} /></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddToCart