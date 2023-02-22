import React, { createContext, useEffect, useState } from 'react';
import { getPastReviews } from '../controller/ReviewsContoller';

export const PastReviewsContext = createContext()

const PastReviewsContextProvider = (props) => {
    const [pastReviews, setPastReviews] = useState({
        isLoading: true,
        data: null,
        error: null
    })

    useEffect(() => {
        setPastReviews({
            isLoading: true,
            data: null,
            error: null
        })
        getPastReviews(
            (data) => {
                setPastReviews({
                    isLoading: false,
                    data,
                    error: null
                })
            }, (error) => {
                setPastReviews({
                    isLoading: false,
                    data: null,
                    error: error
                })
            })
    }, [])

    return (
        <PastReviewsContext.Provider value={{ pastReviews }}>
            {props.children}
        </PastReviewsContext.Provider>
    );
};

export default PastReviewsContextProvider;