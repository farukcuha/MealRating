import Food from '../model/Food.js'
import { executeProcessSafe } from "../utils/Utils.js"

const getFoods = async (req, res) => executeProcessSafe(async () => {
    let foods = await Food.find()
    res.json(foods)
})

export default getFoods
