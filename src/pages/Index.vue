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
					<widget :widget="mostPopularPlateWidget" :content="mostPopularPlate"/>
				</div>
			</div>
			<div class="row q-gutter-md">
				<div class="col-lg-5 col-xs-12 border">
					<make-chart v-bind:chart-data="makeChartData" :options="makeChartOptions"/>
				</div>
				<div class="col-lg-6 col-xs-12 border">
					<vehicles-over-time v-bind:chart-data="vehiclesOverTimeData" :options="vehiclesOverTimeOptions"/>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-11 col-md-11 q-gutter-md">
					<results-header />
					<result-table v-if="isTableShown" :data="vehicleData"/>
					<images-view v-else />
				</div>
			</div>
		</div>
	</q-page>
</template>

<style lang="scss">
	.border{
		border: 1px solid rgb(211, 207, 207)
	}
</style>

<script>
import VehiclesOverTime from '../components/VehiclesOverTime';
import ResultTable from '../components/ResultTable';
import ImagesView from '../components/ImagesView';
import ResultsHeader from '../components/ResultsHeader';
import MakeChart from '../components/MakeChart';
import Widget from '../components/Widget';
import store from '../store';

export default {
	name: 'Home',
	data () {
		return {
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
			},
			vehiclesOverTimeOptions: {
				scales: {
					xAxes: [{
						type: 'time',
						unit: 'hour',
						distribution: 'linear'
					}]
				},
				responsive: true,
				maintainAspectRatio: false
			}
		};
	},
	components: {
		VehiclesOverTime,
		ImagesView,
		Widget,
		MakeChart,
		ResultsHeader,
		ResultTable
	},
	preFetch ({ store }) {
		store.dispatch('fetchVehicleData');
	},
	computed: {
		vehicleData () {
			return store.state.vehicleData;
		},
		makeChartData () {
			return store.state.makeChartData !== null ? store.state.makeChartData : {};
		},
		vehicleTotal () {
			return store.state.vehicleTotal;
		},
		avgMakeConfidence () {
			return store.state.avgMakeConfidence + '%';
		},
		mostPopularPlate () {
			return store.state.mostPopularPlate;
		},
		vehiclesOverTimeData () {
			return store.state.vehiclesOverTimeData !== null ? store.state.vehiclesOverTimeData : {};
		},
		isTableShown () {
			return store.state.isTableShown;
		}
	}
};
</script>
