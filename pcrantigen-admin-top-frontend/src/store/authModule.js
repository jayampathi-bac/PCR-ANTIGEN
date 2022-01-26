import AuthService from '@/service/auth/auth.service';
import axios from "axios";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
const admintop = cookies.get('admintop')

const initialState = (admintop)
    ? { status: { loggedIn: true }, admintop}
    : { status: { loggedIn: false }, admintop: null };

export const authModule = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, admintop) {
            return AuthService.login(admintop).then(

              admintop => {
                    commit('loginSuccess', admintop);

                    return Promise.resolve(admintop);
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
        loginSuccess(state, admintop) {
            console.log("login Success",admintop)
            state.status.loggedIn = true;
            state.admintop = admintop;
        },
        loginFailure(state) {
            console.log("login Failure")
            state.status.loggedIn = false;
            state.admintop = null;
        },
        logout(state) {
            console.log("logout Success")
            state.status.loggedIn = false;
            state.admintop = null;
        },
        UpdateUserState(state, data) {
            console.log("UpdateUserState Success")
            state.admintop.name = data.name;
            state.admintop.email = data.email;
            state.admintop.profile_url = data.profile_url;
        }
    }
};
