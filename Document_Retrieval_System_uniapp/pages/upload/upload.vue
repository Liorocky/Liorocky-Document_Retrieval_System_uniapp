<template>
	<view>
		<view>
			<u-form-item label="标题"><u-input v-model="uploadFileBox.box_title" /></u-form-item>
			<u-form-item label="描述"><u-input v-model="uploadFileBox.box_desc" /></u-form-item>
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
				uploadFileBox: {
					box_uid: "",
					box_title: "",
					box_desc: "",
					box_count: 0,
					box_tags: [],
					box_is_deleted: 0,
					box_add_time: null,
					box_update_time: null,					
				},
				uploadFile: {
					file_box_id: '',
					file_uid: '',
					file_name: '',
					file_path: '',
					file_type: '',
					file_size: '',
					file_add_time: null,
					file_update_time: null,
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
				this.uploadFileBox.box_title = this.selectedFiles.tempFiles[0].name
				this.uploadFileBox.box_desc = this.selectedFiles.tempFiles[0].name
				
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
				
				// 将文档集信息写入数据库中
				console.log("this.uploadFileBox", this.uploadFileBox)
				this.uploadFileBox.box_count = e.tempFiles.length
				this.uploadFileBox.box_uid = this.uid
				this.uploadFileBox.box_add_time = new Date()
				this.uploadFileBox.box_update_time = new Date()
				
				// 获取数据库
				const db = uniCloud.database()
				
				// 获取集合
				const collection = db.collection('dfs_file_box')
				let fileBoxId = collection.add(this.uploadFileBox)
				
				// 将文件信息写入数据库中
				e.tempFiles.forEach( item => {
					let uploadFile = {
						file_box_id: fileBoxId,
						file_uid: this.uid,
						file_name: item.name,
						file_path: item.url,
						file_type: item.extname,
						file_size: item.size,
						file_add_time: new Date(),
						file_update_time: new Date()
					}
					
					// 上传uploadFile
					// 获取集合
					const collection = db.collection('dfs_file')
					collection.add(uploadFile)
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
