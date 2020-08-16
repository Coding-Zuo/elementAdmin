<template>
    <!-- 管理员功能权限设置 -->
    <div>
        <el-dialog
            v-dialogDrag
            :close-on-click-modal="false"
            :title="'功能权限设置 >> ' + functionalAuthority.roleName"
            :visible.sync="funcAuthVisible"
            width="40%"
        >
            <div>
                <el-tree
                    expond
                    :data="funcTree"
                    ref="roleTree"
                    show-checkbox
                    default-expand-all
                    node-key="id"
                    @check="handleCheckChange"
                ></el-tree>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="funcAuthVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveFuncAuthBtn">确 定</el-button>
            </span>
        </el-dialog>
        <user-data ref="UserData"></user-data>
    </div>
</template>

<script>
import UserData from './UserData';
import { toTree } from '@/utils/universal.js';

export default {
    name: 'UserFunc',
    components: { UserData },
    data() {
        return {
            // -------------------- 功能权限设置 ---------------------
            functionalAuth: {}, // 存储当前传过来的一条数据，方便数据操作弹窗使用
            functionalAuthority: {
                // 保存功能权限操作的角色id和角色名称
                roleId: '',
                roleName: ''
            },
            // 功能权限设置弹窗隐藏显示
            funcAuthVisible: false,
            // 根据角色id获取当前角色功能权限列表,即默认选中的节点
            funcAuthItems: [],
            // 功能操作权限提交保存列表
            funcAuthList: [],
            // 功能树结构
            funcTree: [],
            // ------------------------ 相关菜单弹出数据权限设置弹框集合状态 --------------------------
            showMenuName: ['数据产品查询', '数据产品订购'],
            dataTypeShow: [false, false, false]
        };
    },
    created() {
        this.queryNodePrivilege();
    },
    methods: {
        // 功能节点树初始化
        queryNodePrivilege() {
            this.$api.WZYHQXGL.queryNodePrivilege()
                .then((res) => {
                    if (res.code == 1) {
                        var newList = [];
                        // 遍历生成方便使用的数组
                        for (var i = 0; i < res.data.length; i++) {
                            newList.push({
                                id: res.data[i].functionPrivilegeId,
                                label: res.data[i].functionPrivilegeName,
                                pid: res.data[i].superFunctionPrivilegeId
                            });
                        }
                        console.log(newList);
                        this.funcTree = toTree(newList);
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // ---------------------------- 功能权限设置 ---------------------------------
        // 点击功能权限设置按钮
        functionalAuthorityBtn(row) {
            this.functionalAuth = row;
            this.funcAuthVisible = true;
            this.functionalAuthority.roleId = row.roleId;
            this.functionalAuthority.roleName = row.roleName;
            this.funcAuthItems = [];
            this.funcAuthList = [];
            this.$nextTick(() => {
                this.$refs.roleTree.setCheckedNodes([]);
            });

            // 根据角色id获取操作
            this.$api.WZYHQXGL.queryFuncPrivilege(row.roleId)
                .then((res) => {
                    if (res.code == 1) {
                        // 当前角色功能项
                        res.data.forEach((element) => {
                            delete element.id;
                            delete element.lastModifiedTime;
                            this.funcAuthList.push(element);
                            this.funcAuthItems.push(element.functionPrivilegeId);
                        });

                        this.$nextTick(() => {
                            this.$refs.roleTree.setCheckedKeys(this.funcAuthItems);
                        });
                    } else {
                        this.funcAuthItems = [];
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 功能项选择存储
        handleCheckChange(node, { checkedNodes }) {
            console.log(node, checkedNodes);
            this.funcAuthList = [];
            checkedNodes.forEach((v) => {
                this.funcAuthList.push({
                    roleId: this.functionalAuthority.roleId,
                    functionPrivilegeId: v.id,
                    functionPrivilegeName: v.label
                });
            });

            // ================= 弹出数据操作权限 ===================
            if (this.showMenuName.indexOf(node.label) != -1) {
                this.dataTypeShow = [false, false, false];

                if (node.label == '数据产品查询') {
                    this.dataTypeShow[0] = true;
                } else if (node.label == '数据产品订购') {
                    this.dataTypeShow[0] = true;
                    this.dataTypeShow[1] = true;
                    this.dataTypeShow[2] = true;
                }
                this.$refs.UserData.dataManipulationBtn(this.functionalAuth, this.dataTypeShow);
            }
        },
        // 功能操作权限保存
        saveFuncAuthBtn() {
            console.log(this.funcAuthList);
            this.$api.WZYHQXGL.saveFuncPrivilege({ list: this.funcAuthList }).then((res) => {
                if (res.code == 1) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.$refs.roleTree.setCheckedNodes([]);
                    this.funcAuthList = [];
                    this.funcAuthVisible = false;
                }
            });
        },
        // ===================== 数据操作权限设置按钮 =====================
        dataManipulationBtn(index, row) {
            console.log(row);
            // this.$refs.UserData.dataManipulationBtn(row);
        }
    }
};
</script>

<style>
</style>