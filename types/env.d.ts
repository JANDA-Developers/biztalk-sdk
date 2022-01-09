declare namespace NodeJS {
  interface Process {
    /** running on server */
    isServer: boolean;
  }

  interface ProcessEnv {
    BIZTALK_BSID: string;
    BIZTALK_PASSWD: string;
    BIZTALK_SENDER: string;
  }
}
