import { createStore } from 'vuex'
import { authModule } from "@/store/authModule.js";

const store = createStore({
  modules: {
    auth: authModule,
  },
})

export default store
