import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

class VideoCallService{
    private readonly appId:number = ;
    private readonly serverSecret:string = ; 


    generateZegoUIKit(meetCode:string):ZegoUIKitPrebuilt{
        let token = ZegoUIKitPrebuilt.generateKitTokenForTest(this.appId,this.serverSecret,meetCode,`${localStorage.getItem("id")}`,"ahmed",undefined);
        return ZegoUIKitPrebuilt.create(token);
    }

}

export default new VideoCallService();
