<template>
	<q-card :class="widget.backgroundColor">
		<div class="row flex justify-between text-white">
			<q-card-section>
				<p>{{widget.title}}</p>
				<p>{{content}}</p>
			</q-card-section>
			<q-card-section>
				<q-icon style="font-size: 3rem" :name="widget.icon"/>
			</q-card-section>
		</div>
	</q-card>
</template>

<script>
export default {
	props: ['widget', 'content']
};
</script>
