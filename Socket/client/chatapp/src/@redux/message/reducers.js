import { uuid } from "react-uuid";
import types from "./types";

export const initialValues = {
  messagesList: [],
};

export default function (state = initialValues, { type, payload }) {
  switch (type) {
    case types.SET_MESSAGES:
      return {
        ...state,
        messagesList: payload,
      };
    case types.REMOVE_MESSAGE:
      return {
        ...state,
        messagesList: state.messagesList.filter((msg) => msg?.messages?.id !== payload),
      };
    case types.CLEAR_ALL_MESSAGES:
      return initialValues;
    default:
      return state;
  }
}
