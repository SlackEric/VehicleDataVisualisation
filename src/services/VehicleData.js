import request from '../utility/request';

export function getVehicleData (params) {
	return request({
		method: 'POST',
		url: '/api/v1/search/search',
		data: params
	});
}
