import { createSelector } from "reselect";

// memoized intent
const getSidebarTitle = (state) => state.sidebar;

export default {
  getSidebarTitle: createSelector(getSidebarTitle, (sidebar) => sidebar.sidebarTitle),
};
