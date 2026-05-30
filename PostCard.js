import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react-native';

export default function PostCard({ post, onLike }) {
  return (
    <View style={{ backgroundColor: 'rgba(13, 18, 33, 0.8)', padding: 16, borderRadius: 20, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.03)' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: '#7C3AED', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>{post.author[0]}</Text>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: '#E5E7EB', fontWeight: 'bold', fontSize: 13 }}>{post.author}</Text>
          <Text style={{ color: '#7C3AED', fontSize: 9 }}>🔥 অ্যালগরিদম ট্রেন্ডিং</Text>
        </View>
      </View>
      
      <Text style={{ color: '#D1D5DB', fontSize: 13, lineHeight: 18, marginBottom: 12 }}>{post.content}</Text>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#1E293B', paddingTop: 10 }}>
        <TouchableOpacity onPress={() => onLike(post.id)} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ThumbsUp size={16} color="#3B82F6" />
          <Text style={{ color: '#9CA3AF', fontSize: 12, marginLeft: 5 }}>{post.likes}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MessageSquare size={16} color="#7C3AED" />
          <Text style={{ color: '#9CA3AF', fontSize: 12, marginLeft: 5 }}>{post.commentsCount}</Text>
        </View>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Share2 size={16} color="#10B981" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
