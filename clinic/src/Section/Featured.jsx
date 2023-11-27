import React, { useState, useEffect } from 'react'
import { GradientHeader, ProductShowcase } from 'Components'
import { useNavigate  } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Featured = () => {
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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
  
  const handleSubmit = () => {
    navigate('/featured');
  }

  return (
    <section className='p-5 gap-5 container'>
      <GradientHeader title={'Best Sellers'} />
      <div className='p-3 gap-5 container '>
        {loading ? (
          // Display loading skeleton while data is being fetched
          <div className='d-flex gap-3 p-5'>
            <Skeleton count={2} height={50} />
            <Skeleton count={2} height={50} />
            <Skeleton count={2} height={50} />
          </div>
        ) : (
          // Display actual data once fetched
          <ProductShowcase productData={products}/>
        )}
      </div>
      <div className='d-flex justify-content-center '>
        <button className='orderBtn px-3 py-2 text-uppercase text-light' onClick={handleSubmit} >View All Products</button>
      </div>
    </section>
  )
}

export default Featured