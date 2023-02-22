import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLocaleDateTitle } from '../../util/DateUtil';
import { getReviews } from '../../controller/ReviewsContoller';
import Reviews from '../../components/Reviews';

const PastDetail = () => {
    const { time, meal } = useParams()
    const [reviews, setReviews] = useState({
        isLoading: true,
        data: null,
        error: null
    })

    useEffect(() => {
        setReviews({
            isLoading: true,
            data: null,
            error: null
        })
        getReviews(time, meal, (data) => {
            setReviews({
                isLoading: false,
                data,
                error: null
            })
        }, (error) => {
            setReviews({
                isLoading: false,
                data: null,
                error: error.message
            })
        })
    }, [])

    return (
        <div className="root">
            <div style={{
                display: "flex",
                alignItems: "center"
            }} className='past_detail_titles'>
                <div>
                    <h3>{getLocaleDateTitle(parseInt(time))}</h3>
                    <h5>🍽️ {meal}</h5>
                </div>
                <div style={{
                    marginRight: "0px",
                    marginLeft: "auto",
                    fontWeight: "600",
                    fontSize: "24px",
                    color: "#B20600"
                }} className='today_average_score'>
                    {(reviews.data && reviews.data.average_score) && <div>{reviews.data.average_score}</div>}
                </div>
            </div>
            <Reviews reviews={reviews} />
        </div >
    );
};

export default PastDetail