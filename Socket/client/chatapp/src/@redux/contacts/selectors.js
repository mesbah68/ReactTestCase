import { createSelector } from "reselect";

// memoized intent
const getUser = (state) => state.user;

export default {
  getContacts: createSelector(getUser, (user) => user.contacts),
  getUser: createSelector(getUser, (user) => (id) => {
    return user.contacts.filter((usr) => usr.id === id);
  }),
};
