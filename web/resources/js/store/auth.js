const state = {
  user: null
}

const getters = {
  check: state => !! state.user,
  username: state => state.user ? state.user.name : ''
}

//mutations内はuser内の情報を更新する処理
const mutations = {
  setUser (state, user) {
    state.user = user
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
    const response = await axios.post('/api/login', data)
    context.commit('setUser', response.data)
  },
  async logout (context) {
    const response = await axios.post('/api/logout')
    context.commit('setUser', null)
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
