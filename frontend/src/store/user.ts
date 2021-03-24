import {
  Action,
  getModule, Module, Mutation, VuexModule,
} from 'vuex-module-decorators';
import { UserEntity } from '@/models/User';
import store from '@/store/index';

const emptyUser: UserEntity = {
  id: { value: '' },
  val: {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    groups: [],
    isActive: false,
    isStaff: false,
    isSuperUser: false,
    lastLogin: new Date(0),
    dateJoined: new Date(0),
    userPermissions: [],
  },
};

@Module({
  dynamic: true, store, name: 'user', namespaced: true,
})
export class User extends VuexModule {
  private user = emptyUser

  private isLoggedIn = false

  @Mutation
  private set(user: UserEntity): void {
    this.user = user;
  }

  @Mutation
  private setLoginState(isLoggedIn: boolean): void {
    this.isLoggedIn = isLoggedIn;
  }

  @Action
  setUser(user: UserEntity): void {
    this.set(user);
    this.setLoginState(true);
  }

  @Action
  reset(): void {
    this.set(emptyUser);
    this.setLoginState(false);
  }

  get getUser(): UserEntity {
    return this.user;
  }

  get getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}

/**
 * このようにexportすることで、IDE補完が効くようになる
 * @see: https://qiita.com/tsrnk/items/fd95c3d8013d0795a260
 */
export const userStore = getModule(User);
