import axios from "axios";
import { API_BASE_URL } from "../App";
import executeSafeProcess from "../util/SafeCall"

export const getTotalAverage = async (onSuccess, onError) => {
    executeSafeProcess(async () => {
        return axios.get(`${API_BASE_URL}/statistic/total`)
    }, onSuccess, onError)
}

export const getAveragesByFood = async (onSuccess, onError) => {
    executeSafeProcess(async () => {
        return axios.get(`${API_BASE_URL}/statistic/food`)
    }, onSuccess, onError)
}

export const getAveragesByTime = async (onSuccess, onError) => {
    executeSafeProcess(async () => {
        return axios.get(`${API_BASE_URL}/statistic/time`)
    }, onSuccess, onError)
}