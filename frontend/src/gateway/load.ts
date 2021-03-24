import { checkLoggedIn } from '@/gateway/api/auth';
import VueRouter from 'vue-router';
import { User } from '@/store/user';

export const ensureLoggedIn = (
  userStore: User,
  $router: VueRouter,
): Promise<void> => checkLoggedIn().then((user) => {
  userStore.setUser(user);
}).catch((reason) => {
  console.log({
    a: 'ensureLoggedInに失敗した時のレスポンす',
    reason,
  });
  $router.push('/login/');
});
