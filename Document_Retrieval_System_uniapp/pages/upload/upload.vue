<template>
	<view>
		<view>
			<u-form :model="form" ref="uForm">
				<u-form-item label="标题"><u-input v-model="form.title" /></u-form-item>
				<u-form-item label="描述"><u-input v-model="form.desc" /></u-form-item>
			</u-form>
		</view>
		
		<view>
			<button type="primary" @click="tagsViewShow = true">选择标签</button>
			
		</view>
		
		<view>
			<uni-file-picker ref="files" v-model="listValue" fileMediatype="all" :list-styles="listStyles" mode="list"
				@select="select" @progress="progress" @success="success" @fail="fail" :auto-upload="false">
				<button>选择文件</button>
				</uni-file-picker>
			<button type="primary" @click="upload">上传文件</button>
		</view>
		
		<view>
			<u-popup v-model="tagsViewShow" mode="top" height="390rpx">
				<view-data-tags :selectedTags="uploadSelectedTags" :allTags="allTags" @clickTag="clickTags" @selectedTags="selectedTags"></view-data-tags>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					title:"",
					desc:""
				},
				listValue: [],
				imageStyles: {
					width: 64,
					height: 64,
					border: {
						color: "#ff5a5f",
						width: 2,
						style: 'dashed',
						radius: '2px'
					}
				},
				listStyles: {
					// 是否显示边框
					border: true,
					// 是否显示分隔线
					dividline: true,
					// 线条样式
					borderStyle: {
						width: 1,
						color: 'blue',
						radius: 2
					}
				},
				tagsViewShow: false, // 是否显示标签pop
				allTags: [],
				uploadSelectedTags: []
			}
		},
		created() {
			this.allTags = [{
					id: 1,
					name: "正常的标",
					selected: false
				},
				{
					id: 2,
					name: "正常的标",
					selected: false
				},
				{
					id: 3,
					name: "正常的标",
					selected: false
				},
				{
					id: 4,
					name: "正常的标",
					selected: false
				},
				{
					id: 5,
					name: "正常的标",
					selected: false
				},
				{
					id: 6,
					name: "正常的标",
					selected: false
				},
				{
					id: 7,
					name: "正常的标",
					selected: false
				},
				{
					id: 8,
					name: "正常的标",
					selected: false
				},
				{
					id: 9,
					name: "正常的标",
					selected: false
				},
				{
					id: 10,
					name: "正常的标",
					selected: false
				},
				{
					id: 11,
					name: "正常的标",
					selected: false
				},
				{
					id: 12,
					name: "正常的标",
					selected: false
				},
				{
					id: 13,
					name: "正常的标",
					selected: false
				},
				{
					id: 14,
					name: "正常的标",
					selected: false
				},
				{
					id: 15,
					name: "正常的标",
					selected: false
				},
				{
					id: 16,
					name: "正常的标",
					selected: false
				},
				{
					id: 17,
					name: "正常的标",
					selected: false
				},
				{
					id: 18,
					name: "正常的标",
					selected: false
				}
			]
		},
		methods: {
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
				console.log("e: ",e);
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},
			upload() {
				this.$refs.files.upload()
			},
			clickTags(item) {
				console.log("emit", item)
			},
			selectedTags(data) {
				this.uploadSelectedTags = data
				console.log("tags", data)
			}
		}
	}
</script>

<style lang="scss">

</style>
