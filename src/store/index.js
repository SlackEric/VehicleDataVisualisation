import Vue from 'vue';
import Vuex from 'vuex';

import moment from 'moment';
import { getVehicleData } from '../services/VehicleData';
import * as d3 from 'd3';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		filter: {
			plate: '',
			from: moment().subtract(4, 'hour').format('YYYY-MM-DD HH:mm'),
			to: moment().format('YYYY-MM-DD HH:mm'),
			devices: []
		},
		vehicleData: [],
		makeChartData: null,
		vehiclesOverTimeData: null,
		vehicleTotal: 0,
		avgMakeConfidence: 0
	},
	mutations: {
		updateFilter (state, filter) {
			state.filter = { ...filter };
		},
		updateVehicleData (state, vehicleData) {
			state.vehicleData = vehicleData;

			// update make chart data
			const collection = d3.nest()
				.key(function (d) { return d.vehicleMake; })
				.entries(vehicleData)
				.sort(function (a, b) { return a.values.length - b.values.length; })
				.reverse()
				.splice(0, 10);

			const labels = [];
			const data = [];
			let confidenceTotal = 0;
			let total = 0;

			collection.forEach(element => {
				labels.push(element.key);
				data.push(element.values.length);
				total += element.values.length;

				element.values.forEach(tuple => { confidenceTotal += tuple.vehicleMakeConfidence; });
			});

			state.makeChartData = {
				labels,
				datasets: [{
					data
				}]
			};

			state.vehicleTotal = total;
			state.avgMakeConfidence = (confidenceTotal / total).toFixed(2);
		}
	},
	actions: {
		async fetchVehicleData ({ commit }, params) {
			const response = await getVehicleData(params);
			commit('updateVehicleData', response.data.docs);
		}
	}
});
export default store;
