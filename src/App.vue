<script>
import api from "@/utils/api";
import store from "@/store/store";
import config from './main.js'

export default {
  onLoad() {},
  created() {
    store.commit("inUserInfo");
    this.wxLogin();
  },
  methods: {
    async wxLogin() { 
      var wxCode = await api.wxLogin();
      
      var openId = await api.wxOpenId(wxCode.code,);
      var openIdCode = openId.openid;
      var par = {
        'strOpenId': openIdCode
      };
      store.commit("inSendBtn", openId.isSend);
      try {
        var userInfo = await api.wxGetUserInfo();
        // 如果不是老用户，添加姓名和头像
        if (!openId.isOld) {
          par = Object.assign(par, {
            strName: userInfo.userInfo.nickName
          });
          par = Object.assign(par, {
            strAvatarUrl: userInfo.userInfo.avatarUrl
          });
          par = Object.assign(par , {
            strBackground : userInfo.userInfo.avatarUrl
          })
        }
        this.loginFn(par);
      } catch (ex) {
        this.loginFn(par);
      }
    },
    async loginFn(par) {
      var data = await api.post_login(par);
      
      store.commit("inUserInfo", data);
      store.commit("inOpenId", par.strOpenId);
    }
  }
};
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: #f7f7f7;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
}

/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
