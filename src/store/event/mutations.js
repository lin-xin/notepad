/**
 * Created by linxin on 2017/3/11.
 */
import * as type from './mutations_types.js';
import * as func from '../function';

export default {
    [type.ADDEVENT](states, obj){
        states.count++;
        obj.items.id = states.count;
        states.event.unshift(obj.items);
        func.local.set(states);
    },
    [type.EVENTDONE](states, obj){
        for (let i = 0; i < states.event.length; i++) {
            if (states.event[i].id === obj.id) {
                states.event[i].type = 2;
                states.event[i].time = func.getDate();
                var item = states.event[i];
                states.event.splice(i, 1);
                break;
            }
        }
        states.event.unshift(item);
        func.local.set(states);
    },
    [type.EVENTTODO](states, obj){
        for (let i = 0; i < states.event.length; i++) {
            if (states.event[i].id === obj.id) {
                states.event[i].type = 1;
                var item = states.event[i];
                states.event.splice(i, 1);
                break;
            }
        }
        states.event.unshift(item);
        func.local.set(states);
    },
    [type.EVENTCANCEL](states, obj){
        for (let i = 0; i < states.event.length; i++) {
            if (states.event[i].id === obj.id) {
                states.event[i].type = 3;
                var item = states.event[i];
                states.event.splice(i, 1);
                break;
            }
        }
        states.event.unshift(item);
        func.local.set(states);
    },
    [type.CLEAREVENT](states){
        states.event = [];
        func.local.clear();
    },
    [type.DELEVENT](states, info){
        if (states.event[info.index].id === info.id) {
            states.event.splice(info.index, 1);
        } else {
            states.event.filter(function (d, i) {
                if (d.id == info.id) {
                    states.event.splice(i, 1);
                }
            })
        }
        func.local.set(states);
    },
    [type.EDITEVENT](states, info){
        if (states.event[info.index].id === info.id) {
            states.event[info.index].content = info.content;
        } else {
            states.event.filter(function (d) {
                if (d.id == info.id) {
                    d.content = info.content;
                }
            })
        }
        func.local.set(states);
    },
    [type.UPLOADEVENT](states, data){
        data = JSON.parse(data);
        states.event = data.event.event;
        states.count = data.event.count;
        func.local.set(states);
    }
}