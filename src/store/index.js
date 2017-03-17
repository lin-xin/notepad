/**
 * Created by linxin on 2017/3/11.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import event from './event';
import theme from './theme';

export default new Vuex.Store({
    modules: {
        event,
        theme
    }
});