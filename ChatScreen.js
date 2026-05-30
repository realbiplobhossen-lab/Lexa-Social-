import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { db } from '../config/firebase';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Send } from 'lucide-react-native';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let msgList = [];
      snapshot.forEach(doc => msgList.push({ id: doc.id, ...doc.data() }));
      setMessages(msgList);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    await addDoc(collection(db, "chats"), {
      sender: "Biplob",
      text: inputText,
      timestamp: Date.now()
    });
    setInputText('');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#070A13', padding: 10 }}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ alignSelf: item.sender === 'Biplob' ? 'flex-end' : 'flex-start', backgroundColor: item.sender === 'Biplob' ? '#7C3AED' : '#1E293B', padding: 10, borderRadius: 15, marginVertical: 4, maxWidth: '80%' }}>
            <Text style={{ color: '#fff', fontSize: 12 }}>{item.text}</Text>
          </View>
        )}
      />
      <div style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
        <TextInput value={inputText} onChangeText={setInputText} placeholder="মেসেজ লিখুন..." placeholderTextColor="#6B7280" style={{ flex: 1, backgroundColor: '#0D1221', color: '#fff', borderRadius: 12, paddingHorizontal: 12, height: 40 }} />
        <TouchableOpacity onPress={sendMessage} style={{ marginLeft: 8, backgroundColor: '#7C3AED', p: 10, borderRadius: 12, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
          <Send size={18} color="#fff" />
        </TouchableOpacity>
      </div>
    </View>
  );
}
