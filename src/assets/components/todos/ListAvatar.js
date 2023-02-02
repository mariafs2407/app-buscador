import React from 'react';
import { Box, Text, HStack, Avatar, VStack, Spacer, Center } from 'native-base';

const ListAvatar = () => {
    return (
        <Box>
            <Box pl="4" pr="5" py="2">
                <HStack alignItems="center" space={3}>
                    <Avatar size="48px" />
                    <VStack>
                        <Text color="coolGray.800" bold>
                            nombre
                        </Text>
                        <Text color="coolGray.600">
                            texto
                        </Text>
                    </VStack>
                    <Spacer />
                    <Text fontSize="xs" color="coolGray.800"
                        alignSelf="flex-start">
                        hora
                    </Text>
                </HStack>
            </Box>
        </Box>
    );
}

export default ListAvatar;