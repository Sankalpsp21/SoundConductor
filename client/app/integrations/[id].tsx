import { useSearchParams } from "expo-router";
import { Box, Button, Center, Divider, Flex, Heading, Pressable, Text } from 'native-base';
import React from "react";
import { SelectInput } from "../../components/SelectInput";

export type Input = {
      id: number;
      inputName: string;
      [key: string]: any;
};

export type Output = {
      id: number;
      outputName: string;
      [key: string]: any;
};

const inputs: Input[] = [
      {
            id: 0,
            inputName: 'Clap',
      },
      {
            id: 1,
            inputName: 'Snap',
      },
      {
            id: 2,
            inputName: 'Whistle',
      },
      {
            id: 3,
            inputName: 'Bark',
      }
];

export default function () {
      const { id } = useSearchParams();

      return (
            <>
                  <Box bg="bg.shade" height="100%" width="100%">
                        <Flex direction="column" width="100%" h={"30%"}>
                              <Center top={"1/3"}>
                                    <Heading color="white" fontSize="6xl" bold>SoundUI</Heading>
                              </Center>
                              <Text ml={4} top={"1/3"} pt={6} mb={4} color="white" fontSize="3xl" bold>Integration {id}</Text>
                              <Divider bg="bg.shadeDark" />
                        </Flex>

                        <Divider bg="bg.shadeDark" />

                        <Flex direction="column" width="100%">
                              <Box px={4}>
                                    <Text textAlign={"left"} color="white" fontSize="xl" bold>Input</Text>
                              </Box>
                              <Box px={4}>
                                    {inputs && <SelectInput inputs={inputs} />}
                              </Box>

                              <Flex direction="row" mt={2} alignItems="center">
                                    <Box px={4} mt={2}>
                                          <Text textAlign={"left"} color="white" fontSize="xl" bold>Outputs</Text>
                                    </Box>

                                    <Box px={4} mt={2}>
                                          <Button onPress={() => console.log('Add Output')} colorScheme="black" variant="outline" size="md">
                                                Add Output
                                          </Button>
                                    </Box>
                              </Flex>

                              <Box px={4} mt={2}>
                                    <Outputs />
                              </Box>

                        </Flex>
                  </Box>
            </>
      )
}

const Outputs: React.FC = () => {
      const outputs: Output[] = [
            {
                  id: 0,
                  outputName: 'Open Window Blind',
            },
            {
                  id: 1,
                  outputName: 'Trigger Garage Door',
            },
            {
                  id: 2,
                  outputName: 'Unlock Car',
            },
            {
                  id: 3,
                  outputName: 'Start Car Engine',
            }
      ];

      const [data, setData] = React.useState(outputs);

      return (
            <>
                  {data.map((output: Output) => (
                        <Pressable key={output.id} onPress={() => console.log(output.outputName)} _pressed={{ opacity: 0.5 }}>
                              <Box key={output.id} px={4} backgroundColor="bg.shadeDark" borderRadius={10} p={2} my={2}>
                                    <Text textAlign={"left"} color="white" fontSize="xl" bold>{output.outputName}</Text>
                              </Box>
                        </Pressable>
                  ))}
            </>
      )
}