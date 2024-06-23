import { atom } from "recoil";

const timeState = atom({
  key: "timeState",
  default: new Date(new Date().setDate(new Date().getDate() - 3)),
  // default: new Date(),
});

export default timeState;
