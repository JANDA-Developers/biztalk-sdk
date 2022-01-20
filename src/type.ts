

export declare module BIZTALK {
  module Button {
    export interface IButtonCommon {
      type: ButtonTypes;
    }

    export interface WS extends IButtonCommon {
      type: ButtonTypes.WL;
      url_mobile: string;
      url_pc?: string;
    }

    export interface DS extends IButtonCommon {}
    

    export type TButton = WS | DS;
    export type TAttachment = {
      button: TButton[];
      name: string; // 버튼제목
      type: string; // 버튼타입
      scheme_android?: string;
      scheme_ios?: string;
      url_mobile?: string;
      url_pc?: string;
      chat_extra?: string;
      chat_event?: string;
      plugin_id?: string;
      reply_id?: string;
      oneclick_id?: string;
      product_id?: string;
    };
  }

  export interface IGetTokenParams {
    bsid: string;
    passwd: string;
    expire?: number; // 60 ~ 1440
    
  }
  export interface ISendAlimParams {
    msgIdx: string; // 메시지 고유값 사용자 측에서 고유한 값으로 관리되어야 한다
    msgList?: any;
    countryCode: string; // = 82
    recipient: string;
    senderKey?: string;
    appUserId?: string;
    message: string;
    tmpltCode: string;
    title?: string;
    resMethod?: string; // = PUSH
    useFailback?: 'N' | 'Y'; // 문자재처리
    mmsAttach?: TmmsAttach; //
    supplement?: string;
    attach?: Button.TAttachment;
  }

 

  export interface ISendAlimTalkBatch extends ISendAlimParams {
    messageType?: string;
  } 
}


export enum ResponseCode {
  '전송성공' = '1000',
}

export enum ButtonTypes {
  'WL' = 'WL',
  'DS' = 'DS',
}

 export type TmmsAttach = {
      mmsContent: string;
      callback: string;
      subject: string;
  }


export declare module Response {
  type CommonResponse = {
    responseCode: ResponseCode;
    msg: string;
  };

  interface GetTokenResponse extends CommonResponse {
    token: string;
  }
}
