<template>
 <div>
	<q-table table-class="table-item" :data="data" :columns="columns" :pagination.sync="pagination">
		<template v-slot:body-cell-Expand="props">
			<q-td :props="props">
				<q-btn @click="showDialog(props.row)" flat icon="crop_free"/>
			</q-td>
		</template>
		<template v-slot:body-cell-Plate="props">
			<q-td :props="props" class="tooltip">
				<span>{{props.row.plate}}</span>
				<img :src="props.row.imagePlate" class="plate-image-tooltip"/>
			</q-td>
		</template>
		<template v-slot:body-cell-Colour="props">
			<q-td :props="props" class="tooltip">
				<span>{{props.row.vehicleColour}}</span>
				<img :src="props.row.image" class="full-image-tooltip"/>
			</q-td>
		</template>
		<template v-slot:body-cell-Make="props">
			<q-td :props="props" class="tooltip">
				<span>{{props.row.vehicleMake}}</span>
				<img :src="props.row.image" class="full-image-tooltip"/>
			</q-td>
		</template>
	</q-table>
	<q-dialog v-model="recordDetails">
		<q-card class="record-details">
			<q-img :src="target.imageFull"/>
			<q-card-section class="row">
				<div class="col-4">
				<span class="label">
					{{target.plate}}
				</span>
				</div>
				<div class="col-8">
					<q-img class="plate-image" :src="target.imagePlate"/>
				</div>
			</q-card-section>
			<q-card-section>
				<div class="row q-col-gutter-xs">
					<div class="col-12">
						<div class="row q-col-gutter-xs">
							<div class="col-6">
								<strong>Year: </strong> <span>{{target.vehicleYear}}</span>
							</div>
							<div class="col-6">
								<q-linear-progress size="25px" :color="target.vehicleYearConfidence > 50 ? 'green' : 'red'" :value="(target.vehicleYearConfidence / 100)">
									<div class="absolute-full flex flex-center">
										<q-badge color="white" text-color="accent" :label="target.vehicleYearConfidence+'%'"></q-badge>
									</div>
								</q-linear-progress>
							</div>
						</div>
					</div>
					<div class="col-12">
						<div class="row q-col-gutter-xs">
							<div class="col-6">
								<strong>Make: </strong> <span>{{target.vehicleMake}}</span>
							</div>
							<div class="col-6">
								<q-linear-progress size="25px" :color="target.vehicleMakeConfidence > 50 ? 'green' : 'red'" :value="(target.vehicleMakeConfidence / 100)">
									<div class="absolute-full flex flex-center">
										<q-badge color="white" text-color="accent" :label="target.vehicleMakeConfidence+'%'"></q-badge>
									</div>
								</q-linear-progress>
							</div>
						</div>
					</div>
					<div class="col-12">
						<div class="row q-col-gutter-xs">
							<div class="col-6">
								<strong>Model: </strong> <span>{{target.vehicleModel}}</span>
							</div>
							<div class="col-6">
								<q-linear-progress size="25px" :color="target.vehicleModelConfidence > 50 ? 'green' : 'red'" :value="(target.vehicleModelConfidence / 100)">
									<div class="absolute-full flex flex-center">
										<q-badge color="white" text-color="accent" :label="target.vehicleModelConfidence+'%'"></q-badge>
									</div>
								</q-linear-progress>
							</div>
						</div>
					</div>
					<div class="col-12">
						<div class="row q-col-gutter-xs">
							<div class="col-6">
								<strong>Colour: </strong> <span>{{target.vehicleColour}}</span>
							</div>
							<div class="col-6">
								<q-linear-progress size="25px" :color="target.vehicleColourConfidence > 50 ? 'green' : 'red'" :value="(target.vehicleColourConfidence / 100)">
									<div class="absolute-full flex flex-center">
										<q-badge color="white" text-color="accent" :label="target.vehicleColourConfidence+'%'"></q-badge>
									</div>
								</q-linear-progress>
							</div>
						</div>
					</div>
					<div>
						<strong>State: </strong> <span>{{target.state}}</span>
					</div>
				</div>
			</q-card-section>
		</q-card>
	</q-dialog>
 </div>
</template>

<style lang="scss">
.tooltip {
	position: relative;
}
.plate-image-tooltip {
	visibility: hidden;
	width: 120px;
	border-radius: 6px;
	position: absolute;
	z-index: 1;
}
.full-image-tooltip {
	visibility: hidden;
	width: 250px;
	border-radius: 6px;
	position: absolute;
	z-index: 1;
}
.tooltip:hover .plate-image-tooltip {
	visibility: visible;
}
.tooltip:hover .full-image-tooltip {
	visibility: visible;
}

.record-details {
	width: 500px;
	height: auto;
}
.plate-image {
	width: 150px;
	height: 50px;
}
</style>

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
			target: {
				plate: '',
				imagePlate: '',
				url: '',
				year: '',
				make: '',
				model: '',
				colour: '',
				state: ''
			},
			recordDetails: false,
			columns: [{
				name: 'Expand',
				label: '',
				align: 'left'
			},
			{
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
				name: 'Hit',
				label: 'Hit',
				align: 'left',
				field: row => row.isHit
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
		},
		showDialog (row) {
			this.recordDetails = true;
			this.target = { ...row };
		}
	}
};
</script>
