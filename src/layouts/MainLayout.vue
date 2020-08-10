<template>
  <q-layout view="lHh Lpr lFf">
	<q-header elevated>
		<q-toolbar inset>
			<q-space/>
			<q-btn flat dense @click="showFilters = true" label="Filters"/>
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
// import EssentialLink from 'components/EssentialLink.vue';
import DataFilter from '../components/DataFilter';
// import store from '../store';
/*
const linksData = [
	{
		title: 'Docs',
		caption: 'quasar.dev',
		icon: 'school',
		link: 'https://quasar.dev'
	},
	{
		title: 'Github',
		caption: 'github.com/quasarframework',
		icon: 'code',
		link: 'https://github.com/quasarframework'
	},
	{
		title: 'Discord Chat Channel',
		caption: 'chat.quasar.dev',
		icon: 'chat',
		link: 'https://chat.quasar.dev'
	},
	{
		title: 'Forum',
		caption: 'forum.quasar.dev',
		icon: 'record_voice_over',
		link: 'https://forum.quasar.dev'
	},
	{
		title: 'Twitter',
		caption: '@quasarframework',
		icon: 'rss_feed',
		link: 'https://twitter.quasar.dev'
	},
	{
		title: 'Facebook',
		caption: '@QuasarFramework',
		icon: 'public',
		link: 'https://facebook.quasar.dev'
	},
	{
		title: 'Quasar Awesome',
		caption: 'Community Quasar projects',
		icon: 'favorite',
		link: 'https://awesome.quasar.dev'
	}
];
*/

export default {
	name: 'MainLayout',
	data () {
		return {
			showFilters: false,
			// opened: false,
			// location: null,
			// date: '2019-02-01 12:44',
			// options: ['Stirling Street', 'Havelock Street', 'Western Street'],
			filters: false
		};
	},
	components: { DataFilter },
	/*
	computed: {
		filterState: {
			get () {
				return store.state.DataFilter.opened;
			},
			set (val) {
				store.commit('DataFilter/updateOpen', val);
			}
		}
	},
	*/
	/*
	components: { EssentialLink },
	data () {
		return {
			leftDrawerOpen: false,
			essentialLinks: linksData
		};
	}
	*/
	methods: {
		/*
		showFilters () {
			// this.opened = true;
			this.$q.dialog({
				component: DataFilter,
				parent: this
			});
		},
		*/
		logout () {
			localStorage.removeItem('token');
			this.$router.push('/login');
		}
	}
};
</script>
