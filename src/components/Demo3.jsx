// src/pages/ContactsForm.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function ContactsForm() {
  const [fields, setFields] = useState({});
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const token = localStorage.getItem("login_token");

  // Fetch fields from API
  useEffect(() => {
    setIsLoading(true);
    axios.get("http://localhost/crm-solvonix/api/v1/user/get/contacts/fields", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      if (res.data.message === "success") {
        const data = res.data.data;
        if (Array.isArray(data)) {
          setFields(groupFieldsByGroup(data)); // if array of fields
        } else if (typeof data === "object") {
          setFields(data); // already grouped object
        } else {
          setFields({});
        }
      } else {
        console.error("Failed to fetch fields:", res.data);
      }
    })
    .catch(err => {
      console.error("Error fetching fields:", err);
      setSubmitStatus({ type: 'error', message: 'Failed to load form fields' });
    })
    .finally(() => setIsLoading(false));
  }, [token]);

  // Group fields by field_group if API gives array
  const groupFieldsByGroup = (fieldsArray) => {
    if (!Array.isArray(fieldsArray)) return {};
    const grouped = {};
    fieldsArray.forEach(field => {
      const group = field.field_group || 'Default';
      if (!grouped[group]) grouped[group] = [];
      grouped[group].push(field);
    });
    return grouped;
  };

  const handleChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus({ type: '', message: '' });

    const submissionData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        submissionData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach(item => submissionData.append(`${key}[]`, item));
      } else {
        submissionData.append(key, value);
      }
    });

    axios.post("http://localhost/crm-solvonix/api/v1/user/save/contact", submissionData, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
    })
    .then(res => {
      if (res.data.message === "success") {
        setSubmitStatus({ type: 'success', message: '✅ Contact Saved Successfully!' });
        setFormData({});
      } else {
        setSubmitStatus({ type: 'error', message: res.data.message || 'Failed to save contact' });
      }
    })
    .catch(err => {
      console.error("Error saving contact:", err);
      setSubmitStatus({ type: 'error', message: 'Failed to save contact. Please try again.' });
    });
  };

  const parseOptions = (optionsString) => {
    if (!optionsString) return [];
    if (['countries', 'states', 'genders'].includes(optionsString)) {
      const predefinedLists = {
        countries: ["United States", "Canada", "UK", "Australia", "Germany", "France", "Japan", "India", "Brazil", "Mexico"],
        states: ["California", "Texas", "New York", "Florida", "Illinois", "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"],
        genders: ["Male", "Female", "Non-binary", "Prefer not to say"]
      };
      return predefinedLists[optionsString].map(v => ({ label: v, value: v }));
    }
    return optionsString.split(',').map(v => ({ label: v.trim(), value: v.trim() }));
  };

  const renderField = (field) => {
    const baseClasses = "w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none";
    const isRequired = field.is_required === 1;
    const fieldOptions = parseOptions(field.field_options);

    // Use saved DB value if formData is empty
    const currentValue = formData[field.field_name] ?? field.value ?? (field.is_multiple ? [] : '');

    switch (field.field_type) {
      case "String":
        return <input type="text" className={baseClasses} placeholder={field.placeholder || ""} required={isRequired} value={currentValue} onChange={e => handleChange(field.field_name, e.target.value)} />;
      case "Date":
        return <input type="date" className={baseClasses} required={isRequired} value={currentValue} onChange={e => handleChange(field.field_name, e.target.value)} />;
      case "DateTime":
        return <input type="datetime-local" className={baseClasses} required={isRequired} value={currentValue} onChange={e => handleChange(field.field_name, e.target.value)} />;
      case "Integer":
        return <input type="number" step="1" className={baseClasses} required={isRequired} value={currentValue} onChange={e => handleChange(field.field_name, parseInt(e.target.value) || "")} />;
      case "Decimal":
        return <input type="number" step="0.01" className={baseClasses} required={isRequired} value={currentValue} onChange={e => handleChange(field.field_name, parseFloat(e.target.value) || "")} />;
      case "LargeText":
        return <textarea className={baseClasses} placeholder={field.placeholder || ""} required={isRequired} rows={4} value={currentValue} onChange={e => handleChange(field.field_name, e.target.value)} />;
      case "Email":
        return <input type="email" className={baseClasses} placeholder={field.placeholder || "example@email.com"} required={isRequired} value={currentValue} onChange={e => handleChange(field.field_name, e.target.value)} />;
      case "Options":
        if (field.is_multiple === 1) {
          const selectedValues = Array.isArray(currentValue) ? currentValue : [];
          return (
            <div className="space-y-2">
              {fieldOptions.map((opt, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(opt.value)}
                    onChange={e => {
                      const updated = e.target.checked
                        ? [...selectedValues, opt.value]
                        : selectedValues.filter(v => v !== opt.value);
                      handleChange(field.field_name, updated);
                    }}
                    className="rounded"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          );
        } else {
          return (
            <div className="space-y-2">
              {fieldOptions.map((opt, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={field.field_name}
                    value={opt.value}
                    checked={currentValue === opt.value}
                    onChange={e => handleChange(field.field_name, e.target.value)}
                    className="rounded-full"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          );
        }
      case "List":
        return (
          <select
            className={baseClasses}
            required={isRequired}
            value={currentValue}
            onChange={e => handleChange(field.field_name, e.target.value)}
          >
            <option value="">-- Select --</option>
            {fieldOptions.map((opt, i) => (
              <option key={i} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );
      case "File":
        return (
          <input
            type="file"
            className={baseClasses}
            required={isRequired}
            multiple={field.is_multiple === 1}
            onChange={e => handleChange(field.field_name, field.is_multiple === 1 ? Array.from(e.target.files) : e.target.files[0])}
          />
        );
      default:
        return <input type="text" className={baseClasses} placeholder={field.placeholder || ""} required={isRequired} value={currentValue} onChange={e => handleChange(field.field_name, e.target.value)} />;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Loading Form...</h2>
        <div className="animate-pulse text-gray-600">Please wait while we load the form fields.</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">✨ Dynamic Contact Form</h2>
      
      {submitStatus.message && (
        <div className={`mb-6 p-3 rounded ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {submitStatus.message}
        </div>
      )}
      
      {Object.keys(fields).length === 0 ? (
        <div className="text-center py-10 text-gray-600">
          No form fields configured. Please use the Form Builder to create fields first.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {Object.keys(fields).map((group, index) => (
            <div key={index} className="bg-gray-50 p-5 rounded-xl shadow-sm">
              <h4 className="text-lg font-semibold text-indigo-600 mb-4">{group}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields[group]
                  .sort((a, b) => a.priority - b.priority)
                  .map((field, i) => (
                    <div key={i} className="flex flex-col">
                      <label className="mb-1 text-sm font-medium text-gray-700">
                        {field.display_text} {field.is_required === 1 && <span className="text-red-500">*</span>}
                      </label>
                      {renderField(field)}
                    </div>
                  ))}
              </div>
            </div>
          ))}
          <div className="text-right">
            <button type="submit" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition">
              💾 Save Contact
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
