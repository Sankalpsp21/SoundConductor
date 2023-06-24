import { Audio } from 'expo-av';
import { Box, Center, Flex, Heading, Text } from "native-base";
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { ArcPath } from '../landing';
import { useRouter } from 'expo-router';

export default function () {
      
      const [hasPermission, setHasPermission] = useState(false);
      const router = useRouter();

      useEffect(() => {
            (async () => {
                  const { status } = await Audio.getPermissionsAsync();
                  setHasPermission(status === 'granted');
            })();

            handleRequestMicrophone();
      }, []);


      const handleRequestMicrophone = async () => {
            const { status } = await Audio.getPermissionsAsync();
            if (!hasPermission && status !== 'granted') {
                  Alert.alert('Microphone Permission Required', 'Please grant microphone permission to proceed.');
                  return;
            }

            try {
                  const { status } = await Audio.requestPermissionsAsync();
                  if (status === 'granted') {
                        router.push('/integrations');
                  } else {
                        Alert.alert('Microphone Permission Denied', 'Please enable microphone access in your device settings.');
                  }
            } catch (error) {
                  console.log('Error requesting microphone permission:', error);
            }
      };

      return (
            <>
                  <Box bg="bg.shade" height="100%" width="100%">
                        <Flex direction="column" height="30%" width="100%">
                              <Center flex={1}>
                                    <Heading color="white" fontSize="6xl">SoundUI</Heading>
                              </Center>
                        </Flex>

                        <Box>
                              <Center>
                                    <Text color="white" fontSize="4xl" bold>Allow Permissions</Text>
                                    <Text textAlign={"center"} color="white" fontSize="xl" bold>To get started, please allow microphone access.</Text>
                              </Center>

                        </Box>
                        <Flex direction="row" justifyContent="center" marginTop="30%">
                              <ArcPath />
                        </Flex>
                  </Box>
            </>

      )
}

