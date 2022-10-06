export const START_REQUEST = "[" + new Date() + "]. Request start...";

export const END_REQUEST_SINGLE = (timeCalc) => {
  return "[" + new Date() + `]. Request done in ${timeCalc} seconds.`;
};
