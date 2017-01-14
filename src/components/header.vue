<template>
    <header class="">
        <h1>记事本 <a class="t-btn" :class="{'t-btn-left':isShow}" @click="showTools"><span></span></a></h1>
    </header>
</template>
<script>
    export default {
        props:['isShow'],
        methods: {
            showTools(){
                this.$emit('tools');
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    header{
        width:100%;
        height:70px;
        background: #00a2ff;
        h1{
            position: relative;
            width:800px;
            margin:0 auto;
            line-height: 70px;
            text-align: center;
            color: #fff;
            a.t-btn{
                position: absolute;
                right:10px;
                top:22px;
                width:30px;
                height:26px;
                cursor: pointer;
                &:hover span{
                    &:before{
                        width: 20px;
                        left: 10px;
                        transform: rotate(37deg) translateY(-7px);
                    }
                    &:after{
                        width: 20px;
                        left: 10px;
                        transform: rotate(-37deg) translateY(7px);
                    }
                }
                &.t-btn-left{
                    &:hover span{
                        &:before{
                            width: 30px;
                            left: 0px;
                            transform: translateY(-7px);
                        }
                        &:after{
                            width: 30px;
                            left: 0px;
                            transform: translateY(7px);
                        }
                    }
                }
            }
            span,span:before,span:after{
                position: absolute;
                left:0;
                width:30px;
                height:4px;
                content: '';
                background: #fff;
            }
            span{
                top:11px;
                &:before{
                    top:0;
                    transform: translateY(-7px);
                    transition: all .3s;
                }
                &:after{
                    transform: translateY(7px);
                    transition: all .3s;
                }
            }
        }
    }
</style>
