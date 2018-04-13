<template>
  <div class="page">
    <div class="weui-cells__title"></div>
    <div class="weui-cells weui-cells_after-title">
      <navigator url="" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
        <div class="weui-cell__bd">头像</div>
        <div class="weui-cell__ft ">
          <image class="weui-cell__ft modifiy-userAvatar" :src="userInfo.strAvatarUrl" />
        </div>
      </navigator>
    </div>
    <div class="weui-cells__title">基础资料</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <image src="../../static/assets/name.png" style="width: 20px;height: 20px;margin-right: 5px" />
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="姓名" v-model="userInfo.strName" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <image src="../../static/assets/phone.png" style="width: 20px;height: 20px;margin-right: 5px" />
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="电话" v-model="userInfo.strMobile" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <image src="../../static/assets/emial.png" style="width: 20px;height: 20px;margin-right: 5px" />
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="邮箱" v-model="userInfo.strEmail" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <image src="../../static/assets/company.png" style="width: 20px;height: 20px;margin-right: 5px" />
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="公司" v-model="userInfo.strCompany" />
        </div>
      </div>
      <div class="weui-cell weui-cell_input">
        <div class="weui-cell__hd">
          <image src="../../static/assets/joy.png" style="width: 20px;height: 20px;margin-right: 5px" />
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" placeholder="职位" v-model="userInfo.strPosition" />
        </div>
      </div>
    </div>

    <div class="weui-cells__title">简介</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea class="" placeholder="请输入简介" style="height: 3.3em" v-model="userInfo.strIntro" />
          <div class="weui-textarea-counter">0/200</div>
        </div>
      </div>
    </div>

    <div class="weui-cells__title">产品上传</div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <div class="weui-uploader">
            <div class="weui-uploader__hd">
              <div class="weui-uploader__title">图片上传</div>
              <div class="weui-uploader__info">{{files.length}}/8</div>
            </div>
            <div class="weui-uploader__bd">
              <div class="weui-uploader__files" id="uploaderFiles">
                <div v-for="(item , index) in files" :key="index">
                  <div class="weui-uploader__file" :id="item.id" @click="longtap(item)">
                    <image class="weui-uploader__img" :src="item.imgUrl" mode="aspectFill" />
                  </div>
                </div>
              </div>
              <div class="weui-uploader__input-box">
                <div class="weui-uploader__input" @click="chooseImage"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="submit-btn-area">
      <button class="weui-btn btn-defalut" hover-class="btn-hover" @click="saveForm">保存</button>
    </div>

  </div>
</template>

<script>
// 编辑名片
import api from "@/utils/api";
import store from "@/store/store";

export default {
  data() {
    return {
      userInfo: {},
      files: []
    };
  },
  computed: {},
  mounted() {
    this.userInfo = this.$root.$mp.query;
    this.files = [];
    this.getUserInfo();
  },
  methods: {
    // 读取当前用户表单数据
    async getUserInfo() {
      var _this = this;
      var par = {
        "@strOpenId": this.userInfo.strOpenId
      };
      try {
        var data = await api.Get_UserInfo(par);
        if (data.success) {
          _this.userInfo = data.data;
          data.data.images.map(item => {
            var item = item.map;
            // var urlPath = item.strUrl + '/' + item.strFilePath + '/'  + item.strOpenId
            _this.files.push(item);
          });
          // _this.files =
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    chooseImage(id, del) {
      var _this = this;
      wx.chooseImage({
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          res.tempFilePaths.map(item => {
            _this.uploaderFiles(item, id, del);
          });
          // _this.uploaderFiles(res.tempFilePaths , id)
        },
        fail: function() {},
        complete: function() {}
      });
    },
    uploaderFiles(tempFilePaths, strId, del) {
      const _this = this;
      var par = {
        strOpenId: this.userInfo.strOpenId,
        intType: 1
      };
      if (strId != undefined && typeof strId != "object") {
        par = Object.assign(par, { strId: strId });
      }
      if (del) {
        par = Object.assign(par, { rowState: "D" });
        this.delImage(par);
        return;
      }
      api
        .wxUploadFile({
          filePath: tempFilePaths,
          formData: par
        })
        .then(res => {
          if (strId) {
            _this.files.map((item, index) => {
              if (item.strId === strId) {
                _this.files[index].imgUrl = res;
              }
            });
          } else {
            _this.files = _this.files.concat(res);
          }
        });
    },
    async delImage(par) {
      var res = await api.del_Image(par);
      if (res.success) {
      } else {
      }
      api.wxToast({ title: res.msg });
    },
    predivImage(e) {
      var arr = [];
      this.files.map(item => {
        arr.push(item.imgUrl);
      });
      wx.previewImage({
        current: e.imgUrl, // 当前显示图片的http链接
        urls: arr // 需要预览的图片http链接列表
      });
    },

    async saveForm() {
      var par = this.userInfo;
      if (par.strMobile != "" && !api.isPoneAvailable(par.strMobile)) {
        api.wxToast({ title: "手机号不正确" });
        return;
      }
      wx.showLoading({ title: "正在保存" });
      var res = await api.post_login(par);
      console.log(res);
      wx.hideLoading();
      if (res.success) {
        api.wxToast({ title: "保存成功", icon: "success" });
        this.userInfo = res.data;
        wx.setStorageSync("userInfo", res.data);
        store.commit("inUserInfo");
        this.$router.open({
          title: "首页",
          url: "../mine/mine",
          type: "TAB"
        });
      }
    },
    longtap(item) {
      var _this = this;
      var itemList = ["打开大图", "修改图片", "删除图片"];
      api.wxShowActionSheet(itemList).then(res => {
        if (res == 0) {
          // 打开大图
          _this.predivImage(item);
        } else if (res == 1) {
          // 修改图片
          _this.chooseImage(item.id);
        } else if (res === 2) {
          // 删除图片
          _this.uploaderFiles(undefined, item.id, true);
        }
      });
    }
  }
};
</script>
<style>
.modifiy-userAvatar {
  width: 140rpx;
  height: 140rpx;
  border-radius: 12rpx;
}
.submit-btn-area {
  margin: 30rpx;
}
</style>
