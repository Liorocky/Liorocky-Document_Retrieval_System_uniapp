<template name="view-data-file">
	<view>
		<view v-for="item in filesData">
			<view class="file-item" @click="previewFile(item)">
				<view class="file-item-icon">
					<image src="@/static/icon/Word.png" style="width: 96px; height:96px"></image>
				</view>
				<view class="file-item-name">
					{{item.file_name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "view-data-file",
		//属性
		props: {
			filesData: {
				type: Array,
				default () {
					return []
				}
			},
		},
		//组件生命周期
		created: function(e) {
			console.log("filesData", this.filesData)
		},
		methods: {
			previewFile: function(obj) {
				// h5
				let href = "https://view.officeapps.live.com/op/view.aspx?src=" + obj.file_path
				window.open(href)
				
				// 微信小程序
			},
		}
	}
</script>

<style lang="scss">
	.file-item {
		display: flex;
		flex-flow: row nowrap;
	}

	.file-item-name {
		font-size: medium;
		margin: auto 0;
	}
</style>
