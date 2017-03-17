/**
 * Created by linxin on 2017/1/11.
 */
import * as func from '../function';
import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';
const state = func.local.get() || {
    event: [],
    count: 0
}

export default {
    state,
    getters,
    actions,
    mutations
}