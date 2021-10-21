export interface Token {
  accessToken: string;

  tokenType?: string;

  expiresIn: number;

  expiresAt?: Date;

  refreshToken?: string;

  type?: string;
}
