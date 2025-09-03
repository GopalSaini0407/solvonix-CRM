export const uid = () => Math.random().toString(36).slice(2, 9);

export const PREDEFINED_LISTS = {
  countries: [
    "United States", "Canada", "United Kingdom", "Australia", "Germany", 
    "France", "Japan", "India", "Brazil", "Mexico"
  ],
  states: [
    "California", "Texas", "New York", "Florida", "Illinois",
    "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"
  ],
  genders: ["Male", "Female", "Non-binary", "Prefer not to say"]
};

export const AVAILABLE_FIELDS = [
  { key: "string", label: "Text", type: "string", "is_email":0, defaultConfig: { placeholder: "" } },
  { key: "large_text", label: "Large Text", "is_email":0, type: "large_text", defaultConfig: { placeholder: "", rows: 4 } },
  { key: "list", label: "List", type: "list","is_email":0, defaultConfig: { itemPlaceholder: "", predefinedList: null, customItems: [] } },
  { key: "date", label: "Date", type: "date","is_email":0, defaultConfig: {} },
  { key: "datetime", label: "Date & Time", type: "datetime","is_email":0, defaultConfig: {} },
  { key: "integer", label: "Integer", type: "integer","is_email":0, defaultConfig: { placeholder: "", min: null, max: null } },
  { key: "decimal", label: "Decimal", type: "decimal","is_email":0, defaultConfig: { placeholder: "", step: 0.01 } },
  { key: "file", label: "File", type: "file","is_email":0, defaultConfig: { accept: ".png,.jpg", multiple: false } },
  { key: "options", label: "Options", type: "options","is_email":0, defaultConfig: { options: ["Option 1", "Option 2"], inputType: "radio" } },
  { key: "email", label: "Email", type: "email","is_email":0, defaultConfig: { placeholder: "" } },
];

export const FIELD_TYPE_MAPPING = {
  string: "String",
  large_text: "LargeText",
  list: "List",
  date: "Date",
  datetime: "DateTime",
  integer: "Integer",
  decimal: "Decimal",
  file: "File",
  options: "Options",
  email: "Email"
};

export const API_TYPE_MAPPING = Object.fromEntries(
  Object.entries(FIELD_TYPE_MAPPING).map(([key, value]) => [value, key])
);

export const LOCKED_FIELDS = ['name', 'email', 'phone'];

export const getToken = () => {
  return localStorage.getItem('login_token') || '';
};