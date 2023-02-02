import React, { useEffect } from 'react';
import {
    Input,
    Icon,
    Center,
    VStack,
    Spinner,
    Button,
    Alert,
    HStack,
    IconButton,
    CloseIcon,
    List,
    Heading

} from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';//para presionar un texto o imagen 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = ({ navigation }) => {

    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchStorage, setSearchStorage] = useState([]);

    useEffect(() => {
        init()
    }, [])

    async function init(){
        const searches = await AsyncStorage.getItem('@searches')
        if (searches !== null) {
            const parse = JSON.parse(searches)
            setSearchStorage(parse)
        }
    }
    function searchText(text) {
        setSearch(text)
    }

    async function searchApi(query) {
        const options = {
            method: 'GET',
            url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI',
            params: {
                q: query,
                pageNumber: '1',
                pageSize: '10',
                autoCorrect: 'true'
            },
            headers: {
                'X-RapidAPI-Key': 'e13c09c485mshf8810e05b3cf13ep1d43c1jsn27b850ede480',
                'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
            }
        };

        const optionsImg = {
            method: 'GET',
            url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
            params: {
                q: query,
                pageNumber: '1',
                pageSize: '10',
                autoCorrect: 'true'
            },
            headers: {
                'X-RapidAPI-Key': 'e13c09c485mshf8810e05b3cf13ep1d43c1jsn27b850ede480',
                'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
            }
        };

        saveSearch(query);

        setIsLoading(true);
        try {
            const resWebSearch = await axios.request(options)
            const resImgSearch = await axios.request(optionsImg)
            //console.log(res.data);
            setIsLoading(false);
            //la pantalla a donde ira y la informacion que se llevara
            navigation.navigate('Home',
                {
                    searchResult: resWebSearch.data.value,
                    imageResult: resImgSearch.data.value
                })

        } catch (e) {
            console.log(e.response)
            setIsLoading(false);
            Alert.Alert('error', 'No se pudo realizar la búsqueda')
        }
    }

    //funcion para guardar los datos guardados
    async function saveSearch(search) {
        try {
            //busca la llave
            const searches = await AsyncStorage.getItem('@searches')
            console.log(searches)
            if (searches === null) {
                const searchArray = [search]
                await AsyncStorage.setItem('@searches', JSON.stringify(searchArray))//lo convierte en strign
            } else {
                //si ya existe lo desparceamos 
                const parsed = JSON.parse(searches)
                const searchArray = [...parsed, search]
                await AsyncStorage.setItem('@searches', JSON.stringify(searchArray))
            }



        } catch (e) {
            Alert.alert('error', 'no se pudo guardar los datos')
        }
    }

    function searchQuick(searchText) {
        setSearch(searchText)
        searchApi(searchText)
    }


    return (
        <Center>
            <VStack w="100%" m={2} space={5} alignSelf="center">
                <Input
                    onChangeText={(test) => searchText(test)}
                    value={search}
                    placeholder="Buscar..."
                    width="100%"
                    borderRadius="4"
                    py="3"
                    px="1"
                    fontSize="14"
                    // InputLeftElement={
                    //     <Icon m="2" ml="3" size="7" color="secondary.400"
                    //         as={<MaterialIcons name="search" />} />}
                    InputRightElement={
                        isLoading ?
                            <Spinner color="fuchsia.600" /> :
                            <Button
                                leftIcon={<Icon name="cog-outline" as={<MaterialIcons name="search" />} color="white" />}
                                colorScheme="secondary"
                                onPress={() => searchApi(search)}
                            >Buscar
                            </Button>}
                />
                <Heading size='xs' mx={4}>Busquedas anteriores:</Heading>
                {
                    searchStorage.map((e, i) => (
                        e.trim() !== '' &&
                        <List.Item 
                        key={i}
                        mx={2}
                            onPress={() => searchQuick(e)}>
                            <Text>{e}</Text>
                        </List.Item>
                    ))
                }

            </VStack>
        </Center>
    );
}

export default Search;