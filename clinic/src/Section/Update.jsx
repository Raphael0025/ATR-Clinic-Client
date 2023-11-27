import React, { useState, useEffect} from 'react'
import {GradientHeader} from 'Components'
import filler from 'assets/extra/blog.png'
import { BsClockFill, BsBookFill } from 'react-icons/bs'
import { BiShare } from 'react-icons/bi'
import { useNavigate  } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { format } from 'date-fns';

const Update = () => {
  const navigate = useNavigate()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Fetching Data from Database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/articles/latest');
        const json = await response.json();

        if (response.ok) {
          setNews(json)
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
    navigate('/newsfeed');
  }

  return (
    <section className='p-5 gap-5 container'>
      <GradientHeader title={'Recently Posted'} />
      {loading ? (
        <div className='d-flex gap-3 p-5'>
          <Skeleton count={2} height={50} />
          <Skeleton count={2} height={50} />
          <Skeleton count={2} height={50} />
        </div>
      ) : (
        <>
          {news && news.map((update) => (
            <div key={update._id} className='p-3 gap-5 d-flex rounded-4 transparent-container bg-light'>
              <div className='rounded-3 p-4 bg-success d-flex justify-content-center align-items-center '>
                <img src={update.post_img || filler} alt='blog' />
              </div>
              <div className='py-3 pe-3'>
                <div className='border-top border-bottom border-success border-3 py-2'>
                  <h2 className='mb-3 fw-bold'>{update.title}</h2>
                  <p style={{fontSize: '12px'}}><BsClockFill className='text-success'/> {update.createdAt && format(new Date(update.createdAt), 'E, MMMM do yyyy, h:mm:ss a')}</p>
                  <p className='trunc'>{update.description}</p>
                </div>
                <div className='gap-3 d-flex pt-4'>
                  <button className='btn btn-outline-success' onClick={handleSubmit}><BsBookFill /> Read</button>
                  <button className='btn btn-outline-success'><BiShare className='flip' /> Share</button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </section>
  )
}

export default Update