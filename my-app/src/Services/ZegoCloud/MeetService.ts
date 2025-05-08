import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

class VideoCallService{
    private readonly appId:number = 242868284;
    private readonly serverSecret:string = '3c863969534e88145f567295f5aa2a3b'; 


    generateZegoUIKit(meetCode:string):ZegoUIKitPrebuilt{
        let token = ZegoUIKitPrebuilt.generateKitTokenForTest(this.appId,this.serverSecret,meetCode,`${localStorage.getItem("id")}`,"ahmed",undefined);
        return ZegoUIKitPrebuilt.create(token);
    }

}

export default new VideoCallService();