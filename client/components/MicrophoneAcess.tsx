import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

const MicrophoneAccess = () => {
      const [hasPermission, setHasPermission] = useState(false);

      useEffect(() => {
            checkMicrophonePermission();

            handleRequestMicrophone();
      }, []);

      const checkMicrophonePermission = async () => {
            const { status } = await Audio.getPermissionsAsync();
            setHasPermission(status === 'granted');
      };

      const handleRequestMicrophone = async () => {
            if (!hasPermission) {
                  Alert.alert('Microphone Permission Required', 'Please grant microphone permission to proceed.');
                  return;
            }

            if (hasPermission) {
                  console.log('Microphone permission already granted.');
            }

            try {
                  const { status } = await Audio.requestPermissionsAsync();
                  if (status === 'granted') {
                        // ?? route them
                  } else {
                        Alert.alert('Microphone Permission Denied', 'Please enable microphone access in your device settings.');
                  }
            } catch (error) {
                  console.log('Error requesting microphone permission:', error);
            }
      };
};

export default MicrophoneAccess;