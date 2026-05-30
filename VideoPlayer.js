import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
// বাস্তবে এক্সপো বিল্ডের সময় এটি 'expo-av' প্লাগইন ব্যবহার করে চলে
import { Video } from 'expo-av'; 

export default function VideoPlayer({ videoUrl }) {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: videoUrl }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={false}
        isLooping
        useNativeControls
        style={styles.video}
        usePoster
        posterSource={{ uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', height: 220, borderRadius: 15, overflow: 'hidden', backgroundColor: '#000', marginVertical: 8 },
  video: { width: '100%', height: '100%' }
});
