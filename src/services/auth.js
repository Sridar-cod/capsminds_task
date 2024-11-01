import { getUserData,removedUserData } from "./storage";
export const isAuthentication = () => {
  return getUserData() !== null;
};
export const logout = () => {
removedUserData()
};