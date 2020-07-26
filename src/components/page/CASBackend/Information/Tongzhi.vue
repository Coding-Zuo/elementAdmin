<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 门户网站管理</el-breadcrumb-item>
                <el-breadcrumb-item>信息发布</el-breadcrumb-item>
                <el-breadcrumb-item>通知公告发布</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-add" class="handle-del mr10" @click="addContent($event)">添加</el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
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
                <el-table-column prop="title" label="标题" align="center"></el-table-column>
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
                <el-table-column prop="who" label="作者" align="center"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.state === '成功' ? 'success' : scope.row.state === '失败' ? 'danger' : ''">{{
                            scope.row.state
                        }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="发布时间" align="center"></el-table-column>
                <el-table-column prop="date" label="查看详情" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-info" @click="handleDetail(scope.$index, scope.row, $event)"
                            >查看详情</el-button
                        >
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row, $event)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button
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
        <el-dialog :title="eventTarget" :visible.sync="addVisible" width="50%">
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
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" v-show="eventTarget == '编辑'" @click="saveEdit">确 定</el-button>
                <el-button type="primary" v-show="eventTarget == '添加'" @click="saveAdd">确 定</el-button>
                <el-button type="primary" v-show="eventTarget == '查看详情'" @click="saveDetail">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../../../api/index';
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
    name: 'Tongzhi',
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
                    title: '空天信息研究院与丽江市签署战略合作协议',
                    who: '超级管理员',
                    state: '成功',
                    date: '2020-02-02'
                },
                {
                    id: 2,
                    title: '应急管理部副部长孙华山调研中科院空天信息研究院',
                    who: '超级管理员',
                    date: '2020-02-02',
                    state: '成功'
                }
            ],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            content: '',
            editorOption: {
                placeholder: '通知公告发布请输入...'
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
            this.$http
                .get(this.api.api + 'mh/quertTzggList', {
                    params: {
                        PageNum: this.query.pageIndex,
                        PageSize: this.query.pageSize
                    }
                })
                .then((result) => {
                    console.log(result);
                    if (result.data.result.message == '操作成功！') {
                        let resultArr = result.data.result.items;
                        let length = resultArr.length;
                        console.log(resultArr);
                        this.tableData.length = 0;
                        for (let i = 0; i < length; i++) {
                            console.log(i);
                            this.tableData.push({
                                id: resultArr[i].xh,
                                title: resultArr[i].bt,
                                who: resultArr[i].fbr,
                                state: '成功',
                                date: resultArr[i].fbsj
                            });
                        }
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
                    //
                    this.$http
                        .get(this.api.api + 'mh/delTzgg', {
                            params: {
                                xh: this.idx
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
                .catch((err) => {
                    console.log(err);
                });
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
            this.addVisible = false;
            this.eventTarget = '';
            this.$http
                .post(this.api.api + 'mh/editTzgg', {
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
                .post(this.api.api + 'mh/quertTzgg', {
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
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        saveAdd() {
            this.addVisible = false;
            this.eventTarget = '';
            this.$http //添加通知公告
                .post(this.api.api + 'mh/saveTzgg', {
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
                        this.$message.success('新闻添加成功 ！');
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
        handleDetail(index, row, e) {
            this.eventTarget = e.srcElement.innerText;
            this.addVisible = true;
            this.idx = index;
            this.form = row;
            this.$http
                .get(this.api.api + 'mh/quertTzgg', {
                    params: {
                        xh: this.form.id //策略编号
                    }
                })
                .then((result) => {
                    console.log(result);
                    if (result.data.message == '操作成功！') {
                        this.form.who = result.data.result.fbr;
                        this.form.title = result.data.result.bt;
                        this.content = '';
                        this.content += `
                            <p>发布时间：&nbsp;&nbsp;${result.data.result.fbsj}</p>
                            <p>发布人：&nbsp;&nbsp;${result.data.result.fbr}</p>
                            <p>更新时间：&nbsp;&nbsp;${result.data.result.gxsj}</p>
                            <article>内容：<br/> &nbsp;&nbsp;&nbsp;&nbsp;${result.data.result.nr}</atricle>
                    `;
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
