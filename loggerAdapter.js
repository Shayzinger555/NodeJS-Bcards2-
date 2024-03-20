import morgan from "./morganLogger.js";

const loggerAdapter = () => {
  return morgan;
};

export default loggerAdapter;
