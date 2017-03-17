/**
 * Created by linxin on 2017/3/11.
 */
import * as func from '../function.js';
import actions from './actions.js';
import mutations from './mutations.js';
import getters from './getters.js';

const state = func.theme_local.get() || {
    theme: 'blue'
}

export default {
    state,
    actions,
    mutations,
    getters
}