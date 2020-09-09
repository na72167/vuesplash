import { OK } from '../util'

const state = {
  user: null,
  apiStatus: null
}

const getters = {
  check: state => !! state.user,
  username: state => state.user ? state.user.name : ''
}

//mutations内はuser内の情報を更新する処理
const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setApiStatus (state, status) {
    state.apiStatus = status
  }
}

//const response = await axios.post('/api/register', data)
//で会員登録ページからpost送信された会員情報をresponseで管理する。
//context.commit('setUser', response.data)で
//mutationsにアクセス。送信した会員情報へ内容を更新する。
const actions = {
  async register (context, data) {
    const response = await axios.post('/api/register', data)
    context.commit('setUser', response.data)
  },
  async login (context, data) {
    context.commit('setApiStatus', null)
    const response = await axios.post('/api/login', data)
      .catch(err => err.response || err)

    if (response.status === OK) {
      context.commit('setApiStatus', true)
      context.commit('setUser', response.data)
      return false
    }
    context.commit('setApiStatus', false)
    context.commit('error/setCode', response.status, { root: true })
  },
  async logout (context) {
    const response = await axios.post('/api/logout')
    context.commit('setUser', null)
  },
  async currentUser (context) {
    const response = await axios.get('/api/user')
    const user = response.data || null
    context.commit('setUser', user)
  }
}

export default {
  //コンポーネントからアクションへアクセスするための処理。
  //await this.$store.dispatch('auth/register', this.registerForm)
  //こんな感じ
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
