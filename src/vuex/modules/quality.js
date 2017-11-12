import * as types from '../mutation-types'
import axios from 'axios'

function x() {
  // 复杂的事情
}

const state = {
  content: []
}

const getters = {
  allProducts: (state) => state.all
  
}

const actions = {
  getContents({ commit },url) {
  	axios.get(url).then((res)=>{
  		commit(types.QUALITY_CONTENT, res)
  	})
  }
}

const mutations = {
  [types.QUALITY_CONTENT] (state, res) {
    state.content = res.data.datas.list
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
