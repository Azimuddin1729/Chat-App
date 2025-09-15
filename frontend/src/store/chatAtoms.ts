import { atom } from "recoil";

export const selectedChatTypeAtom = atom<string | undefined>({
  key: "selectedChatType",
  default: undefined,
});//undefined,group,direct

export const selectedChatDataAtom = atom<any | undefined>({
  key: "selectedChatData",
  default: undefined,
});//profile data of user 

export const selectedChatMessagesAtom = atom<any[]>({
  key: "selectedChatMessages",
  default: [],
});
//message/conversations related to that user //with me



// selector