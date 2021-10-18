import React from 'react';

const themes = {
    light: {
        background: 'white',
        foreground: 'black'
    },
    dark: {
        background: 'black',
        foreground: 'white'
    }
};

// Créer le texte
export const ThemeContext = React.createContext(themes.light);

// Créer le provider (fournisseur)
const ThemeContextProvider = props => {
    return (
        <ThemeContext.Provider value={themes.light}>
            {props.children}
        </ThemeContext.Provider>
    );
}

// Créer le consumer (consommateur)
export default ThemeContextProvider;