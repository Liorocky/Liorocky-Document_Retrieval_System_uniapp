<template>
	<view>
		<view>
			<u-row>
				<u-col span="1">
					<u-button @click="tagsViewShow = tagsViewShow === false ? true : false" type="primary" size="mini" :hair-line="false" shape="square">
						标签</u-button>
				</u-col>
				<u-col span="10" offset="1">
					<view>
						<uni-search-bar @confirm="search" v-model="keyword"></uni-search-bar>
					</view>
				</u-col>
			</u-row>
		</view>

		<view v-if="fileBoxShow">
			<view-data-box :fileBoxData="fileBoxData"></view-data-box>
		</view>

		<view>
			<u-popup v-model="tagsViewShow" @close="search()" mode="top" height="390rpx">
				<view-data-tags :selectedTags="selectedTagsArr" :allTags="allTags" @clickTag="clickTags" @selectedTags="selectedTags"></view-data-tags>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: "", // 查询关键词
				tagsViewShow: false, // 选择标签的页面
				allTags: [], // 所有标签
				searchSelectedTags: [], // 搜索的标签
				selectedTagsArr: [], // 搜索的标签
				fileBoxData: [] , // 文件夹列表数据
				fileBoxShow: false, // 文档集数据显示
				uid: "" // uniId
			}
		},
		onShow() {
			const uni_id_token = uni.getStorageSync("uni_id_token")
			const uni_id_uid = uni.getStorageSync("uni_id_uid")
			this.uid = uni_id_uid
			console.log("uni_id_uid: ", this.uid);
		},
		methods: {
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
				})
			},
			// 点击标签
			clickTags(item) {
				console.log("emit", item)
			},
			// 接收tags组件返回的标签数据
			selectedTags(data) {
				this.selectedTagsArr = data
				this.searchSelectedTags = []
				data.forEach(item => {
					this.searchSelectedTags.push(item._id)
				})
				console.log("tags", data)
				console.log("this.searchSelectedTags: ",this.searchSelectedTags);
			},
			// 根据标题和标签获取文档集
			getFileBox(title, tags) {
				// 获取数据库
				const db = uniCloud.database()
				
				// 仅使用标签查询
				if (title === '') {
					title = '.'
				}
				
				console.log("title: " + title + ',' + 'tags' + tags)
				// 获取集合
				const collection = db.collection('dfs_file_box')
				.where('box_uid == $cloudEnv_uid && ' + '/' + title + '/.test(box_title) && box_is_deleted == 0')
				.get()
				.then(res => {
					this.fileBoxShow = false
					this.fileBoxData = []
					const that = this
					console.log("res", res)
					res.result.data.forEach(item => {
						if (tags.size === 0) {
							// 仅使用标题查询
							that.fileBoxData = res.result.data
						} else if (that.$utils.isArr1ContainArr2(item.box_tags, tags)) {
							// 进行包含匹配
							that.fileBoxData.push(item)
						}
						
						// 获取数据库
						const db = uniCloud.database()
						// 获取集合
						const collection = db.collection('dfs_tag')
						that.fileBoxData.forEach(item => {
							if (item.box_tags.length !== 0 ) {
								console.log("item.box_tags", item.box_tags)
								
								let tagsIdStr = '['
								
								for (let i = 0; i < item.box_tags.length; i++) {
									if (i == 0) {
										tagsIdStr += " '" + item.box_tags[i] + "'"
									} else {
										tagsIdStr += ", '" + item.box_tags[i] + "'"
									}
								}
								
								tagsIdStr += ']'
								
								let tagNameArr = []
								
								collection.where('_id in ' + tagsIdStr)
								.get()
								.then(res => {
									console.log("restag", res) 
									if (res.result.data.length !== 0) {
										item.box_tags = res.result.data
									}
								})
							}
						})
					})
				}).catch(err => {
					console.log("err", err)
				}).finally(() => {
					this.fileBoxShow = true
				})
			},
			search() {
				this.getFileBox(this.keyword, this.searchSelectedTags)
			},
		},
		onLoad() {
			// 获取文档集
			this.getFileBox('', [])
			
			// 获取所有标签
			this.getAllTags()
		},
		computed: {

		},
		created() {
	
		},
		
	}
</script>

<style lang="scss">
	.tags {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
