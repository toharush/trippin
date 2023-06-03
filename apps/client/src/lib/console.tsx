const consoleError = console.error;
const consoleWarn = console.warn;

const SUPPRESSED_ERRORS = ["A non-serializable value was detected"];

const SUPPRESSED_WARNINGS = [
  "MUI: You have provided an out-of-range value `null` for the select component.",
  "Warning: `value` prop on `input`",
];

const filterErrors = (msg: any, ...args: any) => {
  if (!SUPPRESSED_ERRORS.some((entry) => msg.includes(entry))) {
    // consoleError(msg, ...args);
  }
};

console.error = filterErrors;
