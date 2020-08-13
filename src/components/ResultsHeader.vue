<template>
	<div class="q-mb-md q-pa-md">
		<span class="text-h6">Results</span>
		<q-btn class="float-right" @click="showImages" v-if="isTableShown" icon="grid_on"/>
		<q-btn class="float-right" @click="showTable" v-else icon="view_list"/>
	</div>
</template>

<script>
import store from '../store';

export default {
	name: 'ResultsHeader',
	computed: {
		isTableShown () {
			return store.state.isTableShown;
		}
	},
	methods: {
		showImages () {
			store.commit('updateTableStatus', false);
		},
		showTable () {
			store.commit('updateTableStatus', true);
		}
	}
};
</script>
