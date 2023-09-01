import { useEffect, useState , useCallback} from "react";
// import {Params} from 'react-router-dom'
import ReactPlayer from 'react-player'
import useSocket from "../context/useSocket";


// const PARAM = Params; 
const CONFIG = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
const BUTTONCLASS = "bg-indigo-500 rounded-md shadow-lg m-2 p-1 text-white";


// eslint-disable-next-line react/prop-types
function Room({localStream}){
    const [remoteStream,setRemoteStream] = useState()
    const [peerConn] = useState(new RTCPeerConnection(CONFIG))
    const socket = useSocket();
    // console.log('PARAM', PARAM);
    console.log('remoteStream',remoteStream);

    const createConnection = useCallback(async ()=>{
        console.log('conn',peerConn)
        if(localStream){
            console.log('local stream',localStream)
            // eslint-disable-next-line react/prop-types
            localStream.getTracks().forEach((track)=>{
                peerConn.addTrack(track,localStream)
            })
            peerConn.ontrack = (e)=>{
                setRemoteStream(e.streams[0]);
            }
            peerConn.onicecandidate = async (e)=>{
                if(e.candidate){
                    socket.emit('ice-candidate',e.candidate)
                }
            }
        }
    },[localStream,socket,peerConn])
    
    const createOffer = useCallback(async()=>{
        createConnection();
        if(peerConn){
            console.log('creating offer')
            const offer = await peerConn.createOffer()
            peerConn.setLocalDescription(new RTCSessionDescription(offer));
            console.log('offer created waiting to send',offer);
            socket.emit('offer',offer);
        }
    },[createConnection, socket,peerConn])
    
    const createAnswer = useCallback(async (offer)=>{
        createConnection();
        console.log('creating answer')
        if(peerConn){
            const session = new RTCSessionDescription(offer)
            peerConn.setRemoteDescription(session)
            const answer = await peerConn.createAnswer()
            peerConn.setLocalDescription(new RTCSessionDescription(answer))
            console.log('answer created waiting to send',answer);
            socket.emit('answer',answer);
        }
    },[createConnection, socket, peerConn])
    
    const setAnswer =  useCallback((answer)=>{
        console.log('setting answer')
        if(!peerConn.currentRemoteDescription)
            peerConn.setRemoteDescription(new RTCSessionDescription(answer))
    },[peerConn])

    const setIce =  useCallback((candidates)=>{
        if(peerConn) {
            console.log(candidates)
        // candidates.candidates.forEach(candidate => {
            peerConn.addIceCandidate(new RTCIceCandidate(candidates))
            .catch(error => console.error('Error adding ICE candidate:', error));
            // });
        }
    },[peerConn])
        
    useEffect(()=>{
        socket.on('remoteUser-ready',createOffer)
        return ()=>{
            socket.off('remoteUser-ready',createOffer)
        }
    },[createOffer, socket])
    useEffect(()=>{
        socket.emit('ready')
    },[socket])
    useEffect(()=>{
        socket.on('receive-offer',createAnswer)
        return ()=>{
            socket.off('receiving-offer',createAnswer)
        }
    },[createAnswer, socket])
    useEffect(()=>{
        socket.on('receive-answer',setAnswer);
        return ()=>{
            socket.off('receiving-answer',setAnswer)
        }
    },[setAnswer, socket])
    useEffect(()=>{
        socket.on('receive-ice',setIce)
        return ()=>{
            socket.off('receive-ice',setIce)
        }
    },[setIce, socket])
    
    // if(isLoading)return <div>Loading....</div>;
    const handleStop = ()=>{
        // eslint-disable-next-line react/prop-types
        localStream.getTracks().forEach((track)=>{
            track.stop();
        })
    }


    return <div>
        {remoteStream && <>    
        <ReactPlayer 
            // muted
            playing
            playsinline
            url={remoteStream}
        />
        </>
        }
        <button className={BUTTONCLASS} onClick={handleStop}>stop</button>
        {/* <button className={BUTTONCLASS} onClick={handleSwitch}>switch</button>         */}
    </div>
}

export default Room;