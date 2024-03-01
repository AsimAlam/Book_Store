import React, { useEffect, useState } from 'react'
import Page from './Page'
import { Link, useNavigate } from 'react-router-dom'

export default function Cards(props) {


    const filterStoryData = {
        title: props.data[0],
        story: props.data[1]
    };

    return (
        <div>

            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.data[0]}</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <Link className="btn btn-primary" to={{ pathname: '/page' }} state={{ filterStoryData: filterStoryData }}> Read </Link>
                    {/* {
                        localStorage.getItem('bookmark') != null ?
                            (
                                
                            )
                            :
                            (
                                <>
                                    {!alertShown && (
                                        <>
                                            {setAlertShown(true)}
                                            {alert("Please login!")}
                                        </>
                                    )}
                                    {navigate('/')}
                                </>

                            )

                    } */}

                    {/* <Link to="/page" className="btn btn-primary">Read Full Story</Link> */}
                </div>
            </div>

        </div>

    )
}
