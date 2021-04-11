<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录文档检索系统</view>
			<input class="u-border-bottom" type="number" v-model="mobile" placeholder="请输入手机号" />
			<view class="tips">未注册的手机号验证后自动创建账号</view>
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">获取短信验证码</button>
			<view class="alternative">
				<!-- <view class="password">密码登录</view> -->
				<!-- <view class="issue">遇到问题</view> -->
			</view>
		</view>
		<view class="buttom">
			<view class="loginType">
				<view class="wechat item">
					<view class="icon">
						<u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon>
					</view>
					微信
				</view>
			</view>
			<view class="hint">
				登录代表同意
				<text class="link">用户协议、隐私政策，</text>
				并授权使用您的账号信息（如昵称、头像、收获地址）以便您统一管理
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '', // 手机号
				code: '', // 验证码
				expMinute: 60, // 验证码失效时间 单位 秒
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				if (this.mobile) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		methods: {
			// 获取验证码

			// 校验手机号格式
			checkMobile(mobile) {
				if (!/^1\d{10}$/.test(mobile)) {
					uni.showModal({
						content: '请输入正确的手机号',
						showCancel: false
					})
					return false
				}
				return true
			},
			// 登录、注册流程
			// 先校验手机号，成功则跳转code页面，然后发送登录验证码，校验验证码，存在此账户，则登陆成功
			// 未存在账户，设置验证码，通过验证码注册用户
			submit() {
				if (this.checkMobile(this.mobile)) {
					this.$u.route({
						url: 'pages/login/code',
						params: {
							expMinute: this.expMinute,
							mobile: this.mobile
						}
					})
				}
			},
			
			async loginBySms() {
				uniCloud.callFunction({
					name: 'uni-id-center',
					data: {
						action: 'loginBySms',
						params: {
							mobile: this.mobile,
							code: this.code,
							role: "['user']"
						}
					},
					success(res) {
						console.log("res: ", res);
						that.$refs.uToast.show({
							title: res.result.msg,
							type: 'success',
							url: '/pages/retrieve/retrieve',
							isTab: true,
							duration: 2000,
							type: "primary"
						})
					},
					fail(e) {
						console.error(e)
						uni.showModal({
							showCancel: false,
							content: '发送失败，请稍后再试1'
						})
					}
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 350rpx 0rpx 150rpx 340rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
