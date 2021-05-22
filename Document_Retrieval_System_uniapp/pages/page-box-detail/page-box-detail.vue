<template>
	<view>
		<!-- 标题&描述 -->
		<u-card title="基本信息">
			<view class="" slot="body">
				<u-form-item label="标题"><u-input :disabled="!isEdit" v-model="fileBoxForm.box_title" /></u-form-item>
				<u-form-item label="描述"><u-input :disabled="!isEdit" v-model="fileBoxForm.box_desc" /></u-form-item>
			
				<u-form-item label="标签">
					<u-grid :col="5">
						<u-grid-item v-for="(item, index) in fileBoxForm.box_tags" :index="item._id" :key='item._id'>
							<text class="grid-text">{{ item.tag_name }}</text>
						</u-grid-item>
					</u-grid>
				</u-form-item>
				
			</view>
		</u-card>
		
		<!-- 文件 -->
		<u-card title="文件信息">
			<view class="" slot="body">
				<view-data-file :filesData="filesData"></view-data-file>
			</view>
		</u-card>
		
		<u-card title="操作">
			<view class="" slot="body">
				<u-button type="primary">分享</u-button>
				<u-button>编辑</u-button>
				<u-button type="error">删除</u-button>
			</view>
		</u-card>
	</view>

</template>

<script>
	export default {
		onLoad: function(option) {
			//option为object类型，会序列化上个页面传递的参数
			const item = JSON.parse(decodeURIComponent(option.item));
			console.log("item: ", item);
			this.fileBoxForm = item
			
			// 查询文件信息
			const db = uniCloud.database()
			const collection = db.collection("dfs_file")
			collection.where('file_box_id == "' + this.fileBoxForm._id + '"')
			.get()
			.then(res => {
				this.filesData = res.result.data
			})
		},
		data() {
			return {
				fileBoxForm: {},
				isEdit: false, // 是否编辑模式
				filesData: [], // 文件信息
			}
		},
		beforeCreate() {},
		mounted() {},
		methods: {
			
		}
	}
</script>

<style lang="scss">
u-grid-item {
		width: 33.3%;
		height: 200rpx;
		text-align: center;
		line-height: 200rpx;
	}
</style>
