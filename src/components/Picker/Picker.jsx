import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'
import { fetchCountriesData } from '../../api'
import styles from './Picker.module.css'

const Picker = ({ handleCountry }) => {

    const [countries, setCountries] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            const fetchedData = await fetchCountriesData()
            setCountries(fetchedData)
        }
        fetchAPI()

    }, [setCountries])

    return (
        <FormControl onChange={(e) => {
            handleCountry(e.target.value)
        }} className={styles.formControl}>
            <NativeSelect defaultValue=''>
                <option value=''>Global</option>
                {countries.map((country, index) => {
                    return (
                        <option key={index} value={country}>{country}</option>
                    )
                })}
            </NativeSelect>
        </FormControl>
    )
}

export default Picker