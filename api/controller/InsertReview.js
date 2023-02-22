import Review from "../model/Review.js"
import { executeProcessSafe } from "../utils/Utils.js"

const insertReview = async (req, res) => executeProcessSafe(async () => {
    let review = new Review(req.body)
    await review.save()
    res.json({
        message: 'Review was created successfully!',
        review
    })
})

export default insertReview