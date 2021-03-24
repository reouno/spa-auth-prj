<template>
  <div class="container">
    <div id="nav">
      <router-link to="/">Top</router-link>
      <div class="d-inline-block mx-2">|</div>
      <router-link to="/about">About</router-link>
      <div v-if="isLoggedIn()" class="d-inline-block">
        <div class="d-inline-block mx-2">|</div>
        <router-link v-if="isLoggedIn()" to="/logout">Logout</router-link>
      </div>

    </div>
    <div class="col-3">
      <router-link to="/user-info">ユーザー情報</router-link>
    </div>
    <div v-if="user" class="col">
      <div class="row">
        <div class="col">
          <h4>{{ greeting() }}</h4>
        </div>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">

import { UserEntity } from '@/models/User';
import { userStore } from '@/store/user';
import { Component, Vue } from 'vue-property-decorator';
import { ensureLoggedIn } from '@/gateway/load';

@Component({})
export default class Top extends Vue {
  user: UserEntity | null = null

  greeting(): string {
    const name = this.user?.val.firstName || '';
    return `こんにちは${name.length ? `、${name}さん` : ''}`;
  }

  created(): void {
    ensureLoggedIn(userStore, this.$router).then(() => {
      this.user = userStore.getUser;
    });
  }

  isLoggedIn(): boolean {
    return userStore.getIsLoggedIn;
  }
}
</script>
