<template>
	<q-page>
		<div class="q-ma-sm q-gutter-md">
			<div class="row q-gutter-md">
				<div class="col-xs-9 col-md-4 col-lg-3">
					<widget :widget="vehicleTotalWidget" :content="vehicleTotal"/>
				</div>
				<div class="col-xs-9 col-md-4 col-lg-3">
					<widget :widget="avgMakeConfWidget" :content="avgMakeConfidence"/>
				</div>
				<div class="col-xs-9 col-md-4 col-lg-3">
					<widget :widget="mostPopularPlateWidget"/>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-4 col-xs-12">
					<make-chart v-bind:chart-data="makeChartData" :options="makeChartOptions"/>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<result-table :data="vehicleData"/>
				</div>
			</div>
		</div>
	</q-page>
</template>

<style lang="scss">
	.filter {
		border: 5px solid #1E90FF;
		border-radius: 10px;
	}

</style>

<script>
// import VehicleOverTime from '../components/VehiclesOverTime';
import ResultTable from '../components/ResultTable';
import MakeChart from '../components/MakeChart';
import Widget from '../components/Widget';
import moment from 'moment';
import store from '../store';

export default {
	name: 'Home',
	data () {
		return {
			backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(20, 255, 208, 0.2)', 'rgba(255, 228, 20, 0.2)', 'rgba(255, 153, 20, 0.2)', 'rgba(255, 20, 169, 0.2)'],
			borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(20, 255, 208, 1)', 'rgba(255, 228, 20, 1)', 'rgba(255, 153, 20, 1)', 'rgba(255, 20, 169, 1)'],
			makeChartOptions: { responsive: true, maintainAspectRatio: false },
			vehicleTotalWidget: {
				backgroundColor: 'bg-green',
				title: 'Vehicles',
				icon: 'directions_car'
			},
			avgMakeConfWidget: {
				backgroundColor: 'bg-grey',
				title: 'Average Make Confidence',
				icon: 'report'
			},
			mostPopularPlateWidget: {
				backgroundColor: 'bg-orange',
				title: 'Most Popular Plate',
				icon: 'star'
			}
			/*
			vehiclesOverTimeOptions: {
				responsive: true,
				title: {
					display: true,
					text: 'Vehicles Over Time'
				},
				scales: {
					xAxes: [{
						type: 'time',
						time: {
							unit: 'hour'
						}
					}]
				}
			}
			*/
		};
	},
	components: {
		// VehicleOverTime,
		Widget,
		MakeChart,
		ResultTable
	},
	preFetch ({ store }) {
		const params = {
			...store.state.filter,
			from: moment(store.state.filter.from).toISOString(),
			to: moment(store.state.filter.to).toISOString(),
			hitTypes: ['5c559fa676611bbbf1949033', '5dd4e9f98d48fa001afb8a14', '5c559fcc76611bbbf1949035', '5ca5fbf54c7c1f020f8f3c3b', '5c55a00c76611bbbf1949038', '5d43dc3e6c9f410011ab3233', '5c559f6d76611bbbf1949031', '5c52d1bcdbaf407788e73eb7'],
			hitTypesAll: false,
			districtsAll: false,
			customDistrict: '',
			vehiclesAll: false,
			districts: []
		};

		store.dispatch('fetchVehicleData', params);
	},
	computed: {
		vehicleData () {
			return store.state.vehicleData;
		},
		makeChartData () {
			let chartData = {};
			if (store.state.makeChartData !== null) {
				const { labels, datasets: [{ data }] } = store.state.makeChartData;
				chartData = {
					labels,
					datasets: [
						{
							backgroundColor: this.backgroundColor,
							borderColor: this.borderColor,
							borderWidth: 1,
							data
						}
					]
				};
			}
			return chartData;
		},
		vehicleTotal () {
			return store.state.vehicleTotal;
		},
		avgMakeConfidence () {
			return store.state.avgMakeConfidence + '%';
		}
	}
};
</script>
