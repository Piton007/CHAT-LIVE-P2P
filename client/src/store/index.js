import Vue from "vue";
import Vuex from "vuex";
import axios from "@/plugins/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name:sessionStorage.getItem("name") || "",
    avatar: sessionStorage.getItem("avatar") || "" 
  },
  mutations: {
    setName(state,name){
      sessionStorage.setItem("name",name)
      state.name = name
    },
    setAvatar(state,avatar){
      sessionStorage.setItem("avatar",avatar)
      state.avatar = avatar
    }
    
  },
  actions: {
    register(context,{name,avatar}){
      const form = new FormData()
      form.set("name",name)
      form.set("avatar",avatar)
      return axios
        .post("/upload-avatar",form).then(({data})=>{
          context.commit("setName",name)
          context.commit("setAvatar",data.fileName)
          sessionStorage.setItem("isLogged",true) 
        })
    },

  },
  modules: {}
});
