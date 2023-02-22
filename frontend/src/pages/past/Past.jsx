import React, { useContext } from 'react';
import './Past.scss'
import GroupContainer from '../../components/GroupContainer';
import { Link } from 'react-router-dom';
import { ReviewsContext } from '../../contexts/ReviewsContext';
import StateView from '../../util/StateView';
import { PastReviewsContext } from '../../contexts/PastReviewsContext';

const Past = () => {
    const { pastReviews } = useContext(PastReviewsContext)

    return (
        <div className='root'>
            <h3>Geçmiş</h3>
            <StateView state={pastReviews}>
                {(pastReviews.data && pastReviews.data.length == 0) && <div>Henüz değerlendirme yok.</div>}
                {
                    pastReviews.data && pastReviews.data.map(past_item => {
                        return (
                            <GroupContainer title={past_item.time_title} score={past_item.score}>
                                {
                                    past_item.meals.map(meal => {
                                        return (
                                            <Link className="past_review" to={`detail/${past_item.time}/${meal.meal}`}>
                                                <div>
                                                    <div className="meal">{meal.meal}</div>
                                                    <div className="review_count">{meal.review_count} Değerlendirme</div>
                                                </div>
                                                <div className="rate">{meal.averageScore}</div>
                                            </Link>
                                        )
                                    })
                                }
                            </GroupContainer>
                        )
                    })
                }
            </StateView>

        </div>
    )
}

export default Past
