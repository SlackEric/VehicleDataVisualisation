import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://testing-api.aeroranger.com',
	headers: {
		'Content-Type': 'application/json'
	}
});

export default ({ Vue }) => {
	Vue.prototype.$axios = axiosInstance;
};
export { axiosInstance };
