import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'
import getAverageScoresByFoods from './controller/GetAverageScoresByFoods.js'
import getAverageScoresByTime from './controller/GetAverageScoresByTime.js'
import getFoods from './controller/GetFoods.js'
import getPastReviews from './controller/GetPastReviews.js'
import getReviews from './controller/GetReviews.js'
import getTotalAverageScore from './controller/GetTotalAverageScore.js'
import insertReview from './controller/InsertReview.js';

let server = express()
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,        
    optionSuccessStatus:200
}
server.use(cors(corsOptions))
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to database');
        server.listen(process.env.PORT || 4000)
    })
    .catch((err) => {
        console.log('error occured', err);
    })

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

server.get('/', (req, res) => {
    res.send("Here comes Meal Rating Api")
})

// insert review
server.post('/reviews', insertReview)

// get reviews by time
server.get('/reviews', getReviews)

// get past reviews
server.get('/reviews/past', getPastReviews)

// get foods
server.get('/foods', getFoods)

// total average score
server.get('/statistic/total', getTotalAverageScore)

// total average scores by food
server.get('/statistic/food', getAverageScoresByFoods)

// total average scores by time
server.get('/statistic/time', getAverageScoresByTime)

export default server


