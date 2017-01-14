/**
 * Created by linxin on 2017/1/11.
 */
export const addevent = ({ commit }, param) =>{
    commit('ADDEVENT',{items: param});
}
export const eventdone = ({ commit }, param) =>{
    commit('EVENTDONE',{id: param});
}
export const eventtodo = ({ commit }, param) =>{
    commit('EVENTTODO',{id: param});
}
export const eventcancel = ({ commit }, param) =>{
    commit('EVENTCANCEL',{id: param});
}
export const clearevent = ({ commit }) =>{
    commit('CLEAREVENT');
}
export const delevent = ({ commit }, param) =>{
    commit('DELEVENT', param);
}
export const editevent = ({ commit }, param) =>{
    commit('EDITEVENT', param);
}