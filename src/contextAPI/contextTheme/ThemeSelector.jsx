import React,{useContext} from 'react';
import {ThemeContext} from './ThemeContext';

const ThemeSelector = () => {
    const { changeTheme, theme } = useContext(ThemeContext);
  
    const handleChange = (e) => {
      changeTheme(e.target.value);
    };
  
    return (
      <div className='ms-3 border-0 '>
        <select id="theme-select" className='rounded px-2 outline-0 py-1' value={theme.name} onChange={handleChange}>
          <option value="light" className='bg-black'>Light</option>
          <option value="dark" className='bg-black'>Dark</option>
          <option value="blue" className='bg-black'>Blue</option>
        </select>
      </div>
    );
  };
  
  export default ThemeSelector;
  