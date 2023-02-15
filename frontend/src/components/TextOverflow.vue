<template>
	<div :style="lineNum===1?text1:text2" ref="text">
		<el-tooltip :effect="effect" :content="content" :placement="placement" :disabled="!isOver" :visible-arrow="visibleArrow">
			<span class="spanitem" ref="spanItem">{{content}}</span>
		</el-tooltip>
	</div>
</template>
<script>
import { defineComponent, reactive, toRefs, ref, onMounted, onUnmounted } from 'vue'
	export default defineComponent({
		props:{
			content:{ //标题内容
				type: String,
				default: ''
			},
			placement:{//提示位置 top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
				type: String,
				default: 'top-start'
			},
			lineNum: {//多少行溢出隐藏
				type: Number,
				default: 1
			},
			effect: {//主题 dark/light
				type: String,
				default: 'dark'
			},
			visibleArrow: { //是否显示 Tooltip 箭头
				type: Boolean,
				default: true
			}
		},
		setup(props){
			const state = reactive({
				isOver:false, //是不是超出指定宽度
				lineNum: 1,
				text1: {
					width: '100%',
					'text-align': 'justfy',
					'text-overflow': 'ellipsis',
					overflow: 'hidden',
					'white-space': 'nowrap',
					cursor: 'pointer',
				},
				text2: {
					width: '100%',
					'text-align': 'justfy',
					display: '-webkit-box',
					'text-overflow': '-o-ellipsis-lastline',
					'text-overflow': 'ellipsis',
					overflow: 'hidden',
					'-webkit-line-clamp': props.lineNum,
					'-webkit-box-orient': 'vertical',
					cursor: 'pointer',
				},
				offWidth: 0,
			})
			
			let text = ref(null);
			let spanItem = ref(null);

			const init = ()=> {
				// 切换页面，不在当前页，退出计算
				if(!text.value?.parentNode) return;
				// 多行溢出计算方法
				if( props.lineNum!== 1) {
					state.lineNum = props.lineNum;
					if(state.offWidth > text.value.parentNode.offsetWidth*state.lineNum ) {
						state.isOver = true;
					}else {
						state.isOver = false;
					}
					return;
				}
				// 单行溢出计算方法
				if(spanItem.value.offsetWidth > text.value.parentNode.offsetWidth){
					state.isOver = true;
				}else{
					state.isOver = false;
				}
			}

			onMounted(()=>{
				// 多行保留文字单行最大长度
				state.offWidth = spanItem.value.offsetWidth;
				init();
				window.addEventListener('resize', ()=>{
					init();
				})
			})

			onUnmounted(()=>{
				window.removeEventListener('resize', ()=>{
					init();
				})
			})

			return {
				...toRefs(state),
				text,
				spanItem
			}
		}
	})
</script>