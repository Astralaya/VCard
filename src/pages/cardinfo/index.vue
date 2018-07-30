<template>
  <div class="page">
    <div class="weui-cells__title"></div>
    <div class="weui-cells weui-cells_after-title">
      <navigator url="" class="weui-cell weui-cell_access" hover-class="weui-cell_active" @click="modifiyHead">
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
      <div class="weui-cell weui-cell_input" @click="modifiyBackground" style="padding-top:10px;padding-bottom:10px;">
          <div class="weui-cell__hd">背景图片</div>
          <div class="weui-cell__bd ">
            <image class="weui-cell__ft modifiy-userAvatar" style="float:right;display:block;" :src="userInfo.strBackground" />
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
              <div class="weui-uploader__input-box" v-if="files.length < 8">
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
      files: [],
      saveInfo: {}
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
        _this.userInfo = data;
        data.images.map(item => {
          var item = item.map;
          _this.files.push(item);
        });
      } catch (error) {}
    },
    chooseImage(strId) {
      var _this = this;
      var count = 8 - this.files.length
      wx.chooseImage({
        count: count,
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          res.tempFilePaths.map(item => {
            _this.uploaderFiles(item , strId)
          });
        },
        fail: function() {},
        complete: function() {}
      });
    },
    uploaderFiles(tempFilePaths, strId, del) {
      const _this = this;
      var par = {
        strOpenId: this.userInfo.strOpenId,
        intType: 2
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
          if (typeof strId === 'number') {
            _this.files.map((item, index) => {
              if (item.id === strId) {
                _this.files[index].imgUrl = res.imgUrl;
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
        for (let i = 0; i < this.files.length; i++) {
          const element = this.files[i];
          if(element.id == par.strId) this.files.splice(i,1)
        }
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
      var par = (this.saveInfo = {});
      if (
        this.userInfo.strMobile != "" &&
        !api.isPoneAvailable(this.userInfo.strMobile)
      ) {
        api.wxToast({ title: "手机号不正确" });
        return;
      }
      for (const key in this.userInfo) {
        if (this.userInfo[key] != "" && key != "images") {
          this.saveInfo[key] = this.userInfo[key];
        }
      }
      wx.showLoading({ title: "正在保存" });
      try {
        var res = await api.post_login(par);
        wx.hideLoading();
        api.wxToast({ title: "保存成功", icon: "success" });
        store.commit("inUserInfo", res);
        this.$router.open({
          title: "首页",
          url: "../mine/mine",
          type: "TAB"
        });
      } catch (error) {
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
    },
    modifiyHead() {
      var _this = this;
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          _this.upDateHead(res.tempFilePaths[0], 1);
        },
        fail: function() {},
        complete: function() {}
      });
    },
    upDateHead(localImage, type) {
      const _this = this;
      var par = {
        strOpenId: this.userInfo.strOpenId,
        intType: type
      };
      api
        .wxUploadFile({
          filePath: localImage,
          formData: par
        })
        .then(res => {
          if (type == 1) {
            _this.userInfo.strAvatarUrl = res.imgUrl;
          } else {
            _this.userInfo.strBackground = res.imgUrl;
          }
        });
    },
    modifiyBackground() {
      var _this = this;
      wx.chooseImage({
        count: 1,
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          _this.upDateHead(res.tempFilePaths[0], 3);
        },
        fail: function() {},
        complete: function() {}
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
