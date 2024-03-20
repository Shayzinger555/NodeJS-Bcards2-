const DEFAULT_STRING_VALIDATION = {
  type: String,
  trim: true,
  // minLength: 2,
  maxLength: 256,
  required: false,
  default: "",
};
const DEFAULT_REQUIRED_STRING_VALIDATION = {
  ...DEFAULT_STRING_VALIDATION,
  required: true,
};
export { DEFAULT_STRING_VALIDATION, DEFAULT_REQUIRED_STRING_VALIDATION };
