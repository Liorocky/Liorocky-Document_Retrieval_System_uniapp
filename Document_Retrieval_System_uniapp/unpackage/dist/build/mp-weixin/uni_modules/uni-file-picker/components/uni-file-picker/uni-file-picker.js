(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker"],{"17f4":function(e,t,i){"use strict";i.r(t);var n=i("836e"),r=i.n(n);for(var s in n)"default"!==s&&function(e){i.d(t,e,(function(){return n[e]}))}(s);t["default"]=r.a},"836e":function(e,t,i){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=u(i("a34a")),s=i("1c34");function u(e){return e&&e.__esModule?e:{default:e}}function l(e,t,i,n,r,s,u){try{var l=e[s](u),a=l.value}catch(o){return void i(o)}l.done?t(a):Promise.resolve(a).then(n,r)}function a(e){return function(){var t=this,i=arguments;return new Promise((function(n,r){var s=e.apply(t,i);function u(e){l(s,n,r,u,a,"next",e)}function a(e){l(s,n,r,u,a,"throw",e)}u(void 0)}))}}var o=function(){i.e("uni_modules/uni-file-picker/components/uni-file-picker/upload-image").then(function(){return resolve(i("9d2f"))}.bind(null,i)).catch(i.oe)},c=function(){i.e("uni_modules/uni-file-picker/components/uni-file-picker/upload-file").then(function(){return resolve(i("a614"))}.bind(null,i)).catch(i.oe)},f={name:"uniFilePicker",components:{uploadImage:o,uploadFile:c},props:{value:{type:[Array,Object],default:function(){return[]}},disabled:{type:Boolean,default:!1},disablePreview:{type:Boolean,default:!1},delIcon:{type:Boolean,default:!0},autoUpload:{type:Boolean,default:!0},limit:{type:[Number,String],default:9},mode:{type:String,default:"grid"},fileMediatype:{type:String,default:"image"},fileExtname:{type:Array,default:function(){return[]}},title:{type:String,default:""},listStyles:{type:Object,default:function(){return{border:!0,dividline:!0,borderStyle:{}}}},imageStyles:{type:Object,default:function(){return{width:"auto",height:"auto"}}},readonly:{type:Boolean,default:!1},returnType:{type:String,default:"array"}},watch:{value:{handler:function(e){var t=this,i=[],n=[].concat(e||[]);n.forEach((function(e){var n=t.files.find((function(t){return t.url===e.url})),r=/cloud:\/\/([\w.]+\/?)\S*/;e.path||(e.path=e.url),r.test(e.url)&&t.getTempFileURL(e,e.url),i.push(n||e)})),this.files=i},immediate:!0}},data:function(){return{files:[]}},computed:{filesList:function(){var e=[];return this.files.forEach((function(t){e.push(t)})),e},showType:function(){return"image"===this.fileMediatype?this.mode:"list"},limitLength:function(){return"object"===this.returnType?1:this.limit?this.limit>=9?9:this.limit:1}},created:function(){this.tempData={}},methods:{upload:function(){var e=[];this.files.forEach((function(t,i){"ready"!==t.status&&"error"!==t.status||e.push(Object.assign({},t))})),this.uploadFiles(e)},choose:function(){this.disabled||(this.files.length>=Number(this.limitLength)&&"grid"!==this.showType&&"array"===this.returnType?e.showToast({title:"您最多选择 ".concat(this.limitLength," 个文件"),icon:"none"}):this.chooseFiles())},chooseFiles:function(){var t=this;n.chooseAndUploadFile||(n.chooseAndUploadFile=s.chooseAndUploadFile),n.chooseAndUploadFile({type:this.fileMediatype,compressed:!1,extension:this.fileExtname.length>0?this.fileExtname:void 0,count:this.limitLength-this.files.length,onChooseFile:function(){var i=a(r.default.mark((function i(n){var s,u,l,a,o;return r.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:(1===Number(t.limitLength)&&t.disablePreview&&!t.disabled||"object"===t.returnType)&&(t.files=[]),s=[],u=[],t.fileExtname&&t.fileExtname.length>0?(n.tempFiles.forEach((function(e){var i=t.getFileExt(e.name),n=i.ext.toLowerCase();-1!==t.fileExtname.indexOf(n)&&(u.push(e),s.push(e.path))})),u.length!==n.tempFiles.length&&e.showToast({title:"当前选择了".concat(n.tempFiles.length,"个文件 ，").concat(n.tempFiles.length-u.length," 个文件格式不正确"),icon:"none",duration:5e3})):(s=n.tempFilePaths,u=n.tempFiles),l=[],a=0;case 6:if(!(a<u.length)){i.next=20;break}if(!(t.limitLength-t.files.length<=0)){i.next=9;break}return i.abrupt("break",20);case 9:return u[a].uuid=Date.now(),i.next=12,t.getFileData(u[a],t.fileMediatype);case 12:o=i.sent,o.progress=0,o.status="ready",t.files.push(o),l.push(o);case 17:a++,i.next=6;break;case 20:t.$emit("select",{tempFiles:l,tempFilePaths:s}),t.autoUpload||(n.tempFiles=[]);case 22:case"end":return i.stop()}}),i)})));function n(e){return i.apply(this,arguments)}return n}(),onUploadProgress:function(e){t.setProgress(e,e.index)}}).then((function(e){t.setSuccessAndError(e.tempFiles)})).catch((function(e){console.log("选择失败",e)}))},uploadFiles:function(e){var t=this;e=[].concat(e),this.uploadCloudFiles(e,5,(function(e){t.setProgress(e,e.index,!0)})).then((function(e){t.setSuccessAndError(e)})).catch((function(e){console.log("err",e)}))},setSuccessAndError:function(e,t){var i=this;return a(r.default.mark((function t(){var n,s,u,l,a,o,c;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=[],s=[],u=[],l=[],a=function(t){var r=e[t],a=r.uuid?i.files.findIndex((function(e){return e.uuid===r.uuid})):r.index;if(-1===a||!i.files)return"break";"request:fail"===r.errMsg?(i.files[a].url=r.path,i.files[a].status="error",i.files[a].errMsg=r.errMsg,i.files[a].progress=-1,s.push(i.files[a]),l.push(i.files[a].url)):(i.files[a].errMsg="",i.files[a].url=r.url,i.files[a].status="success",n.push(i.files[a]),u.push(i.files[a].url))},o=0;case 6:if(!(o<e.length)){t.next=13;break}if(c=a(o),"break"!==c){t.next=10;break}return t.abrupt("break",13);case 10:o++,t.next=6;break;case 13:n.length>0&&(i.setEmit(),i.$emit("success",{tempFiles:i.backObject(n),tempFilePaths:u})),s.length>0&&i.$emit("fail",{tempFiles:i.backObject(s),tempFilePaths:l});case 15:case"end":return t.stop()}}),t)})))()},setProgress:function(e,t,i){this.files.length;var n=Math.round(100*e.loaded/e.total),r=t;i||(r=this.files.findIndex((function(t){return t.uuid===e.tempFile.uuid}))),-1!==r&&this.files[r]&&(this.files[r].progress=n,this.$emit("progress",{index:r,progress:parseInt(n),tempFile:this.files[r]}))},delFile:function(e){this.$emit("delete",{tempFile:this.files[e],tempFilePath:this.files[e].url}),this.files.splice(e,1)},getFileExt:function(e){var t=e.lastIndexOf("."),i=e.length;return{name:e.substring(0,t),ext:e.substring(t+1,i)}},getFileInfo:function(t){return new Promise((function(i,n){e.getImageInfo({src:t,success:function(e){i(e)},fail:function(e){n(e)}})}))},getFileData:function(e){var t=arguments,i=this;return a(r.default.mark((function n(){var s,u,l,a,o;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(s=t.length>1&&void 0!==t[1]?t[1]:"image",u=i.getFileExt(e.name),l=u.ext.toLowerCase(),a={name:e.name,uuid:e.uuid,extname:l||"",cloudPath:e.cloudPath,fileType:e.fileType,url:e.path||e.path,size:e.size,image:{},path:e.path,video:{}},"image"!==s){n.next=11;break}return n.next=7,i.getFileInfo(e.path);case 7:o=n.sent,a.image.width=o.width,a.image.height=o.height,a.image.location=o.path;case 11:return n.abrupt("return",a);case 12:case"end":return n.stop()}}),n)})))()},uploadCloudFiles:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:5,i=arguments.length>2?arguments[2]:void 0;e=JSON.parse(JSON.stringify(e));var r=e.length,s=0,u=this;return new Promise((function(l){while(s<t)a();function a(){var t=s++;if(t>=r)!e.find((function(e){return!e.url&&!e.errMsg}))&&l(e);else{var o=e[t],c=u.files.findIndex((function(e){return e.uuid===o.uuid}));o.url="",delete o.errMsg,n.uploadFile({filePath:o.path,cloudPath:o.cloudPath,fileType:o.fileType,onUploadProgress:function(e){e.index=c,i&&i(e)}}).then((function(e){o.url=e.fileID,o.index=c,t<r&&a()})).catch((function(e){o.errMsg=e.errMsg||e.message,o.index=c,t<r&&a()}))}}}))},setEmit:function(){var e=[];e="object"===this.returnType?this.backObject(this.files)[0]:this.backObject(this.files),this.$emit("input",e)},backObject:function(e){var t=JSON.parse(JSON.stringify(e));return t.map((function(e){return delete e.path,delete e.uuid,delete e.video,delete e.progress,delete e.errMsg,delete e.status,delete e.cloudPath,e})),t},getTempFileURL:function(e,t){var i=this;return a(r.default.mark((function s(){var u,l;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return t={fileList:[].concat(t)},r.next=3,n.getTempFileURL(t);case 3:u=r.sent,e.path=u.fileList[0].tempFileURL||"",l=i.files.findIndex((function(t){return t.path===e.path})),-1!==l&&i.$set(i.files,l,e);case 7:case"end":return r.stop()}}),s)})))()}}};t.default=f}).call(this,i("543d")["default"],i("a9ff")["default"])},b1cf:function(e,t,i){"use strict";i.r(t);var n=i("bd1e"),r=i("17f4");for(var s in r)"default"!==s&&function(e){i.d(t,e,(function(){return r[e]}))}(s);i("edd3");var u,l=i("f0c5"),a=Object(l["a"])(r["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],u);t["default"]=a.exports},b8b5:function(e,t,i){},bd1e:function(e,t,i){"use strict";var n;i.d(t,"b",(function(){return r})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){return n}));var r=function(){var e=this,t=e.$createElement;e._self._c},s=[]},edd3:function(e,t,i){"use strict";var n=i("b8b5"),r=i.n(n);r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker-create-component',
    {
        'uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("b1cf"))
        })
    },
    [['uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker-create-component']]
]);
