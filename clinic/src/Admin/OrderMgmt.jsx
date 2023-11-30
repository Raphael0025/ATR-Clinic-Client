import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { format } from 'date-fns';

const OrderMgmt = () => {
    const [orders, setOrders] = useState(null)
    const [loading, setLoading] = useState(true)

    // Fetching Data from Database
    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const response = await fetch('https://clinic-api-two.vercel.app/api/ordering');
            const json = await response.json();

            if (response.ok) {
                setOrders(json)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            // Set loading to false once data is fetched
            setLoading(false);
        }
        };
        fetchProducts()
    }, [])

    return (
        <main id='order' className=' container-fluid  '> 
            <section className='opaque-background rounded-2 container px-3 py-4 d-flex flex-column gap-4'> 
                <h6 className='m-0 fw-bold text-warning '>Orders</h6>
                <div className='d-flex flex-column'>
                    <h4 className='text-light'>Order Management</h4>
                    <div className='d-flex gap-4 border-bottom border-warning border-5 py-4 mb-4'>
                        <div className='py-4 col-3 px-5 text-light rounded-3 d-flex flex-column ' style={{backgroundColor: '#FFFFFF80'}}>
                            <h6>New Orders</h6>
                            <span className='w-100 text-end fs-3 fw-bold'>150</span>
                        </div>
                        <div className='py-4 col-3 px-5 text-light rounded-3 d-flex flex-column ' style={{backgroundColor: '#FFFFFF80'}}>
                            <h6>Pending Orders</h6>
                            <span className='w-100 text-end fs-3 fw-bold'>150</span>
                        </div>
                        <div className='py-4 col-3 px-5 text-light rounded-3 d-flex flex-column ' style={{backgroundColor: '#FFFFFF80'}}>
                            <h6>Picked-Up Orders</h6>
                            <span className='w-100 text-end fs-3 fw-bold'>150</span>
                        </div>
                    </div>
                    <div className='rounded-3 p-3 text-center' style={{backgroundColor: '#B2B2B280', fontSize: '12px'}}>
                        <div className='d-flex gap-3 rounded-3 p-3 px-4 pb-0'>
                            <span className='w-100 fw-bold'>{'Order ID'}</span>
                            <span className='w-100 fw-bold'>{'Order Date'}</span>
                            <span className='w-100 fw-bold'>{'Price'}</span>
                            <span className='w-100 fw-bold'>{'Qty'}</span>
                            <span className='w-100 fw-bold'>{'Type'}</span>
                            <span className='w-100 fw-bold'>{'Status'}</span>
                            <span className='w-100 fw-bold'>{'Action'}</span>
                        </div>
                        <div className='py-3 px-2 d-flex gap-3 flex-column overflow-y-scroll ' style={{height: '460px'}}>
                        {loading ? (
                            <div className='d-flex flex-column  gap-3'>
                                <Skeleton count={2} height={50} />
                                <Skeleton count={2} height={50} />
                                <Skeleton count={2} height={50} />
                                <Skeleton count={2} height={50} />
                                <Skeleton count={2} height={50} />
                                <Skeleton count={2} height={50} />
                            </div>
                        ) : (
                            <>
                            {orders && orders.map((order) => (
                                <div className='d-flex align-items-center  gap-3 px-3 py-2 rounded-3' key={order._id} style={{backgroundColor: '#D9D9D980'}}>
                                    <span className='w-100 text-truncate'>{order._id}</span>
                                    <span className='w-100 text-truncate'>{order.createdAt && format(new Date(order.createdAt), 'MMM dd, yyyy')}</span>
                                    <span className='w-100 text-truncate'>Php {order.total_amount}.00</span>
                                    <span className='w-100 text-truncate'>{order.total_qty} pcs.</span>
                                    <span className='w-100 text-truncate'>{order.shipping}</span>
                                    
                                    <div className="dropdown d-flex justify-content-center align-items-center ">
                                        <button className="btn w-100 btn-sm dropdown-toggle text-light" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize: '12px', backgroundColor: '#2E30ff'}}>
                                            {order.shipping} 
                                        </button>
                                        <ul className="dropdown-menu" >
                                            {['Received', 'Processing', 'Pending', 'Canceled'].map((status, index) => (
                                                <li key={index}>
                                                    <p
                                                        className='dropdown-item'
                                                        onClick={() => setStatus(order._id, status)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        {status}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    
                                    <span className='w-100 text-truncate'>
                                        <button>Delete</button>    
                                    </span>
                                </div>
                            ))}
                            </>
                        )}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default OrderMgmt