import React, { useState, useEffect } from 'react';

const YourComponent = () => {
	const [fromCityOptions, setFromCityOptions] = useState([]);
	const [toCityOptions, setToCityOptions] = useState([]);
	const [packageSizeOptions, setPackageSizeOptions] = useState([]);
	const [selectedPackageSize, setSelectedPackageSize] = useState(null);
	const [selectedFromCity, setSelectedFromCity] = useState(null);
	const [selectedToCity, setSelectedToCity] = useState(null);

	const [deliveryCost, setDeliveryCost] = useState(null);

	useEffect(() => {
		const fetchCities = async () => {
			try {
				const response = await fetch('https://shift-backend.onrender.com/delivery/points');
				const data = await response.json();
				setToCityOptions(data.points);
				setFromCityOptions(data.points);
				console.log('Города назначения:', data.points);
			} catch (error) {
				console.error('Произошла ошибка при загрузке данных городов назначения:', error);
			}
		};

		fetchCities();
	}, []);

	useEffect(() => {
		const fetchPackageSizes = async () => {
			try {
				const response = await fetch('https://shift-backend.onrender.com/delivery/package/types');
				const data = await response.json();
				setPackageSizeOptions(data.packages);
				console.log('Размеры посылок:', data.packages);
			} catch (error) {
				console.error('Произошла ошибка при загрузке данных размеров посылок:', error);
			}
		};

		fetchPackageSizes();
	}, []);

	const handlePackageSizeChange = (event) => {
		const selectedSize = packageSizeOptions.find((size) => size.id === event.target.value);
		setSelectedPackageSize(selectedSize);
	};

	const handleFromCityChange = (event) => {
		const selectedCity = fromCityOptions.find((city) => city.id === event.target.value);
		setSelectedFromCity(selectedCity);
	};

	const handleToCityChange = (event) => {
		const selectedCity = toCityOptions.find((city) => city.id === event.target.value);
		setSelectedToCity(selectedCity);
	};

	const handleCalculateClick = async () => {
		if (selectedPackageSize && selectedFromCity && selectedToCity) {
			const requestBody = {
				package: {
					length: selectedPackageSize.length,
					width: selectedPackageSize.width,
					weight: selectedPackageSize.weight,
					height: selectedPackageSize.height,
				},
				senderPoint: {
					latitude: selectedFromCity.latitude,
					longitude: selectedFromCity.longitude,
				},
				receiverPoint: {
					latitude: selectedToCity.latitude,
					longitude: selectedToCity.longitude,
				},
			};

			try {
				const response = await fetch('https://shift-backend.onrender.com/delivery/calc', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(requestBody),
				});

				const result = await response.json();
				result.options.forEach((option, index) => {
					console.log(`Option ${index + 1} - Name: ${option.name}, Price: ${option.price}`);
					setDeliveryCost(option);

				});
				console.log('Результат расчета:', result);
			} catch (error) {
				console.error('Произошла ошибка при расчете доставки:', error);
			}
		} else {
			console.warn('Выберите размер посылки и города отправки и назначения.');
		}
	};

	return (
		<>
			<form>
				<label htmlFor="fromCity">Город отправки:</label>
				<select id="fromCity" name="fromCity" value={selectedFromCity ? selectedFromCity.value : ''} required onChange={handleFromCityChange}>
					<option value="" disabled hidden>Выберите город</option>
					{fromCityOptions.map(city => (
						<option key={city.id} value={city.id}>
							{city.name}
						</option>
					))}
				</select>
			</form>
			<form>
				<label htmlFor="toCity">Город назначения:</label>
				<select id="toCity" name="toCity" value={selectedToCity ? selectedToCity.value : ''} required onChange={handleToCityChange}>
					<option value="" disabled hidden>Выберите город</option>
					{toCityOptions.map(city => (
						<option key={city.id} value={city.id}>
							{city.name}
						</option>
					))}
				</select>
			</form>
			<form>
				<label htmlFor="packageSize">Размер посылки:</label>
				<select id="packageSize" name="packageSize" value={selectedPackageSize ? selectedPackageSize.value : ''} required onChange={handlePackageSizeChange}>
					<option value="" disabled hidden>Выберите размер посылки</option>
					{packageSizeOptions.map(size => (
						<option key={size.id} value={size.id}>
							{size.name}
						</option>
					))}
				</select>
			</form>
			<button onClick={handleCalculateClick}>Рассчитать</button>

			{deliveryCost !== null && (
				<div>
					<h3>Результаты расчета:</h3>
					<p>Стоимость доставки: {deliveryCost.name}</p>
					<p>Стоимость доставки: {deliveryCost.price}</p>
					{/* Add more details if available */}
				</div>
			)}
		</>
	);
};

export default YourComponent;
