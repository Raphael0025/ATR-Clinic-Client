import React, { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { CreateProductModal } from 'Components' 

const ProductPage = () => {
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(true)

    // Fetching Data from Database
    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
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
        <main id='product' className=' container-fluid '> 
            <section className='opaque-background rounded-2 container px-3 py-4 d-flex flex-column gap-4'> 
                <h6 className='m-0 fw-bold text-warning '>Products</h6>
                <div className='d-flex flex-column'>
                    <div className='d-flex justify-content-between'>
                        <h4 className='text-light'>Product List</h4>
                        <button className='btn btn-warning px-3' data-bs-target="#addProduct" data-bs-toggle="modal">Add New Product</button>
                    </div>
                    <div className='d-flex gap-4 border-bottom border-warning border-5 py-4 mb-4'>
                        <div className='py-4 col-3 px-5 text-light rounded-3 d-flex flex-column ' style={{backgroundColor: '#FFFFFF80'}}>
                            <h6>New Orders</h6>
                            <span className='w-100 text-end fs-3 fw-bold'>150</span>
                        </div>
                        <div className='py-4 col-3 px-5 text-light rounded-3 d-flex flex-column ' style={{backgroundColor: '#FFFFFF80'}}>
                            <h6>Pending Orders</h6>
                            <span className='w-100 text-end fs-3 fw-bold'>150</span>
                        </div>
                    </div>
                    <div className='rounded-3 p-3' style={{backgroundColor: '#B2B2B280', fontSize: '12px'}}>
                        <div className='d-flex text-center gap-3 fw-bold rounded-3 p-3 pb-0'>
                            <span className='w-100'>{'Product'}</span>
                            <span className='w-100'>{'Stock'}</span>
                            <span className='w-100'>{'Unit Price'}</span>
                            <span className='w-100'>{'Sales'}</span>
                        </div>
                        <div className='py-3 px-2 d-flex gap-3 flex-column overflow-y-scroll ' style={{height: '460px'}}>
                        {loading ? (
                            <div className='d-flex flex-column  gap-3'>
                                <Skeleton count={2} height={50} />
                                <Skeleton count={2} height={50} />
                                <Skeleton count={2} height={50} />
                            </div>
                        ) : (
                            <>
                            {products && products.map((product) => (
                                <div className='d-flex align-items-center text-center gap-3 px-3 py-2 rounded-3' key={product._id} style={{backgroundColor: '#D9D9D980'}}>
                                    <span className='w-100 d-flex justify-content-center align-items-center gap-2'>
                                        <img src={product.product_img} width={'20%'} alt={'product'} />
                                        {product.item_name}
                                    </span>
                                    <span className='w-100'>{product.qty} pcs</span>
                                    <span className='w-100'>Php {product.unit_price}</span>
                                    <span className='w-100'>Php {product.soldCount * product.unit_price}</span>
                                </div>
                            ))}
                            </>
                        )}
                        </div>
                    </div>
                </div>
            </section>
            <CreateProductModal />
        </main>
    )
}

export default ProductPage