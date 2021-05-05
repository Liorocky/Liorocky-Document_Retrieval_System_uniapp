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

		<unicloud-db v-slot:default="{data, loading, error, options}" collection="dfs_file_box" :where="`box_uid=='${uid}'`">
			<view v-if="error">{{error.message}}</view>
			<view v-else>
				<view-data-box :fileBoxData="data"></view-data-box>
			</view>
		</unicloud-db>
		
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
				boxData: [] , // 文件夹列表数据
				uid: "" // uniId
			}
		},
		onShow() {
			const uni_id_token = uni.getStorageSync("uni_id_token")
			const uni_id_uid = uni.getStorageSync("uni_id_uid")
			this.uid = uni_id_uid
			console.log("uni_id_uid: ", this.uid);
			this.getAllFileBox()
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
			getAllFileBox() {
				// uni.request({
				//     url: 'http://localhost:8888/fileBox/' + this.uid,
				//     success: (res) => {
				//         console.log(res.data);
				// 		this.boxData = res.data.data
				//     }
				// });
				// this.$u.api.getFileBox(uni.getStorageSync("uni_id_uid")).then(res => {
				// 	console.log(res);
				// })
			}
		},
		onLoad() {
			// uni.$on("clickTags", function(data) {
			// 	console.log("click", data)
			// })
			console.log("onLoad");
			
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
