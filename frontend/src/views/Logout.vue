<template>
  <div class="container">
    <div v-if="loginState==='loggedIn'">
      <h5>ログアウトしています...</h5>
    </div>
    <div v-else-if="loginState==='loggedOut'">
      <h5>ログアウトしました。</h5>
    </div>
    <div v-else>
      <h5>エラーが発生しました。</h5>
    </div>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import { logout } from '@/gateway/api/auth';
import { userStore } from '@/store/user';

type LoginState = 'loggedIn' | 'loggedOut' | 'error';

@Component({})
export default class Logout extends Vue {
  loginState: LoginState = 'loggedIn';

  created(): void {
    if (!userStore.getIsLoggedIn) {
      this.loginState = 'loggedOut';
    }

    logout().then(() => {
      userStore.reset();
      this.loginState = 'loggedOut';
    }).catch((e) => {
      console.error(e);
      userStore.reset();
      this.loginState = 'error';
    });
  }
}
</script>

<style scoped>

</style>
