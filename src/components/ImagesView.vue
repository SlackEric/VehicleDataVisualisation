<template>
	<div class="responsive q-gutter-md">
		<div class="row q-gutter-md">
			<q-card class="col-lg-2 col-md-2 col-xs-3" v-for="item in imageData" :key="item.id">
				<img :src="item.url"/>
				<q-card-section>
					{{item.info}}
				</q-card-section>
			</q-card>
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
