/**
 * Created by linxin on 2017/3/11.
 */
import * as actions from './actions.js';
import * as mutations from './mutations.js';
import * as getters from './getters.js';
import * as func from '../function.js';
// let

const state = func.theme_local.get() || {
    theme:'blue'
}

module.exports = {
    state,
    actions,
    mutations,
    getters
}