import { CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { getAveragesByFood, getAveragesByTime, getTotalAverage } from '../../controller/StatisticController';
import './Statistic.scss'
import StateView from '../../util/StateView';

const Statistic = () => {
    const [totalAverage, setTotalAverage] = useState({
        isLoading: true,
        data: null,
        error: null
    })
    const [averagesByFood, setAveragesByFood] = useState({
        isLoading: true,
        data: null,
        error: null
    })
    const [averagesByTime, setAveragesByTime] = useState({
        isLoading: true,
        data: null,
        error: null
    })

    useEffect(() => {
        getTotalAverage((data) => {
            setTotalAverage({
                isLoading: false,
                data,
                error: null
            })
        }, (error) => {
            setTotalAverage({
                isLoading: false,
                data: null,
                error: error
            })
        })
        getAveragesByFood((data) => {
            setAveragesByFood({
                isLoading: false,
                data,
                error: null
            })
        }, (error) => {
            setAveragesByFood({
                isLoading: false,
                data: null,
                error: error
            })
        })
        getAveragesByTime((data) => {
            setAveragesByTime({
                isLoading: false,
                data,
                error: null
            })
        }, (error) => {
            setAveragesByTime({
                isLoading: false,
                data: null,
                error: error
            })
        })
    }, [])

    return (
        <div className='root'>
            <h1>İstatistik</h1>
            <StateView state={totalAverage}>{
                    totalAverage.data && <div className="total_average">
                        <div className="total_average_title">Genel Ortalama</div>
                        <div className="total_average_score">{totalAverage.data}</div>
                    </div>
            }</StateView>

            <StateView state={averagesByTime}>{
                    <div className='averages_by_times'>{
                        averagesByTime.data && averagesByTime.data.map(rate => {
                            return (
                                <div key={rate.title} className="average_by_time">
                                    <div className="average_by_time_title">{rate.title}</div>
                                    <div className="average_by_time_score">{rate.score}</div>
                                </div>
                            )
                        })}</div>
            }</StateView>

            
            <StateView state={averagesByFood}>{
                    <div className="averages_by_meals">{
                        averagesByFood.data && averagesByFood.data.map(rate => {
                            return (
                                <div key={rate._id} className="average_by_meal">
                                    <div className="average_by_meal_title">{rate.food}</div>
                                    <div className="average_by_meal_score">{rate.score}</div>
                                </div>
                            )
                        })
                    }</div>
            }</StateView>
        </div>
    );
};

export default Statistic;