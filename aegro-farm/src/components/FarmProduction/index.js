
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faCalculator, faSpinner  } from "@fortawesome/free-solid-svg-icons";

import './farmproduction.css'

const FarmProduction = (props) => {
	let [loading, setLoading] = useState(false);
	let [totalProductionFarm, setTotalProductionFarm] = useState(0);

	const calculateProduction = () => {
		props.fields.filter((field) => totalProductionFarm += parseFloat(field.production));
		setLoading(true);

		// Simulate backend execution 
		setTimeout(() => {
			setLoading(false);
			setTotalProductionFarm(totalProductionFarm.toFixed(2));
		}, 1000)
	}

	if (totalProductionFarm === 0) {
		return (
			<button data-testid="farmProductionButtonCalc" className="farm-field__small-button" onClick={calculateProduction} disabled={loading}>
				{!loading && (<>Calcular produção<FontAwesomeIcon icon={faCalculator} /></>)}
				{loading && (<>Calculando...<FontAwesomeIcon icon={faSpinner} spin/></>)}
			</button>
		)
	} else {
		return (
			<div data-testid="farmProductionResult" className="farm__production-result-content">
				<FontAwesomeIcon icon={faDollarSign} size="2x"/>
				<div className="farm__production-result">{totalProductionFarm}</div>
			</div>
		)
	}
}

export default FarmProduction;