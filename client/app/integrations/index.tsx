import { Box, Center, Divider, Flex, Heading, Text } from "native-base";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Linking } from "react-native";
import IntegrationList from "../../components/IntegrationList";

export default function () {
      return (
            <>
                  <Box bg="bg.shade" height="100%" width="100%">
                        <Flex direction="column" width="100%" h={"30%"}>
                              <Center top={"1/3"}>
                                    <Heading color="white" fontSize="6xl" bold>SoundUI</Heading>
                                    <Divider bg="bg.shadeDark" />
                              </Center>
                              <Text ml={4} top={"1/3"} pt={6} color="white" fontSize="3xl" bold>Integrations</Text>
                        </Flex>
                              <Divider bg="bg.shadeDark" />
                        <IntegrationList />
                  </Box>
            </>

      )
}


