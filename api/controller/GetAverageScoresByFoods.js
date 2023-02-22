import Review from '../model/Review.js'
import { executeProcessSafe } from "../utils/Utils.js"

const getAverageScoresByFoods = async (req, res) => executeProcessSafe(async () => {
    let averagesByFoodId = await Review.aggregate([
        { $group: { _id: "$food_id", score: { $avg: "$score" } } },
        { $sort: { score: -1 } },
        {
            $lookup:
            {
                from: "foods",
                localField: "_id",
                foreignField: "_id",
                as: "food"
            }
        },
        { $unwind: "$food" },
        {
            $project: {
                _id: "$_id",
                food: "$food.name",
                score: "$score",
            }
        }
    ])
    res.json(averagesByFoodId.map((food) => {
        return {
            _id: food._id,
            food: food.food,
            score: food.score.toFixed(1)
        }
    }))
})

export default getAverageScoresByFoods