import React, { useState } from 'react';
import './ReviewItem.scss'
import ImageViewDialog from './ImageViewDialog';

const ReviewItem = ({ author, score, body, time, image }) => {
    const [showImagePreview, setImagePreviewshow] = useState(false)
    return (
        <div className="review_item_container">
            {image != null ? <img onClick={() => setImagePreviewshow(true)} className='review_image' src={image} alt="" /> : <></>}

            <ImageViewDialog
                imageUrl={image}
                title={time}
                show={showImagePreview}
                onClose={() => {
                    setImagePreviewshow(false)
                }} />

            <div className='review_text'>
                <div className="review_author">{author}</div>
                <div className="review_body">{body}</div>
                <div className="review_time">{time}</div>
            </div>
            <div className="review_score">{score}</div>
        </div>
    );
};

export default ReviewItem;