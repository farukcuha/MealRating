import Review from '../model/Review.js'
import { getAverageOfScores } from '../utils/Utils.js'
import { executeProcessSafe } from "../utils/Utils.js"
import { getDayTitle } from '../utils/DateUtils.js'

const getPastReviews = async (req, res) => executeProcessSafe(async () => {
    var results = []
    var times = (await Review.distinct('time')).sort((a, b) => (a.time > b.time ? 1 : -1))
    for (var i = 0; i < times.length; i++) {
        let time = times[i]
        var reviews = await Review.find({ time: time })
        var averageScore = getAverageOfScores(reviews)
        const distinctByMeal = [...new Set(reviews.map(dbm => dbm.meal))];
        var meals = []
        distinctByMeal.forEach(dbm => {
            var reviewsByMeal = reviews.filter(review => {
                return review.meal == dbm
            })
            meals.push({
                meal: dbm,
                averageScore: getAverageOfScores(reviewsByMeal),
                review_count: reviewsByMeal.length
            })
        })
        results.push({
            score: averageScore,
            time_title: getDayTitle(time),
            time: time,
            meals: meals
        })
    }
    res.json(results)
})

export default getPastReviews