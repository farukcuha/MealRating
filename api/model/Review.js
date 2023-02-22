import mongoose from 'mongoose'

let Schema = mongoose.Schema
let ObjectId = Schema.ObjectId;

const reviewSchema = new Schema({
    food_id: ObjectId,
    meal: String,
    author: String,
    body: String,
    score: Number,
    time: Number,
    image: String
}, {
    versionKey: false
});
const Review = mongoose.model('Review', reviewSchema);

export default Review
