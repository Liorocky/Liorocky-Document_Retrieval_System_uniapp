<template name="file-data-word">
	<view>
		<view v-for="item in localdata">
			<view><image src="@/static/icon/Word.png" style="width: 96px; height:96px"></image></view>
			<view>{{item.fileName}}</view>
		</view>
	</view>
	
</template>

<script>
export default {
	name: "file-data-word",
	//属性
	props: {
		localdata: {
			type: Array,
			default () {
				return []
			}
		},
	},
	//组件生命周期
	created: function(e){
	
	},
	methods: {
		clickFile: function(obj){
		
		},
	}
}
</script>

<style>

</style>