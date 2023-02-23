import 'datejs'

export const getAverageOfScores = (reviews) => {
    var sumOfScores = 0
    reviews.forEach(review => {
        sumOfScores += parseInt(review.score)
    })
    return (sumOfScores / reviews.length).toFixed(1)
}

export const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
}

export const executeProcessSafe = (process) => {
    try {
        process()
    } catch (error) {
        res.status(500).send('error', error)
    }
}

