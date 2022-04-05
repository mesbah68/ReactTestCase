import types from "./types";

export const initialValues = {
  sidebarTitle: "",
};

export default function (state = initialValues, { type, payload }) {
  switch (type) {
    case types.SET_SIDEBAR_TITLE:
      return {
        ...state,
        sidebarTitle: payload,
      };
    default:
      return state;
  }
}
