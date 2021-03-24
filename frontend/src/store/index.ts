import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * 各モジュールはstore初期化後にダイナミックに登録するためmodulesを書かない
 * @see: https://github.com/championswimmer/vuex-module-decorators#dynamic-modules
 */
export default new Vuex.Store({
  plugins: [createPersistedState({
    key: 'spaAuthApp',
    storage: window.sessionStorage,
  })],
});
