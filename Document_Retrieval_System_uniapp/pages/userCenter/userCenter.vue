<template>
	<view>

		<!-- 账户信息 -->
		<u-card title="账户信息">
			<view class="" slot="body">
				<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
					<view class="u-m-r-10">
						<u-avatar :src="pic" size="140"></u-avatar>
					</view>
					<view class="u-flex-1">
						<view class="u-font-18 u-p-b-20">13109595651</view>
						<view class="u-font-12 u-p-b-20">已使用 12MB</view>
					</view>
				</view>
			</view>
		</u-card>

		<!-- 图表信息 -->
		<u-card title="系统信息">
			<view class="" slot="body">
				<view>
					<view style="width: 100%; height:500rpx">
						<l-echart ref="pieCharts"></l-echart>
					</view>
				</view>
			</view>
		</u-card>

		<!-- 操作 -->
		<u-card title="操作">
			<view class="" slot="body">
				<u-button type="error" @click="logout()">登出</u-button>
			</view>
		</u-card>

		<view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import * as echarts from '@/uni_modules/lime-echart/components/lime-echart/echarts';
	import lEchart from '@/uni_modules/lime-echart/components/lime-echart/'

	export default {
		components: {
			lEchart
		},
		data() {
			return {
				pic: '/static/icon/head.jpg',
				show: true,
				pieOption: {
					title: {
						text: '文件类型占比',
						subtext: '',
						left: 'center'
					},
					tooltip: {
						trigger: 'item'
					},
					series: [{
						name: '数量',
						type: 'pie',
						radius: '50%',
						data: [],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						},
						label: {
							normal: {
								formatter: function(data){
								  console.log(data)
								  return data.name+ " :" + " "+data.percent.toFixed(0) + "%";
								},
								textStyle: {
									fontSize: 14
								}
							}
						},
					}]
				},
			}
		},
		onShow() {
			this.checkLogin()
		},
		onLoad() {

		},
		async mounted() {
			this.pieOption.series[0].data = await this.getPieData()

			this.$refs.pieCharts.init(config => {
				const {
					canvas
				} = config;
				const chart = echarts.init(canvas, null, config);
				canvas.setChart(chart);
				chart.setOption(this.pieOption);
				// 需要把 chart 返回
				return chart;
			});
		},
		methods: {
			async getPieData() {
				// 获取饼状图数据
				const db = uniCloud.database()
				const collection = db.collection('dfs_file')

				let res = await collection.where('file_uid == $cloudEnv_uid').get()
				console.log("res", res)

				let resData = []
				let resMap = new Map()
				res.result.data.forEach(item => {
					if (resMap.has(item.file_type)) {
						let count = resMap.get(item.file_type)
						resMap.set(item.file_type, ++count)
					} else {
						resMap.set(item.file_type, 1)
					}
				})

				console.log("resMap", resMap)

				resMap.forEach(function(value, key, map) {
					let temp = {
						name: key,
						value: value
					}

					resData.push(temp)
				})

				return resData
			},
			checkLogin() {
				// 登录拦截
				const uni_id_token = uni.getStorageSync("uni_id_token")
				const uni_id_token_expired = uni.getStorageSync("uni_id_token_expired")
				console.log("uni_id_token", uni_id_token);
				console.log("uni_id_token_expired", uni_id_token_expired);

				if (!uni_id_token && new Date() > uni_id_token_expired) {
					uni.showToast({
						title: '请登录',
						duration: 2000
					});
					this.$u.route({
						url: 'pages/login/login',
					})
				}
			},
			click(item) {
				console.log("打开登陆页面")
				uni.navigateTo({
					url: '../../pages/login/login'
				});
			},
			logout() {
				let that = this
				uniCloud.callFunction({
					name: 'uni-id-center',
					data: {
						action: 'logout'
					},
					success(res) {
						uni.removeStorageSync('uni_id_token')
						uni.removeStorageSync('uni_id_token_expired')
						that.$refs.uToast.show({
							title: "登出成功",
							type: 'success',
							url: '/pages/login/login',
							duration: 2000,
							type: "primary"
						})
					},
					fail(e) {
						console.error(e)
						uni.showModal({
							showCancel: false,
							content: '登出失败，请稍后再试'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ededed;
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #fff;
	}
</style>
