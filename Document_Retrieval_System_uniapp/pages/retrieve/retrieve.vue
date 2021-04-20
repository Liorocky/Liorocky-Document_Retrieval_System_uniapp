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

		<view-data-box :localdata="boxData"></view-data-box>

		<view>
			<u-popup v-model="tagsViewShow" mode="top" height="390rpx">
				<view-data-tags :selectedTags="searchSelectedTags" :allTags="allTags" @clickTag="clickTags" @selectedTags="selectedTags"></view-data-tags>
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
				boxData: [] // 文件夹列表数据
			}
		},
		onShow() {
		},
		methods: {
			// addTag(item) {
			// 	this.selectedTags.add(item)
			// }
			clickTags(item) {
				console.log("emit", item)
			},
			selectedTags(data) {
				this.searchSelectedTags = data
				console.log("tags", data)
			},
			testApi() {
				this.$u.api.getFileBox(uni.getStorageSync("uni_id_uid")).then(res => {
					console.log(res);
				})
			}
		},
		onLoad() {
			// uni.$on("clickTags", function(data) {
			// 	console.log("click", data)
			// })
			this.testApi()
		},
		computed: {

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
			
			this.boxData = [{
					"id": 103,
					"active": 1,
					"title": "西安长安通市民卡平台基础搭建项目招标公告",
					"desc": "西安长安通市民卡平台基础搭建项目招标公告",
					"count": 1,
					"addTime": "2020-10-13 14:00:24",
					"lastTime": "2020-10-29 15:43:18"
				},
				{
					"id": 104,
					"active": 1,
					"title": "西安长安通公交人脸支付试点采购项目(二、三标段）（...",
					"desc": "西安长安通公交人脸支付试点采购项目(二、三标段）（...",
					"count": 1,
					"addTime": "2020-10-13 14:01:08",
					"lastTime": "2020-10-29 15:43:19"
				},
				{
					"id": 105,
					"active": 1,
					"title": "西安长安通市民卡平台基础搭建项目招标公告",
					"desc": "西安长安通市民卡平台基础搭建项目招标公告",
					"count": 1,
					"addTime": "2020-10-13 14:02:57",
					"lastTime": "2020-10-29 15:43:21"
				},
				{
					"id": 106,
					"active": 1,
					"title": "西安长安通支付有限责任公司2020清算系统及数据库...",
					"desc": "西安长安通支付有限责任公司2020清算系统及数据库...",
					"count": 1,
					"addTime": "2020-10-13 14:03:57",
					"lastTime": "2020-10-29 15:43:23"
				},
				{
					"id": 107,
					"active": 1,
					"title": "西安长安通支付有限责任公司2020清算系统及数据库...",
					"desc": "西安长安通支付有限责任公司2020清算系统及数据库...",
					"count": 1,
					"addTime": "2020-10-13 14:05:05",
					"lastTime": "2020-10-29 15:43:25"
				},
				{
					"id": 108,
					"active": 1,
					"title": "测试测试",
					"desc": "测试测试2",
					"count": 1,
					"addTime": "2020-10-14 11:01:21",
					"lastTime": "2020-10-14 11:01:21"
				},
				{
					"id": 110,
					"active": 1,
					"title": "a",
					"desc": "a",
					"count": 1,
					"addTime": "2020-10-27 10:32:09",
					"lastTime": "2020-10-27 10:32:09"
				},
				{
					"id": 111,
					"active": 1,
					"title": "测试标签",
					"desc": "asas",
					"count": 1,
					"addTime": "2020-10-27 14:34:26",
					"lastTime": "2020-10-27 14:34:26"
				}
			]
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
