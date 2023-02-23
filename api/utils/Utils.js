import 'datejs'

export const getAverageOfScores = (reviews) => {
    var sumOfScores = 0
    reviews.forEach(review => {
        sumOfScores += parseInt(review.score)
    })
    return (sumOfScores / reviews.length)
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

export const getScoreWithEmoji = (score) => {
    var emoji = ''
    let s = parseInt(score.toFixed())
    switch (s) {
        case 1:
            emoji = '💀'
            break
        case 2:
            emoji = '😡'
            break
        case 3:
            emoji = '😱'
            break
        case 4:
            emoji = '😤'
            break
        case 5:
            emoji = '🙁'
            break
        case 6:
            emoji = '😕'
            break
        case 7:
            emoji = '🙂'
            break
        case 8:
            emoji = '😀'
            break
        case 9:
            emoji = '🤩'
            break
        case 10:
            emoji = '🥳'
            break
        default:
            emoji = ''
            break
    }
    return `${emoji} ${score.toFixed(1)} ${emoji}`
}
