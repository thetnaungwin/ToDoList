interface Config {
  googleClientId: string;
  googleClientSecret: string;
}
export const config: Config = {
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
};
