export const refreshTokenLife = 2419200000;
export const accessTokenLife = 3600000;
export const getCookiesOptions = (nodeEnv: string) => ({
  httpOnly: true,
  secure: nodeEnv === "production"
});