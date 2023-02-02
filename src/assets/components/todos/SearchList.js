import { Avatar, Box, Heading, HStack, List, Spacer, VStack } from "native-base";
import React from "react";
import { useState } from "react";
import { ScrollView, Text } from "react-native";
import ListAvatar from "./ListAvatar";


const SearchList = ({ navigation, resultArray }) => {

    if (resultArray.length === 0) {
        return <Text>No se encontro resultados!!!</Text>
    }

    const [list, setList] = useState([]);
    return (
        <ScrollView>
            <Box w="100%">
                <List space={2} my={2}>
                    {
                        resultArray.map(e => (
                            <List.Item
                                key={e.id}
                                onPress={() => navigation.navigate("WebView",{url: e.url})}>
                                <Heading size="md">{e.title}</Heading>
                                <Text fontSize="xs">{e.url}</Text>

                            </List.Item>
                        ))
                    }
                </List>
            </Box>
        </ScrollView>
    )
};

export default SearchList;
