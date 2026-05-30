// WebRTC configuration for Peer-to-Peer Connection
export const rtcConfig = {
    iceServers: [
        {
            // গুগলের ফ্রি স্টান সার্ভার যা মোবাইল দুটির গ্লোবাল আইপি (IP) খুঁজে বের করে
            urls: [
                'stun:stun.l.google.com:19302',
                'stun:stun1.l.google.com:19302'
            ]
        }
    ]
};
