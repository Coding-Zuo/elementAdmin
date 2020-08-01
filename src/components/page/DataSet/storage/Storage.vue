<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 数据维护管理</el-breadcrumb-item>
                <el-breadcrumb-item>存储区维护</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-add" class="handle-del mr10" @click="addContent">添加</el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除 </el-button>
                <el-input v-model="tempForm.ccqmc" placeholder="存储区名称" style="width: 140px;" class="handle-input mr10"></el-input>
                <el-input v-model="tempForm.ccqip" placeholder="IP" style="width: 140px;" class="handle-input mr10"></el-input>
                <el-input v-model="tempForm.ccsbwz" placeholder="设备位置" style="width: 140px;" class="handle-input mr10"></el-input>
                <el-input v-model="tempForm.ccsbssbm" placeholder="所属部门" style="width: 140px;" class="handle-input mr10"></el-input>
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
                <el-table-column prop="name" label="存储区名称" align="center"></el-table-column>
                <el-table-column prop="ip" label="IP" align="center"></el-table-column>
                <el-table-column prop="root" label="根目录" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改 </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)"
                            >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    @current-change="handlePageChange"
                ></el-pagination>
                <!-- :total="pageTotal" -->
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
            <div class="plugins-tips">存储区名称设置</div>
            <el-form ref="form" :model="tempForm" label-width="100px">
                <el-form-item label="存储区名称:">
                    <el-input v-model="tempForm.ccqmc" style="width: 300px;"></el-input>
                </el-form-item>
            </el-form>
            <div class="plugins-tips">存储区访问链接参数</div>
            <el-form ref="form" :model="tempForm" label-width="70px">
                <el-form-item label="存储设备位置:" label-width="150px">
                    <el-input v-model="tempForm.ccsbwz" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="存储设备所属部门:" label-width="150px">
                    <el-input v-model="tempForm.ccsbssbm" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="管理者联系方式:" label-width="150px">
                    <el-input v-model="tempForm.glzlxfs" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="存储访问接口方式:" label-width="150px">
                    <el-select v-model="leftTop1" placeholder="请选择" style="width: 300px;">
                        <el-option v-for="item in leftTop1List" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="存储区IP:" label-width="150px">
                    <el-input v-model="tempForm.ccqip" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="用户名:" label-width="150px">
                    <el-input v-model="tempForm.yhm" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="密码:" label-width="150px">
                    <el-input v-model="tempForm.yhmm" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="确认密码:" label-width="150px">
                    <el-input v-model="tempForm.qrmm" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="根目录:" label-width="150px">
                    <el-input v-model="tempForm.ccqgml" style="width: 300px;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="数据存储区信息添加" :visible.sync="addVisible" width="50%">
            <div class="plugins-tips">存储区名称设置</div>
            <el-form ref="form" :model="tempForm" label-width="100px">
                <el-form-item label="存储区名称:">
                    <el-input v-model="tempForm.title" style="width: 300px;"></el-input>
                </el-form-item>
            </el-form>
            <div class="plugins-tips">存储区基本信息设置</div>
            <el-form ref="form" :model="tempForm" label-width="70px">
                <el-form-item label="存储设备位置:" label-width="150px">
                    <el-input v-model="tempForm.ccsbwz" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="存储设备所属部门:" label-width="150px">
                    <el-input v-model="tempForm.ccsbssbm" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="管理者联系方式:" label-width="150px">
                    <el-input v-model="tempForm.glzlxfs" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="存储访问接口方式:" label-width="150px">
                    <el-select v-model="leftTop1" placeholder="请选择" style="width: 300px;">
                        <el-option v-for="item in leftTop1List" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <div class="plugins-tips">存储区连接参数设置</div>
                <el-form-item label="存储区IP:" label-width="150px">
                    <el-input v-model="tempForm.ccqip" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="用户名:" label-width="150px">
                    <el-input v-model="tempForm.yhm" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="密码:" label-width="150px">
                    <el-input v-model="tempForm.yhmm" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="确认密码:" label-width="150px">
                    <el-input v-model="tempForm.qrmm" style="width: 300px;"></el-input>
                </el-form-item>
                <el-form-item label="根目录:" label-width="150px">
                    <el-input v-model="tempForm.ccqgml" style="width: 300px;"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
    name: 'Chanpin',
    data() {
        return {
            query: {
                who: '',
                title: '',
                pageIndex: 1,
                pageSize: 10
            },
            tempForm: {
                ccqid: '',
                ccqmc: '',
                ccqip: '',
                yhm: '',
                yhmm: '',
                ccqgml: '',
                ccsbwz: '',
                ccsbssbm: '',
                ccsbglz: '',
                glzlxfs: '',
                ccfwjkfs: '',
                xgsj: '',
                resj: '',
                bz: ''
            },
            leftTop1: [],
            leftTop1List: [
                { label: '方式1', value: 1 },
                { label: '方式2', value: 2 },
                { label: '方式3', value: 3 },
                { label: '方式4', value: 4 }
            ],
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            pageTotal: 0,
            form: {},
            idx: '',
            id: '',
            content: '',
            editorOption: {
                placeholder: '数据产品发布请输入...'
            }
        };
    },
    created() {
        // this.getData();
    },
    mounted() {
        this.handleSearch();
    },
    components: {
        quillEditor
    },
    methods: {
        // 触发搜索按钮
        handleSearch() {
            this.$api.SJWHGL.queryStoreInf({
                ccqmc: this.tempForm.ccqmc,
                ccqip: this.tempForm.ccqip,
                ccsbwz: this.tempForm.ccsbwz,
                ccsbssbm: this.tempForm.ccsbssbm
            })
                .then((result) => {
                    console.log(result);
                    let data = result.data.data;
                    if (result.data.status == 'True') {
                        this.tableData.length = 0;
                        this.tableData.push({
                            id: data.ccqid,
                            name: data.ccqmc,
                            ip: data.ccqip,
                            root: data.ccqgml
                        });
                        this.tempForm = {};
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$api.SJWHGL.deleteStoreInfo(this.multipleSelection)
                        .then((result) => {
                            console.log(result);
                            if (result.data.status == 'True') {
                                this.$message.success('删除成功');
                                //     let temp = []; //获得tableData里所有的id
                                //     for (let i = 0; i < this.tableData.length; i++) {
                                //         temp.push(this.tableData[i].id);
                                //     }
                                //     console.log(temp);
                                //     index ? index : '';
                                //     for (let i = 0; i < this.multipleSelection.length; i++) {
                                //         index = temp.indexOf(this.multipleSelection[i].id);
                                //         console.log(index);
                                this.tableData.splice(index, 1);
                            }
                            // }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 多选操作
        handleSelectionChange(val) {
            console.log(val);
            this.multipleSelection = val;
            console.log(this.multipleSelection);
        },
        delAllSelection() {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$api.SJWHGL.deleteStoreInfo(this.multipleSelection)
                        .then((result) => {
                            console.log(result);
                            if (result.data.status == 'True') {
                                this.$message.success('删除成功');
                                let temp = []; //获得tableData里所有的id
                                for (let i = 0; i < this.tableData.length; i++) {
                                    temp.push(this.tableData[i].id);
                                }
                                console.log(temp);
                                let index;
                                index ? index : '';
                                for (let i = 0; i < this.multipleSelection.length; i++) {
                                    index = temp.indexOf(this.multipleSelection[i].id);
                                    console.log(index);
                                    this.tableData.splice(index, 1);
                                }
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        addContent() {
            this.addVisible = true;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.tempForm = {
                ccqid: 2,
                ccqmc: row.name,
                ccqip: row.ip,
                ccqgml: row.root
            };
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$api.SJWHGL.updateStoreInfo(this.tempForm)
                .then((result) => {
                    console.log(result);
                    if (result.data.msg == 'OK') {
                        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        this.tableData[this.idx] = {
                            id: this.tempForm.ccqid,
                            name: this.tempForm.ccqmc,
                            ip: this.tempForm.ccqip,
                            root: this.tempForm.ccqgml
                        };
                        console.log(this.tempForm);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        saveAdd() {
            this.addVisible = false;
            this.$api.SJWHGL.addStoreInfo(this.tempForm)
                .then((result) => {
                    console.log(result);
                    if (result.data.msg == 'OK') {
                        this.$message.success('新增存储区成功 ！');
                        this.addVisible = false;
                        this.tableData.push({
                            id: this.tableData.length + 1,
                            name: this.tempForm.ccqmc,
                            ip: this.tempForm.ccqip,
                            root: this.tempForm.ccqgml
                        });
                        this.tempForm = {};
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
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
}
</style>
