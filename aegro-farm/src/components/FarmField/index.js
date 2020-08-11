
import React from 'react';
import './farmfield.css'
import NotFound from '../NotFound'

class FarmField extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			farmField: {
				totalArea: 0,
				plantBySquareMeter: 0,
				production: 0
			},
			validationMessage: null
		}

		this.newId = 'new';
		this.mappedFieldsByFarmField = {
			'totalArea': 'Área',
			'plantBySquareMeter': 'Quantidade de plantas por m²',
			'production': 'Produção'
		}
	}

	handleAddClick = (evt) => {
		evt.preventDefault();
		if(this.state.farmField.totalArea === 0) {
		 	this.setState({validationMessage: `O campo ${this.mappedFieldsByFarmField[Object.keys(this.state.farmField).filter(item => 'totalArea' === item)[0]]} deve ser preenchido`})
		 	return;
		}

		if(this.state.farmField.plantBySquareMeter === 0) {
		 	this.setState({validationMessage: `O campo ${this.mappedFieldsByFarmField[Object.keys(this.state.farmField).filter(item => 'plantBySquareMeter' === item)[0]]} deve ser preenchido`})
		 	return;
		}

		if(this.state.farmField.production === 0) {
		 	this.setState({validationMessage: `O campo ${this.mappedFieldsByFarmField[Object.keys(this.state.farmField).filter(item => 'production' === item)[0]]} deve ser preenchido`})
		 	return;
		}

		this.props.onAdd(this.state.farmField);
		
		this.setState(() => {
			return {
				farmField: {
					totalArea: 0,
					plantBySquareMeter: 0,
					production: 0
				}
			}
		})

	};

	handleChange = (evt) => {
		const { name, value} = evt.target;
		this.setState((prevState) => {
			return {
				farmField: {
					...prevState.farmField, [name]: value
				}
			}
		});
	}

	render(){
		if(this.props.farmId === this.newId) {
			return(
				<div className="farm__card">
					<div className="farm__card-title">Descreva as especificações do talhão</div>
					<div className="farm__form-validation">{this.state.validationMessage}</div>
					<div className="farm__form-content">
						<div className="farm__form-field">
							<label>Área (m²)</label>
							<input name="totalArea" type="number" placeholder="Ex: 50" onChange={this.handleChange}></input>
						</div>
						<div className="farm__form-field">
							<label>Quantidade de plantas por m²</label>
							<input name="plantBySquareMeter" type="number" placeholder="Ex: 120" onChange={this.handleChange}></input>
						</div>
						<div className="farm__form-field">
							<label>Produção</label>
							<input name="production" type="number" placeholder="Valor em R$ por m². Ex: 10,50" onChange={this.handleChange}></input>
						</div>
						<button className="farm-field__small-button" type="button" onClick={this.handleAddClick}>Adicionar talhão</button>
					</div>
				</div>
			)
		} else {
			return(<NotFound/>)
		}
	}
	
}

export default FarmField;