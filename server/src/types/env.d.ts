declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      REDIS_HOST: string;
      PORT: string;
      REDIS_USERNAME: string;
      REDIS_PASSWORD: string;
      REDIS_PORT: string;
      SESSION_SECRET: string;
      CORS_ORIGIN: string;
    }
  }
}

export {}
