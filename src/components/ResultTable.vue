<template>
	<q-table :data="data" :columns="columns" :pagination.sync="pagination">
	</q-table>
</template>

<script>
import moment from 'moment';
import store from '../store';

export default {
	props: ['data'],
	data () {
		return {
			pagination: {
				rowsPerPage: 40
			},
			columns: [{
				name: 'Plate',
				label: 'Plate',
				align: 'left',
				field: row => row.plate
			},
			{
				name: 'Colour',
				label: 'Colour',
				align: 'left',
				field: row => row.vehicleColour
			},
			{
				name: 'Make',
				label: 'Make',
				align: 'left',
				field: row => row.vehicleMake
			},
			{
				name: 'Model',
				label: 'Model',
				align: 'left',
				field: row => row.vehicleModel
			},
			{
				name: 'Date',
				label: 'Date',
				align: 'left',
				field: row => moment(row.capturedAt).format('DD-MM-YYYY HH:mm')
			}
			]
		};
	},
	methods: {
		showImages () {
			store.commit('updateTableStatus', false);
		}
	}
};
</script>
