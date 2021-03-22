<template>
	<view>
		<view class="">
			<u-form :model="fileBoxData" ref="uForm">
				<u-form-item label="" prop="title" label-position="left" left-icon="info">
					<u-input v-model="fileBoxData.title" disabled/>
				</u-form-item>
				<u-form-item label="" prop="desc" label-position="left" left-icon="file-text">
					<u-input v-model="fileBoxData.desc" auto-height />
				</u-form-item>
			</u-form>
		</view>
		
		<!-- <file-data-box></file-data-box> -->
	</view>

</template>

<script>
	export default {
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			const item = JSON.parse(decodeURIComponent(option.item));
			// uni.$once('clickBox', this.setFileBoxData)
			console.log("item: ", item);
			this.fileBoxData = item
		},
		data() {
			return {
				fileBoxData: {},
				isNotEditable: true // 是否不可编辑
			}
		},
		beforeCreate() {},
		mounted() {},
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
