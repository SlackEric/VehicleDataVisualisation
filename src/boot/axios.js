import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://testing-api.aeroranger.com',
	headers: {
		'Content-Type': 'application/json'
	}
});

/*
axiosInstance.interceptors.request.use(config => {
	const token = localStorage.getItem('token') || '';
	config.headers.Authorization = token;
	return config;
});
*/

export default ({ Vue }) => {
	Vue.prototype.$axios = axiosInstance;
};
export { axiosInstance };
