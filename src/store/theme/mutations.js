/**
 * Created by linxin on 2017/3/11.
 */
import * as func from '../function';

module.exports = {
    SWITCHTHEME(states,obj){
        states.theme = obj.theme;
        func.theme_local.set(states);
    }
}