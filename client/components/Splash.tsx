import { Box, Button, Center, Flex, Heading, Text } from "native-base"

export default function Splash() {
      return (
            <>
                  <Box bg="bg.shade" height="100%" width="100%">
                        <Flex direction="column" height="100%" width="100%">
                              <Center flex={1}>
                                    <Heading color="white" fontSize="6xl">SoundUI</Heading>
                              </Center>
                        </Flex>
                  </Box>
            </>

      )
}
