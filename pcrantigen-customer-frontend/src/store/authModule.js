import AuthService from '@/service/auth/auth.service';
import axios from "axios";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
const user = cookies.get('user')
// const contact = cookies.get('user').contact
// const user = {
//   access_token: userToken,
//   contact:contact
// };

const initialState = (user)
    ? { status: { loggedIn: true }, user}
    : { status: { loggedIn: false }, user: null };

export const authModule = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(

                user => {
                    commit('loginSuccess', user);

                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
        updateUser({ commit },data) {
          commit('UpdateUserState',data);
        },
    },
    mutations: {
        loginSuccess(state, user) {
            console.log("login Success")
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            console.log("login Failure")
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            console.log("logout Success")
            state.status.loggedIn = false;
            state.user = null;
        },
        UpdateUserState(state, data) {
            console.log("UpdateUserState Success")
            state.user.name = data.name;
            state.user.email = data.email;
            state.user.profile_url = data.profile_url;
        }
    }
};
