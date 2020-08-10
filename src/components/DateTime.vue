<template>
				<q-input filled @input="sendDateTimeToParent" v-model="dateTime" v-bind:label="labelText">
					<template v-slot:prepend>
						<q-icon name="event" class="cursor-pointer">
							<q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
								<q-date v-model="dateTime" mask="YYYY-MM-DD HH:mm" @input="() => $refs.qDateProxy.hide()"></q-date>
								<!--<q-date v-model="dateTime" mask="YYYY-MM-DD HH:mm" v-on:click="sendDateTimeToParent" @input="() => $refs.qDateProxy.hide()"></q-date> -->
							</q-popup-proxy>
						</q-icon>
					</template>
					<template v-slot:append>
						<q-icon name="access_time" class="cursor-pointer">
							<q-popup-proxy ref="qTimeProxy" transition-show="scale" transition-hide="scale">
								<q-time v-model="dateTime" mask="YYYY-MM-DD HH:mm" format24h @input="() => $refs.qTimeProxy.hide()"></q-time>
							</q-popup-proxy>
						</q-icon>
					</template>
				</q-input>
</template>

<script>
export default {
	/*
	data () {
		return {
			date: '2019-02-01 12:44'
		};
	},
	*/
	props: {
		labelText: {
			type: String
		},
		time: {
			type: String
		}
	},
	data () {
		return {
			dateTime: this.time
		};
	},
	methods: {
		sendDateTimeToParent () {
			console.log('dateTime:' + this.dateTime);
			this.$emit('getDateTime', this.dateTime);
		}
	},
	watch: {
		dateTime () {
			this.sendDateTimeToParent();
		}
	}
};
</script>
