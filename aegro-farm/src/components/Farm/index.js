
import React from 'react';
import { withRouter } from "react-router";
import FarmField from '../FarmField'
import FarmProduction from '../FarmProduction'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faDizzy, faTractor, faPlus, faSpinner, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import './farm.css'

class Farm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			farmFields: [],
			farmId: null
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			this.onRouteChanged();
		}
	}

	onRouteChanged() {
		this.setState({farmFields: []})
	}

	componentWillUnmount() {
		const farmId = this.props.match.params.farmId;
		this.setState({farmId, farmFields: []})
	}

	onSelectFarm = (evt, farm) => {
		this.setState({farmId: farm.id})
		this.props.history.push(`/farm/${farm.id}`);
	}

	newFarm = () => {
		this.setState({farmId: 'new'})
		this.props.history.push("/farm/new");
		this.forceUpdate();
	}

	executeParseJSON(args) {
		if(!args) return [];
		return JSON.parse(args);
	}

	handleSubmit = (evt) => {
		evt.preventDefault();
		const farmId = Date.now();

		let farms = this.executeParseJSON(this.getFromLocalStorage('@aegro-farm/farms'));
		farms.push({id: farmId, name: this.state.name})
		this.setToLocalStorage('@aegro-farm/farms', farms);

		let fields = this.executeParseJSON(this.getFromLocalStorage('@aegro-farm/farm-fields'));
		fields.push({farmId: farmId, fields: this.state.farmFields})
		this.setToLocalStorage('@aegro-farm/farm-fields', fields);

		this.props.history.push("/farm");
		this.forceUpdate();
	}

	handleChange = (event) => {
		const target = event.target;
		this.setState({[target.name]: target.value});
	}

	handleAddFarmField = (farmField) => {
		this.setState({
			farmFields: [...this.state.farmFields, farmField],
			loading: true
		})

		// Simulate backend execution 
		setTimeout(() => {
			this.setState({loading: false})
		}, 1000)
	}

	componentWillReceiveProps() {
		this.setState({farmId: null})
		this.forceUpdate();
	}

	setToLocalStorage(key, value){
		localStorage.setItem(key, JSON.stringify(value));
	}

	getFromLocalStorage(key) {
		return localStorage.getItem(key);
	}

	getFieldsByFarmId(farmId) {
		if (!farmId || farmId === 'new') return null;

		const localFields = this.getFromLocalStorage('@aegro-farm/farm-fields');
		if (!localFields) {
			return null;
		}

		let filteredFields = JSON.parse(localFields).filter(field => field.farmId === parseInt(farmId));

		return filteredFields[0].fields;
	}

	getFarms(){
		const localFarms = this.getFromLocalStorage('@aegro-farm/farms');
		if (!localFarms) return null;

		return JSON.parse(localFarms);
	}
	
	render() {
		const { loading } = this.state;
		const farmId = this.props.match.params.farmId;
		const farms = this.getFarms();
		const fields = this.getFieldsByFarmId(farmId);
		const newId = 'new';

		let farmList = null;
		if (farms) {
			farmList = farms.map((farm) => {
				return <div key={farm.id} className="farm__card farm__card--linkeable" onClick={((e) => this.onSelectFarm(e, farm))}>
					<div className="farm__card-title">{farm.name}</div>
					<FontAwesomeIcon size="2x" icon={faTractor} />
				</div>
			})
		}

		let fieldsList = null;
		if (fields) {
			fieldsList = fields.map((field, idx) => {
				return <div key={idx} className="farm__card farm-field__card">
					<div className="farm__card-description farm__card-description--title">Talhão {idx+1}</div>
					<div className="farm__card-description">Área: {field.totalArea}</div>
					<div className="farm__card-description">Plantas por m²: {field.plantBySquareMeter}</div>
					<div className="farm__card-description">Produção: {field.production}</div>
				</div>
			})
		}

		let farm = null;
		if (farmId && farmId !== newId) {
			farm = farms.filter(farm => farm.id === parseInt(farmId));
		}

		// List page
		if (farms && !farmId) {
			return (
				<div className="farm">
					<div className="farm__title">Minhas Fazendas</div>
					<div className="farm__content">{farmList}</div>
					<div className="farm__actions">
						<button className="farm__button" type="button" onClick={this.newFarm}>
							Cadastrar <FontAwesomeIcon icon={faPlus} />
						</button>
					</div>
				</div>
			)
		} else if(!farmId) {
			return (
				<div className="farm">
					<div className="farm__empty">
						Você não possui fazendas cadastradas, deseja cadastrar?
						<div className="farm__empty-icon"><FontAwesomeIcon icon={faDizzy} size="4x"/></div>
					</div>
					<button className="farm__button" type="button" onClick={this.newFarm}>
						Nova fazenda <FontAwesomeIcon icon={faPlus} />
					</button>
				</div>
			)
		}

		// Description page
		if (farmId && farmId !== newId) {
			return (
				<div className="farm">
					<div className="farm__title">Detalhes da fazenda: <strong>{farm[0].name}</strong></div>
					<div className="farm__content farm__content--column">
						<div className="farm-field__description farm-field__description--two-columns">
							<div>Nome: <br/>{farm[0].name}</div>
							<div>Produção total:<br/>
								<FarmProduction fields={fields}/>
							</div>
						</div>
						<div className="farm-field__description">Talhões:</div>
						<div className="farm-field__content">{fieldsList}</div>
					</div>
				</div>
			)
		}

		// Create page
		if (farmId && farmId === newId) {
			return (
				<div className="farm" onClick={this.props.onClick}>
					<div className="farm__title">Nova fazenda</div>
					<div className="farm__content farm__content--column farm__form">
						<form onSubmit={this.handleSubmit}>
							<div className="farm__form-field">
								<label>Nome</label>
								<input required={true} name="name" type="text" placeholder="Ex: FarmVille" onChange={this.handleChange}/>
							</div>
							<div className="farm__form-field">
								<label>Talhões</label>
								{this.state.farmFields[0] &&
									this.state.farmFields.map((item, idx) => {
										return <div key={idx}>
											<b>Talhão {idx+1}</b><br/>
											Área (m²): {item.totalArea}<br/>
											Quantidade de plantas por m²: {item.plantBySquareMeter}<br/>
											Produção: {item.production}
											<div className="farm-field__separator"></div>
										</div>	
									})
								}
								{!this.state.farmFields[0] && 
									<div className="form-field__add-field-message"><FontAwesomeIcon icon={faExclamationCircle} /> Adicione pelo menos 1 talhão</div>}
								{!loading && 
									<FarmField loading={loading} farmId={farmId} onAdd={this.handleAddFarmField}/>}
							</div>
							<div className="farm__actions">
								<button className="farm__button" type="submit" disabled={loading || !this.state.farmFields[0]}>
									{!loading && (<>Salvar <FontAwesomeIcon icon={faSave}/></>) }
									{loading && <FontAwesomeIcon icon={faSpinner} spin /> }
								</button>
							</div>
						</form>
					</div>
				</div>
			)
		}
	}
}

export default withRouter(Farm);