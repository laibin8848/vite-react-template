declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}

declare module '@/*';
declare module 'pages/*';
declare module 'utils';
declare module 'stores';
declare module 'services';
declare module 'hooks';
declare module 'components/*';
declare module 'layout/*';
declare module '@types/*';
declare module 'number-random';
declare module 'markdown-it';
declare module 'codemirror';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.less';
declare module 'libs/*';
declare module 'reducer/*';

declare type CompItemType = {
  component: string,
  path: string,
  key: string,
  sub?: CompItemType[],
  icon?: string
}

declare type UserInfoType = {
  roleType: number,
  userName: string,
  avatar: string,
  userId: number,
  token?: ''
}

declare type IStore = {
  userInfo: UserInfoType
}

declare type IKeyString = {
  [key: string]: any
}
