import AuthService from '@/service/auth/auth.service';
import axios from "axios";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();
const admin2 = cookies.get('admin2')

const initialState = (admin2)
    ? { status: { loggedIn: true }, admin2}
    : { status: { loggedIn: false }, admin2: null };

export const authModule = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, admin2) {
            return AuthService.login(admin2).then(

              admin2 => {
                    commit('loginSuccess', admin2);

                    return Promise.resolve(admin2);
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
        loginSuccess(state, admin2) {
            console.log("login Success",admin2)
            state.status.loggedIn = true;
            state.admin2 = admin2;
        },
        loginFailure(state) {
            console.log("login Failure")
            state.status.loggedIn = false;
            state.admin2 = null;
        },
        logout(state) {
            console.log("logout Success")
            state.status.loggedIn = false;
            state.admin2 = null;
        },
        UpdateUserState(state, data) {
            console.log("UpdateUserState Success")
            state.admin2.name = data.name;
            state.admin2.email = data.email;
            state.admin2.profile_url = data.profile_url;
        }
    }
};
