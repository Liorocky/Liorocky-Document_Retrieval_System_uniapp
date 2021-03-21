<template>
	<view>
		<view class="title">标题</view>
		<view>{{fileBoxData.title}}</view>
		<input :value="fileBoxData.title" />
	</view>
</template>

<script>
	export default {
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			// const item = JSON.parse(decodeURIComponent(option.item));
			// uni.$once('clickBox', this.setFileBoxData)
			var that = this
			uni.$once('clickBox', function(data){
				that.fileBoxData.title = data.title
				console.log("that.fileBoxData: ",that.fileBoxData);
			})
			this.fileBoxData.title = "data.title"
			console.log('onload', this.fileBoxData)
		},
		data() {
			return {
				fileBoxData: {
					title: "",
					desc: ""
				}
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
