<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 门户网站管理</el-breadcrumb-item>
                <el-breadcrumb-item>影像展厅资源配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-add" class="handle-del mr10" @click="addContent($event)">添加 </el-button>
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
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="title" label="展厅名称" align="center"></el-table-column>
                <el-table-column prop="detail" label="详情" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-info" @click="handleDetail(scope.$index, scope.row, $event)"
                            >查看详情</el-button
                        >
                    </template>
                </el-table-column>
                <!--                <el-table-column label="轮播图(查看大图)" align="center">-->
                <!--                    <template slot-scope="scope">-->
                <!--                        <el-image-->
                <!--                                class="table-td-thumb"-->
                <!--                                :src="scope.row.thumb"-->
                <!--                                :preview-src-list="[scope.row.thumb]"-->
                <!--                        ></el-image>-->
                <!--                    </template>-->
                <!--                </el-table-column>-->
                <!--                <el-table-column prop="who" label="排版顺序"></el-table-column>-->
                <!--                <el-table-column prop="date" label="发布时间"></el-table-column>-->
                <!--                <el-table-column prop="date1" label="更新时间"></el-table-column>-->
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row, $event)">编辑 </el-button>
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
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
                <!-- 影像展厅分页导航 -->
            </div>
        </div>
        <div class="container" style="margin-top: 30px;">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-add" class="handle-del mr10" @click="addContent">添加 </el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除 </el-button>
                <el-select v-model="query.title" placeholder="标题" class="handle-select mr10">
                    <el-option key="1" label="标题1" value="标题1"></el-option>
                    <el-option key="2" label="标题2" value="标题2"></el-option>
                </el-select>
                <el-input v-model="query.who" placeholder="作者" class="handle-input mr10"></el-input>
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
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="title" label="文件名"></el-table-column>
                <el-table-column prop="title" label="所属影像展厅"></el-table-column>
                <el-table-column label="轮播图(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image class="table-td-thumb" :src="scope.row.thumb" :preview-src-list="[scope.row.thumb]"></el-image>
                    </template>
                </el-table-column>
                <!--                <el-table-column prop="who" label="排版顺序"></el-table-column>-->
                <el-table-column prop="date" label="发布时间"></el-table-column>
                <el-table-column prop="date1" label="更新时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑 </el-button>
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
                    :total="pageTotal"
                    @current-change="handlePageChangeSource"
                ></el-pagination>
                <!-- 影像展厅资源配置分页导航 -->
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="eventTarget" :visible.sync="addVisible" width="50%">
            <el-form ref="form" :model="form" label-width="150px">
                <el-form-item label="文件名">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="选择影像展厅" label-width="150px">
                    <el-select v-model="query.address" placeholder="影像展厅" class="handle-select mr10">
                        <el-option key="1" label="展厅1" value="展厅1"></el-option>
                        <el-option key="2" label="展厅2" value="展厅2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="轮播图" label-width="150px">
                    <el-input v-model="form.who" type="file"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" v-show="eventTarget == '编辑'" @click="saveEdit">确 定</el-button>
                <el-button type="primary" v-show="eventTarget == '添加'" @click="saveAdd">确 定</el-button>
                <el-button type="primary" v-show="eventTarget == '查看详情'" @click="saveDetail">确 定</el-button>
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
    name: 'swapper',
    data() {
        return {
            eventTarget: '',
            query: {
                who: '',
                title: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [
                {
                    id: 1,
                    title: 'http:192.168.1.1/ssw/wqes',
                    thumb: 'https://lin-xin.gitee.io/images/post/node3.png',
                    date: '2020-02-02',
                    date1: '2020-02-03'
                },
                {
                    id: 2,
                    title: 'http:192.168.1.1/ssw/wqes',
                    thumb: 'https://lin-xin.gitee.io/images/post/node3.png',
                    date: '2020-02-02',
                    date1: '2020-02-03'
                }
            ],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            pageTotal: 100,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        // this.getData();
    },
    methods: {
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            // this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    //
                    this.$http
                        .get(this.api.api + 'mh/delYxzt', {
                            params: {
                                id: this.idx
                            }
                        })
                        .then((result) => {
                            console.log(result);
                            if (result.data.message == '操作成功！') {
                                this.$message.success('删除成功 ！');
                                this.tableData.splice(index, 1);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    //
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
        addContent(e) {
            this.eventTarget = e.srcElement.innerText;
            this.addVisible = true;
        },
        // 编辑操作
        handleEdit(index, row, e) {
            this.eventTarget = e.srcElement.innerText;
            this.idx = index;
            this.form = row;
            this.addVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.$set(this.tableData, this.idx, this.form);
            this.addVisible = false;
            this.eventTarget = '';
            this.$http
                .post(this.api.api + 'mh/editYxzt', {
                    params: {
                        PageNum: this.query.pageIndex, //当前页
                        PageSize: this.query.pageSize //当前页大小
                    }
                })
                .then((result) => {
                    console.log(result);
                    if (result.data.message == '操作成功！') {
                        this.$message.success('操作成功 ！');
                        this.tableData.push({
                            id: 1,
                            title: this.form.title,
                            thumb: this.form.who,
                            date: '发布时间',
                            date1: new Date().getFullYear() + '-' + parseInt(new Date().getMonth() + 1) + '-' + new Date().getDate()
                        });
                        /*
                         id: 1,
                    title: 'http:192.168.1.1/ssw/wqes',
                    thumb: 'https://lin-xin.gitee.io/images/post/node3.png',
                    date: '2020-02-02',
                    date1: '2020-02-03'*/
                        console.log(new Date().getDate());
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        saveAdd() {
            this.addVisible = false;
            this.eventTarget = '';
            this.$http
                .post(this.api.api + 'mh/saveYxzt', {
                    params: {
                        PageNum: '', //当前页
                        PageSize: '' //当前页大小
                    }
                })
                .then((result) => {
                    console.log(result);
                    if (result.data.message == '操作成功！') {
                        this.$message.success('操作成功 ！');
                        this.tableData.push({
                            id: 1,
                            title: this.form.title,
                            thumb: '缩略图',
                            date: '发布时间',
                            date1: new Date().getFullYear() + '-' + parseInt(new Date().getMonth() + 1) + '-' + new Date().getDate()
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        saveDetail() {
            this.addVisible = false;
            this.eventTarget = '';
            this.$http
                .post(this.api.api + 'mh/editYxzt', {
                    //内容对应的是富文本内容
                    //存数据库的时候直接存html
                    //富文本全都对应 nr
                    params: {
                        xh: '', //序号
                        bt: this.form.title, //标题
                        fbt: '', //副标题
                        tp: '', //图片
                        nr: this.content, //内容
                        fbr: this.form.who, //发布人
                        fbsj: '', //发布时间
                        gxsj: '', //更新时间
                        file: '' //文件
                    }
                })
                .then((result) => {
                    console.log(result);
                    if (result.data.message == '操作成功！') {
                        this.$message.success('操作成功 ！');
                        this.tableData.push({
                            id: 1,
                            title: this.form.title,
                            who: this.form.who,
                            state: '成功',
                            date: new Date().getFullYear() + '-' + parseInt(new Date().getMonth() + 1) + '-' + new Date().getDate()
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
        handleDetail(index, row, e) {
            this.eventTarget = e.srcElement.innerText;
            this.addVisible = true;
            this.idx = index;
            this.form = row;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.$http
                .get(this.api.api + 'mh/quertYxztList', {
                    params: {
                        PageNum: val, //当前页
                        PageSize: this.query.pageSize //当前页大小
                    }
                })
                .then((result) => {
                    console.log(result);
                    if (result.data.message == '操作成功！') {
                        this.tableData.length = 0;
                        let resultArr = result.data.result.items;
                        let length = resultArr.length;
                        for (let i = 0; i < length; i++) {
                            this.tableData.push({
                                id: resultArr[i],
                                title: resultArr[i],
                                thumb: resultArr[i],
                                date: '成功',
                                date1: new Date().getFullYear() + '-' + parseInt(new Date().getMonth() + 1) + '-' + new Date().getDate()
                            });
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        //影响展厅导航资源信息配置
        handlePageChangeSource(val) {
            this.$set(this.query, 'pageIndex', val);
            this.$http
                .get(this.api.api + 'mh/ ', {
                    params: {
                        PageNum: val, //当前页
                        PageSize: this.query.pageSize //当前页大小
                    }
                })
                .then((result) => {
                    console.log(result);
                    if (result.data.message == '操作成功！') {
                        this.tableData.length = 0;
                        let resultArr = result.data.result.items;
                        let length = resultArr.length;
                        for (let i = 0; i < length; i++) {
                            this.tableData.push({
                                id: resultArr[i].xh,
                                title: resultArr[i].bt,
                                thumb: resultArr[i].fbr,
                                date: '成功',
                                date1: new Date().getFullYear() + '-' + parseInt(new Date().getMonth() + 1) + '-' + new Date().getDate()
                            });
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
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
