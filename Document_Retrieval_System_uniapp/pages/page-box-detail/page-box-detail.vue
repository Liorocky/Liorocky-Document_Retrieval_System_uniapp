<template>
	<view>
		<view class="title">标题</view>
		<input :value="fileBoxData.title" :disabled="isNotEditable"></input>
	</view>
</template>

<script>
	export default {
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			const item = JSON.parse(decodeURIComponent(option.item));
			// uni.$once('clickBox', this.setFileBoxData)
			console.log("item: ",item);
			this.fileBoxData = item
		},
		data() {
			return {
				fileBoxData: {},
				isNotEditable: true // 是否可编辑
			}
		},
		beforeCreate() {
		},
		mounted() {
		},
		methods: {
			// setFileBoxData(data) {
			// 	console.log(data, 'data')
			// 	console.log("this.fileBoxData: ",this.fileBoxData);
			// 	this.fileBoxData.title = data.title
			// 	console.log(this.fileBoxData, "2")
			// 	this.fileBoxData.title = "332"
			// 	this.$forceUpdate();
			// }
		}
	}
</script>

<style>

</style>
