import React from 'react'

const PreOrder = () => {
    return (
        <main id='order' className=' container-fluid  '> 
            <section className='opaque-background rounded-2 container px-3 py-4 mb-2 d-flex flex-column gap-4'> 
                <h6 className='m-0 fw-bold text-warning '>Pre-Order List</h6>
                {/* <div className='d-flex flex-column'>
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
                    <div className='rounded-3 p-3' style={{backgroundColor: '#B2B2B280', fontSize: '12px'}}>
                        <div className='d-flex gap-3 rounded-3 p-3 pb-0'>
                            <span className='w-100'>{'Order ID'}</span>
                            <span className='w-100'>{'Order Date'}</span>
                            <span className='w-100'>{'Product'}</span>
                            <span className='w-100'>{'Price'}</span>
                            <span className='w-100'>{'Status'}</span>
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
                            {users && users.map((user) => (
                                <div className='d-flex gap-3 px-3 py-2 rounded-3' key={user._id} style={{backgroundColor: '#D9D9D980'}}>
                                    <span className='w-100'>{user.first_name} {user.last_name}</span>
                                    <span className='w-100'>{user.user_name}</span>
                                    <span className='w-100'>{user.gender}</span>
                                    <span className='w-100'>{user.address}</span>
                                    <span className='w-100'>{user.phone}</span>
                                </div>
                            ))}
                            </>
                        )}
                        </div>
                    </div>
                </div> */}
            </section>
        </main>
    )
}

export default PreOrder