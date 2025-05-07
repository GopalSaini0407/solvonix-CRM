import React, { useState, useRef, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateRangePicker = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  // Format selected date range
  const formatDateRange = (start, end) => {
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  };

  // Close picker on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // When date is selected, update and close picker
  const handleChange = (item) => {
    setState([item.selection]);
    setShowPicker(false); // auto close
  };

  return (
    <div className="relative w-fit mx-auto">
      <input
        type="text"
        readOnly
        onClick={() => setShowPicker(!showPicker)}
        value={formatDateRange(state[0].startDate, state[0].endDate)}
        className="border border-gray-300 rounded px-4 py-1 h-[37px] w-100 md:w-60 cursor-pointer shadow-sm hover:border-blue-400 focus:outline-none focus:ring focus:ring-blue-200"
      />

      {showPicker && (
        <div ref={pickerRef} className="absolute z-50 mt-2 right-[0px]">
          <DateRange
            onChange={handleChange}
            moveRangeOnFirstSelection={false}
            ranges={state}
            months={2}
            direction="horizontal"
            className="shadow-xl border rounded-lg bg-white"
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
