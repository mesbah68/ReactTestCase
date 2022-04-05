import { useCallback } from "react";
import { useDispatch } from "react-redux";
import types from "./types";

/**
 * Main action dispatcher
 */
export default function () {
  const dispatch = useDispatch();

  /**
   * set active chat
   */
  const setSidebarTitle = useCallback(
    (payload) => dispatch({ type: types.SET_SIDEBAR_TITLE, payload }),
    [dispatch]
  );

  return {
    setSidebarTitle
  };
}
