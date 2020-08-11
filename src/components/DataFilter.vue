<template>
	<q-dialog @hide="reset"  v-model="$attrs.value" v-bind="$attrs" v-on="$listeners">
		<q-card>
			<q-form class="q-ma-lg">
				<div class="q-gutter-md">
					<q-select v-model="filter.devices" label="Location" multiple :options="options" emit-value map-options/>
					<Date-Time v-on:getDateTime="changeStartDateTime" labelText="Start Date" v-bind:time="filter.from"/>
					<Date-Time v-on:getDateTime="changeEndDateTime" labelText="End Date" v-bind:time="filter.to"/>
					<div class="row justify-between">
						<q-btn label="Apply Filters" @click="applyFilters" v-close-popup/>
						<q-btn label="Cancel" v-close-popup/>
					</div>
				</div>
			</q-form>
		</q-card>
	</q-dialog>
</template>

<script>
import DateTime from './DateTime';
import moment from 'moment';
import store from '../store';

export default {
	name: 'DataFilter',
	data () {
		return {
			filter: {
				devices: store.state.filter.devices,
				from: moment(store.state.filter.from).format('YYYY-MM-DD HH:mm'),
				to: moment(store.state.filter.to).format('YYYY-MM-DD HH:mm')
			},
			options: [
				{
					label: 'Stirling Street',
					value: '5dc2775daff3fa001205e40d'
				},
				{
					label: 'Havelock Street',
					value: '5d95fa8bad4e930012557f6c'
				},
				{
					label: 'Western Street',
					value: '5dc1b85a5d73d6001373a0ae'
				}
			]
		};
	},
	components: { DateTime },
	methods: {
		reset () {
			this.filter = {
				...store.state.filter,
				from: moment(store.state.filter.from).format('YYYY-MM-DD HH:mm'),
				to: moment(store.state.filter.to).format('YYYY-MM-DD HH:mm')
			};
		},
		changeStartDateTime (val) {
			this.filter.from = val;
		},
		changeEndDateTime (val) {
			this.filter.to = val;
		},
		applyFilters () {
			const params = {
				...store.state.filter,
				from: moment(this.filter.from).toISOString(),
				to: moment(this.filter.to).toISOString()
			};

			store.commit('updateFilter', params);

			store.dispatch('fetchVehicleData');
		}
	}
};
</script>
