import Review from "../model/Review.js"
import { executeProcessSafe } from "../utils/Utils.js"

const getTotalAverageScore = async (req, res) => executeProcessSafe(async () => {
    let totalAverage = await Review.aggregate([
        { $group: { _id: null, score: { $avg: "$score" } } }
    ])
    if(totalAverage.length > 0) res.json(parseFloat(totalAverage[0].score).toFixed(1))
    else res.json("NaN")
})

export default getTotalAverageScore