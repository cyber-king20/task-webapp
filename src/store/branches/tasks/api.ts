const API_KEY = 'c31084a8fd38e4c4cda24fbad77e603c';

export const fetchWeather = async (latitude, longitude) => {
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch weather data');
	}
	return response.json();
};
