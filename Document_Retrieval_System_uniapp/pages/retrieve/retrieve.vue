<template>
	<view>
		<view>
			<uni-search-bar :radius="100" @confirm="search" @input="input" ></uni-search-bar>			
		</view>

	<file-data-word :localdata="data"></file-data-word>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				data: [
				  {fileName: '文档1', filePath: 'www.baidu.com',fileType: 'word'},
				  {fileName: '文档2', filePath: 'www.baidu.com',fileType: 'word'},
				  {fileName: '文档3', filePath: 'www.baidu.com',fileType: 'word'}
				],
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.tags{
	display: flex;
	justify-content: space-between;
	align-items:center;
}
</style>
