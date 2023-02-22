import React, { useEffect } from 'react';
import GroupContainer from './GroupContainer';
import StateView from '../util/StateView';
import ReviewItem from './ReviewItem';

const Reviews = ({ reviews }) => {

    return (
        <div style={{ marginTop: "16px" }} className="comments_container">
            <StateView state={reviews}>
                { (reviews.data && reviews.data.result.length == 0) && <div>Henüz değerlendirme yok.</div> }
                {
                    reviews.data && reviews.data.result && reviews.data.result.map(review_group => {
                        return (
                            <GroupContainer key={review_group.food} title={review_group.food} score={review_group.score}>
                                <div className="comments">
                                    {review_group.reviews && review_group.reviews.length > 0
                                        ? review_group.reviews.map((review) => {
                                            return <ReviewItem key={review.body}
                                                author={review.author}
                                                score={review.score}
                                                body={review.body}
                                                time={review.time}
                                                image={review.image} />
                                        }) : null}
                                </div>
                            </GroupContainer>
                        )
                    })
                }
            </StateView>
        </div>
    );
};

export default Reviews;