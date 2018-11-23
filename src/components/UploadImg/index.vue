/**
* User: vickyzhe@outlook.com
* Date: 2018/10/9
* Time: 下午10:38
*
*/
<template>
  <el-upload
    class="avatar-uploader"
    action="/api/upload/uploadimg"
    :show-file-list="false"
    :on-success="uploadImgSuccess"
    :before-upload="beforeUploadImg"
    :http-request="uploadImg"
  >
    <img v-if="imgUrl && imgUrl != 0" :src="baseUrl + imgUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script type="text/ecmascript-6">
  import config from '@/utils/config'
    export default {
        name: 'UploadImg',
        props: ['imgUrl'],
        data() {
            return {
              baseUrl: config.baseUrl,
            }
        },
        methods: {
          beforeUploadImg(file) {
            if (file.type !== 'image/jpeg') {
              this.$message.error('上传头像图片只能是 JPG 格式!')
              return false
            }
          },
          uploadImg(file) {
            const formData = new FormData()
            formData.append('image', file.file)
            this.$request({
              url: '/apis/api/upload/uploadimg',
              data: formData,
              config: 'formData'
            }).then(res => {
              this.imgUrl = res.data
              this.$emit('child-event', res.data)
            })
          },
          uploadImgSuccess(res, file) {
            this.ruleForm.img = URL.createObjectURL(file.raw)
          },
        }
    }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 300px;
    display: block;
  }
</style>
