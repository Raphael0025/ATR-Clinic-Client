import React from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
    return (
        <main className='backgroundLogin container-fluid d-flex p-5 m-0 vh-100'>
            <section className='container d-flex justify-content-center align-items-center mt-5 px-5'>
                <div className='p-5 text-light rounded-5 background-form col-5'>
                    <div className='d-flex'>
                        <h3 className='p-2 border-bottom border-3 border-warning'><strong>Forgot Password</strong></h3>
                    </div>
                    <form>
                        <div className='d-flex flex-column w-100'>
                            <label htmlFor='fName'>User Name</label>
                            <input type='text' className='p-2 rounded-3' id='fName' placeholder='User Name' required />
                        </div>
                        <div className='d-flex flex-column w-100 mt-3'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' className='p-2 rounded-3' id='password' placeholder='Password' required />
                        </div>
                        <div className='d-flex mt-2 justify-content-end p-0 pt-2 container'>
                            <Link className='text-warning text-decoration-none'><span className='lnk txt'>Forgot Password?</span></Link>
                        </div>
                        <div className='d-flex justify-content-end p-0 pt-2 container'>
                            <button className='btn btn-outline-warning px-4'><strong>Log In</strong></button>
                        </div>
                        <div className='d-flex align-items-center justify-content-start p-0 container'>
                            <span className='txt'>Don't have an account yet?</span>
                            <Link className='text-warning text-decoration-none'><span className='txt ms-2 lnk'>Register here</span></Link>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default ForgotPassword