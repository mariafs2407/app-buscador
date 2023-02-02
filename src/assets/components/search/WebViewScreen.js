import { Button, Center, ScrollView, Spinner } from 'native-base';
import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';

const WebViewScreen = ({ navigation, route }) => {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        console.log(route.params)
        if (route.params?.url) {
            setUrl(route.params.url)
        }
    }, [route.params?.url])

    if (url === null) return null

    return (
        <>
            {
                (loading && !url)
                    ? <Spinner />
                    : <WebView
                        source={{ uri: url }}
                        onLoadStart={(syntheticEvent) => {
                            setLoading(true)
                        }}
                        onLoadEnd={() => {
                            setLoading(false)
                        }}
                    />
            }

        </>
    );
}

export default WebViewScreen;