# 基于vue2.0+vuex+localStorage开发的本地记事本

> 本文采用vue2.0+vuex+localStorage+sass+webpack，实现一个本地存储的记事本。兼容PC端和移动端。在线预览地址：[DEMO](http://test.omwteam.com/)

## 功能说明

- 支持回车添加事件
- 支持事件状态切换
	- 添加事件 -> 进入未完成列表
	- 未完成 -> 已完成(勾选checkbox)
	- 未完成 -> 已取消(点击取消按钮)
	- 已完成 -> 未完成(取消勾选checkbox)
	- 已取消 -> 未完成(点击恢复按钮)
- 支持下载数据到notepad.txt文件
- 支持筛选事件
- 支持编辑事件
- 支持删除事件
- 支持清空所有事件
- 支持本地化存储
- 支持折叠面板

## 项目笔记 ##
本项目是使用vue-cli脚手架生成的项目，项目代码可以到我的github上clone下来。clone下来之后可进入文件目录

	// 执行
	npm install
	// 安装依赖完成之后再执行
	npm run dev
	// 即可在本地开启 http://localhost:8080 访问该项目

	// 如果 node-sass 安装失败，可使用 cnpm 安装
	npm install cnpm -g --registry=https://registry.npm.taobao.org
	cnpm -v 			// 查看cnpm版本号确认安装成功
	cnpm install node-sass -D
	
	//安装成功后再看看是否可以正确运行了

github地址：[https://github.com/lin-xin/notepad](https://github.com/lin-xin/notepad)

demo地址：[http://test.omwteam.com/](http://test.omwteam.com/)

**一、目录结构**


	|——notepad/
	|	|——build/
	|	|——confg/
	|	|——node_modules/
	|	|——src/
	|	|	|——assets/
	|	|	|——components/
	|	|	|	|——add_event.vue       //添加事件组件
	|	|	|	|——dialog.vue		   //弹出框组件
	|	|	|	|——event_table.vue     //表格组件
	|	|	|	|——header.vue		   //头部组件
	|	|	|	|——tools.vue	       //工具栏组件
	|	|	|——store/				   //存放vuex代码
	|	|	|	|——actions.js		   //vuex的action文件
	|	|	|	|——index.js			   //vuex核心代码
	|	|	|——App.vue				   //父组件
	|	|	|——main.js				   //入口文件
	|	|——static/
	|	|——.babelrc
	|	|——.editorconfig
	|	|——.gitgnore
	|	|——index.html
	|	|——package.json
	|	|——README.md


**二、主要难点**

1.折叠面板

难点：点击折叠面板title,要动画实现sliderUp和sliderDown，但是div高度auto，使用transition： height .3s无效。

解决方法：点击时候获取div高度值，赋值给style.height，然后再改变高度为0，这样transition才会生效。

代码如下：

	<template>
		<div id="app">
			<div class="event-tab" @click="changeCollapse(0,$event)">未完成</div>
            <ul class="event-box" :style="{'height':'auto','display':'block'}">
                <li class="event-list" v-for="value in getToDo">
                    <div>{{value.content}}</div>
                </li>
            </ul>
		</div>
	</template>
	<script>
		export default {
	        data(){
	            return {
	                collapse:[
	                    {
	                        show: true,  					// show == true, 表示当前折叠面板显示
	                        contentHeight: 'auto'			// contentHeight, 存储当前折叠面板高度
	                    }
	                ]
				}
			},
			methods:{
				changeCollapse(num,event){    				// 根据折叠面板当前状态进行显示或折叠
	                if(this.collapse[num].show){
	                    this.closeCollapse(num,event);
	                    this.collapse[num].show = false;
	                }else{
	                    this.openCollapse(num,event);
	                    this.collapse[num].show = true;
	                }
	            },
	            closeCollapse(num,event){					// closeCollapse，关闭折叠面板
	                const ulElement = event.currentTarget.nextElementSibling;
	                ulElement.style.height = ulElement.offsetHeight + 'px';
	                this.collapse[num].contentHeight = ulElement.offsetHeight;
	                setTimeout(function () {
	                    ulElement.style.height = '0px';
	                    setTimeout(function () {
	                        ulElement.style.display = 'none';
	                    },300)
	                },10)
	
	            },
	            openCollapse(num,event){					// openCollapse，显示折叠面板
	                const ulElement = event.currentTarget.nextElementSibling,
	                        self = this;
	                ulElement.style.display = 'block';
	                setTimeout(function () {
	                    ulElement.style.height = self.collapse[num].contentHeight + 'px';
	                    setTimeout(function () {
	                        ulElement.style.height = 'auto';
	                    },300)
	                },10)
	            }
			}
		}
	</script>
	<style lang="scss" rel="stylesheet/scss">
		ul.event-box{
            list-style: none;
            overflow: hidden;
            border:{
                left:1px solid #eee;
                right:1px solid #eee;
            }
            transition: height .3s;							// transition，添加折叠或显示时的动画效果
		}
	</style>

2.切换状态

难点：在不同的状态间切换，实时地把事件在不同状态列表中显示出来

解决方法：利用vuex进行状态管理，把所有事件和状态存储在store对象中，在组件中通过计算属性获得事件，因此就有了实时性。

代码如下：

	// store/index.js
	import Vue from 'vue';
	import Vuex from 'vuex';
	import * as actions from './actions.js';
	Vue.use(Vuex);
	const state = {
	    event: []  // event,用来存储所有事件
	}
	const mutations = {
	    EVENTDONE(states,obj){  // EVENTDONE，用来修改事件的状态为已完成
	        for (let i = 0; i < states.event.length; i++) {
	            if (states.event[i].id === obj.id) {
	                states.event[i].type = 2;   // type == 2,表示状态为已完成
	                break;
	            }
	        }
	    }
	}
	export default new Vuex.Store({
	    state,
	    actions,
	    mutations
	})

	// store/actions.js
	export const eventdone = ({ commit }, param) =>{
	    commit('EVENTDONE',{id: param});
	}

	// App.vue
	<template>
		<div id="app">
            <ul class="event-box">
                <li class="event-list" v-for="value in getToDo">
                    <input type="checkbox" @click="moveToDone(value.id,$event)">
                    <div>{{value.content}}</div>
                </li>
            </ul>
		</div>
	</template>
	<script>
		export default {
			computed:{
				getToDo(){    // getToDo，实时获取状态为未完成的事件
	                return this.$store.state.event.filter(function(d){
	                    if(d.type === 1){   // type == 1，表示状态为未完成
	                        return d;
	                    }
	                });
	            }
			},
			methods:{
				moveToDone(id,event){  // moveToDone，选中checkbox将事件移至已完成
	                this.$store.dispatch('eventdone',id);
	            }
			}
		}
	</script>

3.本地存储

知识点：localStorage是HTML5提供的一种在客户端存储数据的新方法，没有时间限制，第二天、第二周或下一年之后，数据依然可用。

用法：

	1）存储数据：localStorage.setItem(item, value)
	2）获取数据：localStorage.getItem(item)
	3）移除数据：localStorage.removeItem(item)

代码如下：

	// store/index.js
	const LocalEvent = function(item){     		// 定义一个本地存储的构造函数
	    this.get = function () {				// 拿数据
	        return JSON.parse(localStorage.getItem(item));
	    }
	    this.set = function (obj) {				// 存数据
	        localStorage.setItem(item,JSON.stringify(obj));
	    }
	    this.clear = function () {				// 删数据
	        localStorage.removeItem(item);
	    }
	}
	const local = new LocalEvent('lx_notepad'); // 创建一个本地存储的事例
	const state = local.get() || {
	    event: [],
	    count: 0
	}
	const mutations = {
	    ADDEVENT(states,obj){					// ADDEVENT，添加新的事件，并存储到localStorage里
			states.count++;
			obj.items.id = states.count;
	        states.event.unshift(obj.items);
	        local.set(states);
	    }
	}

4.父子组件间的通讯
	
知识点：组件实例的作用域是孤立的。这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。

	1）父组件可以使用 props 把数据传给子组件。
	2）子组件可以使用 $emit 触发父组件的自定义事件。

代码如下：

	// App.vue
	<template>
	    <div id="app">
			// 通过 isShow、msg 把数据传个子组件，监听自定义事件cancel、sure。
			<n-dialog :is-show="dialog" :msg="tips" @cancel="dialog = false" @sure="sureDialog"></n-dialog>
		</div>
	</template>
	<script>
		import nDialog from './components/dialog.vue';
		export default {
			data(){
            	return {
                	dialog: true,
                	tips: '清除后无法恢复，确认清除吗？'
				}
            },
			components: {
	            nDialog
	        },
			methods:{
				sureDialog(){
                	this.$store.dispatch('clearevent');
                	this.dialog = false;
            	}
			}
		}
	</script>

	// dialog.vue
	<template>
	    <div class="dialog" :class="{'dialog-show':isShow}">
	        <div class="dialog-wrapper">
	            <div class="dialog-content">
	                {{msg}}
	            </div>
	            <div class="dialog-btns">
	                <button type="button" class="cancel-btn" @click="cancelEvent">取消</button>
	                <button type="button" class="sure-btn" @click="sureEvent">确定</button>
	            </div>
	        </div>
	    </div>
	</template>
	<script>
	    export default {
	        props:['isShow','msg'],  // 通过 props 属性获得父组件传递过来的数据
	        methods: {
	            cancelEvent(){
	                this.$emit('cancel');  // 取消按钮触发父组件的 cancel 自定义事件
	            },
	            sureEvent(){
	                this.$emit('sure');    // 确认按钮触发父组件的 sure 自定义事件
	            }
	        }
	    }
	</script>

5.筛选功能

功能描述：可根据 类型 和 关键词 进行筛选

知识点：在返回所有事件的计算属性上，使用过滤器( filter )，进行对 type 和 content 的筛选，返回符合条件的事件。

代码如下：

	<script>
	    export default {
	        data: function(){
	            return {
	                screen_type: 0,														// 筛选类型，0 表示不筛选
	                screen_title: '',													// 筛选关键词，'' 表示不筛选
	            }
	        },
	        computed:{
	            notapad(){
	                var self = this;
	                return self.$store.state.event.filter(function(d){					// 使用过滤器
	                    if(self.screen_type !== 0 && self.screen_title === ''){			// 只筛选类型
	                        if( d.type === self.screen_type ){
	                            return d;
	                        }
	                    }else if(self.screen_type !== 0 && self.screen_title !== ''){	// 筛选类型和关键词
	                        if( d.type === self.screen_type && d.content.indexOf(self.screen_title) !== -1){
	                            return d;
	                        }
	                    }else if(self.screen_type === 0 && self.screen_title !== ''){	// 只筛选关键词
	                        if(d.content.indexOf(self.screen_title) !== -1){
	                            return d;
	                        }
	                    }else{															// 不进行筛选
	                        return d;
	                    }
	                });
	            }
	        }
		}	
	</script>


## 总结 ##

虽然只是做了个小小的记事本，但是我感觉收获还是很大的，很多知识点掌握得更加的牢固。这个记事本只做了一个页面，就没有用vue-router，路由也是vue里很强大的功能。
做这个记事本的初衷，是因为在工作中，我都会把最近要做的事情给记在本子上，完成之后就会打钩，所以想把这个给放到电脑上去实现。

01-25：添加筛选功能

02-07：修复issues 取消事件的bug #1

02-28：添加下载数据到notepad.txt的功能