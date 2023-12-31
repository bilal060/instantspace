/* eslint-disable prettier/prettier */
import { createSelector } from 'reselect';

const authSelector = state => state.auth;
const languageSelector = state => state.language;
const globalSelector = state => state.language;
const rootSelector = state => state.root;



export const reduxStateSelector = createSelector(
  authSelector,
  languageSelector,
  globalSelector,
  rootSelector,
  (auth, language , global , root) => {
    return {
      auth,
      language,
      global,
      root,
    };
  }
);  

