<template>
    <div id="user">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户角色配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!--                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">-->
                <!--                    <el-option key="1" label="广东省" value="广东省"></el-option>-->
                <!--                    <el-option key="2" label="湖南省" value="湖南省"></el-option>-->
                <!--                </el-select>-->
                <el-input v-model="query.name" placeholder="请输入待查询角色" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名称" align="center"></el-table-column>
                <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
                <el-table-column prop="name1" label="姓名" align="center"></el-table-column>
                <el-table-column prop="name2" label="用户密码" align="center"></el-table-column>
                <el-table-column prop="date" label="注册时间" align="center"></el-table-column>
                <el-table-column prop="jigou1" label="用户所属机构名称" align="center"></el-table-column>
                <el-table-column prop="jigou2" label="用户所属机构类型" align="center"></el-table-column>
                <el-table-column prop="name3" label="地址" align="center"></el-table-column>
                <el-table-column prop="name4" label="邮编" align="center"></el-table-column>
                <el-table-column prop="name5" label="电话号码" align="center"></el-table-column>
                <el-table-column prop="name5" label="传真号码" align="center"></el-table-column>
                <el-table-column prop="name5" label="邮箱" align="center"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">用户权限修改</el-button>
                        <!--                        <el-button-->
                        <!--                                type="text"-->
                        <!--                                icon="el-icon-edit"-->
                        <!--                                @click="handleDelete(scope.$index, scope.row)"-->
                        <!--                        >用户信息修改</el-button>-->
                    </template>
                </el-table-column>
                <el-table-column label="是否启用" align="center">
                    <!-- <template slot-scope="scope"> -->
                    <template>
                        <el-switch>禁用</el-switch>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog id="perissList" title="用户权限修改" :visible.sync="editVisible" width="90%">
            <!-- <el-row> -->
            <div class="dialogBox">
                <div class="checkBoxItem" style="flex: 2; ">
                    <p style="text-align: center; width:100%; line-height:3em;margin-bottom: 1em;">所有角色</p>
                    <ul>
                        <li
                            v-for="(item, index) in permissionList"
                            :key="index"
                            @click="addClass(index)"
                            :class="{ active: ind === index }"
                        >
                            <p>
                                {{ item.label }}
                            </p>
                        </li>
                    </ul>
                </div>
                <div class="checkBoxItem" style="flex: 1; ">
                    <div style="display: flex;flex-direction: column;justify-content:space-evenly; height: 100%;">
                        <el-button @click="confirmPermis()" type="primary">授权</el-button>
                        <el-button @click="backout()">撤销</el-button>
                    </div>
                </div>
                <div class="checkBoxItem" style="flex: 7;">
                    <p style="display:flex;justify-content:space-evenly;text-align:center; margin-bottom:1em;">
                        <span style="flex: 3;line-height:3em;">已授权角色</span>
                        <span style="flex: 5;line-height:3em;">已授权权限列表</span>
                    </p>
                    <table id="Permissiontable" border="1" cellspacing="0" cellpadding="0">
                        <tr style="display:flex; justify-content:space-evenly;text-align:center; line-height:3em;">
                            <td style="background:#69a1fd;color:#fff;">角色名称</td>
                            <td style="background:#69a1fd;color:#fff;">数据权限</td>
                            <td style="background:#69a1fd;color:#fff;">功能权限</td>
                        </tr>
                        <tr style="height:15em; line-height:3em;">
                            <td v-if="authyManage.permissionText">{{ authyManage.permissionText }}</td>
                            <td v-else>暂无授权</td>
                            <td style="overflow-y:scroll;">
                                <div class="data">
                                    <p>
                                        <span>查询卫星范围</span>
                                        <span>ERS-1</span>
                                        <span>ERS-2</span>
                                    </p>
                                    <p>
                                        <span> </span>
                                        <span>{{ authyManage.data.find[0] }} </span>
                                        <span> {{ authyManage.data.find[1] }}</span>
                                    </p>
                                </div>
                                <div class="data">
                                    <p>
                                        <span>迁移卫星范围</span>
                                        <span>ERS-1</span>
                                        <span>ERS-2</span>
                                    </p>
                                    <p>
                                        <span> </span>
                                        <span>{{ authyManage.data.find[0] }} </span>
                                        <span> {{ authyManage.data.find[1] }}</span>
                                    </p>
                                </div>
                                <div class="data">
                                    <p>
                                        <span>删除卫星范围</span>
                                        <span>ERS-1</span>
                                        <span>ERS-2</span>
                                    </p>
                                    <p>
                                        <span> </span>
                                        <span>{{ authyManage.data.find[0] }} </span>
                                        <span> {{ authyManage.data.find[1] }}</span>
                                    </p>
                                </div>
                            </td>
                            <td>
                                <p
                                    v-for="(item, index) in authyManage.fun_Permis"
                                    :key="index"
                                    @click="addClass(index)"
                                    :class="{ active: ind === index }"
                                >
                                    {{ item }}
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <!-- </el-row> -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="editPermis = false">取 消</el-button>
                <el-button type="primary" @click="submitPermis()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="添加" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="共享等级">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="等级描述">
                    <el-input type="textarea" v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { fetchData } from '../../../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            // 控制显影
            editVisible: false,
            addVisible: false,
            //
            role: [],
            authyManage: {
                permissionText: '',
                data: {
                    find: [1, 2],
                    merge: [3.4],
                    del: [5.3]
                },
                fun_Permis: []
            },
            ind: 0,
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            permissionList: [
                {
                    fun_Permis: ['数据操作1', '人员管理', '网站维护', '用户管理'],
                    label: `超级管理员`,
                    data: {
                        find: [1, 2],
                        merge: [3.4],
                        del: [5.3]
                    },
                    disabled: false
                },
                {
                    fun_Permis: ['数据操作2', '人员管理', '网站维护', '用户管理'],
                    label: `超级授权管理员`,
                    data: {
                        find: [1, 2],
                        merge: [3.4],
                        del: [5.3]
                    },
                    disabled: false
                },
                {
                    fun_Permis: ['数据操作3', '人员管理', '网站维护', '用户管理'],
                    label: `外部共享数据管理员`,
                    data: {
                        find: [1, 2],
                        merge: [3.4],
                        del: [5.3]
                    },
                    disabled: false
                },

                {
                    fun_Permis: ['数据操作4', '人员管理', '网站维护', '用户管理'],
                    label: `外部共享数据管理员`,
                    data: {
                        find: [1, 2],
                        merge: [3.4],
                        del: [5.3]
                    },
                    disabled: false
                },
                {
                    fun_Permis: ['数据操作5', '人员管理', '网站维护', '用户管理'],
                    label: `数据入库管理员`,
                    data: {
                        find: [1, 2],
                        merge: [3.4],
                        del: [5.3]
                    },
                    disabled: false
                },
                {
                    fun_Permis: ['数据操作6', '人员管理', '网站维护', '用户管理'],
                    label: `网站维护`,
                    data: {
                        find: [1, 2],
                        merge: [3.4],
                        del: [5.3]
                    },
                    disabled: false
                },
                {
                    fun_Permis: ['数据操作7', '人员管理', '网站维护', '用户管理'],
                    label: `网站维护`,
                    data: {
                        find: [1, 2],
                        merge: [3.4],
                        del: [5.3]
                    },
                    disabled: false
                },
                {
                    fun_Permis: ['数据操作8', '人员管理', '网站维护', '用户管理'],
                    label: `超级数据维护管理员`,
                    data: {
                        find: [1, 2],
                        merge: [3.4],
                        del: [5.3]
                    },
                    disabled: false
                }
            ],
            tableData: [
                {
                    id: 1,
                    name: 'superAdmin',
                    name1: '内置超级管理员a',
                    name2: 'admin12345',
                    userId: 10001,
                    date: '2020-06-06',
                    jigou1: '中科院遥地所',
                    jigou2: '科研'
                },
                {
                    id: 1,
                    name: 'superAdminf',
                    name1: '内置超级管理员c',
                    name2: 'admin12345',
                    userId: 10001,
                    date: '2020-06-06',
                    jigou1: '中科院遥地所',
                    jigou2: '科研'
                },
                {
                    id: 1,
                    name: 'superAdmin',
                    name1: '内置超级管理员v',
                    name2: 'admin12345',
                    userId: 10001,
                    date: '2020-06-06',
                    jigou1: '中科院遥地所',
                    jigou2: '科研'
                },
                {
                    id: 1,
                    name: 'superAdmin',
                    name1: '内置超级管理员gg',
                    name2: 'admin12345',
                    userId: 10001,
                    date: '2020-06-06',
                    jigou1: '中科院遥地所',
                    jigou2: '科研'
                },
                {
                    id: 1,
                    name: 'superAdmin',
                    name1: '内置超级管理员',
                    name2: 'admin12345',
                    userId: 10001,
                    date: '2020-06-06',
                    jigou1: '中科院遥地所',
                    jigou2: '科研'
                },
                {
                    id: 1,
                    name: 'superAdmin',
                    name1: '内置超级管理员',
                    name2: 'admin12345',
                    userId: 10001,
                    date: '2020-06-06',
                    jigou1: '中科院遥地所',
                    jigou2: '科研'
                },
                {
                    id: 1,
                    name: 'superAdmin',
                    name1: '内置超级管理员',
                    name2: 'admin12345',
                    userId: 10001,
                    date: '2020-06-06',
                    jigou1: '中科院遥地所',
                    jigou2: '科研'
                },
                {
                    id: 1,
                    name: 'superAdmin',
                    name1: '内置超级管理员',
                    name2: 'admin12345',
                    userId: 10001,
                    date: '2020-06-06',
                    jigou1: '中科院遥地所',
                    jigou2: '科研'
                },
                {
                    id: 1,
                    name: 'superAdmin',
                    name1: '内置超级管理员',
                    name2: 'admin12345',
                    userId: 10001,
                    date: '2020-06-06',
                    jigou1: '中科院遥地所',
                    jigou2: '科研'
                },
                {
                    id: 1,
                    name: 'superAdmin',
                    name1: '内置超级管理员',
                    name2: 'admin12345',
                    userId: 10001,
                    date: '2020-06-06',
                    jigou1: '中科院遥地所',
                    jigou2: '科研'
                },
                {
                    id: 1,
                    name: 'superAdmin',
                    name1: '内置超级管理员',
                    name2: 'admin12345',
                    userId: 10001,
                    date: '2020-06-06',
                    jigou1: '中科院遥地所',
                    jigou2: '科研'
                },
                {
                    id: 2,
                    name: 'minmin',
                    name1: '李敏',
                    name2: 'liminmin',
                    userId: 10002,
                    date: '2020-06-06',
                    jigou1: '中科院遥地所',
                    jigou2: '高校'
                },
                {
                    id: 3,
                    name: 'chunling',
                    name1: '符春玲',
                    name2: 'fuchunling',
                    userId: 10003,
                    date: '2020-06-06',
                    jigou1: '中科院遥地所'
                },
                {
                    id: 4,
                    name: 'jun888',
                    name1: '郝建军',
                    name2: '12345678-',
                    userId: 10004,
                    date: '2020-06-06',
                    jigou1: '中科院遥地所'
                },
                {
                    id: 5,
                    name: 'liujunyi',
                    name1: '刘俊义',
                    userId: 10005,
                    name2: 'admin12345',
                    date: '2020-06-06',
                    jigou1: '中科院遥地所'
                }
            ],
            multipleSelection: [],
            delList: [],
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            chuansuoList: [
                {
                    key: 1,
                    label: `备选项 1`,
                    disabled: false
                },
                {
                    key: 2,
                    label: `备选项 3`,
                    disabled: false
                },
                {
                    key: 3,
                    label: `备选项 2`,
                    disabled: false
                }
            ],
            columnIndex: '',
            chuansuo: []
        };
    },
    created() {
        // this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        addContent() {
            this.addVisible = true;
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        //合并表格
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex % 2 === 0) {
                    return {
                        rowspan: 2,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        },
        //多选框操作
        handleCheckedRoleChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        addClass(e) {
            // console.log(e);
            this.ind = e;
        },
        backout() {
            if (this.authyManage.permissionText) {
                this.$message({ type: 'success', message: `已撤销授权` });
                this.authyManage = {
                    permissionText: '',
                    data: {
                        find: '',
                        merge: '',
                        del: ''
                    },
                    fun_Permis: []
                };
            } else {
                this.$message({ type: 'info', message: `暂未权限` });
            }
        },
        confirmPermis() {
            let li = document.querySelector(`[class="active"]`);
            this.$message({ type: 'success', message: `已授予  ${li.childNodes[0].innerText}  权限` });
            this.authyManage.permissionText = li.childNodes[0].innerText;
            if (li.childNodes[0].innerText) {
                for (let i = 0; i < this.permissionList.length; i++) {
                    if (this.permissionList[i].label == this.authyManage.permissionText) {
                        this.authyManage = {
                            permissionText: li.childNodes[0].innerText,
                            data: {
                                find: this.permissionList[i].data.find,
                                merge: this.permissionList[i].data.merge,
                                del: this.permissionList[i].data.del
                            },
                            fun_Permis: this.permissionList[i].fun_Permis
                        };
                    }
                }
            }
        },
        submitPermis() {
            this.$message({ type: 'success', message: `提交成功，稍后生效 ！` });
            this.editVisible = false;
        }
    }
    // watch: {
    //     authyManage: {
    //         permissionText: '',
    //         data: {
    //             find: '',
    //             merge: '',
    //             del: ''
    //         },
    //         fun_Permis: []
    //     },

    // }
};
</script>

