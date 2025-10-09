"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import axios from "axios";
import {AVAILABLE_FIELDS} from './AVAILABLE_FIELDS'
import DynamicForm from './DynamicForm'

/* ---------- MAIN Component ---------- */
export default function AddDynamicFields() {

  const [modelData,SetmodelData]=useState({})
  const [isOpen,setIsOpen]=useState(false)
  const [fieldData,setFieldData]=useState({
    field_name:"",
    field_for:"",
    field_type:"",
    display_text:"",
    field_group:"",
    placeholder:"",
    field_options:"",
    priority: 0,
    is_required: 0,
    is_email: 0


 } )

  const handleAdd=(fields)=>
    {
      // console.log(fields);
      setIsOpen(true)
      SetmodelData(fields)
      setFieldData({ ...fields,field_type: fields.field_type || "" ,field_options: fields.field_options || ""})
      
    }
  const handleSave= async(e)=>{
   e.preventDefault();
  //  console.log(fieldData);
      try {
          const token=localStorage.getItem('login_token');

          const res= await axios.post(`http://localhost/crm-solvonix/api/v1/user/save/custom/field`,
            {
              field_name:fieldData.field_name,
              field_for:fieldData.field_for ,
              field_type: fieldData.field_type,
              display_text: fieldData.display_text,
              field_group: fieldData.field_group,
              placeholder: fieldData.placeholder,
              field_options: fieldData.field_options,
              priority: fieldData.priority,
              is_required: fieldData.is_required,
              is_email: fieldData.is_email
            },
            {
              headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":"application/json"
              }
            }
          );

          console.log("data created successfully",res.data)
      } catch (error) {
        console.log("error",error)
      }
  }
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left: available fields */}
        <div className="col-span-1">
          <h1 className="text-xl font-bold mb-4">Available Fields</h1>
          <div className="border border-gray-400 rounded p-4 bg-gray-50">
            <p className="text-sm text-gray-600 mb-3">add your field in form</p>
            <div className="space-y-2">
              {AVAILABLE_FIELDS.map((f) => (
                <div
                  key={f.key}
                  className="flex items-center justify-between bg-white p-2 rounded shadow-sm border border-gray-300"
                >
                  <div>
                    <div className="font-medium">{f.key}</div>
                    <div className="text-xs text-gray-500">{f.field_type}</div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="bg-emerald-600 text-white p-1 rounded hover:bg-emerald-700"
                      title="Add field"
                      onClick={()=>handleAdd(f)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
          {isOpen && (
        <div className="fixed inset-0 z-0 bg-black/40 flex justify-center items-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg overflow-hidden p-4">
            <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4">Save Feild</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              X
            </button>
            </div>
          
            <div className="p-4">
              {/* dynamic form */}
              <DynamicForm fieldData={fieldData} setFieldData={setFieldData} handleSave={handleSave}/>
          
              </div>
          </div>
        </div>
      )}
    </div>
  );
}