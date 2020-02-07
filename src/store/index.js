import Vuex from '@wepy/x';

export default new Vuex.Store({
    state: {
        counter: 0,
        userInfo: {}
    },
    mutations: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        setUserInfo (state, userInfo) {
            state.userInfo = userInfo
        }
    },
    actions: {
        setUserInfo({
            commit
        }, userInfo) {
            commit('setUserInfo', userInfo);
        },
        increment({
            commit
        }) {
            commit('increment');
        },
        decrement({
            commit
        }) {
            commit('decrement');
        },
        incrementAsync({
            commit
        }) {
            setTimeout(() => {
                commit('increment');
            }, 1000);
        }
    }
});
