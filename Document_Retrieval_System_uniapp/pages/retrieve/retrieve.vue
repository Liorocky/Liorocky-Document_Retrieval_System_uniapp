<template>
	<view>
		<view>
			<u-row>
				<u-col span="1">
					<u-button @click="tagsViewShow = true" type="primary" size="mini" :hair-line="false" shape="square">
						标签</u-button>
				</u-col>
				<u-col span="10" offset="1">
					<view>
						<u-search placeholder="请输入搜索内容" v-model="keyword" shape="square" :clearabled="true"
							:show-action="true" action-text="搜索" :animation="true" input-align="center"></u-search>
					</view>
				</u-col>
			</u-row>
		</view>

		<view-data-box :fileBoxData="fileBoxData"></view-data-box>

		<view>
			<u-popup v-model="tagsViewShow" mode="top" height="390rpx">
				<view-data-tags :selectedTags="searchSelectedTags" :allTags="allTags" @clickTag="clickTags" @selectedTags="selectedTags"></view-data-tags>
			</u-popup>
		</view>
	</view>
</template>

<script>
	// import utils from '@/common/utils'
	export default {
		data() {
			return {
				keyword: "", // 查询关键词
				tagsViewShow: false, // 选择标签的页面
				allTags: [], // 所有标签
				searchSelectedTags: [], // 搜索的标签
				fileBoxData: [] , // 文件夹列表数据
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
			// 点击标签
			clickTags(item) {
				console.log("emit", item)
			},
			// 接收tags组件返回的标签数据
			selectedTags(data) {
				this.searchSelectedTags = data
				console.log("tags", data)
			},
			// 根据标题和标签获取文档集
			getFileBox(title, tags) {
				// 获取数据库
				const db = uniCloud.database()
				
				// 仅使用标签查询
				if (title === '') {
					title = '.'
				}
				
				// 获取集合
				const collection = db.collection('dfs_file_box')
				.where('box_uid == $cloudEnv_uid && ' + '/' + title + '/.test(box_title)')
				// .where('box_uid == $cloudEnv_uid && ' + '/./.test(box_title)')
				.get()
				.then(res => {
					const that = this
					console.log("res", res)
					res.result.data.forEach(item => {
						if (tags.size === 0) {
							// 仅使用标题查询
							this.fileBoxData = res.result.data
						} else if (that.$utils.isArr1ContainArr2(item.box_tags, tags)) {
							// 进行包含匹配
							that.fileBoxData.push(item)
						}
						console.log('this.fileBoxData', this.fileBoxData) 
					})
				}).catch(err => {
					console.log("err", err)
				})
			}
		},
		onLoad() {
			// 获取文档集
			this.getFileBox('西', ['609a4b66f2e56f0001665368'])
		},
		computed: {

		},
		created() {
	
		}	
	}
</script>

<style lang="scss">
	.tags {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
