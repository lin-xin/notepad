<template>
    <section class="event-all" :class="{'event-all-show':isShow}">
        <table class="event-table">
            <thead>
                <tr>
                    <th width="50">#</th>
                    <th>所有事项</th>
                    <th width="100">类型</th>
                    <th width="150">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(value, index) in notapad">
                    <td>{{index}}</td>
                    <td>{{value.content}}</td>
                    <td>{{getType(value.type)}}</td>
                    <td><button @click="showInput(index)">编辑</button>
                        <button class="del-btn" @click="showDialog(index,value.id)">删除</button></td>
                </tr>
            </tbody>
        </table>
        <div class="edit-input" :class="{'edit-input-show': is_edit}">
            <input type="text" v-model="info.content" @keyup.enter="editData">
            <button @click="editData">确定</button>
        </div>
        <div class="close-span" @click="closeTable">+</div>
    </section>
</template>

<script>
    export default {
        data: function(){
            return {
                is_edit: false,
                info:{
                    content: '',
                    id: 0,
                    index: 0
                }
            }
        },
        props:['isShow'],
        computed:{
            notapad(){
                return this.$store.state.event;
            }
        },
        methods:{
            getType(type){
                let str = '';
                switch(type) {
                    case 1:
                        str = '未完成';
                        break;
                    case 2:
                        str = '已完成';
                        break;
                    case 3:
                        str = '已取消';
                        break;
                }
                return str;
            },
            showDialog(index,id){
                this.$emit('deldialog',index,id);
            },
            showInput(index){
                this.is_edit = true;
                this.info = {
                    index : index,
                    content : this.notapad[index].content,
                    id : this.notapad[index].id
                }
            },
            editData(){
                this.info.content = this.info.content.trim();
                if(this.info.content){
                    this.$store.dispatch('editevent',this.info);
                    this.is_edit = false;
                }
            },
            closeTable(){
                this.$emit('close');
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .event-all{
        position: absolute;
        left:0px;
        top:70px;
        right:0;
        bottom:0;
        transform: translateX(100%);
        transition: transform .5s;
        overflow-Y: scroll;
        background: #fff;
        &.event-all-show{
            transform: translateX(0);
        }
        &::-webkit-scrollbar{
            width:0;
        }
        .event-table{
            width:1000px;
            padding:0;
            margin: 20px auto;
            border:{
                left:1px solid #eee;
                top:1px solid #eee;
            }
            border-spacing: 0px;
            td,th{
                position: relative;
                height: 40px;
                min-width: 0;
                padding:5px 20px;
                box-sizing: border-box;
                text-overflow: ellipsis;
                vertical-align: middle;
                border:{
                    right:1px solid #eee;
                    bottom:1px solid #eee;
                }
            }
            button{
                padding:5px 10px;
                font-size: 12px;
                color: #fff;
                background: #00a2ff;
                border:0;
                &.del-btn{
                    background: #F44336;
                }
            }
        }
        .edit-input{
            position: absolute;
            left:50%;
            bottom:200px;
            width:710px;
            height:60px;
            padding:10px;
            margin-left: -355px;
            box-sizing: border-box;
            transform: translateY(260px);
            transition: transform .3s;
            background: #f3f3f3;
            border:1px solid #eee;
            border-radius:4px;
            &.edit-input-show{
                transform: translateY(0);
            }
            input{
                float: left;
                width:600px;
                height:40px;
                padding:5px 10px;
                box-sizing: border-box;
                border: 1px solid #ddd;
            }
            button{
                float: right;
                width:80px;
                height:40px;
                background: #00a2ff;
                color: #fff;
                border:0;
            }
        }
        .close-span{
            position: absolute;
            right:40px;
            top:30px;
            width:50px;
            height: 50px;
            line-height: 50px;
            border-radius: 50%;
            transform: rotate(45deg);
            text-align: center;
            background: #00a2ff;
            font-size: 50px;
            color: #fff;
            cursor: pointer;
        }
    }
</style>