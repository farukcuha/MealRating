import mongoose from 'mongoose'

let Schema = mongoose.Schema

const foodSchema = new Schema({
    name: String
}, {
    versionKey: false
})

const Food = mongoose.model('food', foodSchema)

export default Food