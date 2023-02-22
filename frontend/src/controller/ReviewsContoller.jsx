import axios from "axios"
import { API_BASE_URL } from "../App"
import executeSafeProcess from "../util/SafeCall"

export const getPastReviews = async (onSuccess, onError) => {
    executeSafeProcess(async () => {
        return axios.get(`${API_BASE_URL}/reviews/past`)
    }, onSuccess, onError)
}

export const getReviews = async (time, meal, onSuccess, onError) => {
    executeSafeProcess(async () => {
        return axios.get(`${API_BASE_URL}/reviews`, {
            params: { time, meal }
        })
    }, onSuccess, onError)
}

export const insertReview = (reviewRequest, onSuccess, onError) => {
    executeSafeProcess(async () => {
        return axios.post(`${API_BASE_URL}/reviews`, reviewRequest)
    }, onSuccess, onError)
}