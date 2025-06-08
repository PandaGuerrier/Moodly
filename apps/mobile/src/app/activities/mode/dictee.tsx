import { View, Text } from 'react-native'
import { useAudioPlayer } from 'expo-audio';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';
import { Button } from "~/components/Button";

export default function Dictee() {
  const [loading, setLoading] = useState(false);

  function downloadAudio() {
    setLoading(true);
    const audioUrl = 'https://file-examples.com/storage/fe32c8d6966839f839df247/2017/11/file_example_MP3_700KB.mp3'; // Replace with your audio URL
    const fileUri = FileSystem.documentDirectory + 'audio.mp3';
    let audioPlayer;

    try {
      audioPlayer = useAudioPlayer();
    } catch (error) {
      console.log('Error initializing audio player:', error);
      setLoading(false);
      return;
    }

    console.log('Downloading audio from:', audioUrl);

    FileSystem.downloadAsync(audioUrl, fileUri)
      .then(async ({ uri }) => {
        console.log('Finished downloading to ', uri);
        setLoading(false);
        audioPlayer.replace(uri)
        audioPlayer.play();
        console.log('Audio is playing from:', uri);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });


  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button onPress={downloadAudio} >Tel</Button>
    </View>
  );
}
