# 基于vue2.0+vuex+localStorage开发的本地记事本

> 本文采用vue2.0+vuex+localStorage+sass+webpack，实现一个本地存储的记事本。兼容PC端和移动端。在线预览地址：[DEMO](http://blog.gdfengshuo.com/example/notepad/)

## 功能说明

- 支持回车添加事件
- 支持事件状态切换
	- 添加事件 -> 进入未完成列表
	- 未完成 -> 已完成(勾选checkbox)
	- 未完成 -> 已取消(点击取消按钮)
	- 已完成 -> 未完成(取消勾选checkbox)
	- 已取消 -> 未完成(点击恢复按钮)
- 支持筛选事件
- 支持编辑事件
- 支持删除事件
- 支持清空所有事件
- 支持本地化存储
- 支持折叠面板
- 支持切换主题颜色 :sparkles:
- 支持导出/导入数据

## 安装步骤
本项目是使用vue-cli脚手架生成的项目，项目代码可以到我的github上clone下来。clone下来之后可进入文件目录

	git clone https://github.com/lin-xin/notepad.git
	cd notepad
	npm install
	npm run dev

	// 如果 node-sass 安装失败，可使用 cnpm 安装
	npm install cnpm -g --registry=https://registry.npm.taobao.org
	cnpm -v 			// 查看cnpm版本号确认安装成功
	cnpm install node-sass -D
	
	//安装成功后再看看是否可以正确运行了

## 功能截图

![image](https://raw.githubusercontent.com/lin-xin/notepad/master/screenshots/3.gif)
![image](https://raw.githubusercontent.com/lin-xin/notepad/master/screenshots/2.gif)

## 主要难点

### 1.折叠面板

难点：点击折叠面板title,要动画实现sliderUp和sliderDown，但是div高度auto，使用transition： height .3s无效。

解决方法：点击时候获取div高度值，赋值给style.height，然后再改变高度为0，这样transition才会生效。

### 2.切换状态

难点：在不同的状态间切换，实时地把事件在不同状态列表中显示出来

解决方法：利用vuex进行状态管理，把所有事件和状态存储在store对象中，在组件中通过计算属性获得事件，因此就有了实时性。
关于vuex在该项目中更详细的应用可查看文章：[Vuex 模块化实现待办事项的状态管理](https://github.com/lin-xin/blog/issues/5)

### 3.本地存储

知识点：localStorage是HTML5提供的一种在客户端存储数据的新方法，没有时间限制，第二天、第二周或下一年之后，数据依然可用。

用法：

	1）存储数据：localStorage.setItem(item, value)
	2）获取数据：localStorage.getItem(item)
	3）移除数据：localStorage.removeItem(item)


### 4.父子组件间的通讯
	
知识点：组件实例的作用域是孤立的。这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。

	1）父组件可以使用 props 把数据传给子组件。
	2）子组件可以使用 $emit 触发父组件的自定义事件。


### 5.筛选功能

功能描述：可根据 类型 和 关键词 进行筛选

知识点：在返回所有事件的计算属性上，使用过滤器( filter )，进行对 type 和 content 的筛选，返回符合条件的事件。

### 6.切换主题

功能描述：通过点击选中的颜色，改变整个记事本的主题风格，并永久保存。

知识点：使用vuex管理主题状态，并进行模块化管理，用localStorage永久存储选中的主题颜色。

### 7.数据的导出和导入

## 总结 ##

虽然只是做了个小小的记事本，但是我感觉收获还是很大的，很多知识点掌握得更加的牢固。这个记事本只做了一个页面，就没有用vue-router，路由也是vue里很强大的功能。
做这个记事本的初衷，是因为在工作中，我都会把最近要做的事情给记在本子上，完成之后就会打钩，所以想把这个给放到电脑上去实现。