import React from 'react';
import { render, fireEvent, waitForElement  } from '@testing-library/react';
import FarmProduction from '.';

test('renders button to calc production', () => {
	// arrange
	const farmFields = [{
		totalArea: 14,
		plantBySquareMeter: 123,
		production: 56
	}]

	const { getByTestId } = render(<FarmProduction fields={farmFields} />);
	const buttonCalc = getByTestId('farmProductionButtonCalc');

	// assert
	expect(buttonCalc.type).toEqual('submit');
	expect(buttonCalc.textContent).toEqual('Calcular produção');
	expect(buttonCalc.disabled).toEqual(false);
});

test('renders loading states when button clicked', () => {
	// arrange
	const farmFields = [{
		totalArea: 14,
		plantBySquareMeter: 123,
		production: 56
	}]

	const { getByTestId } = render(<FarmProduction fields={farmFields} />);
	const buttonCalc = getByTestId('farmProductionButtonCalc');

	// act
	fireEvent.click(buttonCalc);
	
	// assert
	expect(buttonCalc.textContent).toEqual('Calculando...');
	expect(buttonCalc.disabled).toEqual(true);
});

test('renders result after click calc button production', async () => {
	// arrange
	const farmFields = [{
		totalArea: 14,
		plantBySquareMeter: 123,
		production: 56
	}]

	const { getByTestId } = render(<FarmProduction fields={farmFields} />);
	const buttonCalc = getByTestId('farmProductionButtonCalc');

	// act
	fireEvent.click(buttonCalc);
	const elem = await waitForElement (() => getByTestId('farmProductionResult')) 

	// assert
	expect(elem).toBeInTheDocument();
	expect(elem.className).toEqual('farm__production-result-content');
	expect(parseFloat(elem.textContent)).toEqual(farmFields[0].production);
	
});

test('renders a correct result from calculate production', async () => {
	// arrange
	const farmFields = [{
		totalArea: 14,
		plantBySquareMeter: 123,
		production: 56
	},{
		totalArea: 14,
		plantBySquareMeter: 123,
		production: 45
	}];

	let countTotalProduction = 0;
	farmFields.filter((field) => {
		countTotalProduction += field.production
	})
	
	const { getByTestId } = render(<FarmProduction fields={farmFields} />);
	const buttonCalc = getByTestId('farmProductionButtonCalc');

	// act
	fireEvent.click(buttonCalc);
	const elem = await waitForElement (() => getByTestId('farmProductionResult')) 

	// assert
	expect(parseFloat(elem.textContent)).toEqual(countTotalProduction);
});