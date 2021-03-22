<template name="view-data-file">
	<view>
		<view v-for="item in localdata">
			<view class="file-item" @click="previewFile()">
				<view class="file-item-icon">
					<image src="@/static/icon/Word.png" style="width: 96px; height:96px"></image>
				</view>
				<view class="file-item-name">{{item.fileName}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "view-data-file",
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
		created: function(e) {

		},
		methods: {
			previewFile: function(obj) {
				console.log("预览文件")
			},
		}
	}
</script>

<style>
	.file-item {
		display: flex;
		flex-flow: row nowrap;
	}

	.file-item-name {
		font-size: medium;
		margin: auto 0;
	}
</style>
