import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { db, storage } from '../config/firebase'; 
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default function HomeScreen({ navigation }) {
    const [posts, setPosts] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    // ১. ভিডিও আপলোড ইঞ্জিন (Firebase Cloud Storage)
    const uploadVideoFile = async (fileUri) => {
        setUploading(true);
        const response = await fetch(fileUri);
        const blob = await response.blob();
        const storageRef = ref(storage, `videos/${Date.now()}.mp4`);
        
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(Math.round(prog));
            }, 
            (error) => { console.error(error); setUploading(false); }, 
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                // ডাটাবেসে ভিডিও লিংক এবং অ্যালগরিদম ওয়েট সেভ করা
                await addDoc(collection(db, "posts"), {
                    author: "Biplob",
                    videoUrl: downloadURL,
                    likes: 0,
                    weight: 150, // অ্যালগরিদম স্কোর
                    createdAt: Date.now()
                });
                setUploading(false);
                setProgress(0);
            }
        );
    };

    // ২. রিয়েল-টাইম অ্যালগরিদম ফিড লোডার
    useEffect(() => {
        const q = query(collection(db, "posts"), orderBy("weight", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list = [];
            snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
            setPosts(list);
        });
        return () => unsubscribe();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#070A13', padding: 15 }}>
            <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 15 }}>Lexa Feed</Text>
            
            {uploading && (
                <View style={{ padding: 10, backgroundColor: '#1E1B4B', borderRadius: 10, marginBottom: 10 }}>
                    <Text style={{ color: '#A78BFA' }}>ভিডিও আপলোড হচ্ছে: {progress}%</Text>
                    <ActivityIndicator size="small" color="#7C3AED" />
                </View>
            )}

            <FlatList 
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ backgroundColor: '#0D1221', padding: 15, borderRadius: 15, marginBottom: 15, borderWith: 1, borderColor: '#1E293B' }}>
                        <Text style={{ color: '#E5E7EB', fontWeight: 'bold' }}>{item.author}</Text>
                        <Text style={{ color: '#9CA3AF', fontSize: 12, marginTop: 5 }}>[এখানে ভিডিও প্লেয়ার রেন্ডার হবে: {item.videoUrl.substring(0,30)}...]</Text>
                    </View>
                )}
            />
            
            {/* ফ্লোটিং ভিডিও কল বাটন */}
            <TouchableOpacity 
                onPress={() => navigation.navigate('VideoCall')}
                style={{ position: 'absolute', bottom: 30, right: 30, backgroundColor: '#7C3AED', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', shadowRadius: 10 }}
            >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>CALL</Text>
            </TouchableOpacity>
        </View>
    );
}
