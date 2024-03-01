import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
import Footer from './Footer';

export default function Page() {

    const location = useLocation();
    const navigate = useNavigate();

    const handleUpdateId = async () => {

        const response = await fetch('http://localhost:5000/api/update', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: JSON.parse(localStorage.getItem('userId')),
                bookmark: JSON.parse(localStorage.getItem('bookmark'))
            })
        })
        // console.log(localStorage.getItem('bookmark'));

    }

    useEffect(() => {
        if (location.state.filterStoryData && localStorage.getItem('bookmark') !== null) {
            // console.log("inside page if condition");
            // console.log(location.state.filterStoryData.title);
            // localStorage.setItem('bookmark', JSON.stringify(title));
            // console.log(JSON.parse(localStorage.getItem('bookmark')));
        } else {
            alert("please login");
            navigate('/');
        }
    }, []);
    // localStorage.setItem('bookmark', JSON.stringify(title));
    // console.log(title);


    return (
        <div>
            <Navbar />

            <div className='fs-3 m-3'>
                {localStorage.getItem('bookmark') !== null ?
                    (
                        (() => {
                            localStorage.setItem('bookmark', JSON.stringify(location.state.filterStoryData.title));
                            handleUpdateId();
                        })()
                    ) : null
                }
                {location.state.filterStoryData.title}
            </div>
            <br />

            <p>
                {location.state.filterStoryData.story}
            </p>


            <Footer />

        </div>
    )
}
