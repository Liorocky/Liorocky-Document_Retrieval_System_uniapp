<template>
	<view>
		<view>
			<uni-search-bar :radius="100" @confirm="search" @input="input" ></uni-search-bar>			
		</view>

	<file-data-box :localdata="data"></file-data-box>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				data: [
				  {fileName: '文档测试测试文档测试测试文1', filePath: 'www.baidu.com',fileType: 'word'},
				  {fileName: '文档测试测试文档测试测试文2', filePath: 'www.baidu.com',fileType: 'word'},
				  {fileName: '文档测试测试文档测试测试文3', filePath: 'www.baidu.com',fileType: 'word'},
				  {fileName: '文档测试测试文档测试测试文3', filePath: 'www.baidu.com',fileType: 'word'},
				  {fileName: '文档测试测试文档测试测试文3', filePath: 'www.baidu.com',fileType: 'word'},
				  {fileName: '文档测试测试文档测试测试文3', filePath: 'www.baidu.com',fileType: 'word'},
				  {fileName: '文档测试测试文档测试测试文3', filePath: 'www.baidu.com',fileType: 'word'},
				  {fileName: '文档测试测试文档测试测试文3', filePath: 'www.baidu.com',fileType: 'word'}
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
