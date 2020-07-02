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
                <el-button
                        type="primary"
                        icon="el-icon-add"
                        class="handle-del mr10"
                        @click="addContent"
                >添加</el-button>
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
<!--                <el-select v-model="query.title" placeholder="应用状态" class="handle-select mr10">-->
<!--                    <el-option key="1" label="启用" value="启用"></el-option>-->
<!--                    <el-option key="2" label="停用" value="停用"></el-option>-->
<!--                </el-select>-->
                <el-input v-model="query.who" placeholder="存储区名称" style="width: 140px" class="handle-input mr10"></el-input>
                <el-input v-model="query.who" placeholder="IP" style="width: 140px" class="handle-input mr10"></el-input>
                <el-input v-model="query.who" placeholder="设备位置" style="width: 140px" class="handle-input mr10"></el-input>
                <el-input v-model="query.who" placeholder="所属部门" style="width: 140px" class="handle-input mr10"></el-input>
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
<!--                <el-table-column label="状态" align="center">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-tag-->
<!--                            :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"-->
<!--                        >{{scope.row.state}}</el-tag>-->
<!--                    </template>-->
<!--                </el-table-column>-->
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >修改</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
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
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
            <div class="plugins-tips">存储区名称设置</div>
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="存储区名称:" >
                    <el-input v-model="form.title" style="width: 300px"></el-input>
                </el-form-item>
            </el-form>
            <div class="plugins-tips">存储区访问链接参数</div>
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="存储设备位置:" label-width="150px">
                    <el-input v-model="form.who" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="存储设备所属部门:" label-width="150px">
                    <el-input v-model="form.who" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="管理者联系方式:" label-width="150px">
                    <el-input v-model="form.who" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="存储访问接口方式:" label-width="150px">
                    <el-select v-model="leftTop1" placeholder="请选择" style="width: 300px">
                        <el-option
                                v-for="item in leftTop1List"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="存储区IP:" label-width="150px">
                    <el-input v-model="form.who" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="用户名:" label-width="150px">
                    <el-input v-model="form.who" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="密码:" label-width="150px">
                    <el-input v-model="form.who" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="确认密码:" label-width="150px">
                    <el-input v-model="form.who" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="根目录:" label-width="150px">
                    <el-input v-model="form.who" style="width: 300px"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="数据存储区信息添加" :visible.sync="addVisible" width="50%">
            <div class="plugins-tips">存储区名称设置</div>
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="存储区名称:" >
                    <el-input v-model="form.title" style="width: 300px"></el-input>
                </el-form-item>
            </el-form>
            <div class="plugins-tips">存储区基本信息设置</div>
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="存储设备位置:" label-width="150px">
                    <el-input v-model="form.who" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="存储设备所属部门:" label-width="150px">
                    <el-input v-model="form.who" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="管理者联系方式:" label-width="150px">
                    <el-input v-model="form.who" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="存储访问接口方式:" label-width="150px">
                    <el-select v-model="leftTop1" placeholder="请选择" style="width: 300px">
                        <el-option
                                v-for="item in leftTop1List"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div class="plugins-tips">存储区连接参数设置</div>
                <el-form-item label="存储区IP:" label-width="150px">
                    <el-input v-model="form.who" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="用户名:" label-width="150px">
                    <el-input v-model="form.who" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="密码:" label-width="150px">
                    <el-input v-model="form.who" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="确认密码:" label-width="150px">
                    <el-input v-model="form.who" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="根目录:" label-width="150px">
                    <el-input v-model="form.who" style="width: 300px"></el-input>
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
import { fetchData } from '../../../../api/index';
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
                    id:1,
                    name:'存储区1',
                    ip:'192.168.1.1',
                    root:'\\usr'
                },{
                    id:2,
                    name:'存储区2',
                    ip:'192.168.1.2',
                    root:'\\root'
                },
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
        addContent(){
            this.addVisible = true;
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
        saveAdd(){

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
