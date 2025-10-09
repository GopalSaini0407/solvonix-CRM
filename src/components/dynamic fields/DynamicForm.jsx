import React from 'react'

export default function DynamicForm({ fieldData, setFieldData, handleSave }) {

  const baseClasses = "p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none";

  return (
    <>
      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Label *</label>
  <input
    type="text"
    value={fieldData.display_text}
    placeholder="enter label name"
    onChange={(e) => {
      const display_text = e.target.value;

      // field_name generate from display_text
      const field_name = display_text
        ? display_text.toLowerCase().replace(/\s+/g, "_")
        : "—";

      setFieldData({
        ...fieldData,
        display_text,
        field_name,
      });
    }}
    className={baseClasses}
  />

  <p className="text-xs text-gray-500 mt-1">
    Field name: {fieldData.field_name}
  </p>
</div>

           <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
              <input type="text" 
              value={fieldData.field_type} 
              placeholder="enter field type"
              onChange={(e)=>setFieldData({...fieldData,field_type:e.target.value})}
              readOnly className={baseClasses}
              required
              />
           </div>
           <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Field Group</label>
              <input type="text"
               value={fieldData.field_group}
                className={baseClasses} 
                placeholder="enter field group"
                onChange={(e)=>setFieldData({...fieldData,field_group:e.target.value})}
                required
                 />
           </div>
           <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
              <input type="text" 
              
              value={fieldData.placeholder}
              placeholder="enter Placeholder"
              onChange={(e)=>setFieldData({...fieldData,placeholder:e.target.value})}
               className={baseClasses}
               required />
           </div>
           <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <input type="text" 
              
              value={fieldData. priority}
              placeholder="enter priority"
              onChange={(e)=>setFieldData({...fieldData, priority:e.target.value})}
               className={baseClasses}
                />
           </div>
           {fieldData.field_type === "List" || fieldData.field_type === "Options" ? (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Field Options
    </label>

    {/* Selection Mode */}
    <div className="flex gap-4 mb-2">
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="optionsMode"
          value="manual"
          checked={fieldData.options_mode === "manual"}
          onChange={() =>
            setFieldData({
              ...fieldData,
              options_mode: "manual",
              field_options: "",
            })
          }
        />
        Manual Entry
      </label>
      <label className="flex items-center gap-2">
        <input
          type="radio"
          name="optionsMode"
          value="predefined"
          checked={fieldData.options_mode === "predefined"}
          onChange={() =>
            setFieldData({
              ...fieldData,
              options_mode: "predefined",
              field_options: "",
            })
          }
        />
        Predefined List
      </label>
    </div>

    {/* Manual Input */}
    {fieldData.options_mode === "manual" && (
      <input
        type="text"
        value={fieldData.field_options}
        placeholder="Enter options (comma separated)"
        onChange={(e) =>
          setFieldData({ ...fieldData, field_options: e.target.value })
        }
        className={baseClasses}
      />
    )}

    {/* Predefined Dropdown */}
    {fieldData.options_mode === "predefined" && (
      <select
        value={fieldData.field_options}
        onChange={(e) =>
          setFieldData({ ...fieldData, field_options: e.target.value })
        }
        className={baseClasses}
      >
        <option value="">Select a list</option>
        <option value="countries">Countries</option>
        <option value="states">States</option>
        <option value="cities">Cities</option>
      </select>
    )}

    {/* Option Style (only for field_type = Options) */}
    {fieldData.field_type === "Options" && (
      <div className="mt-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Option Style
        </label>
        <select
          value={fieldData.option_style || ""}
          onChange={(e) =>
            setFieldData({ ...fieldData, option_style: e.target.value })
          }
          className={baseClasses}
        >
          <option value="">Select option style</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio</option>
        </select>
      </div>
    )}
  </div>
) : null}


         
           <div className="flex items-center gap-5">
           <label className="block m-2 text-sm  font-medium text-gray-700 mb-1">is required</label>
              <input type="checkbox"
              checked={fieldData.is_required==1}
               onChange={(e)=>setFieldData({...fieldData,is_required:e.target.checked ? 1:0})}
               className={baseClasses} />
           </div>
           {
            fieldData.field_type==='String' ?
            <div className="flex items-center gap-5">
            <label className="text-sm block font-medium text-gray-700 mb-1">Is Email</label>
               <input type="checkbox" 
               checked={fieldData.is_email==1}
               onChange={(e)=>setFieldData({...fieldData,is_email:e.target.checked ? 1:0})}
               className={baseClasses} />
            </div> :null
           }
           
             <div>
             <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Save Field
            </button>
             </div>
         
            </form>
    </>
  )
}
