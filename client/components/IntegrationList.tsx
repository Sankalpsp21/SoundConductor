import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { SplashScreen, useRouter } from 'expo-router';
import { Avatar, Box, HStack, Icon, Pressable, Spacer, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

type Item = {
      id: number;
      integrationName: string;
      [key: string]: any;
};

const data: Item[] = [
      {
            id: 0,
            integrationName: 'Open Tesla Tank',
      },
      {
            id: 1,
            integrationName: 'Garage Door Opener',
      },
      {
            id: 2,
            integrationName: 'Car Locker',
      },
      {
            id: 3,
            integrationName: 'Turn On Computer',
      },
];


function ListView() {

      const router = useRouter();
      const [listData, setListData] = useState(data);

      const closeRow = (rowMap: { [x: string]: { closeRow: () => void; }; }, rowKey: string | number) => {
            if (rowMap[rowKey]) {
                  rowMap[rowKey].closeRow();
            }
      };

      const deleteRow = (rowMap: any, rowKey: any) => {
            closeRow(rowMap, rowKey);
            const newData = [...listData];
            const prevIndex = listData.findIndex(item => item.id === rowKey);
            newData.splice(prevIndex, 1);
            setListData(newData);
      };

      const onRowDidOpen = (rowKey: any) => {
            console.log('This row opened', rowKey);
      };

      const renderItem = ({ item, index }: { item: any; index: any; }
      ) => {
            return (
                  <Box bg="bg.shade">
                        <Pressable borderBottomWidth={"1"}>
                              <TouchableOpacity style={{ flex: 1, paddingLeft: 4, paddingRight: 5, paddingVertical: 6 }} onPress={() => {
                                    console.log(item.id)
                                    router.push(`/integrations/${item.id}`)
                              }}>
                                    {/* pl="4" pr="5" py="6"> */}
                                    <HStack alignItems="center" space={3}>
                                          <Avatar bg="coolGray.500" size="48px" />
                                          <VStack>
                                                <Text color="white" fontSize="md" bold>{item.integrationName}</Text>
                                          </VStack>
                                          <Spacer />
                                    </HStack>
                              </TouchableOpacity>

                        </Pressable>
                  </Box>
            );
      };


      const renderHiddenItem = (data: any, rowMap: any) => {
            return (
                  <HStack flex="1" pl="2" bg="white" justifyContent="flex-end">
                        <Pressable w="70" ml="auto" bg="coolGray.200" justifyContent="center" onPress={() => closeRow(rowMap, data.item.key)} _pressed={{
                              opacity: 0.5
                        }}>
                              <VStack alignItems="center" space={2} borderWidth={"1"} h="full" justifyContent={"center"}>
                                    <Icon as={<Entypo name="dots-three-horizontal" />} size="xs" color="coolGray.800" />
                                    <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
                                          More
                                    </Text>
                              </VStack>
                        </Pressable>
                        <Pressable w="70" bg="red.500" justifyContent="center" onPress={() => deleteRow(rowMap, data.item.key)} _pressed={{
                              opacity: 0.5
                        }}>
                              <VStack alignItems="center" space={2} h="full" justifyContent={"center"} borderTopWidth={"1"} borderBottomWidth={"1"}>
                                    <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
                                    <Text color="white" fontSize="xs" fontWeight="medium">
                                          Delete
                                    </Text>
                              </VStack>
                        </Pressable>
                  </HStack>
            );
      };

     

      return (
            <Box bg="bg.shadeDark" flex="1">
                  <SwipeListView data={listData} renderItem={renderItem} renderHiddenItem={renderHiddenItem} rightOpenValue={-130} previewRowKey={'0'} previewOpenValue={-40} previewOpenDelay={3000} onRowDidOpen={onRowDidOpen} />
            </Box>
      );
}

export default function IntegrationList() {
      return (
            <Box bg="bg.shade" height="100%" width="100%">
                  <ListView />
            </Box>
      )
}
