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
const corsOpts = {
    origin: '*',
    credentials: true,
    methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type']
};
server.use(cors(corsOpts))
mongoose.connect(process.env.DATABASE_URL || 'mongodb+srv://farukcuha:Ahmet+2002@cluster0.piprcy7.mongodb.net/kusculu_meal_rating_database?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
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


