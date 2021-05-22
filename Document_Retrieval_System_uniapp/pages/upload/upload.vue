<template>
	<view>
		<view v-if="this.selectedFiles.tempFiles.length > 0">
			<u-card title="基本信息">
				<view class="" slot="body">
					<u-form-item label="标题"><u-input v-model="uploadFileBox.box_title" /></u-form-item>
					<u-form-item label="描述"><u-input v-model="uploadFileBox.box_desc" /></u-form-item>
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<u-form-item label="标签"></u-form-item>
						<u-input placeholder="请输入新标签名" maxlength=4 :clearable="false" input-align="left" v-model="addTagName" /><u-button @click="clickNewTag">添加</u-button></u-form-item>
					</view>
					
						<!-- 推荐标签 -->
					<view v-if="bdTags.length > 0">
						<u-form-item label="推荐">
							<u-grid :col="4">
								<u-grid-item id="grid-item-bd" v-for="(item, index) in bdTags" :index="item._id" :key="item._id" @click="clickTag(item)"
									:custom-style="{background: (item.selected ? '#a0cfff' : '#ffffff')}">
									<text class="grid-text">{{ item.tag_name }}</text>
								</u-grid-item>
							</u-grid>
							
						</u-form-item>
						
					</view>
					
					<view class="content">
						<swiper class="swiper" @change="change" circular=true>
							<swiper-item v-for="i in pagesNum">
								<u-grid :col="5">
									<u-grid-item v-for="(item, index) in allTags" :index="item._id" :key="item._id" @click="clickTag(item)"
										:custom-style="{background: (item.selected ? '#a0cfff' : '#ffffff')}"
										v-if="index >= (i - 1) * 15">
										<text class="grid-text">{{ item.tag_name }}</text>
									</u-grid-item>
								</u-grid>
							</swiper-item>
						</swiper>
					
						<view class="indicator-dots" v-if="true">
							<view v-if="selectedTags.length > 0">已选择{{ selectedTags.length }}个标签</view>
							<view v-for="i in pagesNum">
								<view class="indicator-dots-item" :class="[current == i - 1 ? 'indicator-dots-active' : '']"></view>
							</view>
						</view>
					</view>
					
				</view>
			</u-card>
		</view>
		
		<u-button v-if="this.selectedFiles.tempFiles.length > 0" type="primary" @click="upload">录入文件</u-button>
		
		<u-card title="文件信息">
			<view class="" slot="body">
				<view>
					<uni-file-picker ref="files" v-model="fileListValue" fileMediatype="all" :list-styles="fileListStyles" mode="list"
						@select="select" @progress="progress" @success="success" @fail="fail" :auto-upload="false">
						<u-button>选择文件</u-button>
					</uni-file-picker>
					<u-button type="error" v-if="this.selectedFiles.tempFiles.length > 0" @click="clearAll">清空所有</u-button>
				</view>
			</view>
		</u-card>
		
		<view>
			<u-toast ref="uToast" />
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
				selectedTags: [], // 已选择的标签
				selectedBdTags: [], // 已选择的推荐标签
				uid: "",
				selectedFiles: { // 选择的文件
					tempFilePaths: [], // 文件url
					tempFiles: [] // 文件对象
				},
				selectedFilesName: "", // 所有已选择的文件名
				addTagName: "", // 新标签名
				current: 0, // 当前标签页面
				bdTags: [], // 推荐标签
				bdPos: new Set(['n', 'nz', 'nr', 'ns', 's', 'nt', 'nw']), // 百度词性
				// n	普通名词	f	方位名词	s	处所名词	t	时间名词
				// nr	人名	ns	地名	nt	机构团体名	nw	作品名
				// nz	其他专名	v	普通动词	vd	动副词	vn	名动词
				// a	形容词	ad	副形词	an	名形词	d	副词
				// m	数量词	q	量词	r	代词	p	介词
				// c	连词	u	助词	xc	其他虚词	w	标点符号
			}
		},
		onShow() {
			const uni_id_token = uni.getStorageSync("uni_id_token")
			const uni_id_uid = uni.getStorageSync("uni_id_uid")
			this.uid = uni_id_uid
			console.log("uni_id_uid: ", this.uid);
			
			// 获取所有标签
			this.getAllTags()
		},
		created() {
		},
		computed: {
			pagesNum: function() {
				return Math.ceil(this.allTags.length / 15)
			}
		},
		methods: {
			// 获取上传状态
			async select(e) {
				console.log('选择文件：', e)
				this.selectedFiles = e
				this.selectedFiles.tempFiles.forEach(item => {
					this.selectedFilesName += item.name
				})
				
				// 生成标题、描述
				this.uploadFileBox.box_title = this.selectedFiles.tempFiles[0].name
				this.uploadFileBox.box_desc = this.selectedFiles.tempFiles[0].name
				
				// 生成智能标签
				uniCloud.callFunction({
					name: 'baidu-ai',
					data: {
						action: 'lexer',
						text: this.selectedFilesName
					}
				}).then(res => {
					res.result.data.items.forEach(item => {
						if (this.bdPos.has(item.pos) && item.byte_length <= 12) {
							let bdTag = {
								tag_uid: this.uid,
								tag_name: item.item
							}
							
							// 不能添加重复标签、最多四个推荐标签
							let tempTagName = this.bdTags.find(element => element.tag_name === item.item)
							if ((typeof(tempTagName) === "undefined" || item.item !== tempTagName.tag_name) && this.bdTags.length < 4) {
								this.bdTags.push(bdTag)
							}
						}
					})
				})
			},
			
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			async success(e) {
				console.log('上传成功')
				console.log("e: ", e);
				const that = this
				
				console.log("this.uploadFileBox", this.uploadFileBox)
				this.uploadFileBox.box_count = e.tempFiles.length
				this.uploadFileBox.box_uid = this.uid
				this.uploadFileBox.box_add_time = new Date()
				this.uploadFileBox.box_update_time = new Date()
				
				let box_tags = []
				
				// 文档集标签信息
				for (let i = 0; i < this.selectedTags.length; i++) {
					if (typeof(this.selectedTags[i]._id) === "undefined") {
						console.log("undefinedtag", this.selectedTags[i])
						
						// 推荐标签
						let res = await this.addTag(this.selectedTags[i].tag_name)
						
						this.selectedTags[i]._id = res._id
						box_tags.push(this.selectedTags[i]._id)
					} else {
						box_tags.push(this.selectedTags[i]._id)
					}
				}

				this.uploadFileBox.box_tags = box_tags
				
				// 获取数据库
				const db = uniCloud.database()
				
				// 获取集合
				const collection = db.collection('dfs_file_box')
				
				// 1. 将文档集信息写入数据库中
				let fileBoxId = await collection.add(this.uploadFileBox)
				fileBoxId = fileBoxId.result.id
				
				// 2. 将文件信息写入数据库中
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
					collection.add(uploadFile).then(res => {
						this.$refs.uToast.show({
							title: "录入成功",
							duration: 1500,
							type: "success"
						})
					})
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
			
			// 获取所有标签
			getAllTags() {
				// 获取数据库
				const db = uniCloud.database()
				
				// 获取集合
				const collection = db.collection('dfs_tag')
				
				collection.where('tag_uid == $cloudEnv_uid')
				.get()
				.then((res) => {
					console.log("所有标签", res)
					this.allTags = res.result.data
					
					// 遍历所有标签，添加是否选中属性
					for (let i = 0; i < this.allTags.length; i++) {
						for (let j = 0; j < this.selectedTags.length; j++) {
							if (this.allTags[i]._id == this.selectedTags[j]._id) {
								this.allTags[i].selected = true
							}
						}
					}
				})
			},
			
			// 点击新建标签
			async clickNewTag() {
				// 标签名不能为空
				if (this.addTagName === '') return
				
				// 不能添加重复标签
				let tempTagName = this.allTags.find(element => element.tag_name === this.addTagName)
				if (typeof(tempTagName) !== "undefined" && this.addTagName === tempTagName.tag_name) {
					this.$refs.uToast.show({
						title: "不能添加重复标签",
						duration: 1500,
						type: "error"
					})
					return
				}
				
				// 新建标签
				let tempTag = await this.addTag(this.addTagName)
				
				this.selectedTags.push(tempTag)
				
				// 获取所有标签
				this.getAllTags()
				
				// 清空输入框
				this.addTagName = ''
			},
			
			// 新建标签 返回标签信息
			async addTag(tagName) {
				// 获取数据库
				const db = uniCloud.database()
				// 获取集合
				const collection = db.collection('dfs_tag')
				// 标签信息
				let temp = {
					tag_uid: this.uid,
					tag_name: tagName
				}
				
				// 上传
				let res = await collection.add(temp)
				let _id = res.result.id
				
				// 将标签信息放入 已选择标签中
				let resTag = {
					_id: _id,
					selected: true,
					tag_name: tagName,
					tag_uid: this.uid
				}
				
				console.log("新建标签成功", resTag)
				return resTag
			},
			
			// 点击标签
			clickTag(item) {
				item.selected = item.selected === true ? false : true
				if (item.selected) {
					this.selectedTags.push(item)
				} else {
					this.selectedTags.pop(item)
				}
			},
			// 标签页面改变
			change(e) {
				this.current = e.detail.current;
			},
			// 清空所有
			clearAll() {
				uni.reLaunch({
					url: "/pages/upload/upload"
				})
			}
		}
	}
</script>

<style lang="scss">
.indicator-dots {
		margin-top: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.indicator-dots-item {
		background-color: $u-tips-color;
		height: 6px;
		width: 6px;
		border-radius: 10px;
		margin: 0 3px;
	}

	.indicator-dots-active {
		background-color: $u-type-primary;
	}

	.swiper {
		height: 290rpx;
	}
	
	u-grid-item {
		width: 33.3%;
		height: 200rpx;
		text-align: center;
		line-height: 200rpx;
	}
	
	#grid-item-bd {
		width: 25%;
		height: 100rpx;
		text-align: center;
		line-height: 200rpx;
	}
</style>
