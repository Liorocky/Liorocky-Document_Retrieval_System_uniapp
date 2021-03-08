<template>
	<view>
		<view>
			<uni-search-bar :radius="100" @confirm="search" @input="input" ></uni-search-bar>			
		</view>
		<view>
			<text>常用标签</text>
			<view class="tags">
				<uni-tag text="标签"></uni-tag>
				<uni-tag text="标签" type="error" :circle="true"></uni-tag>
				<uni-tag text="标签" @click="bindClick"></uni-tag>
			</view>
			
		</view>
		
		
	</view>
</template>

<script>
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
.tags{
	display: flex;
	justify-content: space-between;
	align-items:center;
}
</style>
