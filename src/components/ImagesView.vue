<template>
	<div class="responsive q-gutter-md">
		<div class="row q-gutter-md">
			<q-img class="col-lg-2 col-md-2 col-xs-3" v-for="item in imageData" :src="item.url" :key="item.id"/>
		</div>
		<div class="row justify-center">
			<q-pagination
			v-model="currentImagePage"
			:max="maxImagePageSize"
			input/>
		</div>
	</div>
</template>

<style lang="scss">
	.responsive {
		width: 100%;
		height: auto;
	}
</style>

<script>
import store from '../store';

export default {
	computed: {
		currentImagePage: {
			get () {
				return store.state.currentImagePage;
			},
			set (page) {
				store.commit('updateCurrentImagePage', page);
			}
		},
		maxImagePageSize () {
			return store.state.maxImagePageSize;
		},
		imageData () {
			return store.state.imageData;
		}
	}
};
</script>
