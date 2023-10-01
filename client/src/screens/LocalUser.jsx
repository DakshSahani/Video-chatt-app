import {useState, useEffect, useCallback} from 'react'
import ReactPlayer from 'react-player';
import Room from './RemoteUser.jsx'
import Button from '../utils/Button.jsx';

const quality = {
    video:{
        height:{min:640,ideal:1920,max:1920},
        width:{min:640,ideal:1920,max:1920}
    },
    audio:true
}

function Ready(){
    const [localStream,setLocalStream] = useState()
    const [cameraState,setCameraState] = useState(true)
    const [micState,setMicState] = useState(true)
    const [ready,setReady] = useState(false)

    useEffect(()=>{
        // console.log(PARAM);
        navigator.mediaDevices.getUserMedia(quality)
        .then((stream)=>{
            setLocalStream(stream);
            console.log('stream',stream)        
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    const handleCamera = useCallback(()=>{
        if(localStream){
            const videoTrack = localStream.getTracks().find(track => track.kind==='video')
            videoTrack.enabled = !cameraState
            setCameraState(prevState=>!prevState)
        }
        console.log('camera State change')
    },[cameraState, localStream])

    const handleMic = useCallback(()=>{
        if(localStream){
            const audioTrack = localStream.getTracks().find(track => track.kind==='audio')
            audioTrack.enabled = !micState
            setMicState(prevState=>!prevState)
        }
        console.log('mic state changed')
    },[localStream, micState])
    
    // const handleLeave = useCallback(()=>{
    //     if(localStream){
    //         const track = localStream.getTracks()
    //         track.enabled = false
    //         setCameraState(false);
    //     }
    //     console.log('Leave')
    // },[localStream])

    const handleReady = ()=>{
        setReady(true);
    }

    return<>
    <div className="min-h-[100vh]">
        <h1>Room</h1>
        <ReactPlayer 
            // muted
            playing
            playsinline
            url={localStream}
        />
        <Button primary={cameraState} secondary={!cameraState} rounded className="m-2" onClick={handleCamera}>Camera</Button>
        <Button primary={micState} secondary={!micState} rounded className="m-2" onClick={handleMic}>Mic</Button>
        {/* <Button primary rounded className="m-2" onClick={handleLeave}>leave</Button> */}
        <br />
        {!ready && <Button primary rounded className="m-2" onClick={handleReady}>Ready</Button>}
        {ready && <Room 
            localStream={localStream}
            setReady = {setReady}
        />}
    </div>
    </>
}

export default Ready;