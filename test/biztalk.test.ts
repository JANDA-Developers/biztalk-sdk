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
// 템플릿은 강조표기형 템플릿이 아니기에 강조 표기 정보 값(title) 을 넣었을 때에는 실패가 되고 ​제거 했을 때에는 성공이 되고 있습니다.
// 따라서, helloBizTalk 템플릿 사용 시, title 제거해줘야만 성공적으로 발송
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








