import { getThisWeek, getPreviousWeek, getThisMonth, getPreviousMonth } from '../utils/DateUtils.js'
import Review from '../model/Review.js'
import { executeProcessSafe } from "../utils/Utils.js"
import { getAverageOfScores } from '../utils/Utils.js'
import { getScoreWithEmoji } from "../utils/Utils.js"

const getAverageScoresByTime = async (req, res) => executeProcessSafe(async () => {
    let thisWeek = getThisWeek().getTime()
    let previousWeek = getPreviousWeek().getTime()
    let thisMonth = getThisMonth().getTime()
    let previousMonth = getPreviousMonth().getTime()

    let thisWeeksReviews = await Review.find({ time: { $gte: thisWeek } })
    let thisWeeksAverage = getScoreWithEmoji(getAverageOfScores(thisWeeksReviews))

    let previousWeeksReviews = await Review.find({ time: { $gte: previousWeek, $lt: thisWeek } })
    let previousWeeksAverage = getScoreWithEmoji(getAverageOfScores(previousWeeksReviews))

    let thisMonthsReviews = await Review.find({ time: { $gte: thisMonth } })
    let thisMonthsAverage = getScoreWithEmoji(getAverageOfScores(thisMonthsReviews))

    let previousMonthsReviews = await Review.find({ time: { $gte: previousMonth, $lt: thisMonth } })
    let previousMonthsAverage = getScoreWithEmoji(getAverageOfScores(previousMonthsReviews))

    res.json([
        {
            title: 'Bu Hafta',
            score: thisWeeksAverage
        },
        {
            title: 'Geçen Hafta',
            score: previousWeeksAverage
        },
        {
            title: 'Bu Ay',
            score: thisMonthsAverage
        },
        {
            title: 'Geçen Ay',
            score: previousMonthsAverage
        }
    ])
})

export default getAverageScoresByTime