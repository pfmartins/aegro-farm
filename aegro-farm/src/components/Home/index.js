import React from 'react';
import './home.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTractor } from "@fortawesome/free-solid-svg-icons";

function Home(props) {
  const goToFarms = () => {
    props.history.push("/farm");
  }

  return (
	  <div className="home">
      <div className="home__title">Bem vindo ao Aegro Farm!</div>

      <button className="farm__button" type="button" onClick={goToFarms}>
          Acessar minhas fazendas
          <FontAwesomeIcon icon={faTractor} />
      </button>
    </div>
  );
}

export default Home;
