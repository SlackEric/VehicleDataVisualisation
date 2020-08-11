<template>
  <q-layout view="lHh Lpr lFf">
	<q-header elevated>
		<q-toolbar inset>
			<q-space/>
			<q-input dense v-model="plateNumber" label="Plate" bg-color="white">
				<template v-slot:append>
					<q-btn @click="doSearch" icon="search"/>
				</template>
			</q-input>
			<q-btn flat dense @click="showFilters = true" label="Filters" icon="filter_alt"/>
			<Data-Filter v-model="showFilters"></Data-Filter>
			<q-space/>
			<q-btn @click="logout" flat dense icon="logout" label="Logout"></q-btn>
		</q-toolbar>
	</q-header>
	<q-page-container>
		<router-view/>
	</q-page-container>
  </q-layout>
</template>

<script>
import DataFilter from '../components/DataFilter';
import store from '../store';

export default {
	name: 'MainLayout',
	data () {
		return {
			showFilters: false,
			filters: false,
			plateNumber: store.state.filter.plate
		};
	},
	components: { DataFilter },
	methods: {
		logout () {
			localStorage.removeItem('token');
			this.$router.push('/login');
		},
		doSearch () {
			const params = { ...store.state.filter, plate: this.plateNumber };
			store.commit('updateFilter', params);
			store.dispatch('fetchVehicleData');
		}
	}
};
</script>
