import React, { createContext, useEffect, useState } from "react";
import { getPastReviews, getReviews } from "../controller/ReviewsContoller";
import { getCurrentMeal, initialDate } from "../util/DateUtil";

export const ReviewsContext = createContext()

const ReviewsContextProvider = (props) => {
    const [reviews, setReviews] = useState({
        isLoading: true,
        data: null,
        error: null
    })

    const getReviewsForContext = () => {
        setReviews({
            isLoading: true,
            data: null,
            error: null
        })
        getReviews(initialDate().getTime(), getCurrentMeal(),
            (data) => {
                console.log(data);
                setReviews({
                    isLoading: false,
                    data,
                    error: null
                })
            }, (error) => {
                setReviews({
                    isLoading: false,
                    data: null,
                    error: error
                })
            })
    }

    useEffect(() => {
        getReviewsForContext()
    }, [])

    return (
        <ReviewsContext.Provider value={{ reviews, getReviewsForContext }}>
            {props.children}
        </ReviewsContext.Provider>
    );
};

export default ReviewsContextProvider;