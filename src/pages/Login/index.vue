<template>
    <div class="wrap">
        <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="login-container">
            <div class="logo">
                <img src="./WechatIMG2579.png" width="100%"/>
            </div>
            <el-form-item label="电话" prop="telephone">
                <el-input v-model.number="form.telephone" placeholder="电话"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passwd">
                <el-input type="password" v-model="form.passwd" autocomplete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="remember">记住密码</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin('form')">提交</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'Login',
        data() {
            return {
                form: {
                    passwd: localStorage.getItem('passwd') || '',
                    telephone: localStorage.getItem('telephone') || '',
                },
                remember: true,
                rules: {
                    passwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    telephone: [
                        { required: true, message: '请输入电话', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            handleLogin(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$request({
                            url: 'apis/admin/admin/handle',
                            data: {
                                handle: 'login',
                                ...this.form,
                            }
                        }).then(res => {
                            if (this.remember) {
                                localStorage.setItem('telephone', this.form.telephone)
                                localStorage.setItem('passwd', this.form.passwd)
                            } else {
                                localStorage.removeItem('telephone')
                                localStorage.removeItem('passwd')
                            }
                            localStorage.setItem('user', JSON.stringify(res.data))
                            this.$router.push({ path: '/' })
                        })
                    } else {
                        console.error('error submit!!')
                        return false
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            }
        }
    }
</script>

<style scoped>
.wrap {
    height: 100vh;
    width: 100vw;
    background: rgb(40, 179, 120) url("./bg.jpeg") no-repeat fixed;
}
.login-container {
    position: fixed;
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    top: 10%;
    left: 0;
    right: 0;
    margin: 0 auto;
    /*margin: 160px auto;*/
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: rgba(255, 255, 255, .8);
    border: 1px solid #eaeaea;
    /*box-shadow: 0 0 25px #cac6c6;*/
}
.logo {
    margin: 0px auto 30px auto;
}
</style>