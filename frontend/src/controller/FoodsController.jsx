import axios from "axios"
import executeSafeProcess from "../util/SafeCall"
import { API_BASE_URL } from "../App"

export const getFoods = async (onSuccess, onError) => {
    executeSafeProcess(async () => {
        return axios.get(`${API_BASE_URL}/foods`)
    }, onSuccess, onError)
}