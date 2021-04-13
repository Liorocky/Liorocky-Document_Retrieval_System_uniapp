<template>
	<view class="wrap">
		<view class="key-input">
			<view class="title">输入验证码</view>
			<view class="tips" v-if="sendSmsStatus">验证码已发送至 {{ mobile }}</view>
			<u-message-input :focus="true" :value="value" @change="change" @finish="finish" mode="bottomLine"
				:maxlength="maxlength"></u-message-input>
			<view class="captcha">
				<text :class="{ noCaptcha: show }" @tap="initLogin">重新获取验证码</text>
				<text :class="{ regain: !show }" v-if="sendSmsStatus">{{ second }}秒后重新获取验证码</text>
			</view>
		</view>
		<view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				maxlength: 4,
				show: false,
				code: '',
				value: '',
				expMinute: 60,
				second: 0,
				mobile: 0,
				sendSmsStatus: false,
				interval: 0,
			};
		},
		computed: {},
		onLoad(option) {
			console.log("option: ", option);
			this.expMinute = option.expMinute
			this.mobile = option.mobile
			this.initLogin() // 开启登录
		},
		methods: {
			initLogin() {
				this.show = false
				this.value = ''
				this.sendSmsStatus = false
				this.sendSmsCode("login") // 发送验证码
				// this.setVerifyCode("login") // 设置验证码
			},
			// change事件侦听
			change(value) {
				// console.log('change', value);
			},
			// 输入完验证码最后一位执行
			async finish(value) {
				this.value = value
				console.log("value: ", this.value);
				const loginRes = await this.loginBySms()
				console.log("loginRes: ", loginRes)
			},
			// 生成验证码
			getCode() {
				const randomStr = '00000' + Math.floor(Math.random() * 1000000)
				this.code = randomStr.substring(randomStr.length - 4)
				console.log("生成this.code: ", this.code);
			},
			// 发送短信验证码
			async sendSmsCode(type) {
				this.getCode()
				let that = this
				console.log("this.code: ", this.code);
				uniCloud.callFunction({
					name: 'uni-id-center',
					data: {
						action: 'sendSmsCode',
						params: {
							mobile: this.mobile,
							code: this.code,
							type: type
						}
					},
					success(res) {
						if (res.result.code !== 0) {
							uni.showModal({
								showCancel: false,
								content: '发送失败，请稍后再试'
							})
						} else {
							console.log("验证码发送成功: ", res);
							that.sendSmsStatus = true
							that.startInterval() // 开启验证码倒计时
						}
						return res
					},
					fail(e) {
						uni.showModal({
							showCancel: false,
							content: '发送失败，请稍后再试'
						})
						return e
					}
				})
			},
			// 通过短信验证码登录
			async loginBySms() {
				console.log("this.code1: ",this.code);
				let that = this
				uniCloud.callFunction({
					name: 'uni-id-center',
					data: {
						action: 'loginBySms',
						params: {
							mobile: this.mobile,
							code: this.value,
							role: ["user"],
							type: "register"
						}
					},
					success(res) {
						console.log("res.result: ", res.result);
						if (res.result.code === 0) {
							uni.setStorageSync('uni_id_token',res.result.token)
							uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
							uni.setStorageSync('uid', res.result.uid)
							
							that.$refs.uToast.show({
								title: res.result.msg,
								type: 'success',
								url: '/pages/retrieve/retrieve',
								isTab: true,
								duration: 2000,
								type: "primary"
							})
						} else {
							uni.showModal({
								showCancel: false,
								content: '登录失败，请稍后再试'
							})
						}
					},
					fail(e) {
						console.error(e)
						uni.showModal({
							showCancel: false,
							content: '发送失败，请稍后再试'
						})
					}
				})
			},
			// 设置验证码
			async setVerifyCode(type) {
				await this.getCode()
				let that = this
				uniCloud.callFunction({
					name: 'uni-id-center',
					data: {
						action: 'setVerifyCode',
						params: {
							mobile: this.mobile,
							code: this.code,
							expiresIn: this.expMinute,
							type
						}
					},
					success(res) {
						console.log("this.code: ", that.code);
						that.sendSmsStatus = true // 设置验证码获取状态为成功
						that.startInterval() // 开启验证码倒计时
					},
					fail(e) {
						console.error(e)
						uni.showModal({
							showCancel: false,
							content: '发送失败，请稍后再试'
						})
					}
				})
			},
			// 开启验证码倒计时
			startInterval() {
				// this.second = this.expMinute
				this.second = 3
				this.interval = setInterval(() => {
					this.second--;
					if (this.second <= 0) {
						this.show = true;
						clearInterval(this.interval);
						this.expireInterval()
					}
				}, 1000);
			},
			// 验证码过期
			expireInterval() {
				
			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 80rpx;
	}

	.box {
		margin: 30rpx 0;
		font-size: 30rpx;
		color: 555;
	}

	.key-input {
		padding: 30rpx 0;

		text {
			display: none;
		}

		.error {
			display: block;
			color: red;
			font-size: 30rpx;
			margin: 20rpx 0;
		}
	}

	.title {
		font-size: 50rpx;
		color: #333;
	}

	.key-input .tips {
		font-size: 30rpx;
		color: #333;
		margin-top: 20rpx;
		margin-bottom: 60rpx;
	}

	.captcha {
		color: $u-type-warning;
		font-size: 30rpx;
		margin-top: 40rpx;

		.noCaptcha {
			display: block;
		}

		.regain {
			display: block;
		}
	}
</style>
