export type MsgRole = 'human' | 'ai';

export interface MsgsDTO {
  messages?: MsgDTO[],
}

export interface MsgDTO {
  id: string,
  body: string,
  role: MsgRole,
  created: string,
  cheatGuess: number,
  sources: {
    name: string,
    texts: string[],
  }[],
}

export interface Msg extends MsgDTO {}

// https://github.com/ferdikoomen/openapi-typescript-codegen
