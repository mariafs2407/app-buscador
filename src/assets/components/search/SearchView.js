import {
    Input,
    Icon,
    Center,
    VStack,
    Spinner

} from 'native-base';
import React from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';

const SearchView = ({ navigation }) => {

    return (
        <Center>
            <VStack w="100%" m={2} space={5} alignSelf="center">
                <TouchableOpacity onPress={() => navigation.navigate("Busqueda")}>
                    <Input
                    
                        pointerEvents='none'
                        onTouchStart={() => navigation.navigate('Busqueda')}
                        placeholder="Buscar..."
                        editable={false}
                        width="100%"
                        borderRadius="4"
                        py="3"
                        px="1"
                        fontSize="14"
                        InputLeftElement={
                            <Icon m="2" ml="3" size="7" color="secondary.400"
                                
                                as={<MaterialIcons name="search" />} />}
                    />
                </TouchableOpacity>
            </VStack>
        </Center>
    );
}

export default SearchView;