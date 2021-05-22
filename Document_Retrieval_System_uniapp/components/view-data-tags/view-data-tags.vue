<template>
	<view>
		<view class="content">
			<swiper class="swiper" @change="change" circular=true>
				<swiper-item v-for="i in pagesNum">
					<u-grid :col="5">
						<u-grid-item v-for="(item, index) in allTags" :index="item._id" :key="item._id" @click="clickTag(item)"
							:custom-style="{background: (item.selected ? '#a0cfff' : '#ffffff')}"
							v-if="index >= (i - 1) * 15">
							<text class="grid-text">{{ item.tag_name }}</text>
						</u-grid-item>
					</u-grid>
				</swiper-item>
			</swiper>

			<view class="indicator-dots" v-if="true">
				<view v-if="selectedTagsSet && selectedTagsSet.size > 0">已选择{{ selectedTagsSet.size }}个标签</view>
				<view v-for="i in pagesNum">
					<view class="indicator-dots-item" :class="[current == i - 1 ? 'indicator-dots-active' : '']"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "view-data-tags",
		//属性
		props: {
			allTags: { // 全部标签
				type: Array,
				default () {
					return
				}
			},
			selectedTags: { // 已选择的标签
				type: Array,
				default () {
					return
				}
			}
		},
		data() {
			return {
				current: 0
			};
		},
		computed: {
			pagesNum: function() {
				return Math.ceil(this.allTags.length / 15)
			},
			selectedTagsSet: function() {
				if (this.selectedTags === null) {
					return null
				}
				return new Set(this.selectedTags)
			}
		},
		methods: {
			clickTag(item) {
				if (this.selectedTagsSet.has(item)) {
					this.selectedTagsSet.delete(item)
				} else {
					this.selectedTagsSet.add(item)
				}
				item.selected = item.selected === true ? false : true 
				this.$emit("clickTag", item) // 点击的标签
				this.$emit("selectedTags", Array.from(this.selectedTagsSet)) // 所有已选中的标签
			},
			change(e) {
				this.current = e.detail.current;
			}
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
		height: 300rpx;
	}
	
	u-grid-item {
		width: 33.3%;
		height: 200rpx;
		text-align: center;
		line-height: 200rpx;
	}
</style>
