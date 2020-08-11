
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDizzy  } from "@fortawesome/free-solid-svg-icons";

import './notfound.css'

const NotFound = (props) => {
	const goToFarms = () => {
		props.history.push("/farm");
	  }

	return (
		<div className="notfound">
			oOops... algo deu errado e você parece estar perdido.

			<div className="notfound__icon"><FontAwesomeIcon icon={faDizzy} size="4x"/></div>

			<button className="farm__button" type="button" onClick={goToFarms}>Voltar</button>
		</div>
	)
}

export default NotFound;