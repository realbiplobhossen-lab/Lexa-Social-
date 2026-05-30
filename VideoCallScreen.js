import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';

export default function VideoCallScreen({ navigation }) {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    let peerConnection = null;

    // WebRTC এর জন্য গুগল স্টান/টার্ন সার্ভার (ভিডিও ট্রাফিক ম্যানেজমেন্ট)
    const rtcConfig = {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    };

    useEffect(() => {
        // ১. মোবাইল ক্যামেরা এবং মাইক্রোফোন চালু করার পারমিশন ও স্ট্রিম নেওয়া
        let isFront = true;
        mediaDevices.enumerateDevices().then(sourceInfos => {
            let videoSourceId;
            for (let i = 0; i < sourceInfos.length; i++) {
                const sourceInfo = sourceInfos[i];
                if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
                    videoSourceId = sourceInfo.deviceId;
                }
            }
            mediaDevices.getUserMedia({
                audio: true,
                video: {
                    mandatory: { minWidth: 500, minHeight: 300, minFrameRate: 30 },
                    facingMode: (isFront ? "user" : "environment"),
                    optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
                }
            })
            .then(stream => {
                setLocalStream(stream); // নিজের ক্যামেরা ভিউ সেট
            })
            .catch(error => { console.log(error); });
        });

        // ২. Peer-to-Peer কানেকশন ইনিশিয়েট করা
        peerConnection = new RTCPeerConnection(rtcConfig);
        
        return () => {
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <View style={styles.container}>
            {/* রিমোট ইউজার বা অপর প্রান্তের ইউজারের ভিডিও স্ক্রিন */}
            {remoteStream && <RTCView streamURL={remoteStream.toURL()} style={styles.remoteVideo} />}
            
            {/* নিজের ফ্রন্ট ক্যামেরার ভিডিও স্ক্রিন (ছোট বক্স) */}
            {localStream && <RTCView streamURL={localStream.toURL()} style={styles.localVideo} />}
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.endCallButton}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>কল কাটুন</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    remoteVideo: { flex: 1 },
    localVideo: { width: 120, height: 180, position: 'absolute', top: 40, right: 20, borderRadius: 10, backgroundColor: '#1E293B' },
    buttonContainer: { position: 'absolute', bottom: 50, width: '100%', alignItems: 'center' },
    endCallButton: { backgroundColor: '#EF4444', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 }
});
