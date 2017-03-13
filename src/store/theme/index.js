/**
 * Created by linxin on 2017/3/11.
 */
import * as func from '../function.js';
import * as actions from './actions.js';
import * as mutations from './mutations.js';
import getters from './getters.js';

const state = func.theme_local.get() || {
    theme:'blue'
}

module.exports = {
    state,
    actions,
    mutations,
    getters
}