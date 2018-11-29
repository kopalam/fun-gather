import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        code: null,
        userInfo: null,
        userInfoReadyCallback: null,
        token: '',

    },
    mutations: {
        increment: (state) => {
            state.count += 1
        },
        decrement: (state) => {
            state.count -= 1
        },
        goto: () => {
            if (url === "/login") {
                localStorage.removeItem('access-user')
            }
            this.$router.push(url)
        }
        // Login({ commit }, userInfo) {
        //     const email = userInfo.email.trim();
        //     return new Promise((resolve, reject) => {
        //         login(email, userInfo.password).then(response => {
        //             const data = response.data;
        //             console.log(response.data);
        //             Cookies.set('Admin-Token', response.data.token);
        //             commit('SET_TOKEN', data.token);
        //             commit('SET_EMAIL', email);
        //             resolve();
        //         }).catch(error => {
        //             reject(error);
        //         });
        //     });
        // },
    }
})