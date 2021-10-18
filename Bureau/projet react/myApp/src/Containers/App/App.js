// Librairies
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import styled from 'styled-components';
import axios from '../../axios-firebase';

// Composants
import Eleve from '../../Components/Eleve/Eleve';
import MonFragment from '../../HOC/MonFragment/MonFragment';
import Search from '../../Components/Search/Search';
import ThemeContextProvider from '../../context/theme-context';
import Spinner from '../../Components/UI/Spinner/Spinner';

const MonBoutonStylise = styled.button`
  // CSS !!!
  padding: 10px 30px;
  background-color: ${props => props.transformed ? 'green' : 'black'};
  color: white;
  cursor: pointer;
  margin-bottom: 5px;

  &:hover {
    background-color: ${props => props.transformed ? 'lightgreen' : 'white'};
    color: ${props => props.transformed ? 'white' : 'black' };
  }
`;

function App() {

  // States
  const [eleves, setEleves] = useState([]);
  const [transformation, setTransformation] = useState(false);
  const [afficherEleves, setAfficherEleves] = useState(true);
  const [chargement, setChargement] = useState(false);
  
  // Etats
  useEffect(() => {
    console.log('[App.js] useEffect');

    // Récupérer les élèves
    fetchStudents();

    return() => {
      console.log('[App.js] useEffect (didUnmount)');
    }
  }, []);

  useEffect(() => {
    console.log('[App.js] useEffect (didUpdate)');
  });
  
  // Méthodes
  const buttonClickedHandler = (nouveauNom, index) => {
    const nouveauxEleves = [...eleves];
    nouveauxEleves[index].nom = nouveauNom;
    setEleves(nouveauxEleves);
    setTransformation(true);
    elementInput.current.focus();
  }

  const showHideClickedHandler = () => {
    setAfficherEleves(!afficherEleves);
  }

  const removedClickHandler = index => {
    const nouveauxEleves = [...eleves];
    nouveauxEleves.splice(index, 1);
    setEleves(nouveauxEleves);

    axios.delete('/eleves/' + eleves[index].id + '.json')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const nameChangedHandler = (event, index) => {
    const nouveauxEleves = [...eleves];
    nouveauxEleves[index].nom = event.target.value;
    setEleves(nouveauxEleves);

    axios.put('/eleves/' + eleves[index].id + '.json', nouveauxEleves[index])
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const addStudentHandler = () => {
    const eleve = {
      nom: 'Eleve Generique',
      moyenne: Math.floor(Math.random() * 20),
      citation: 'Allez toujours plus loin !'
    };

    axios.post('/eleves.json', eleve)
      .then(response => {
        console.log(response);
        fetchStudents();
      })
      .catch(error => {
        console.log(error);
      });
    
  }

  const fetchStudents = () => {
    setChargement(true);

    axios.get('/eleves.json')
      .then(response => {
        const nouveauxEleves = [];
        
        for (let key in response.data) {
          // if(response.data[key].moyenne >= 10) {
            nouveauxEleves.push({
              ...response.data[key],
              id: key
            });
          // }
        }

        // Filter
        // const elevesFiltres = nouveauxEleves.filter(eleve => eleve.moyenne >= 10);

        setEleves(nouveauxEleves);
        setChargement(false);

      })
      .catch(error => {
        console.log(error);
        setChargement(false);
      });
  }

  // Variables
  const h1Style = {
    color: 'green',
    backgroundColor: 'lightgreen',
    padding: '15px'
  };

  const elementInput = useRef(null);

  let cartes = eleves.map((eleve, index) => {
    
    let maVariableRef = null;
    if(index === 0) {
      maVariableRef = elementInput;
    }

    return (
        <Eleve
          key={index}
          nom={eleve.nom}
          moyenne={eleve.moyenne}
          clic={() => buttonClickedHandler('Lea', index)}
          supprimer={() => removedClickHandler(index)}
          changerNom={(e) => nameChangedHandler(e, index)}
          maRef={maVariableRef}
        >
          {eleve.citation}
        </Eleve>
    );
  });

  // JSX
  return (
    <ThemeContextProvider>
      <div className="App">
        <h1 style={h1Style}>Bienvenue dans la classe Terre</h1>

        {chargement ?
            <Spinner />
        :
          <>
            <MonBoutonStylise onClick={showHideClickedHandler}>Afficher / Masquer</MonBoutonStylise>

            <MonBoutonStylise transformed={transformation} onClick={buttonClickedHandler.bind(this, 'Elon', 0)}>Transformer le premier élève</MonBoutonStylise>

            <MonBoutonStylise onClick={addStudentHandler}>Ajouter un élève</MonBoutonStylise>

            <Search />

            { afficherEleves ?
              <MonFragment>
                {cartes}
              </MonFragment>
              
              : null
            }
          </>

        }

      </div>
    </ThemeContextProvider>
  );

}

export default App;

/*

  SANS CONTEXTE
  App.js -> dark
    Navigation.js -> dark
      Liens -> dark
        Lien ? dark
  
  AVEC CONTEXTE
  App.js -> créer un contexte
    Navigation.js
      Liens
        Lien -> j'utilise le contexte

*/