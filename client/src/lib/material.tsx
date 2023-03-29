import { makeStyles as makeStyle } from "@mui/styles";

export const makeStyles = (stylesCreator: any, options?: object) => {
  return makeStyle(stylesCreator, options) as Function;
};
