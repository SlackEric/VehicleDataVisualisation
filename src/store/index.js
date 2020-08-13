import Vue from 'vue';
import Vuex from 'vuex';

import moment from 'moment';
import { getVehicleData } from '../services/VehicleData';
import * as d3 from 'd3';

Vue.use(Vuex);

const backgroundColor = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(20, 255, 208, 0.2)', 'rgba(255, 228, 20, 0.2)', 'rgba(255, 153, 20, 0.2)', 'rgba(255, 20, 169, 0.2)'];
const borderColor = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(20, 255, 208, 1)', 'rgba(255, 228, 20, 1)', 'rgba(255, 153, 20, 1)', 'rgba(255, 20, 169, 1)'];
const imagePageSize = 10;
const duration = 4;

function getVehiclesOverTimeData (result, hourLabels) {
	const processedData = [];

	result.forEach(row => {
		const vector = d3.nest().key(d => d.date).rollup(leaves => leaves.length).entries(row.values);
		const tuple = [];

		let i = 0;
		let j = vector.length - 1;

		while (i < hourLabels.length && j >= 0) {
			if (hourLabels[i] !== vector[j].key) {
				tuple.push(0);
			} else {
				tuple.push(vector[j].value);
				j--;
			}
			i++;
		}

		processedData.push({ make: row.make, values: tuple });
	});

	const shownDataSet = [];

	for (let i = 0; i < processedData.length; i++) {
		shownDataSet.push({ label: processedData[i].make, data: processedData[i].values, borderColor: borderColor[i], backgroundColor: backgroundColor[i] });
	};

	return shownDataSet;
};

const store = new Vuex.Store({
	state: {
		filter: {
			plate: '',
			from: moment().subtract(duration, 'hour').toISOString(),
			to: moment().toISOString(),
			devices: [],
			hitTypes: ['5c559fa676611bbbf1949033', '5dd4e9f98d48fa001afb8a14', '5c559fcc76611bbbf1949035', '5ca5fbf54c7c1f020f8f3c3b', '5c55a00c76611bbbf1949038', '5d43dc3e6c9f410011ab3233', '5c559f6d76611bbbf1949031', '5c52d1bcdbaf407788e73eb7'],
			hitTypesAll: false,
			districtsAll: false,
			customDistrict: '',
			vehiclesAll: false,
			districts: []
		},
		vehicleData: [],
		makeChartData: null,
		vehiclesOverTimeData: null,
		imageData: [],
		vehicleTotal: 0,
		avgMakeConfidence: 0,
		mostPopularPlate: 'None',
		currentImagePage: 1,
		maxImagePageSize: 1,
		isTableShown: true
	},
	mutations: {
		updateFilter (state, filter) {
			state.filter = { ...filter };
		},
		updateVehicleData (state, vehicleData) {
			state.vehicleData = vehicleData;

			/*
				get an array of objects where the key of each object is vehicleMake and the
				associative value is an array of data of the same vehicleMake.
			*/
			const vehicleMakeData = d3.nest()
				.key(function (d) { return d.vehicleMake; })
				.entries(vehicleData)
				.sort(function (a, b) { return a.values.length - b.values.length; })
				.reverse()
				.splice(0, 10);

			const labels = [];
			const makeChartDataSet = [];
			let confidenceTotal = 0;
			let total = 0;

			const startHour = moment(state.filter.from).startOf('hour');
			const endHour = moment(state.filter.to).startOf('hour');
			const hourLabels = [];

			for (let i = startHour; i <= endHour; i = i.add(1, 'hour')) {
				hourLabels.push(i.format('YYYY-MM-DD HH:mm'));
			}
			const vehiclesOverTimeRawData = [];

			vehicleMakeData.forEach(element => {
				labels.push(element.key);
				makeChartDataSet.push(element.values.length);
				total += element.values.length;
				const array = [];

				element.values.forEach(tuple => {
					confidenceTotal += tuple.vehicleMakeConfidence;
					array.push({ date: moment(tuple.capturedAt).startOf('hour').format('YYYY-MM-DD HH:mm') });
				});
				vehiclesOverTimeRawData.push({ make: element.key, values: array });
			});

			const maxImagePageSize = Math.ceil(state.vehicleData.length / imagePageSize);
			store.commit('updateMaxImagePageSize', maxImagePageSize);

			store.commit('updateVehicleTotal', total);

			const avgMakeConfidence = (confidenceTotal / total).toFixed(2);
			store.commit('updateAvgMakeConfidence', avgMakeConfidence);

			const vehiclesOverTimeData = {
				labels: hourLabels,
				datasets: getVehiclesOverTimeData(vehiclesOverTimeRawData, hourLabels)
			};

			store.commit('updateVehiclesOverTimeData', vehiclesOverTimeData);

			const makeChartData = {
				labels,
				datasets: [{
					backgroundColor,
					borderColor,
					data: makeChartDataSet
				}]
			};

			store.commit('updateMakeChartData', makeChartData);

			/*
				get an array of objects where the key of each object is plate number and the
				associative value is the number of occurrence of this plate
			*/
			const plateData = d3.nest()
				.key(function (d) {
					return d.plate;
				})
				.rollup(function (leaves) {
					return leaves.length;
				})
				.entries(vehicleData)
				.sort(function (a, b) { return a.value - b.value; })
				.reverse()
				.splice(0, 1);

			store.commit('updateMostPopularPlate', plateData[0].key);

			const startIndex = (store.state.currentImagePage - 1) * imagePageSize;
			const endIndex = store.state.currentImagePage * imagePageSize;

			const imageData = state.vehicleData
				.slice(startIndex, endIndex)
				.map(vehicle => ({
					id: vehicle.id,
					info: vehicle.vehicleColour + ' ' + vehicle.plate,
					url: vehicle.image
				}));
			store.commit('updateImageData', imageData);
		},
		updateMaxImagePageSize (state, maxImagePageSize) {
			state.maxImagePageSize = maxImagePageSize;
		},
		updateVehicleTotal (state, total) {
			state.vehicleTotal = total;
		},
		updateAvgMakeConfidence (state, avgMakeConfidence) {
			state.avgMakeConfidence = avgMakeConfidence;
		},
		updateMostPopularPlate (state, plate) {
			state.mostPopularPlate = plate;
		},
		updateVehiclesOverTimeData (state, vehiclesOverTimeData) {
			state.vehiclesOverTimeData = vehiclesOverTimeData;
		},
		updateMakeChartData (state, makeChartData) {
			state.makeChartData = makeChartData;
		},
		updateTableStatus (state, isTableShown) {
			state.isTableShown = isTableShown;
		},
		updateImageData (state, imageData) {
			state.imageData = imageData;
		},
		updateCurrentImagePage (state, page) {
			state.currentImagePage = page;

			const startIndex = (store.state.currentImagePage - 1) * imagePageSize;
			const endIndex = store.state.currentImagePage * imagePageSize;
			const imageData = state.vehicleData
				.slice(startIndex, endIndex)
				.map(vehicle => ({
					id: vehicle.id,
					info: vehicle.vehicleColour + ' ' + vehicle.plate,
					url: vehicle.image
				}));
			store.commit('updateImageData', imageData);
		}
	},
	actions: {
		async fetchVehicleData ({ commit }) {
			const response = await getVehicleData(this.state.filter);
			commit('updateVehicleData', response.data.docs);
		}
	}
});
export default store;
