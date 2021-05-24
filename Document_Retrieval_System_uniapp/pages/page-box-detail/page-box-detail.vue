<template>
	<view>
		<!-- 标题&描述 -->
		<u-card title="基本信息">
			<view class="" slot="body">
				<u-form-item label="标题">
					<u-input :disabled="!isEdit" v-model="fileBoxForm.box_title" />
				</u-form-item>
				<u-form-item label="描述">
					<u-input :disabled="!isEdit" v-model="fileBoxForm.box_desc" />
				</u-form-item>

				<u-form-item label="标签" v-if="!isEdit">
					<u-grid :col="5">
						<u-grid-item v-for="(item, index) in fileBoxForm.box_tags" :index="item._id" :key='item._id'>
							<text class="grid-text">{{ item.tag_name }}</text>
						</u-grid-item>
					</u-grid>
				</u-form-item>
				
				<view class="u-body-item u-flex u-row-between u-p-b-0" v-if="isEdit">
					<u-form-item label="标签"></u-form-item>
					<u-input placeholder="请输入新标签名" maxlength=4 :clearable="false" input-align="left" v-model="addTagName" /><u-button @click="clickNewTag">添加</u-button></u-form-item>
				</view>
				
				<view class="content" v-if="isEdit">
					<swiper class="swiper" @change="change" circular=true>
						<swiper-item v-for="i in pagesNum">
							<u-grid :col="5">
								<u-grid-item v-for="(item, index) in allTags" :index="item._id" :key="item._id"
									@click="clickTag(item)"
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
							<view class="indicator-dots-item"
								:class="[current == i - 1 ? 'indicator-dots-active' : '']"></view>
						</view>
					</view>
				</view>
			</view>
		</u-card>
		
		<!-- 文件 -->
		<u-card title="文件信息" v-if="!isEdit">
			<view class="" slot="body">
				<view-data-file :filesData="filesData"></view-data-file>
			</view>
		</u-card>

		<u-card title="操作" v-if="!isEdit">
			<view class="" slot="body">
				<u-button type="primary" @click="showShareModel()">分享</u-button>
				<u-button @click="updateEdit()">编辑</u-button>
				<u-button type="error" @click="deleteModelShow = true">删除</u-button>
			</view>
		</u-card>

		<u-card title="操作" v-if="isEdit">
			<view class="" slot="body">
				<u-button type="primary" @click="updateSave()">保存</u-button>
				<u-button @click="updateCancel()">取消</u-button>
			</view>
		</u-card>

		<view>
			<u-toast ref="uToast" />
		</view>

		<u-modal v-model="shareModelShow" title="分享内容" :content="shareContent" confirm-text="复制"
			@confirm="shareFileBox()"></u-modal>
			
		<u-modal v-model="deleteModelShow" title="提示" content="是否确定删除？" confirm-text="确定"
			@confirm="deleteFileBox()" show-cancel-button></u-modal>
	</view>
</template>

<script>
	import {
		setClipboardData,
		getClipboardData
	} from '@/uni_modules/u-clipboard/js_sdk'

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
			
			const uni_id_token = uni.getStorageSync("uni_id_token")
			const uni_id_uid = uni.getStorageSync("uni_id_uid")
			this.uid = uni_id_uid
			console.log("uni_id_uid: ", this.uid);
		},
		data() {
			return {
				fileBoxForm: {},
				isEdit: false, // 是否编辑模式
				filesData: [], // 文件信息
				shareModelShow: false, // 分享模态框
				shareContent: '', // 分享文本
				allTags: [],
				selectedTags: [], // 已选择的标签
				current: 0, // 当前标签页面
				addTagName: "", // 新标签名
				uid: '', // 用户id
				deleteModelShow: false, // 删除模态框
			}
		},
		computed: {
			pagesNum: function() {
				return Math.ceil(this.allTags.length / 15)
			}
		},
		beforeCreate() {},
		mounted() {},
		methods: {
			deleteFileBox() {
				
				
				const db = uniCloud.database()
				const collection = db.collection('dfs_file_box')

				collection.where('_id == "' + this.fileBoxForm._id + '"')
					.update({
						box_is_deleted: 1
					}).then(res => {
						this.$refs.uToast.show({
							title: '删除成功',
							type: 'success',
							url: '/pages/retrieve/retrieve',
							isTab: true,
							duration: 2000,
							type: "primary"
						})
					})
			},
			showShareModel() {
				this.shareModelShow = true
				this.shareContent = "我给你分享了：" + this.fileBoxForm.box_title + "，点击链接即可查看。" + this.filesData[0].file_path
			},
			shareFileBox() {
				setClipboardData(this.shareContent).then(res => {
					this.$refs.uToast.show({
						title: '已复制到剪贴板',
						type: 'success',
						duration: 1500,
						type: "primary"
					})
				})
			},
			// 保存
			updateSave() {
				console.log("保存")
				const db = uniCloud.database()
				const collection = db.collection('dfs_file_box')
				
				// 文档集标签信息
				let box_tags = []
				for (let i = 0; i < this.selectedTags.length; i++) {
					box_tags.push(this.selectedTags[i]._id)
				}
				
				this.fileBoxForm.box_tags = box_tags
				
				collection.where('_id == "' + this.fileBoxForm._id + '"')
				.update({
					box_tags: this.fileBoxForm.box_tags,
					box_title : this.fileBoxForm.box_title,
					box_desc : this.fileBoxForm.box_desc
				})
				.then(res => {
					// this.$refs.uToast.show({
					// 	title: '保存成功',
					// 	type: 'success',
					// 	duration: 1500,
					// 	type: "primary"
					// })
					
					// this.isEdit = false
					
					this.$refs.uToast.show({
						title: '保存成功',
						type: 'success',
						url: '/pages/retrieve/retrieve',
						isTab: true,
						duration: 2000,
						type: "primary"
					})
				})
			},
			// 取消保存
			updateCancel() {
				console.log("取消保存")
			},
			updateEdit() {
				this.fileBoxForm.box_tags.forEach(item => {
					item.selected = true
				})
				this.selectedTags = this.fileBoxForm.box_tags
				// 获取所有标签
				this.getAllTags()
				this.isEdit = true
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
			// 点击标签
			clickTag(item) {
				item.selected = item.selected === true ? false : true
				if (item.selected) {
					this.selectedTags.push(item)
				} else {
					this.selectedTags.pop(item)
				}
				
				console.log("this.selectedTags", this.selectedTags)
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
</style>
