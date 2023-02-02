import React from 'react';
import { Box, Center, Heading, HStack, Image, List, Spacer, VStack } from "native-base";
import { useState } from "react";
import { ScrollView, Text } from "react-native";


const ImgList = ({ navigation, imgArray }) => {
    if (imgArray.length === 0) {
        return <Text>No se encontro ninguna imagen con ese resultados!!!</Text>
    }

    const [list, setList] = useState([]);
    return (
        <ScrollView>
            <Box w="100%">
                <List space={2} my={2}>
                    {
                        imgArray.map(e => (
                            <Center key={e.url}>
                                <Image
                                    source={{ 
                                        uri: e.url
                                    }}
                                    alt={e.name}
                                    size="xl" />
                            </Center>
                        ))
                    }
                </List>
            </Box>
        </ScrollView>
    )
}

export default ImgList;