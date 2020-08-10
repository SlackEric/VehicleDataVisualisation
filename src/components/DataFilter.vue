<template>
	<q-dialog @hide="reset"  v-model="$attrs.value" v-bind="$attrs" v-on="$listeners">
		<q-card>
			<q-form class="q-ma-lg">
				<div class="q-gutter-md">
					<q-input v-model="filter.plate" label="Plate"/>
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
				plate: store.state.filter.plate,
				devices: store.state.filter.devices,
				from: store.state.filter.from,
				to: store.state.filter.to
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
			this.filter = { ...store.state.filter };
		},
		changeStartDateTime (val) {
			this.filter.from = val;
		},
		changeEndDateTime (val) {
			this.filter.to = val;
		},
		applyFilters () {
			store.commit('updateFilter', this.filter);

			const params = {
				...this.filter,
				from: moment(this.filter.from).toISOString(),
				to: moment(this.filter.to).toISOString(),
				hitTypes: ['5c559fa676611bbbf1949033', '5dd4e9f98d48fa001afb8a14', '5c559fcc76611bbbf1949035', '5ca5fbf54c7c1f020f8f3c3b', '5c55a00c76611bbbf1949038', '5d43dc3e6c9f410011ab3233', '5c559f6d76611bbbf1949031', '5c52d1bcdbaf407788e73eb7'],
				hitTypesAll: false,
				districtsAll: false,
				customDistrict: '',
				vehiclesAll: false,
				districts: []
			};

			store.dispatch('fetchVehicleData', params);
		}
	}
};
</script>
