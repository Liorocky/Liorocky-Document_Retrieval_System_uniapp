<template>
	<view>
		<view>
			<uni-search-bar :radius="100" @confirm="search" @input="input"></uni-search-bar>
		</view>

		<view-data-box :localdata="data"></view-data-box>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [{
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
		},
		methods: {

		}
	}
</script>

<style>
	.tags {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
