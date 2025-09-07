import {atom} from "recoil"
export type User = {
  id: string;
  email: string;
  profileSetup: boolean;
  firstName?: string;
  lastName?: string;
  color?: number;
  image?:string;
};

export const userInfoAtom= atom<User|null>({
    key:"userInfoAtom",
    default: null
})