<style>
* {
    user-select: none;
}
#user .handle-box {
    margin-bottom: 20px;
}

#user .handle-select {
    width: 120px;
}

#user .handle-input {
    width: 300px;
    display: inline-block;
}
#user .table {
    width: 100%;
    font-size: 14px;
    text-align: center;
}
#user .red {
    color: #ff0000;
}
#user .mr10 {
    margin-right: 10px;
}
#user .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
    text-align: center;
}

#user .data-table {
    margin-top: 20px;
    display: flex;
}

#user .left {
    width: 50%;
    float: left;
}

#user .left #user .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    border: 1px solid gray;
    text-align: center;
}

#user .content {
    border: 1px solid gray;
}
#user #permissList {
    width: 100%;
    height: 20em;
    display: flex;
    justify-content: space-between;
}
#user .dialogBox {
    display: flex;
    justify-content: space-evenly;
}
#user .checkBoxItem ul {
    height: 20em;
    overflow-y: scroll;
    text-align: center;
}
#user .checkBoxItem li {
    cursor: pointer;
    margin-bottom: em;
    list-style: none;
    line-height: 3em;
}
#user .checkBoxItem button {
    margin: 0;
}
#user .checkBoxItem {
    list-style: none;
}
#user .dialogBox > * {
    padding: 1em;
    margin: 2em;
}
#user #perissList .el-dialog__body {
    height: 26em;
}
#Permissiontable {
    outline: none;
    /* border-color: #69a1fd; */
    border-radius: 0.2em;
    width: 100%;
}
#Permissiontable tr {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}
#Permissiontable td {
    text-align: center;
    width: 100%;
}
#Permissiontable .data p {
    display: flex;
    justify-content: space-evenly;
}
#Permissiontable .data p:nth-child(1) {
    background: #69a1fd;
    color: #fff;
}
#Permissiontable .data p span {
    text-align: center;
    width: 30%;
    text-align: center;
}
#Permissiontable .data p span:nth-child(1) {
    width: 40% !important;
}
#Permissiontable,
#Permissiontable tr,
#Permissiontable td {
    border: 0.05em solid #69a1fd;
}
::-webkit-scrollbar {
    /* display: none; */
}

li.active {
    color: #fff;
    background: #69a1fd;
    border-radius: 0.2em;
}
</style>
