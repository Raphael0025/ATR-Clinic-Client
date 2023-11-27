import React, { useState, useEffect } from 'react'
import { GradientHeader } from 'Components'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { AddToCart, CardItem } from 'Components'

const FeaturedPage = () => {
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
        <main className='container-fluid bg-main d-flex pt-2 p-0 m-0 vh-100'>
            <section className='container-fluid p-3 mt-5 overflow-y-auto' >
                <GradientHeader title={'Our Products'} />
                <div className='p-3 gap-3 gr container '>
                {loading ? (
                  // Display loading skeleton while data is being fetched
                  <>
                    <Skeleton count={2} height={50} />
                    <Skeleton count={2} height={50} />
                    <Skeleton count={2} height={50} />
                    <Skeleton count={2} height={50} />
                  </>
                ) : (
                  // Display actual data once fetched
                  products && products.map((product) => (
                    <CardItem data={product} key={product._id} />
                  ))
                )}  
                </div>
            </section>
          <AddToCart />
        </main>
    )
}

export default FeaturedPage