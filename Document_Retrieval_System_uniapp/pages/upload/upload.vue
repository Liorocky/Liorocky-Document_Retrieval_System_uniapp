<template>
	<view>
		<view>
			<u-form-item label="标题"><u-input v-model="uploadData.title" /></u-form-item>
			<u-form-item label="描述"><u-input v-model="uploadData.desc" /></u-form-item>
		</view>
		
		<view>
			<button type="primary" @click="tagsViewShow = true">选择标签</button>
			<button type="primary" @click="getLexer">测试百度</button>
		</view>
		
		<view>
			<uni-file-picker ref="files" v-model="fileListValue" fileMediatype="all" :list-styles="fileListStyles" mode="list"
				@select="select" @progress="progress" @success="success" @fail="fail" :auto-upload="false">
				<button>选择文件</button>
				</uni-file-picker>
			<button type="primary" @click="upload">上传文件</button>
		</view>
		
		<view>
			<u-popup v-model="tagsViewShow" mode="top" height="390rpx">
				<view-data-tags :selectedTags="selectedTags" :allTags="allTags" @clickTag="clickTags" @selectedTagsData="selectedTagsData"></view-data-tags>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uploadData: {
					title: "",
					desc: "",
					uid: "",
					count: 0,
					tags: [],
					files: []
				},
				fileListValue: [], // 文件列表
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
				fileListStyles: {
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
				selectedTags: [],
				uid: "",
				selectedFiles: { // 选择的文件
					tempFilePaths: [], // 文件url
					tempFiles: [] // 文件对象
				},
				selectedFilesName: "", // 所有已选择的文件名
				
			}
		},
		onShow() {
			const uni_id_token = uni.getStorageSync("uni_id_token")
			const uni_id_uid = uni.getStorageSync("uni_id_uid")
			this.uid = uni_id_uid
			console.log("uni_id_uid: ", this.uid);
		},
		created() {
			// 获取所有标签
		},
		methods: {
			// 词法分析
			getLexer(data) {
				uniCloud.callFunction({
					name: 'baidu-ai',
					data: {
						action: 'lexer',
						text: "百度是一家高科技公司"
					}
				}).then(res => {
					console.log("lexerdata", res)
				})
			},
			
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
				this.selectedFiles = e
				this.selectedFiles.tempFiles.forEach(item => {
					this.selectedFilesName += item.name
				})
				
				// 生成标题、描述
				this.uploadData.title = this.selectedFiles.tempFiles[0].name
				this.uploadData.desc = this.selectedFiles.tempFiles[0].name
				
				// 生成智能标签
			},
			
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
				console.log("e: ", e);
				const that = this
				e.tempFiles.forEach(function (item, index) {
					let file = {
						uid: that.uid,
						fileName: item.name,
						numberOrder: index + 1,
						size: item.size,
						path: item.url,
						type: item.extname
					}
				})

			},
			
			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},
			
			// 上传文件
			upload() {
				this.$refs.files.upload()
			},
			
			// 选择标签
			clickTags(item) {
				console.log("emit", item)
			},
			
			// 已选择的标签
			selectedTagsData(data) {
				this.selectedTags = data
				console.log("tags", data)
			}
		}
	}
</script>

<style lang="scss">

</style>
