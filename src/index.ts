import axios from 'axios';
import { Paths, TCallKey } from './const';
import { BIZTALK, Response, ResponseCode } from './type';

export class BizTalk {
  private token: string = '';
  private expireDate: number = 0;

//   마이페이지 클릭
// 메뉴 채널 관리 클릭
// 발신프로필키 발급
// 필수 입력값 기재 후 발신프로필 키 발급
  constructor(
    public bsid: string = process.env.BIZTALK_BSID,
    public passwd: string = process.env.BIZTALK_PASSWD,
    public senderKey: string = process.env.BIZTALK_SENDER
  ) {
    if (!bsid) throw Error('provide bsid as param or process.env.BIZTALK_BSID');
    if (!passwd)
      throw Error('provide bsid as param or process.env.BIZTALK_PASSWD');
  }

  private isExpire() {
    return this.expireDate.valueOf() < new Date().valueOf();
  }

  private async call<R extends Response.CommonResponse>(
    key: TCallKey,
    data: any
  ): Promise<R> {
    if (key !== 'getToken' && this.isExpire()) {
      await this.getToken();
    }

    const result = await axios.post(Paths.getFullPath(key), data,{
      headers: {
        'Content-Type': 'application/json',
        'bt-token': this.token,
      },
    }
    )

    if (result.status !== 200) throw Error('통신에러');
    const resultData = result.data as Response.CommonResponse;

    
    if (resultData.responseCode !== ResponseCode.전송성공)
      throw Error(resultData.responseCode + ':' + resultData.msg);

    return resultData as any;
  }

  public async getToken() {
    const data: BIZTALK.IGetTokenParams = {
      "bsid": this.bsid,
      "passwd": this.passwd,
    };
 
    
    // 발신 컴퓨터 ip biztalk
    const result = await this.call<Response.GetTokenResponse>('getToken', data);

    this.token = result.token;
    const hour23 = 1000 * 60 * 60 * 23;
    const liveTerm = hour23;
    this.expireDate = new Date().valueOf() + liveTerm;
    return result;
  }

  public sendAlimTalk(params: BIZTALK.ISendAlimParams) {
    const _params = {
      ...params,
      senderKey: params.senderKey || this.senderKey,
    };
    if (!_params.senderKey) throw Error('must provide senderKey');
    return this.call<Response.GetTokenResponse>('sendAlimTalk', _params);
  }

  public sendAlimTalkBatch(params: BIZTALK.ISendAlimTalkBatch[]) {
    params.map((p, index) => {
      params[index].senderKey = p.senderKey || this.senderKey; 
    });
    if (!params.some((p) => p.senderKey)) throw Error('must provide senderKey');

    const listResult =  {
      "msgList" : params
    }
    return this.call<Response.GetTokenResponse>('sendAlimTalkBatch', listResult);
  }
}
