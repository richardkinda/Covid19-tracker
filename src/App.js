import React, { Component } from 'react'

import { Cards, Chart, Picker } from './components'
import { fetchCardData } from './api'

import styles from './App.module.css'

class App extends Component {

    state = {
        data: {},
        country: ''
    }

    async componentDidMount() {
        const cardsData = await fetchCardData()
        this.setState({ data: cardsData })
    }

    handleCountry = async (country) => {
        const countryData = await fetchCardData(country)
        this.setState({ data: countryData, country: country })

    }



    render() {
        const { data, country } = this.state
        return (
            <div className={styles.container}>
                <h1 className={styles.heading}>C<span role='img' aria-label='virus'>🦠</span>VID-19 Tracker</h1>
                <Cards data={data} />
                <Picker handleCountry={this.handleCountry} />
                <Chart data={data} country={country} />
            </div>
        )
    }
}

export default App