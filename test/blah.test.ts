import { BizTalk } from '../src/index';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, './.env'),
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
      message: '',
      msgIdx: '',
      recipient: '',
      title: '',
      tmpltCode: '',
    });
  });
});
