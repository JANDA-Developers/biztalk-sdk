import { BizTalk } from '../src/index';
import dotenv from 'dotenv';
import path from 'path';

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


// describe('sendKakaoTest', () => {
//   it('works', async () => {
//     await BIZ.sendAlimTalkBatch({
//       message: 'BizTalk Test 민재',
//       msgIdx: 'clientTestId' + Math.floor(Math.random() * 100),
//       recipient: '01075886079',
//       title: 'HelloBizTalk',
//       tmpltCode: 'HelloBizTalk',
//       resMethod: 'PUSH',
//       countryCode: "82",
//       useFailback:"N",
//     });
//   });
// });