<template>
  <div class="container">
    <b-card class="mx-auto border-0" style="max-width: 20rem;" title="ログイン">
      <div class="container">
        <b-form-group id="id_username" :state="usernameIsEntered"
                      class="text-left" label="ユーザー名">
          <b-form-input v-model="username" placeholder="Enter user name" type="text"></b-form-input>
        </b-form-group>
        <b-form-group id="id_password" :state="passwordIsEntered" class="text-left" label="パスワード">
          <b-form-input v-model="password" placeholder="Enter password"
                        type="password"></b-form-input>
        </b-form-group>
        <b-button :disabled="!allFormsAreEntered()" variant="primary" @click="login">ログイン
        </b-button>
      </div>
    </b-card>
  </div>
</template>

<script lang="ts">

import { Component, Vue, Watch } from 'vue-property-decorator';
import apiClient from '@/gateway/apiClient';
import { dtoToUserEntity } from '@/gateway/api/auth';
import { userStore } from '@/store/user';

@Component({})
export default class Login extends Vue {
  username = ''

  password = ''

  usernameIsEntered: boolean | null = null

  passwordIsEntered: boolean | null = null

  async created(): Promise<void> {
    await this.setCsrf();
  }

  setCsrf(): Promise<void> {
    return apiClient.get('/api/auth/set-csrf/');
  }

  login(): void {
    this.confirmInputValidations();
    apiClient.post('/api/auth/login/', {
      username: this.username.trim(),
      password: this.password.trim(),
    }).then((response) => {
      userStore.setUser(dtoToUserEntity(response.data.user));
    }).then(() => {
      this.$router.push('/');
    });
  }

  @Watch('username')
  updateUsernameInputState(): void {
    this.usernameIsEntered = this.username.trim().length > 0;
  }

  @Watch('password')
  updatePasswordInputState(): void {
    this.passwordIsEntered = this.password.trim().length > 0;
  }

  allFormsAreEntered(): boolean {
    return this.username.trim().length > 0 && this.password.trim().length > 0;
  }

  confirmInputValidations(): void {
    if (!this.usernameIsEntered) {
      this.usernameIsEntered = false;
    }
    if (!this.passwordIsEntered) {
      this.passwordIsEntered = false;
    }
  }
}
</script>

<style scoped>

</style>
