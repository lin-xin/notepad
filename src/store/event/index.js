/**
 * Created by linxin on 2017/1/11.
 */
import * as func from '../function';
import * as actions from './actions.js';
import * as mutations from './mutations.js';
import getters from './getters.js';

const state = func.local.get() || {
    event: [],
    count: 0
}

module.exports = {
    state,
    getters,
    actions,
    mutations
}