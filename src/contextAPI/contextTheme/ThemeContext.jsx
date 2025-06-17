import {createContext,useState,userState} from 'react';


export const ThemeContext=createContext();

const themes={
    light:{
        name:'light',
        background:'#fff',
        color:'#000'
    },
    dark:{
        name:'dark',
        background:'#000',
        color:'#fff'
    },
    blue:{
        name:'blue',
        background:'#007BFF',
        color:'#fff'
    },
    
    

};

export const ThemeProvider=({children})=>{
    const [theme,setTheme]=useState(themes.light);

    const changeTheme=(themeName)=>{
        setTheme(themes[themeName]);
    }

    return(
        <ThemeContext.Provider value={{ theme,changeTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

