import axios from 'axios';
import { Loading, LocalStorage } from 'quasar';

const baseURL = 'https://testing-api.aeroranger.com';
const headers = {
	'Content-Type': 'application/json'
	// Authorization: 'Bearer ' + LocalStorage.getItem('token') || ''
};

const axiosInstance = axios.create({
	baseURL,
	headers
});

axiosInstance.interceptors.response.use(
	response => {
		return Promise.resolve(response);
	}
);

export default function request (options) {
	axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + LocalStorage.getItem('token') || '';
	Loading.show();
	return axiosInstance(options)
		.then(response => {
			Loading.hide();
			return response;
		})
		.catch(error => error);
};
