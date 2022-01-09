const paths = {
  ORIGIN: 'https://www.biztalk-api.com',
  api: {
    getToekn: '/v2/auth/getToken',
    sendAlimTalk: '/v2/kko/sendAlimTalk',
  },
};
export type TCallKey = keyof typeof paths.api;

export const Paths = {
  getFullPath(key: TCallKey) {
    return paths.ORIGIN + paths.api[key];
  },
};
