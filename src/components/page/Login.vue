<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">CASEarth小卫星数据管理 <br />与交换服务分系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="type" label="用户类别：" label-width="90px">
                    <el-radio v-model="param.sign" label="0">管理员</el-radio>
                    <el-radio v-model="param.sign" label="1">网站用户</el-radio>
                </el-form-item>
                <el-form-item prop="userName">
                    <el-input v-model="param.userName" placeholder="账号">
                        <el-button slot="prepend" icon="el-icon-user-solid"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="param.password" @keyup.enter.native="submitForm()">
                        <el-button slot="prepend" icon="el-icon-s-order"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            param: {
                sign: '0',
                userName: 'admin',
                password: '123'
            },
            rules: {
                userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        submitForm() {
            var _this = this;
            this.$refs.login.validate((valid) => {
                if (valid) {
                    // 测试用
                    console.log(valid);
                    this.$message.success('登录成功');
                    sessionStorage.setItem('userName', _this.param.userName);
                    sessionStorage.setItem('sign', _this.param.sign);
                    _this.$router.push('/');

                    // 发起登录请求
                    // _this.$api.LOGIN.login(_this.param)
                    //     .then((res) => {
                    //         if (res.code == 1 && !res.msg) {
                    //             // 登录成功,将用用名和用户类型保存到全局，用作验证
                    //             sessionStorage.setItem('userName', _this.param.userName);
                    //             sessionStorage.setItem('sign', _this.param.sign);
                    //         } else {
                    //             _this.$message.error(res.msg);
                    //         }
                    //     })
                    //     .catch((err) => {
                    //         _this.$message.error('服务器异常！');
                    //     });
                } else {
                    this.$message.error('请输入账号和密码!');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login1.jpeg);
    background-size: 100%;
}
.login-wrap /deep/ .el-form-item__label {
    color: rgb(255, 255, 255);
    font-weight: 600;
}
.login-wrap /deep/ .el-radio {
    color: #fff;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>