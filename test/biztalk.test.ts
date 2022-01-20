import { BizTalk } from '../src/index';
import dotenv from 'dotenv';
import path from 'path';
import { BIZTALK } from '../src/type';

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const BIZ = new BizTalk();

describe('tokenGetTest', () => {
  it('works', async () => {
    await BIZ.getToken();
  });
});

describe('sendKakaoTest', () => {
  it('works', async () => {
    await BIZ.sendAlimTalk({
      message: 'BizTalk Test 민재',
      msgIdx: 'clientTestId' + Math.floor(Math.random() * 100),
      recipient: '01075886079',
      tmpltCode: 'HelloBizTalk',
      resMethod: 'PUSH',
      countryCode: "82",
      useFailback:"N",
    });
  });
});


// 같은 번호로 할 시에는 한통만 카톡이 옴.
//title 없으면 잘됨 
const itemList: BIZTALK.ISendAlimTalkBatch[] = [
  {
   message: 'BizTalk Test 민재',
    msgIdx: 'clientTestId' + Math.floor(Math.random() * 100),
   title : '비즈톡 테스트',
   recipient: '01075886079',
   tmpltCode: 'HelloBizTalk',
   resMethod: 'PUSH',
   countryCode: "82",
  },
  {
    message: 'BizTalk Test 민재',
    msgIdx: 'clientTestId' + Math.floor(Math.random() * 100),
    recipient: '01044692223',
    tmpltCode: 'HelloBizTalk',
    resMethod: 'PUSH',
    countryCode: '82',
    // useFailback: 'Y',
    // mmsAttach: {
    //   mmsContent: '[비즈톡] 회원가입 안내\n홍길동님, 비즈톡 센터 회원 이 되신 것을 환영합니다.',
    //   callback: '01075886079',
    //   subject:'비즈톡'
    // }
  },
]

describe('sendKakaoTest', () => {
  it('works', async () => {
    await BIZ.sendAlimTalkBatch(itemList);
  });
});








