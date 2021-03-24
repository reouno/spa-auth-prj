<template>
  <div v-if="user">
    <b-card class="mx-auto border-0 shadow-sm" style="max-width: 20rem;" title="ユーザー情報">
      <b-form-group id="id_username" class="text-left" label="ユーザー名">
        <b-form-input :value="user.val.username" disabled></b-form-input>
      </b-form-group>
      <b-form-group id="id_email" class="text-left" label="Eメールアドレス">
        <b-form-input :value="user.val.email" disabled></b-form-input>
      </b-form-group>
    </b-card>
  </div>
</template>

<script lang="ts">

import { UserEntity } from '@/models/User';
import { Component, Vue } from 'vue-property-decorator';
import { ensureLoggedIn } from '@/gateway/load';
import { userStore } from '@/store/user';

@Component({})
export default class UserInfo extends Vue {
  user: UserEntity | null = null

  created(): void {
    ensureLoggedIn(userStore, this.$router).then(() => {
      this.user = userStore.getUser;
    });
  }
}
</script>

<style scoped>

</style>
