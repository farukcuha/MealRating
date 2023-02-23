import React, { useContext } from 'react';
import './Home.scss'
import AddCommentDialog from '../../components/AddReviewDialog';
import { Link } from 'react-router-dom';
import { ReviewsContext } from '../../contexts/ReviewsContext';
import { getCurrentMeal, getLocaleDateTitle, initialDate } from '../../util/DateUtil';
import Reviews from '../../components/Reviews';

const Home = () => {
    const { reviews } = useContext(ReviewsContext)

    return (
        <div className='root'>
            <div className="home_nav_container">
                <h3>{process.env.REACT_APP_HOME_TITLE}</h3>
                <nav className='home_nav'>
                    <Link className='home_nav_item' to={'/statistic'}>İstatistik</Link>
                    <Link className='home_nav_item' to={'/past'}>Geçmiş</Link>
                </nav>
            </div>
            <div className="home_titles">
                <div>
                    <h5>{getLocaleDateTitle(initialDate().getTime())}</h5>
                    <h5>🍽️ {getCurrentMeal()}</h5>
                </div>
                <div className='today_average_score'>
                    {(reviews.data && reviews.data.average_score) && <div>{reviews.data.average_score}</div>}
                </div>
            </div>

            <AddCommentDialog />
            <Reviews reviews={reviews} />
        </div>
    );
}

export default Home;