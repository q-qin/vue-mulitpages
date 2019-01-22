import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'


Vue.use(Vuex)

const state = {
	userinfo: {}
}

const getters = {
	getUserInfo(state) {
        return state.userinfo;
    }
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})