<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 数据维护管理</el-breadcrumb-item>
                <el-breadcrumb-item>数据回收站</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-add" class="handle-del mr10" @click="addContent">添加</el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
                <el-input v-model="query.who" placeholder="数据集合" style="width: 180px;" class="handle-input"></el-input>
                <el-input v-model="query.who" placeholder="存储区" style="width: 180px; margin-left: 10px;" class="handle-input"></el-input>
                <el-input
                    v-model="query.who"
                    placeholder="数据创建时间"
                    style="width: 180px; margin-left: 10px;"
                    class="handle-input"
                ></el-input>
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
                <el-table-column prop="id" label="数据ID" width="75" align="center"></el-table-column>
                <el-table-column prop="category" label="数据类型" align="center"></el-table-column>
                <el-table-column prop="date" label="数据创建时间" align="center"></el-table-column>
                <el-table-column prop="name" label="数据存储区" align="center"></el-table-column>
                <!--                <el-table-column label="账户余额">-->
                <!--                    <template slot-scope="scope">￥{{scope.row.money}}</template>-->
                <!--                </el-table-column>-->
                <!--                <el-table-column label="头像(查看大图)" align="center">-->
                <!--                    <template slot-scope="scope">-->
                <!--                        <el-image-->
                <!--                            class="table-td-thumb"-->
                <!--                            :src="scope.row.thumb"-->
                <!--                            :preview-src-list="[scope.row.thumb]"-->
                <!--                        ></el-image>-->
                <!--                    </template>-->
                <!--                </el-table-column>-->
                <!--                <el-table-column label="应用状态" align="center">-->
                <!--                    <template slot-scope="scope">-->
                <!--                        <el-tag-->
                <!--                            :type="scope.row.state==='启用'?'success':(scope.row.state==='停用'?'danger':'')"-->
                <!--                        >{{scope.row.state}}</el-tag>-->
                <!--                    </template>-->
                <!--                </el-table-column>-->

                <el-table-column label="操作" width="280" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="recoveryData(scope.$index, scope.row)">恢复</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)"
                            >清理</el-button
                        >
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
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="form.who"></el-input>
                </el-form-item>
                <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加 -->
        <el-dialog title="添加" :visible.sync="addVisible" width="50%">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="数据ID">
                    <el-input v-model="form.id"></el-input>
                </el-form-item>
                <el-form-item label="数据类型">
                    <el-input v-model="form.type"></el-input>
                </el-form-item>
                <el-form-item label="数据创建时间">
                    <el-input v-model="form.tiem"></el-input>
                </el-form-item>
                <el-form-item label="数据存储区">
                    <el-input v-model="form.cunchu"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 回收站单条详情 -->
        <el-dialog title="详情" :visible.sync="detailVisible" width="50%">
            <el-form ref="form" :model="tempForm" label-width="120px">
                <el-form-item label="数据ID">
                    <el-input v-model="tempForm.id"></el-input>
                </el-form-item>
                <el-form-item label="数据类型">
                    <el-input v-model="tempForm.sjlx"></el-input>
                </el-form-item>
                <el-form-item label="数据创建时间">
                    <el-input v-model="tempForm.sjcjjssj"></el-input>
                </el-form-item>
                <el-form-item label="数据存储区">
                    <el-input v-model="tempForm.ccq"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="detailVisible = false">取 消</el-button>
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
            tableData: [
                {
                    id: 1,
                    category: 'CASEarth2级产品',
                    date: '2020-04-07',
                    name: 'B存储区'
                },
                {
                    id: 20,
                    category: 'CASEarth4级产品',
                    date: '2020-04-20',
                    name: 'C存储区'
                }
            ],
            tempForm: {
                id: '',
                category: '',
                date: ' ',
                name: '',
                ccq: ' ',
                sjcjjssj: ' ',
                sjcjkssj: ' ',
                sjlx: ' '
            },
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            detailVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            content: '',
            editorOption: {
                placeholder: '数据产品发布请输入...'
            }
        };
    },
    created() {
        // this.getData();
    },
    components: {
        quillEditor
    },
    methods: {
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            // this.getData();
            this.$http
                .post(this.api.api + 'sjgl/sjhsz/queryRecycleData', {
                    params: {
                        sjlx: this.tempForm.sjlx,
                        ccq: this.tempForm.ccq,
                        sjcjsjkssj: this.tempForm.sjcjsjjssj,
                        sjcjsjjssj: this.tempForm.sjcjsjkssj
                    }
                })
                .then((result) => {
                    console.log(result);
                    let data = result.data.data;
                    console.table(data);
                    if (result.data.status == 'True') {
                        this.tableData.length = 0;
                        this.tableData.push({
                            id: data.ccqid,
                            category: data.sjlx,
                            // date: data.sjcjkssj + ' 至 ' + data.sjcjjssj,
                            date: data.sjcjkssj,
                            name: data.ccq
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
                    this.$http
                        .post(this.api.api + 'sjgl/sjhsz/deleteRecycleData', {
                            params: {
                                sjid: row.id,
                                sjlx: row.category
                            }
                        })
                        .then((result) => {
                            console.log(result);
                            if (result.data.msg == 'OK') {
                                this.$message.success('删除成功');
                                this.tableData.splice(index, 1);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
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
        addContent() {
            this.addVisible = true;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            console.log(row);
            this.$http
                .post(this.api.api + 'sjgl/sjhsz/queryRecycleDataDetails', {
                    params: {
                        sjid: row.id,
                        sjlx: row.category
                    }
                })
                .then((result) => {
                    console.log(result);
                    let data = result.data.data;
                    console.log(data);
                    if (result.data.status == 'True') {
                        this.tempForm.id = row.id;
                        this.tempForm.ccq = data.ccq;
                        this.tempForm.sjcjjssj = data.sjcjkssj + '  至  ' + data.sjcjjssj;
                        // this.tempForm.sjcjjssj = data.sjcjjssj;
                        this.tempForm.sjlx = data.sjlx;
                    }
                    console.log(this.tempForm.sjcjjssj);
                    console.log(data.sjcjjssj);
                })
                .catch((err) => {
                    console.log(err);
                });
            this.detailVisible = true;
        },
        recoveryData(index, row) {
            this.$http
                .post(this.api.api + 'sjgl/sjhsz/recoveryRecycleData', {
                    params: {
                        sjid: row.id,
                        sjlx: row.category
                    }
                })
                .then((result) => {
                    console.log(result);
                    if (result.data.msg == 'OK') {
                        this.$message({
                            type: 'success',
                            message: '数据恢复成功'
                        });
                        this.tableData.splice(index, 1);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
            this.detailVisible = false;
        },
        saveAdd() {
            this.addVisible = false;
            // this.$http
            //     .post(this.api.api + ' ', {
            //         params: {
            //             sjid: row.id,
            //             sjlx: row.category
            //         }
            //     })
            //     .then(result => {
            //         console.log(result);
            //         if (result.data.msg == 'OK') {
            //             this.$message({
            //                 type: 'success',
            //                 message: '数据恢复成功'
            //             });
            //             this.tableData.splice(index, 1);
            //         }
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     });
        },
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
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
