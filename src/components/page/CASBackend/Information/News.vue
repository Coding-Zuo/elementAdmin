<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 门户网站管理</el-breadcrumb-item>
                <el-breadcrumb-item>信息发布</el-breadcrumb-item>
                <el-breadcrumb-item>新闻动态发布</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-add" class="handle-del mr10" @click="addContent()">添加</el-button>
                <el-button
                    :disabled="multipleSelection.length == 0"
                    type="primary"
                    icon="el-icon-delete"
                    @click="delAllSelection"
                    class="handle-del mr10"
                    >批量删除</el-button
                >
                <el-input v-model="query.bt" placeholder="标题" class="handle-input mr10"></el-input>
                <el-input v-model="query.fbr" placeholder="作者" class="handle-input mr10"></el-input>
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
                <el-table-column prop="xh" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="bt" label="标题" align="center"></el-table-column>
                <el-table-column prop="fbt" label="副标题" align="center"></el-table-column>
                <el-table-column prop="tp" label="图片" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="'data:image/jpeg;base64,' + scope.row.tp"
                            :preview-src-list="['data:image/jpeg;base64,' + scope.row.tp]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="fbr" label="作者" align="center"></el-table-column>
                <el-table-column prop="date" label="查看详情" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-info" @click="handleDetail(scope.$index, scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="fbsj" label="发布时间" align="center"></el-table-column>
                <el-table-column prop="gxsj" label="更新时间" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.row.xh)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.PageNum"
                    :page-size="query.PageSize"
                    @current-change="handlePageChange"
                    :total="pageTotal"
                ></el-pagination>
            </div>
        </div>

        <!-- 新增、编辑弹出框 -->
        <el-dialog :title="addOrEditTitle ? '新增动态新闻' : '编辑动态新闻'" :visible.sync="addOrEditVisible" width="50%">
            <el-form ref="addOrEditform" :model="addOrEditform" label-width="70px">
                <el-form-item label="标题">
                    <el-input v-model="addOrEditform.bt"></el-input>
                </el-form-item>
                <el-form-item label="副标题">
                    <el-input v-model="addOrEditform.fbt"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="addOrEditform.fbr"></el-input>
                </el-form-item>
                <el-form-item label="文件"
                    ><label for="file" class="file">选择文件</label><input type="file" id="file" @change="choiceFile($event)" />
                </el-form-item>
                <quill-editor ref="myTextEditor" v-model="addOrEditform.nr" :options="editorOption"></quill-editor>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addOrEditVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitSave">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 查看详情 -->
        <el-dialog title="查看详情" :visible.sync="detailVisible" width="50%">
            <el-form ref="newsDetailsForm" :model="newsDetails" label-width="70px">
                <el-form-item label="标题">
                    <el-input v-model="newsDetails.bt"></el-input>
                </el-form-item>
                <el-form-item label="副标题">
                    <el-input v-model="newsDetails.fbt"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="newsDetails.fbr"></el-input>
                </el-form-item>
                <el-form-item label="序号">
                    <el-input-number v-model="newsDetails.xh"></el-input-number>
                </el-form-item>
                <el-form-item label="图片">
                    <el-image class="table-td-thumb" :src="newsDetails.tp" :preview-src-list="[newsDetails.tp]"></el-image>
                </el-form-item>
                <el-form-item label="内容">
                    <div v-html="newsDetails.nr"></div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="detailVisible = false">关 闭</el-button>
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
    name: 'News',
    data() {
        return {
            query: {
                // 查询参数
                bt: '',
                fbr: '',
                PageNum: 1,
                PageSize: 10
            },
            tableData: [], // 新闻数据列表
            pageTotal: 100, //新闻数据总数目；
            multipleSelection: [],
            // ================== 新增、编辑 ====================
            addOrEditVisible: false,
            addOrEditTitle: true, // true 新增 false 编辑
            addOrEditform: {
                bt: '',
                fbt: '',
                nr: '',
                fbr: '',
                file: null,
                xh: '' // 序号，编辑的时候存在
            },
            editorOption: {
                placeholder: '新闻动态发布请输入...'
            },
            detailVisible: false,
            newsDetails: {} // 详情
        };
    },
    created() {
        this.handleSearch();
    },
    components: {
        quillEditor
    },
    methods: {
        // 触发搜索按钮
        handleSearch() {
            this.$api.MHWZGL.quertXwList(this.query)
                .then((result) => {
                    console.log(result);
                    if (result.code == 200) {
                        this.tableData = result.result.items;
                        this.pageTotal = result.result.totalNum;
                        this.$message.success('操作成功！');
                    } else {
                        console.log(result);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 分页查询
        handlePageChange(index) {
            this.query.PageNum = index;
            this.handleSearch();
        },
        // 删除操作
        handleDelete(xh) {
            var that = this;
            console.log(xh);
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    that.$api.MHWZGL.delXw(xh)
                        .then((result) => {
                            console.log(result);
                            if (result.code == 200) {
                                that.$message.success('删除成功 ！');
                                that.handleSearch();
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
            this.multipleSelection = [];
            val.forEach((v) => {
                this.multipleSelection.push(v.xh);
            });
        },
        // 删除多选
        delAllSelection() {
            let xhs = this.multipleSelection.join(',');
            this.handleDelete(xhs);
        },
        // 新增按钮
        addContent() {
            this.addOrEditVisible = true;
            this.addOrEditTitle = true;
            delete this.addOrEditform.xu;
            for (var key in this.addOrEditform) {
                if (this.addOrEditform[key] != 'file') {
                    this.addOrEditform[key] = '';
                }
            }
        },
        // 编辑按钮
        handleEdit(index, row) {
            console.log(row);
            this.addOrEditVisible = true;
            this.addOrEditTitle = false;
            this.addOrEditform.xh = '';
            for (var key in this.addOrEditform) {
                if (this.addOrEditform[key] != 'file') {
                    this.addOrEditform[key] = row[key];
                }
            }
            this.addOrEditform.file = null;
            // this.addOrEditform.file = row.tp;
            this.addOrEditform.xh = row.xh;
        },
        // 新增编辑保存
        submitSave() {
            var data = new FormData();
            for (var key in this.addOrEditform) {
                data.append(key, this.addOrEditform[key]);
            }
            // console.log(data);

            // 新增
            if (this.addOrEditTitle) {
                this.$api.MHWZGL.saveXw(data)
                    .then((result) => {
                        if (result.code == 200) {
                            this.handleSearch();
                            this.addOrEditVisible = false;
                            this.$message.success('新增成功！');
                        } else {
                            console.log(result);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
            // 编辑
            if (!this.addOrEditTitle) {
                this.$api.MHWZGL.editXw(data)
                    .then((result) => {
                        if (result.code == 200) {
                            this.handleSearch();
                            this.addOrEditVisible = false;
                            this.$message.success('新增成功！');
                        } else {
                            console.log(result);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        // 查看详情
        handleDetail(index, row) {
            console.log(row);
            this.detailVisible = true;
            this.$api.MHWZGL.quertXw(row.xh)
                .then((result) => {
                    if (result.code == 200) {
                        console.log(result);
                        this.newsDetails = result.result;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // ====================== 图片相关操作 ==========================
        choiceFile(e) {
            console.log(e);
            // let imgUrlBase64;
            this.addOrEditform.file = e.srcElement.files[0];
            // console.log(picture);
            // var data = new FormData();
            // data.append('file', picture);
            // data.append('bt', 'fbsdbfjd');
            // data.append('fbt', 'vsdvsdv');
            // this.addOrEditform.file = data;
            // this.addOrEditform.file = picture;
            // this.readFile(picture);
            // this.$api.MHWZGL.saveXw(data)
            //     .then((result) => {
            //         if (result.code == 200) {
            //             this.handleSearch();
            //             this.addOrEditVisible = false;
            //             this.$message.success('新增成功！');
            //         } else {
            //             console.log(result);
            //         }
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        },
        readFile(file) {
            var _this = this;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                _this.addOrEditform.file = this.result;
                // console.log(this.result);
            };
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}
.file {
    display: block;
    color: #ffffff;
    background: #69a1fd;
    text-align: center;
    line-height: 2em;
    cursor: pointer;
    border-radius: 0.2em;
    width: 6em;
    height: 2em;
}
#file {
    visibility: hidden;
}
#picture {
    width: 30px;
    height: 30px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 200px;
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
