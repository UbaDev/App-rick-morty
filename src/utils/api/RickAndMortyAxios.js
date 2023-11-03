import { View, Text } from 'react-native'
import React, { useEffect, useState} from 'react'
import axios from "axios"
import {  ENV } from "../constants"
import HomeScreen from "../../screen/HomeScreen"

export default function RickAndMortyAxios() {

    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(ENV.API_URL_RM)
                setCharacters(response.data);
            } catch (error) {
                
            }
        }

        fetchData()
    }, []);

    return (
        <HomeScreen characters={characters} />
    )
    
}