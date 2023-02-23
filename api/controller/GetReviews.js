import Review from "../model/Review.js"
import { getAverageOfScores } from "../utils/Utils.js"
import { executeProcessSafe } from "../utils/Utils.js"
import Food from '../model/Food.js'
import { getTimeTitle } from "../utils/DateUtils.js"
import { getScoreWithEmoji } from "../utils/Utils.js"

const getReviews = async (req, res) => executeProcessSafe(async () => {
    let queryParamTime = parseInt(req.query.time)
    let queryParamMeal = req.query.meal

    let reviews = await Review.find({ time: queryParamTime, meal: queryParamMeal })
    let foodIds = [... new Set(reviews.map(review => review.food_id.toString()))]
    var result = []
    var sum = 0
    var total = 0

    for (var i = 0; i < foodIds.length; i++) {
        let foodId = foodIds[i]
        var reviewsByFood = (await Review.find({ food_id: foodId, time: queryParamTime, meal: queryParamMeal }))
            .sort((a, b) => (a._id.getTimestamp() > b._id.getTimestamp() ? -1 : 1))
        let averageOfScores = getScoreWithEmoji(getAverageOfScores(reviewsByFood))
        let food = await Food.findById(foodId)
        sum += averageOfScores * reviewsByFood.length
        total += reviewsByFood.length
        result.push({
            food: food.name,
            score: averageOfScores,
            reviews: reviewsByFood.map(reviewByFood => {
                return {
                    author: reviewByFood.author,
                    score: reviewByFood.score,
                    body: reviewByFood.body,
                    time: getTimeTitle(reviewByFood._id.getTimestamp()),
                    image: reviewByFood.image
                }
            })
        })
    }
    let average_score = getScoreWithEmoji(sum / total)
    res.json({ average_score, result })
})

export default getReviews