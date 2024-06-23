import { atom } from "recoil";

const timeState = atom({
  key: "timeState",
  default: new Date(),
});

export default timeState;
