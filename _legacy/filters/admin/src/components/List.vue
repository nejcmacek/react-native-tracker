<template>
	<ul class="demo-list-three mdl-list my-list">
		<li v-for="user in users" class="mdl-list__item mdl-list__item--three-line">
			<span class="mdl-list__item-primary-content">
				<i class="material-icons mdl-list__item-avatar">person</i>
				<span>{{user.displayName}}</span>
				<span class="mdl-list__item-text-body">{{user.name}}</span>
			</span>
		</li>
	</ul>
</template>

<script>
export default {
	name: 'hello',
	data() {
		return {
			list: [1, 2]
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
	min-width: 200px
}

.small {
	font-size: 10px;
	color: rgba(0, 0, 0, 0.4);
}
</style>
