declare namespace NodeJS {
  interface ProcessEnv {
    readonly DB: string;
    readonly JWT_SECRET: string;
  }
}
