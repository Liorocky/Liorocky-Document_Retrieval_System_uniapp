// 判断数组1 是否包含 数组2
const isArr1ContainArr2 = (arr1, arr2) => {
	// 转成set集合（去重）
	const _arr1Set = new Set(arr1), _arr2Set = new Set(arr2);
	
	// 拿到arr1，arr2的交集
	let intersection = arr1.filter(item => _arr2Set.has(item));
	
	return isArr1EqualsArr2(intersection, arr2);
}

// 判断数组是否相等 排序后使用json解析成字符串
const isArr1EqualsArr2 = (arr1, arr2) => {
	return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
}

// 注册定义的方法
export default {
	isArr1ContainArr2,
	isArr1EqualsArr2
}