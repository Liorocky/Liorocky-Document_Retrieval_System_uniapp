<template>
	<view class="left-window-style">
		<view class="second-menu">
			<component v-bind:is="active"></component>
		</view>
	</view>
</template>

<script>
	import retrievePage from '@/pages/retrieve/retrieve.vue'
	import uploadPage from '@/pages/upload/upload.vue'
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.left-window-style {
		min-height: calc(100vh - var(--top-window-height));
		background-color: #f8f8f8;
	}

	.second-menu {
		width: 350px;
		background-color: #F8F8F8;
	}

	.icon-image {
		width: 30px;
		height: 30px;
	}
</style>
