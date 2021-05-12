<template name="view-data-box">
	<view>
		<view v-for="item in fileBoxData">
			<view class="file-item" @click="clickBox(item)">
				<u-col span="3">
					<view class="file-item-icon">
						<image src="@/static/icon/Document.png" style="width: 192rpx; height: 192rpx"></image>
					</view>
				</u-col>
				<u-col span="9">
					<view class="file-item-content">
						<view class="file-item-title">{{item.box_title}}</view>
						
						<view class="file-item-tag">
							<u-tag text="财务" size="mini" mode="dark" :closeable="false"/>
							<u-tag text="财务" size="mini" mode="dark" :closeable="false"/>
							<u-tag text="财务" size="mini" mode="dark" :closeable="false"/>
							<u-tag text="财务" size="mini" mode="dark" :closeable="false"/>
						</view>

					</view>
				</u-col>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "view-data-box",
		//属性
		props: {
			fileBoxData: {
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

	.file-item-title {
		font-size: medium;
		margin: auto 0;
	}
	
	.file-item-content {
		padding: 20rpx 0;
	}
	
	.file-item-tag > u-tag {

	}
</style>
