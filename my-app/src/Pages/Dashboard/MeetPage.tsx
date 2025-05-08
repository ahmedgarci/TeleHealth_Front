import { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import VideoCallService from "../../Services/ZegoCloud/MeetService"
import { useParams } from 'react-router-dom';

export default function VideCallPage() {
  const callContainerRef = useRef<HTMLDivElement>(null);
  const {meetCode} = useParams()

  useEffect(() => {
        const initializeMeeting = async () => {
        const zp = VideoCallService.generateZegoUIKit(meetCode as string)
        zp.
        joinRoom({
          container: callContainerRef.current!,
          sharedLinks: [
            {
              name: 'Personal link',
              url:
                window.location.protocol +
                '//' +
                window.location.host +
                window.location.pathname +
                '?roomID=' +
                meetCode,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall,
          },
        });
      };

      initializeMeeting();
    
  }, [meetCode]);


  return (
  
        <div
          className="myCallContainer"
          ref={callContainerRef}
          style={{ width: '100vw', height: '100vh' }}
        ></div>      
  );
}
