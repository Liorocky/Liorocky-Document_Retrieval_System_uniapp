<template>
	<view>
		<view>
			<u-form :model="form" ref="uForm">
				<u-form-item label="标题"><u-input v-model="form.title" /></u-form-item>
				<u-form-item label="描述"><u-input v-model="form.desc" /></u-form-item>
			</u-form>
		</view>
		
		<view>
			<button type="primary" @click="selectTagsShow = true">选择标签</button>
			
		</view>
		
		<view>
			<uni-file-picker ref="files" v-model="listValue" fileMediatype="all" :list-styles="listStyles" mode="list"
				@select="select" @progress="progress" @success="success" @fail="fail" :auto-upload="false">
				<button>选择文件</button>
				</uni-file-picker>
			<button type="primary" @click="upload">上传文件</button>
		</view>
		
		<view>
			<u-popup v-model="selectTagsShow" mode="top" height="52%">
				<view-data-tags></view-data-tags>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					title:"",
					desc:""
				},
				listValue: [],
				imageStyles: {
					width: 64,
					height: 64,
					border: {
						color: "#ff5a5f",
						width: 2,
						style: 'dashed',
						radius: '2px'
					}
				},
				listStyles: {
					// 是否显示边框
					border: true,
					// 是否显示分隔线
					dividline: true,
					// 线条样式
					borderStyle: {
						width: 1,
						color: 'blue',
						radius: 2
					}
				},
				selectTagsShow: false, // pop选择标签
			}
		},
		methods: {
			// 获取上传状态
			select(e) {
				console.log('选择文件：', e)
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
				console.log("e: ",e);
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},
			upload() {
				this.$refs.files.upload()
			}
		}
	}
</script>

<style lang="scss">

</style>
