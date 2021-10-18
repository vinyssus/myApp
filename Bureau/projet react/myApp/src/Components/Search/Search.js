// Librairie
import React from 'react';

// Contexte
import { ThemeContext } from '../../context/theme-context';

class Search extends React.Component {

    // Etiquette (ref)
    constructor(props) {
        super(props);
        this.searchRef = React.createRef();
    }

    // Contexte
    static contextType = ThemeContext;

    // Ajouter au JSX

    // Utiliser
    componentDidMount() {
        this.searchRef.focus();
    }

    render() {
        return (
            <input
                type="text"
                ref={(e) => this.searchRef = e}
                style={{
                    width: '90%',
                    display: 'block',
                    margin: 'auto',
                    padding: '3px',
                    background: this.context.background,
                    color: this.context.foreground
                }} />
        );
    }

}

export default Search;