import { FIELD_TYPE_MAPPING } from "./constants";

export const prepareFieldPayload = (field, index) => {
  let fieldOptions = null;
  if (field.type === "options" && field.config.options) {
    fieldOptions = field.config.options.join(",");
  } else if (field.type === "list" && field.config.customItems) {
    fieldOptions = field.config.customItems.join(",");
  } else if (field.type === "list" && field.config.predefinedList) {
    fieldOptions = field.config.predefinedList;
  }
  
  return {
    field_name: field.label.toLowerCase().replace(/\s+/g, '_'),
    field_type: FIELD_TYPE_MAPPING[field.type] || "String",
    display_text: field.label,
    field_options: fieldOptions,
    is_required: field.required ? 1 : 0,
    is_multiple: (field.type === "options" && field.config.inputType === "checkbox") || 
                (field.type === "file" && field.config.multiple) ? 1 : 0,
    placeholder: field.config.placeholder || null,
    table_name: null,
    table_column: null,
    field_group: field.group || "Default",
    priority: index + 1,
    is_email: field.type === "email" ? 1 : 0
  };
};