import { reactive, readonly, ref } from 'vue';
import jwtDecode from 'jwt-decode';
// import message from '@/shared/plugins/message'
import { message } from 'ant-design-vue';

export default function useCurrentUser() {
  const state = reactive({
    uid: '',
  });

  const profileRef = reactive({
    username: null,
    screenName: null,
    avatarUrl: null,
  });

  interface claims {
    uid: string;
    exp: number;
  }
  const logout = function (refresh = false) {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    if (refresh) {
      location.replace('/auth/login');
    }
  };
  // 通过 token 登录
  const login = function (token: string) {
    const decoded = jwtDecode<claims>(token);
    if (UnixTimestampMs() > decoded.exp) {
      message.error('登录过期');
      logout();
      return false;
    }
    localStorage.setItem('token', token);
    console.log(decoded);
    state.uid = decoded.uid;
    return true;
  };

  const setProfile = function (profile) {
    if (null == profile) {
      return false;
    }
    localStorage.setItem('profile', JSON.stringify(profile));
    profileRef.username = profile.username;
    profileRef.avatarUrl = profile.avatarUrl;
    profileRef.screenName = profile.screenName;
  };

  function UnixTimestampMs(): number {
    return +new Date() / 1000;
  }

  // 是否登录。副作用：如果 token 存在且未过期就尝试登录。
  const hasLogin = function (): Boolean {
    console.log('check hasLogin');

    if (profileRef.username == null) {
      const profile = JSON.parse(localStorage.getItem('profile'));
      setProfile(profile);
    }
    if (state.uid.length > 0) {
      return true;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return login(token);
  };

  return {
    userState: readonly(state),
    profile: readonly(profileRef),
    login,
    logout,
    hasLogin,
    setProfile,
  };
}
