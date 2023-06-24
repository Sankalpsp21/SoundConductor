import * as Crypto from 'expo-crypto';
import { useRouter } from 'expo-router';
import { Box, Center, Flex, Heading, Image, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { Path, Svg } from "react-native-svg";

export default function () {
      // User ID?
      const UUID = Crypto.randomUUID();
      const router = useRouter();

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
                                    <Text color="white" fontSize="xl" bold>Sound Classification, Made Mobile</Text>
                              </Center>

                              <Flex direction="row" justifyContent="center" paddingTop="20%">

                                    <TouchableOpacity onPress={() => router.push('permission')}>
                                          <Image source={require('../assets/images/elip.png')} alt={"Elipsis"} />
                                          <Text bold color="white" fontSize="xl" position={"absolute"} top={"40%"} left={"17%"}>Get Started</Text>
                                    </TouchableOpacity>

                              </Flex>

                              <Flex direction="row" justifyContent="center" marginTop="30%">
                                    <ArcPath />
                              </Flex>
                        </Box>
                  </Box>
            </>

      )
}

export const ArcPath = () => (
      <Svg
            viewBox="-0.209 92.688 497.7 99.971"
            width={497.7}
            height={131.971}
            fill="none"
            stroke="white"
            strokeWidth={2}
      >
            <Path
                  d="M -1.401 131.571 C 5.885 188.644 59.807 227.42 129.697 247.48 C 271.901 288.296 480.212 251.631 496.299 133.965"
                  transform="matrix(-1, 0, 0, -1, 496.089935, 396.230286)"
            />
      </Svg>
);
