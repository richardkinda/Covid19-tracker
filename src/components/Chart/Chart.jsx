import React, { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2'

import styles from './Chart.module.css'

import { fetchDailyData } from '../../api'

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {

    const [dailyData, setDailyData] = useState({})

    useEffect(() => {
        const fetchAPI = async () => {
            const fetchedData = await fetchDailyData()

            setDailyData(fetchedData)
        }

        fetchAPI()


    }, [])

    const lineChart = (
        dailyData.length ? (
            <Line
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true
                    }]
                }}
            />
        ) : null
    )

    const barChart = (
        country ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People',
                        backgroundColor: ['#005086', '#a2de96', '#e71414'],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: {
                        display: true,
                        text: `Current state in ${country}`
                    }
                }}

            />
        ) : null
    )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Chart