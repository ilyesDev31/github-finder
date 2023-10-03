/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import githubReducers from "./gitHubReducer";
const GitHubContext = createContext();

export const GitHubData = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    notEmpty: false,
  };

  const [state, dispatch] = useReducer(githubReducers, initialState);

  // search users

  // fetch single user

  return (
    <GitHubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

export default GitHubContext;
