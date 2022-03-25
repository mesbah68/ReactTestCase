import types from "./types";

export const initialValues = {
  contacts: [],
};

export default function (state = initialValues, { type, payload }) {
  switch (type) {
    case types.ADD_CONTACT:
      const newContact = {
        ...payload,
      };
      return {
        ...state,
        contacts: [newContact].concat(state.contacts),
      };
    case types.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter((usr) => usr.id !== payload),
      };
    default:
      return state;
  }
}
