import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
import { Link } from 'react-router-dom';

export default function Home() {

    const [bookTitle, setTitle] = useState([]);
    const [bookStory, setStory] = useState([]);
    const [localStorageDate, setLocalStorageDate] = useState('');

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/bookData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();
        // console.log(json);

        if (!json) {
            console.log("Problem in fetching book data");
        }

        var bookmark = localStorage.getItem('bookmark');
        // console.log(bookmark);
        if (bookmark != null) {
            bookmark = JSON.parse(bookmark);
            // console.log(bookmark);
            setLocalStorageDate(bookmark);
        }

        setTitle(json[1]);
        setStory(json[0]);
        // console.log(bookTitle);
        // console.log(bookStory);

    };

    useEffect(() => {
        loadData();
    }, []);


    return (
        <div>
            <Navbar />
            <div className='container'>
                {localStorageDate ?
                    (
                        bookStory.filter(data => data.title === localStorageDate).map(filterStoryData => (
                            <>
                                <div key={filterStoryData.id} className='fs-3 m-3'>
                                    <Link to={{ pathname: '/page' }} state={{ filterStoryData: filterStoryData }}> Last Visit </Link>
                                </div>
                                <br />

                                {
                                    bookTitle.length ? (
                                        bookTitle.map(titleData => (
                                            <div key={titleData.id}>
                                                {bookStory.length ? (
                                                    bookStory.filter(storyData => titleData.title === storyData.title).map(filterData => (
                                                        <div key={filterData.id}>
                                                            <div className='col-12 col-md-6 col-lg-3'>
                                                                <Cards data={[filterData.title, filterData.story]} />
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div key={titleData.id}>NO data</div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div>""""</div>
                                    )
                                }

                            </>
                        ))
                    ) : bookTitle.length ? (
                        bookTitle.map(titleData => (
                            <div key={titleData.id}>
                                {bookStory.length ? (
                                    bookStory.filter(storyData => titleData.title === storyData.title).map(filterData => (
                                        <div key={filterData.id}>
                                            <div className='col-12 col-md-6 col-lg-3'>
                                                <Cards data={[filterData.title, filterData.story]} />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div key={titleData.id}>NO data</div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div>""""</div>
                    )}
            </div>
            <Footer />


        </div>
    )
}

