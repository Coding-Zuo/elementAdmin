<template>
    <!-- 网站用户权限修改 -->
    <div class="user-auth">
        <el-dialog :title="'用户权限修改 >> ' + userinfo.userName" :visible.sync="userAuthVisible" width="70%">
            <el-row type="flex">
                <el-col :span="4" style="">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <h4>所有角色</h4>
                        </div>
                        <div>
                            <el-radio-group v-model="selectRoleName" size="mini">
                                <p v-for="(item, i) in allRoleList" :key="i" style="margin-bottom: 5px;">
                                    <el-radio :label="item.roleName" :border="false" size="mini">{{ item.roleName }}</el-radio>
                                </p>
                            </el-radio-group>
                        </div>
                    </el-card>
                </el-col>

                <el-col :span="4" style="display: flex;">
                    <div style="margin: auto;">
                        <el-button @click="handleAccredit" :disabled="selectRoleName == ''" type="primary" size="mini">授权</el-button>
                        <br />
                        <br />
                        <br />
                        <el-button @click="handleRevocation" :disabled="accreditRoleName == ''" size="mini">撤销</el-button>
                    </div>
                </el-col>

                <el-col :span="16" style="">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <h4 style="margin-right: 10em;">
                                <span>已授予角色</span>
                                <span style="float: right;">已授予权限列表</span>
                            </h4>
                        </div>
                        <table style="width: 100%; height: 100%; border-collapse: collapse;" border="1">
                            <tr style="height: 1.5em;">
                                <th style="width: 20%;">角色名称</th>
                                <th style="width: 60%;">数据权限</th>
                                <th style="width: 20%;">功能权限</th>
                            </tr>
                            <tr>
                                <td style="padding: 0.5em; vertical-align: text-top;">
                                    <el-radio-group @change="queryUserPrivilege" v-model="accreditRoleName" size="mini">
                                        <p v-for="(item, i) in accreditRoleList" :key="i" style="margin-bottom: 5px;">
                                            <el-radio :label="item" :border="false" size="mini">{{ item }}</el-radio>
                                        </p>
                                    </el-radio-group>
                                </td>
                                <td style="padding: 0.5em; vertical-align: text-top;">
                                    <table style="width: 100%;" class="yishowqun-table">
                                        <tr v-for="(item, i) in userPrivilege.searchList" :key="'cx' + i">
                                            <td><span v-if="i == 0">查询</span></td>
                                            <td>{{ item.productType }}</td>
                                            <td>{{ item.wxdhs | turnTheString }}</td>
                                        </tr>
                                        <tr v-for="(item, i) in userPrivilege.downloadList" :key="'xz' + i">
                                            <td><span v-if="i == 0">下载</span></td>
                                            <td>{{ item.productType }}</td>
                                            <td>{{ item.wxdhs | turnTheString }}</td>
                                        </tr>
                                        <tr v-for="(item, i) in userPrivilege.deleteList" :key="'sc' + i">
                                            <td><span v-if="i == 0">删除</span></td>
                                            <td>{{ item.productType }}</td>
                                            <td>{{ item.wxdhs | turnTheString }}</td>
                                        </tr>
                                    </table>
                                </td>
                                <td style="padding: 0.5em; vertical-align: text-top;">
                                    <table class="yishowqun-table">
                                        <tr v-for="(item, i) in userPrivilege.funcPrivilegeNamelist" :key="i">
                                            <td>{{ item }}</td>
                                        </tr>
                                    </table>
                                    <!-- <el-tag v-for="(item, i) in userPrivilege.funcPrivilegeNamelist" :key="i" size="mini" effect="plain" style="margin-bottom: 0.5em;">{{item}}</el-tag> -->
                                </td>
                            </tr>
                        </table>
                    </el-card>
                </el-col>
            </el-row>

            <span slot="footer" class="dialog-footer">
                <el-button @click="userAuthVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveUserRole">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'WebsitAuth',
    data() {
        return {
            userAuthVisible: false, // 弹框显示隐藏
            userinfo: {}, // 保存当前用户信息
            roleInfoSaveParams: {
                // 角色信息保存参数
                roleIds: [],
                userId: ''
            },
            // 保存当前用户选中的操作权限和功能权限
            userPrivilege: {
                roleName: '网站用户5',
                searchList: [
                    {
                        productType: '产品一号',
                        wxdhs: ['WX-1', 'WX-2']
                    },
                    {
                        productType: '产品二号',
                        wxdhs: ['WX-1', 'WX-2']
                    }
                ],
                downloadList: [
                    {
                        productType: '产品一号',
                        wxdhs: ['WX-1', 'WX-2']
                    },
                    {
                        productType: '产品二号',
                        wxdhs: ['WX-1', 'WX-2']
                    }
                ],
                deleteList: [
                    {
                        productType: '产品一号',
                        wxdhs: ['WX-1', 'WX-2']
                    },
                    {
                        productType: '产品二号',
                        wxdhs: ['WX-1', 'WX-2']
                    }
                ],
                funcPrivilegeNamelist: [
                    '网站用户查询功能1',
                    '网站用户查询功能2',
                    '网站用户查询功能3',
                    '网站用户查询功能4',
                    '网站用户查询功能5'
                ]
            },
            // 所有角色列表
            allRoleList: [
                {
                    id: 1,
                    roleId: 10001,
                    roleName: '网站用户',
                    roleDescription: '123132',
                    lastModifiedTime: 1593796015400
                },
                {
                    id: 2,
                    roleId: 10002,
                    roleName: '网站用户1',
                    roleDescription: '123132',
                    lastModifiedTime: 1593796015400
                },
                {
                    id: 3,
                    roleId: 10003,
                    roleName: '网站用户2',
                    roleDescription: '123132',
                    lastModifiedTime: 1593796015400
                },
                {
                    id: 4,
                    roleId: 10004,
                    roleName: '网站用户14',
                    roleDescription: '123132',
                    lastModifiedTime: 1593796015400
                }
            ],
            // 角色列表中当前选中角色名称
            selectRoleName: '',
            // 已授予角色列表
            accreditRoleList: [], // '网站用户11', '网站用户12', '网站用户13'
            // 已授予角色列表选中角色名称
            accreditRoleName: ''
        };
    },
    created() {
        this.getAllRoleList();
    },
    methods: {
        // 获取所有角色列表
        getAllRoleList() {
            this.$api.WZYHQXGL.queryRole()
                .then((res) => {
                    if (res.code == 1) {
                        this.allRoleList = res.data.rows;
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 显示角色修改弹框
        showRoleEditDialog(row) {
            console.log(row);
            // 获取当前用户第一个角色操作权限和功能权限
            // this.queryUserPrivilege(row.roleName);
            if (row.roleName) {
                this.accreditRoleList = row.roleName.split(',');
                this.accreditRoleName = this.accreditRoleList[0];
                this.queryUserPrivilege(this.accreditRoleName);
            }

            this.userAuthVisible = true;
            this.userinfo = row;
            this.roleInfoSaveParams.userId = row.userId;
            this.selectRoleName = '';
        },
        // 根据角色名称获取数据操作权限对应的卫星范围和功能权限
        queryUserPrivilege(roleName) {
            this.userPrivilege = {};
            console.log(roleName);
            this.$api.WZYHQXGL.queryUserPrivilege(roleName)
                .then((res) => {
                    if (res.code == 1) {
                        this.userPrivilege = res.data[0];
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 点击授权按钮
        handleAccredit() {
            console.log(this.selectRoleName);
            let index = this.accreditRoleList.indexOf(this.selectRoleName);
            if (index === -1) {
                this.accreditRoleList.push(this.selectRoleName);
            } else {
                this.$message({
                    message: '该选项已添加！',
                    type: 'info'
                });
            }
            // 查询当前授权角色的操作权限和功能权限
            this.accreditRoleName = this.selectRoleName;
            this.queryUserPrivilege(this.selectRoleName);
        },
        // 点击撤销按钮,撤销选中的项
        handleRevocation() {
            console.log(this.accreditRoleName);
            let index = this.accreditRoleList.indexOf(this.accreditRoleName);
            if (index !== -1) {
                this.accreditRoleList.splice(index, 1);
                // 撤销完成后默认查询第一个角色相关功能
                if (this.accreditRoleList.length > 0) {
                    this.accreditRoleName = this.accreditRoleList[0];
                    this.queryUserPrivilege(this.accreditRoleList[0]);
                } else {
                    this.accreditRoleName = '';
                }
            }
        },
        // 角色信息保存
        saveUserRole() {
            if (this.accreditRoleList.length == 0) {
                this.$message({
                    message: '请授权角色！',
                    type: 'info'
                });
                return false;
            }

            // 遍历寻找对应的角色id,未保存提供参数
            let roleIds = [];
            let x = this.accreditRoleList;
            let y = this.allRoleList;
            for (var i = 0; i < x.length; i++) {
                for (var j = 0; j < y.length; j++) {
                    if (x[i] == y[j].roleName) {
                        roleIds.push(y[j].roleId);
                    }
                }
            }
            //刘工
            // this.roleInfoSaveParams = {
            //       ...this.roleInfoSaveParams,
            //     roleIds: roleIds
            // };
            //金岩宏
            this.roleInfoSaveParams = {
                ...this.roleInfoSaveParams,
                roleIds: roleIds.join(',')
            };
            console.log(this.roleInfoSaveParams);
            // console.dir(this.roleInfoSaveParams);
            // 发起请求，保存
            this.$api.WZYHQXGL.saveUserRole(this.roleInfoSaveParams)
                .then((res) => {
                    if (res.code == 1) {
                        this.userAuthVisible = false;
                        this.$message({
                            message: res.data,
                            type: 'success'
                        });
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(er);
                });
        }
    },
    filters: {
        turnTheString(arr) {
            return arr.join(' ');
        }
    }
};
</script>

<style>
.user-auth .el-card__body {
    height: 15em;
    overflow: auto;
}
.user-auth .yishowqun-table {
    width: 100%;
    table-layout: fixed;
}
.user-auth .yishowqun-table tr:nth-child(odd) {
    background: #cecccc;
}
.user-auth .yishowqun-table td {
    text-align: center;
    width: 100%;
    padding: 0.2em;
    word-break: keep-all; /* 不换行 */
    white-space: nowrap; /* 不换行 */
    overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}
</style>