/**
 * Created by linxin on 2017/3/11.
 */
export default {
    getEventList(states) {
        return states.event;
    },
    getToDo(states){
        return states.event.filter(function (d) {
            if (d.type === 1) {
                return d;
            }
        });
    },
    getDone(states){
        return states.event.filter(function (d) {
            if (d.type === 2) {
                return d;
            }
        });
    },
    getCancel(states){
        return states.event.filter(function (d) {
            if (d.type === 3) {
                return d;
            }
        });
    }
};