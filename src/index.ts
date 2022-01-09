import axios from 'axios';
import { Paths, TCallKey } from './const';
import { Params, Response, ResponseCode } from './type';

export class BizTalk {
  private token: string = '';
  private expireDate: number = 0;

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
    if (key !== 'getToekn' && this.isExpire()) {
      await this.getToken();
    }

    const result = await axios.request({
      url: Paths.getFullPath(key),
      data,
      headers: {
        'Content-Type': 'application/json',
        'bt-token': this.token,
      },
    });

    if (result.status !== 200) throw Error('통신에러');
    const resultData = result.data as Response.CommonResponse;

    if (resultData.responseCode !== ResponseCode.전송성공)
      throw Error(resultData.responseCode + ':' + resultData.msg);

    return resultData as any;
  }

  public async getToken() {
    const data: Params.IGetTokenParams = {
      bsid: this.bsid,
      passwd: this.passwd,
    };
    const result = await this.call<Response.GetTokenResponse>('getToekn', data);
    this.token = result.token;
    const hour23 = 1000 * 60 * 60 * 23;
    const liveTerm = hour23;
    this.expireDate = new Date().valueOf() + liveTerm;

    return result;
  }

  public sendAlimTalk(params: Params.ISendAlimParams) {
    const _params = {
      ...params,
      senderKey: params.senderKey || this.senderKey,
    };
    if (!_params.senderKey) throw Error('must provide senderKey');
    return this.call<Response.GetTokenResponse>('getToekn', _params);
  }
}
