import { fetchUser } from "../utils/fetchLocalStorageDta";

const userInfo = fetchUser();

export const initialState = {
  user: userInfo,
};
