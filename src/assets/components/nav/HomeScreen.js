import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, TouchableOpacity } from 'react-native';
import Search from '../search/Search';
import SearchTab from '../todos/SearchTab';
import SearchView from '../search/SearchView';
import { useEffect } from 'react';
import { useState } from 'react';

const HomeScreen = ({ navigation, route }) => {

    const [resultArray, setResultArray] = useState([]);
    const [imgArray, setImgArray] = useState([]);

    useEffect(() => {
        if (route.params?.searchResult && route.params?.imageResult) {
            setResultArray(route.params.searchResult)
            setImgArray(route.params.imageResult)
        }

    }, [route.params?.searchResult,route.params?.imageResult])

    return (
        <>
            <SearchView navigation={navigation} />
            <SearchTab
                imgArray={imgArray}
                resultArray={resultArray}
                navigation={navigation} />
        </>
    );
}

export default HomeScreen;