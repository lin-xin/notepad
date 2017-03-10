/**
 * Created by linxin on 2017/1/11.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions.js';
import * as type from './mutations_types.js';
Vue.use(Vuex);
const getDate = () => { //获取当天日期
    const date = new Date(),
        mouth = parseInt(date.getMonth()) + 1;
    return date.getFullYear() + '-' + mouth + '-' + date.getDate();
}
const localEvent = function(item){
    this.get = function () {
        return JSON.parse(localStorage.getItem(item));
    }
    this.set = function (obj) {
        localStorage.setItem(item,JSON.stringify(obj));
    }
    this.clear = function () {
        localStorage.removeItem(item);
    }
}
const local = new localEvent('lx_notepad');
const state = local.get() || {
    event: [],
    count: 0
}

const mutations = {
    [type.ADDEVENT](states,obj){
        states.count++;
        obj.items.id = states.count;
        states.event.unshift(obj.items);
        local.set(states);
    },
    [type.EVENTDONE](states,obj){
        for (let i = 0; i < states.event.length; i++) {
            if (states.event[i].id === obj.id) {
                states.event[i].type = 2;
                states.event[i].time = getDate();
                var item = states.event[i];
                states.event.splice(i, 1);
                break;
            }
        }
        states.event.unshift(item);
        local.set(states);
    },
    [type.EVENTTODO](states,obj){
        for (let i = 0; i < states.event.length; i++) {
            if (states.event[i].id === obj.id) {
                states.event[i].type = 1;
                var item = states.event[i];
                states.event.splice(i, 1);
                break;
            }
        }
        states.event.unshift(item);
        local.set(states);
    },
    [type.EVENTCANCEL](states,obj){
        for (let i = 0; i < states.event.length; i++) {
            if (states.event[i].id === obj.id) {
                states.event[i].type = 3;
                var item = states.event[i];
                states.event.splice(i, 1);
                break;
            }
        }
        states.event.unshift(item);
        local.set(states);
    },
    [type.CLEAREVENT](states){
        states.event = [];
        local.clear();
    },
    [type.DELEVENT](states,info){
        if(states.event[info.index].id === info.id){
            states.event.splice(info.index, 1);
        }else{
            states.event.filter(function(d,i){
                if(d.id == info.id){
                    states.event.splice(i, 1);
                }
            })
        }
        local.set(states);
    },
    [type.EDITEVENT](states,info){
        if(states.event[info.index].id === info.id){
            states.event[info.index].content = info.content;
        }else{
            states.event.filter(function(d){
                if(d.id == info.id){
                    d.content = info.content;
                }
            })
        }
        local.set(states);
    }
}
export default new Vuex.Store({
    state,
    actions,
    mutations
})