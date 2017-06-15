<template>
    <div class="dialog">
        <div class="dialog-wrapper">
            <div class="dialog-header">
                <span class="dialog-header-title">提示</span>
            </div>
            <div v-if="msg !== 'upload'" class="dialog-content">
                {{msg}}
            </div>
            <div v-else class="dialog-content">
                <input type="file" accept="*.txt" @change="upload">
                <p>只允许上传由侧边栏下载的notepad.txt文件</p>
                <p v-if="up_suc">数据读取成功，是否确定导入？</p>
                <p v-if="up_err">上传失败，只允许notepad.txt文件</p>
            </div>
            <div class="dialog-btns">
                <button type="button" class="cancel-btn" @click="cancelEvent">取消</button>
                <button v-if="msg !== 'upload'" type="button" class="sure-btn" @click="sureEvent">确定</button>
                <button v-else type="button" class="sure-btn" @click="sureUpload">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                up_suc: false,
                up_err: false,
                events: ''
            }
        },
        props:['msg'],
        methods: {
            cancelEvent(){
                this.$emit('cancel');
            },
            sureEvent(){
                this.$emit('sure');
            },
            upload(event){
                const self = this,
                    files = event.srcElement.files,
                    reader = new FileReader();
                    console.log(files);
                if(files[0] && files[0].name.indexOf('notepad') !== -1){
                    reader.onload = function (ev) {
                        self.up_err = false;
                        self.up_suc = true;
                        self.events = ev.target.result;
                    }
                    reader.readAsText(files[0]);
                }else{
                    self.up_suc = false;
                    self.up_err = true;
                }
            },
            sureUpload(){
                if(this.up_suc){
                    this.$store.dispatch('uploadevent',this.events);
                    this.cancelEvent();
                }
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .dialog {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        background: rgba(0, 0, 0, .4);
        z-index:999;
        .dialog-wrapper {
            position: absolute;
            left: 50%;
            top: 20%;
            width:100%;
            max-width: 400px;
            transform: translateX(-50%);
            background: #fff;
            border-radius: 2px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
            box-sizing: border-box;
            animation: dialog .5s;
        }
        .dialog-header {
            padding: 20px 20px 0;
        }
        .dialog-content {
            padding: 30px 20px;
            color: #475669;
            font-size: 18px;
            text-align: center;
            p{
                font-size: 14px;
                margin-top: 10px;
            }
        }
        .dialog-btns {
            padding: 10px 20px 15px;
            text-align: right;
            button {
                font-size: 14px;
            }
            .cancel-btn {
                width: 50px;
                background: #fff;
                border: 1px solid #c0ccda;
                color: #1f2d3d;
            }
            .sure-btn {
                width: 50px;
                margin-left: 5px;
                color: #fff;
                transition: background .3s ease-in;
            }
        }
    }
    @keyframes dialog {
        from{
            top: 15%;
        }
    }
</style>