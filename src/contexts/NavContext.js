import React, { createContext, useReducer } from "react";
import {
  PickerViewType,
  FieldType,
  DefaultBarText,
  DefaultPickerObject,
} from "../constants";

const initialState = {
  activeView: PickerViewType.DEFAULT_WHERE,
  activeInput: FieldType.NONE,
  isShowDynamicBar: false,
  whereText: DefaultBarText.WHERE,
  whenText: DefaultBarText.WHEN,
  dateInputObjects: DefaultPickerObject.WHEN_FLEX,
};
export const navReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_ACTIVE_VIEW":
      return {
        ...state,
        activeView: action.payload,
      };
    case "SHOW_DYNAMIC_BAR":
      return {
        ...state,
        isShowDynamicBar: action.payload,
      };
    case "CHANGE_ACTIVE_INPUT":
      return {
        ...state,
        activeInput: action.payload,
      };
    case "CHANGE_ACTIVE_VIEW_AND_INPUT":
      return {
        ...state,
        activeView: action.payload.activeView,
        activeInput: action.payload.activeInput,
      };
    case "CHANGE_WHERE_TEXT":
      return {
        ...state,
        whereText: action.payload,
      };
    case "CHANGE_WHEN":
      return {
        ...state,
        dateInputObjects: action.payload,
      };
    default:
      return state;
  }
};

export const NavContext = createContext();

const NavContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(navReducer, initialState);
  const changeActiveInput = (active) => {
    dispatch({
      type: "CHANGE_ACTIVE_INPUT",
      payload: active,
    });
  };
  const changeActiveView = (active) => {
    dispatch({
      type: "CHANGE_ACTIVE_VIEW",
      payload: active,
    });
  };
  const changeActiveViewAndInput = (active, input) => {
    dispatch({
      type: "CHANGE_ACTIVE_VIEW_AND_INPUT",
      payload: {
        activeView: active,
        activeInput: input,
      },
    });
  };

  const changeWhereText = (text) => {
    dispatch({
      type: "CHANGE_WHERE_TEXT",
      payload: text,
    });
  };
  const changeWhenValue = (value) => {
    dispatch({
      type: "CHANGE_WHEN",
      payload: value,
    });
  };
  const showDynamicBar = (active) => {
    dispatch({
      type: "SHOW_DYNAMIC_BAR",
      payload: active,
    });
  };

  return (
    <NavContext.Provider
      value={{
        state,
        changeActiveInput,
        changeWhereText,
        changeActiveView,
        showDynamicBar,
        changeWhenValue,
        changeActiveViewAndInput,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export default NavContextProvider;
