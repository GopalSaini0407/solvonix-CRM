import React from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

const SaveStatus = ({ message, onDismiss }) => {
  if (!message.text) return null;
  
  return (
    <div className={`mb-4 p-3 rounded flex items-center gap-2 ${
      message.type === 'success' 
        ? 'bg-green-100 text-green-800 border border-green-200' 
        : 'bg-red-100 text-red-800 border border-red-200'
    }`}>
      {message.type === 'success' ? (
        <CheckCircle className="w-5 h-5" />
      ) : (
        <AlertCircle className="w-5 h-5" />
      )}
      <span>{message.text}</span>
      <button 
        onClick={onDismiss} 
        className="ml-auto"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SaveStatus;