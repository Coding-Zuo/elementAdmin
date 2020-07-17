<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i>
                    权限管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>角色权限管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="addContent">新增角色</el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">
                    批量删除
                </el-button>
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
                <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
                <el-table-column prop="name" label="详情" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="角色权限设置" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleQuanxian(scope.$index, scope.row)">数据操作权限设置</el-button>
                        <el-button type="text" @click="gongnegn(scope.$index, scope.row)">功能权限设置</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :page-size="query.pageSize"
                    :current-page="query.pageIndex"
                    @current-change="handlePageChange"
                ></el-pagination>
                <!-- :total="pageTotal" -->
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <!--		<el-dialog :title="'数据操作权限设置>>' + form.name + '>>设置卫星范围'" :visible.sync="editVisible" width="80%">-->
        <!--			<div style="border:1px solid gray;padding: 20px;">-->
        <!--				<el-row><div style="margin-bottom:20px;">卫星名称</div></el-row>-->
        <!--				<el-row>-->
        <!--					<el-col :span="6"><el-input placeholder="请输入要查询卫星名称"></el-input></el-col>-->
        <!--					<el-col :span="6"><el-button type="info" style="margin-left:10px;">查询</el-button></el-col>-->
        <!--					<el-col :span="6"><div>可访问卫星列表</div></el-col>-->
        <!--				</el-row>-->
        <!--				<el-row style="margin-top:20px;"><el-transfer v-model="value" :data="data"></el-transfer></el-row>-->
        <!--			</div>-->
        <!--			<span slot="footer" class="dialog-footer">-->
        <!--				<el-button @click="editVisible = false">取 消</el-button>-->
        <!--				<el-button type="primary" @click="saveEdit">确 定</el-button>-->
        <!--			</span>-->
        <!--		</el-dialog>-->
        <!-- 添加弹出框 -->
        <el-dialog title="添加" :visible.sync="addVisible" width="50%">
            <el-form ref="form" :model="addForm" label-width="70px">
                <el-form-item label="角色名称(必填)"><el-input v-model="addForm.name"></el-input></el-form-item>
                <el-form-item label="角色描述(必填)"><el-input type="textarea" v-model="addForm.address"></el-input></el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="editForm" label-width="70px">
                <el-form-item label="角色名称(必填)"><el-input v-model="editForm.name"></el-input></el-form-item>
                <el-form-item label="角色描述(必填)"><el-input type="textarea" v-model="editForm.address"></el-input></el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateEdit()">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 数据操作权限设置 -->
        <el-dialog :title="'数据操作权限设置>>' + form.name" :visible.sync="dataQuanXianVisible" width="80%" style="padding-bottom:20px;">
            <table class="operateMenu">
                <tr>
                    <td>查询</td>
                    <td @click="isShownOperate()">设置卫星范围</td>
                </tr>
                <tr>
                    <td>迁移</td>
                    <td @click="isShownOperate()">设置卫星范围</td>
                </tr>
                <tr>
                    <td>删除</td>
                    <td @click="isShownOperate()">设置卫星范围</td>
                </tr>
            </table>

            <div class="OperateState" v-show="isShownOperateState">
                <div style="border:1px solid #ececec;padding: 15px;">
                    <el-row><div style="margin-bottom:20px;">卫星名称</div></el-row>
                    <el-row>
                        <el-col :span="6"><el-input placeholder="请输入要查询卫星名称"></el-input></el-col>
                        <el-col :span="6"><el-button style="margin-left:10px;" type="primary">查询</el-button></el-col>
                        <el-col :span="6"><div>可访问卫星列表</div></el-col>
                    </el-row>
                    <el-row style="margin-top:20px;"><el-transfer v-model="value" :data="WXdata"></el-transfer></el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="isShownOperateState = false">取 消</el-button>
                    <el-button type="primary" @click="saveEditFanWei()">确 定</el-button>
                </span>
            </div>
        </el-dialog>

        <!-- 功能权限设置 -->
        <el-dialog :title="'功能权限设置>>' + form.name" :visible.sync="gongnengVisible" width="60%">
            <div>
                <el-tree :data="functionList" show-checkbox node-key="id" @check-change="handleCheckChange"></el-tree>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="gongnengVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 数据权限设置 -->
        <el-dialog :title="'数据权限设置>>' + form.name" :visible.sync="DatagongnengVisible1" width="60%">
            <div class="search-table">
                <div class="search-item">
                    <div style="flex:1;border-left:1px solid gray;text-align:center;line-height:30px;">查询</div>
                    <div style="flex:5;border-left:1px solid gray;line-height:30px;">
                        <el-checkbox v-model="checked">备选项1</el-checkbox>
                        <el-checkbox v-model="checked">备选项2</el-checkbox>
                    </div>
                    <div
                        style="
							flex:1;border-left:1px solid gray;
							text-align:center;line-height:30px;
							color:#409EFF;border-right:1px solid gray;
						"
                        @click="quanXianVisible = true"
                    >
                        设置卫星范围
                    </div>
                </div>
                <div class="search-item">
                    <div style="flex:1;border-left:1px solid gray;text-align:center;line-height:30px;">下载</div>
                    <div style="flex:5;border-left:1px solid gray;line-height:30px;">
                        <el-checkbox v-model="checked">备选项1</el-checkbox>
                        <el-checkbox v-model="checked">备选项2</el-checkbox>
                    </div>
                    <div
                        style="
							flex:1;border-left:1px solid gray;
							text-align:center;line-height:30px;
							color:#409EFF;border-right:1px solid gray;
						"
                        @click="quanXianVisible = true"
                    >
                        设置卫星范围
                    </div>
                </div>
                <div class="search-item">
                    <div style="flex:1;border-left:1px solid gray;text-align:center;line-height:30px;">订购</div>
                    <div style="flex:5;border-left:1px solid gray;line-height:30px;">
                        <el-checkbox v-model="checked">备选项1</el-checkbox>
                        <el-checkbox v-model="checked">备选项2</el-checkbox>
                    </div>
                    <div
                        style="
							flex:1;border-left:1px solid gray;
							text-align:center;line-height:30px;
							color:#409EFF;border-right:1px solid gray;
						"
                        @click="quanXianVisible = true"
                    >
                        设置卫星范围
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            //修改的显隐控制
            roleName: '',
            args: {
                deleteSatelliteRange: 'WX-1 WX-2',
                relocateSatelliteRange: 'WX-1 WX-2',
                roleId: 100001,
                searchSatelliteRange: 'WX-1 WX-2'
            },
            roleId: '', //修改用户权限的接口
            isShownOperateState: false,
            checked: '',
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [
                {
                    id: 1,
                    name: '超级管理员'
                }
            ],
            addForm: {
                name: '',
                address: ''
            },
            editForm: {
                name: '',
                address: ''
            },
            form: {
                name: '一级管理员'
            },
            index: '',
            row: '',
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            dataQuanXianVisible: false,
            DatagongnengVisible1: false,
            gongnengVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            tree: [
                {
                    id: 1,
                    label: 'CASEarth卫星',
                    children: [
                        {
                            id: 4,
                            label: '1级数据',
                            children: [
                                {
                                    id: 9,
                                    label: '1级产品'
                                },
                                {
                                    id: 10,
                                    label: '1级编目'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    label: '2级数据',
                    children: [
                        {
                            id: 5,
                            label: '2级产品'
                        },
                        {
                            id: 6,
                            label: '2级编目'
                        }
                    ]
                },
                {
                    id: 3,
                    label: '高级产品',
                    children: []
                },
                {
                    id: 4,
                    label: '专题产品',
                    children: []
                }
            ],
            WXdata: [],
            value: [],
            functionList: [
                //功能层级选择
                {
                    id: 1,
                    label: '一级 1',
                    children: [
                        {
                            id: 4,
                            label: '二级 1-1',
                            children: [
                                {
                                    id: 9,
                                    label: '三级 1-1-1'
                                },
                                {
                                    id: 10,
                                    label: '三级 1-1-2'
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    label: '一级 2',
                    children: [
                        {
                            id: 5,
                            label: '二级 2-1'
                        },
                        {
                            id: 6,
                            label: '二级 2-2'
                        }
                    ]
                },
                {
                    id: 3,
                    label: '一级 3',
                    children: [
                        {
                            id: 7,
                            label: '二级 3-1'
                        },
                        {
                            id: 8,
                            label: '二级 3-2'
                        }
                    ]
                }
            ]
        };
    },
    created() {
        // this.getData();
    },
    mounted() {
        this.$http
            .get(this.api.api + 'wzyhqxgl/querySearchLevel', {
                params: {
                    roleName: this.roleName
                }
            })
            .then(result => {
                console.log(result);
                if (result.data.msg == 'OK') {
                    let resultArr = result.data.data.rows;
                    let length = resultArr.length;
                    for (let i = 1; i < length; i++) {
                        this.tableData.push({
                            id: resultArr[i].id,
                            name: resultArr[i].roleName
                        });
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
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
        saveAdd() {
            this.addVisible = false;
            this.$http
                .post(this.api.api + 'glyqxgl/insertRole', {
                    params: {
                        roleDescription: '管理描述',
                        roleName: '管理员1'
                    }
                })
                .then(result => {
                    console.log(result);
                    if (result.data.msg == 'OK') {
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.tableData.push({
                            id: this.addForm.name,
                            name: this.addForm.address
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        updateEdit() {
            this.editVisible = false;
            this.$http
                .post(this.api.api + 'wzyhqxgl/updateRole', {
                    params: { roleName: 'vip会员', roleDescription: '你好啊', id: 7 }
                })
                .then(result => {
                    if (result.data.msg == 'OK') {
                        this.$message({
                            type: 'success',
                            message: '修改成功 ！'
                        });
                        this.tableData[this.idx].id = this.editForm.name;
                        this.tableData[this.idx].name = this.editForm.address;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        saveEditFanWei() {
            this.isShownOperateState = false;
            this.$http
                .post(this.api.api + 'glyqxgl/saveDataOpPrivilege', {
                    params: this.args
                })
                .then(result => {
                    console.log(result);
                    if (result.data.msg == 'OK') {
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                    }
                    //    this.satelliteList=
                })
                .catch(err => {
                    console.log(err);
                });
        },

        handleQuanxian() {
            this.dataQuanXianVisible = true;
            //h获取卫星列表
            this.$http
                .get(this.api.api + 'glyqxgl/querySatelliteName', {
                    params: {
                        satelliteName: this.form.name
                    }
                })
                .then(result => {
                    if (result.data.msg == 'OK') {
                        this.WXdata.length = 0;
                        let length = result.data.data.length;
                        let resultArr = result.data.data;
                        for (let i = 0; i < length; i++) {
                            console.log(this.WXdata);
                            this.WXdata.push({ key: i, label: resultArr[i], disabled: false });
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            this.$http
                .get(this.api.api + 'glyqxgl/queryDataOpPrivilege', {
                    params: {
                        roleId: this.roleId
                    }
                })
                .then(result => {
                    if (result.data.msg == 'OK') {
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            if (this.query.name != '') {
                this.$http
                    .get(this.api.api + 'wzyhqxgl/queryRole', {
                        params: {
                            roleName: this.roleName
                        }
                    })
                    .then(result => {
                        console.log(result);
                        if (result.data.msg == 'OK') {
                            this.tableData.length = 0;
                            let length = result.data.data.rows.length;
                            let resultArr = result.data.data.rows;
                            for (let i = 1; i <= length; i++) {
                                this.tableData.push({
                                    id: resultArr[i - 1].id,
                                    name: resultArr[i - 1].roleName
                                });
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                this.$message.info('请输入需要查询的用户名 ！');
            }
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
                    this.editVisible = false;
                    this.$http
                        .post(this.api.api + 'glyqxgl/deleteRole', {
                            params: this.form
                        })
                        .then(result => {
                            console.log(result);
                            if (result.data.msg == 'OK') {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功 ！'
                                });
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
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
            this.editForm.name = row.id;
            this.editForm.address = row.name;
            this.editVisible = true;
        },
        //选择状态改变
        handleCheckChange() {
            console.log('选择的状态改变了');
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        //功能权限设置
        gongnegn(index, row) {
            this.idx = index;
            this.form = row;
            this.gongnengVisible = true;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        // 控制修改弹出层的框是否显示
        isShownOperate() {
            this.isShownOperateState = !this.isShownOperateState;
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
    text-align: center;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
    text-align: center;
}

/* .search-table {
} */

.search-item {
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    display: flex;
    height: 30px;
}
/* 自定义 */
.OperateState {
    position: absolute;
    box-shadow: 0.9em 0.9em 0.9em rgba(60, 60, 60, 0.5);
    z-index: 1;
    width: 90%;
    height: 27em;
    padding-bottom: 5em;
    border: 0.2em solid #ccc;
    background: #fefefe;
}
.OperateState > div {
    border: none !important;
}
.operateMenu {
    user-select: none;
    width: 100%;
}
.operateMenu tr {
    line-height: 2em;
    display: flex;
    justify-content: space-evenly;
}
.operateMenu tr td:nth-child(2) {
    cursor: pointer;
    color: #69a1fd;
    transition: all 0.2s;
}
.operateMenu tr td:nth-child(2):hover {
    border-bottom: 0.1em solid #69a1fd;
    line-height: 1.9em;
}
/* 覆盖原生样式 */
.dialog-footer {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}
</style>
