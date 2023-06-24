import { useRouter } from 'expo-router';
import { Box, Flex, Heading, Text, Center } from "native-base";
import Swiped from '../../components/SwipeList';

export default function () {
      const router = useRouter();

      return (
            <>
                  <Box bg="bg.shade" height="100%" width="100%">
                        <Flex direction="column" width="100%" h={"1/4"}>
                              <Center top={"1/3"}>
                                    <Heading color="white" fontSize="6xl" bold>SoundUI</Heading>
                              </Center>
                              <Text ml={4} top={"1/3"} color="white" fontSize="3xl" bold>Integrations</Text>
                        </Flex>
                        <Swiped/>
                  </Box>
            </>

      )
}


