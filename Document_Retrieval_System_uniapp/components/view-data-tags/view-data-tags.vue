<template>
	<view>
		<view class="content">
			<swiper class="swiper" @change="change">
				<swiper-item>
					<u-grid :col="4" @click="clickTag" hover-class="hover-class">
						<u-grid-item v-for="(item, index) in list" :index="index" :key="index">
							<text class="grid-text">{{ '宫格' + (index + 1) }}</text>
						</u-grid-item>
					</u-grid>
				</swiper-item>
				<swiper-item>
					<u-grid :col="3" @click="clickTag">
						<u-grid-item v-for="(item, index) in list" :index="index + 9" :key="index">
							<text class="grid-text">{{ '宫格' + (index + 1) }}</text>
						</u-grid-item>
					</u-grid>
				</swiper-item>
				<swiper-item>
					<u-grid :col="3" @click="clickTag">
						<u-grid-item v-for="(item, index) in list" :index="index + 18" :key="index">
							<text class="grid-text">{{ '宫格' + (index + 1) }}</text>
						</u-grid-item>
					</u-grid>
				</swiper-item>
			</swiper>
			
			<view class="indicator-dots" v-if="true">
				<view class="indicator-dots-item" :class="[current == 0 ? 'indicator-dots-active' : '']">
				</view>
				<view class="indicator-dots-item" :class="[current == 1 ? 'indicator-dots-active' : '']">
				</view>
				<view class="indicator-dots-item" :class="[current == 2 ? 'indicator-dots-active' : '']">
				</view>
			</view>


			<!-- <scroll-view scroll-y="true" style="height: 600rpx;">
				<view>
					<u-tag @click="clickTag" ref="tags1" index="1" text="要清楚" mode="dark" :closeable="false"
						:show="true" />
					<u-tag @click="clickTag" index="2" text="要清楚" mode="dark" :closeable="false" :show="true" />
					<u-tag @click="clickTag" index="3" text="要清楚" mode="dark" :closeable="false" :show="true" />
				</view>
			</scroll-view>
			<view class="confrim-btn">
				<u-button @click="show = false;">确定</u-button>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		name: "view-data-tags",
		//属性
		props: {
			localdata: {
				type: Array,
				default () {
					return []
				}
			},
		},
		data() {
			return {
				current: 0,
				list: ['integral', 'kefu-ermai', 'coupon', 'gift', 'scan', 'pause-circle', 'wifi', 'email', 'list']
			};
		},
		methods: {
			clickTag(index) {
				console.log("index: ", index);
				// this.$refs.tags1.type = "info"
			},
			change(e) {
				this.current = e.detail.current;
			}
		}
	}
</script>

<style>

</style>
