import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

export const fetchCardData = async (country) => {

    let changeableURL = url
    if (country) {
        changeableURL = `${url}/countries/${country}`
    }

    try {
        const { data: { confirmed, deaths, recovered, lastUpdate } } = await axios.get(changeableURL)
        return { confirmed, deaths, recovered, lastUpdate }
    } catch (error) {
        console.log(error)
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`)
        return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }))
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountriesData = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`)
        //console.log(countries)
        return countries.map((country) => country.name)
    } catch (error) {
        console.log(error);
    }
}
