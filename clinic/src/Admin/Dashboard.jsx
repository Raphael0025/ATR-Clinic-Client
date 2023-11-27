import React, { useEffect, useState } from 'react'
import { IconPark } from 'assets/SvgIcons'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Dashboard = () => {
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(true)

    // Fetching Data from Database
    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products/top-products');
            const json = await response.json();

            if (response.ok) {
            setProducts(json);
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
        <main id='dash' className=' container-fluid vh-100 '>
            <section className='opaque-background rounded-2 container px-3 py-4 d-flex flex-column gap-4 '> 
                <h6 className='m-0 fw-bold text-warning '>Dashboard</h6>
                <div className='bg-secondary rounded-3 p-3 px-5 d-flex flex-column gap-3'>
                    Total Revenue
                    <span className='fw-bold fs-4'>Php 80,000</span>
                </div>
                <section className='d-flex justify-content-center align-items-center gap-5 '>
                    <div className='rounded-2 bg-secondary text-light p-4 gap-3 d-flex'>
                        <IconPark path={'ci:users'} size={'60px'} />
                        <div className='d-flex flex-column gap-3'>
                            Total Customers
                            <span>500,000</span>
                        </div>
                    </div>
                    <div className='rounded-2 bg-secondary text-light p-4 gap-3 d-flex'>
                        <IconPark path={'material-symbols:orders-outline'} size={'60px'} />
                        <div className='d-flex flex-column gap-3'>
                            Orders Completed
                            <span>500,000</span>
                        </div>
                    </div>
                    <div className='rounded-2 bg-secondary text-light p-4 gap-3 d-flex'>
                        <IconPark path={'material-symbols:shopping-cart-outline'} size={'60px'} />
                        <div className='d-flex flex-column gap-3'>
                            Total Sales
                            <span>Php 500,000</span>
                        </div>
                    </div>
                </section>
                <section className='d-flex flex-column py-5 px-4'>
                    <h6 className='text-light fw-bold fs-4'>Top Products</h6> 
                    <div className='d-flex justify-content-between align-items-center w-100'>
                        {loading ? (
                            // Display loading skeleton while data is being fetched
                            <div className='d-flex gap-3 p-5'>
                                <Skeleton count={2} height={50} />
                                <Skeleton count={2} height={50} />
                                <Skeleton count={2} height={50} />
                            </div>
                            ) : (
                            // Display actual data once fetched
                            <>
                            {products && products.map((product) => (
                                <div key={product._id} className='d-flex flex-column justify-content-center align-items-center p-4 rounded-3' style={{backgroundColor: '#FFFFFF80'}}>
                                    <img className='text-center mb-3' alt={'product'} src={product.product_img} width={'40%'} />
                                    <div className='d-flex flex-column justify-content-start'>
                                        <strong>Item Name: {product.item_name}</strong>
                                        <span>Products Sold: {product.soldCount} pcs.</span>
                                        <span>Total Sales Made: Php {product.soldCount * product.unit_price}.00</span>
                                    </div>
                                </div>
                            ))}
                            </>
                        )}
                    </div>
                </section>
            </section>
        </main>
    )
}

export default Dashboard