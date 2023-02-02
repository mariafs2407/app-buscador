import React, { useState } from 'react';
import { Dimensions, StatusBar, TouchableOpacity, Animated, Pressable } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { NativeBaseProvider, Box, Text, Center, useColorModeValue, } from 'native-base';
import SearchList from './SearchList';
import ImgList from './ImgList';


function SearchTab({ navigation,resultArray ,imgArray}) {
    const FirstRoute = () => <SearchList navigation={navigation} resultArray={resultArray}/>

    const SecondRoute = () => <ImgList navigation={navigation} imgArray={imgArray} />

    const initialLayout = {
        width: Dimensions.get('window').width
    };
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute
    });

    const [index, setIndex] = useState(0);
    const [routes] = useState([{
        key: 'first',
        title: 'Todos'
    }, {
        key: 'second',
        title: 'Imagenes'
    }]);

    const renderTabBar = (props) => {

        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <Box flexDirection="row" >
                {props.navigationState.routes.map((route, i) => {
                    const opacity = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map(inputIndex => inputIndex === i ? 1 : 0.5)
                    });
                    const color = index === i ? useColorModeValue('#000', '#e5e5e5') : useColorModeValue('#1f2937', '#a1a1aa');
                    const borderColor = index === i ? 'cyan.500' : useColorModeValue('coolGray.200', 'gray.400');

                    return <Box key={i} borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer">
                        <Pressable onPress={() => {
                            console.log(i);
                            setIndex(i);
                        }}>
                            <Animated.Text style={{
                                color
                            }}>{route.title}</Animated.Text>
                        </Pressable>
                    </Box>;

                })}
            </Box>
        )
    };


    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
        />
    )
}

export default SearchTab;