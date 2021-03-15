<template>
	<view>
		文件夹
	</view>
</template>

<script>
	export default {
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		    uni.$on('clickBox', function(data){
		        console.log('监听到事件来自 clickBox ，携带参数 clickBox 为：' + data);
		    })
			// const item = JSON.parse(decodeURIComponent(option.item));
			// console.log(item.fileName); //打印出上个页面传递的参数。
			// console.log(item.filePath); //打印出上个页面传递的参数。
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
