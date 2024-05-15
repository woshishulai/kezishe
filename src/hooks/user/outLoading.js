import { useUserInfo } from '@/store/store';
import { info } from '../antd/message';
import router from '@/router';
const user = useUserInfo();
export const removeUserInfo = () => {
    info('error', '用户登录过期请重新登录');
    user.removeUserInfo();
    user.removeUserNickName();
    user.removeUserTranslate();
    localStorage.clear();
    setTimeout(() => {
        router.push('/login');
    }, 1500);
};
