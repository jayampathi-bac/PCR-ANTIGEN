import {createStore} from 'vuex'
import {authModule} from "@/store/authModule.js";

const store = createStore({
  state: {
    branch_id: null,
  },
  mutations: {
    setBranchID (state, branch_id) {
      state.branch_id = branch_id;
    }
  },
  getters: {
    getBranchID: state => {
      return state.branch_id
    },
  },
  modules: {
    auth: authModule,
  },
})

export default store
