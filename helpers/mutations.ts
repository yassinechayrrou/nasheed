import { fetcher } from "./fetcher";

type bodyType = {
  email: String;
  password: String;
  name?: String;
};

export const auth = async (mode: "signin" | "signup", body: bodyType) =>
  fetcher(mode, body);
