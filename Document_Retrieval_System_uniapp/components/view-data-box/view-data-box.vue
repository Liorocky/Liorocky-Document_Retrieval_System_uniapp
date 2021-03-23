<template name="view-data-box">
	<view>
		<view v-for="item in localdata">
			<view class="file-item" @click="clickBox(item)">
				<view class="file-item-icon">
					<image src="@/static/icon/Document.png" style="width: 96px; height:96px"></image>
				</view>
				<view class="file-item-name">{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "view-data-box",
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
			clickBox: function(item) {
				console.log("打开文件夹")
				uni.navigateTo({
					url: '../../pages/page-box-detail/page-box-detail?item=' + encodeURIComponent(JSON.stringify(item))
				});
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
