<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i>
                    数据策略管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>数据生命周期管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-add" class="handle-del mr10" @click="addContent">添加</el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">
                    批量删除
                </el-button>
                <el-select v-model="query.title" placeholder="应用状态" class="handle-select mr10">
                    <el-option key="1" label="启用" value="启用"></el-option>
                    <el-option key="2" label="停用" value="停用"></el-option>
                </el-select>
                <el-input v-model="query.who" placeholder="策略名称" class="handle-input mr10"></el-input>
                <el-input v-model="query.who" placeholder="数据集合" class="handle-input mr10"></el-input>
                <el-input v-model="query.who" placeholder="存储类型" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch()">搜索</el-button>
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
                <el-table-column prop="name" label="策略名称" align="center"></el-table-column>
                <el-table-column prop="ip" label="数据集合" align="center"></el-table-column>
                <el-table-column prop="root" label="存储时长" align="center"></el-table-column>
                <el-table-column prop="root1" label="前提条件" align="center"></el-table-column>
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
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    @current-change="handlePageChange"
                ></el-pagination>
                <!-- :total="pageTotal" -->
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="生命周期管理策略编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="tempForm" label-width="100px">
                <el-row>
                    <div class="data-title">存储区类型</div>
                    <el-col :span="12" style="margin-top:20px;">
                        <el-form-item label="">
                            <el-radio-group v-model="tempForm.linshi">
                                <el-radio :label="1">非临时区</el-radio>
                                <el-radio :label="2">临时区</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <div class="data-title">策略名称</div>
                    <el-col :span="12" style="margin-top:20px;">
                        <el-form-item label="策略名称:"><el-input v-model="tempForm.clmc"></el-input></el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <div class="data-title">数据集合</div>
                    <div class="data-content1">
                        <div>数据类型、产品级别选择</div>
                        <div style="border:1px solid gray;margin-top:10px;">
                            <el-tree
                                :data="tree"
                                show-checkbox
                                default-expand-all
                                node-key="id"
                                ref="tree"
                                highlight-current
                                :props="defaultProps"
                            ></el-tree>
                        </div>
                    </div>
                </el-row>
                <el-row>
                    <el-col>
                        <div class="data-title">数据存储时间设置</div>
                        <div class="data-content1">
                            <el-form-item label="存储时间:">
                                <el-time-picker v-model="tempForm.ccsj" placeholder="任意时间点"> </el-time-picker>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <div class="data-title">执行前提条件</div>
                        <div class="data-content1">
                            <el-form-item label="前提条件:">
                                <el-select ref="select1" v-model="tempForm.swicth" placeholder="请选择" style="width:40%;">
                                    <el-option
                                        v-for="item in swicthList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加 -->
        <el-dialog title="生命周期管理策略添加" :visible.sync="addVisible" width="50%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-row>
                    <div class="data-title">存储区类型</div>
                    <el-col :span="12" style="margin-top:20px;">
                        <el-form-item>
                            <el-radio-group v-model="linshi">
                                <el-radio value="lsq">非临时区</el-radio>
                                <el-radio value="flsq">临时区</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <div class="data-title">策略名称</div>
                    <el-col :span="12" style="margin-top:20px;">
                        <el-form-item label="策略名称:"><el-input v-model="form.title"></el-input></el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <div class="data-title">数据集合</div>
                    <div class="data-content1">
                        <div>数据类型、产品级别选择</div>
                        <div style="border:1px solid gray;margin-top:10px;">
                            <el-tree
                                :data="tree"
                                show-checkbox
                                default-expand-all
                                node-key="id"
                                ref="tree"
                                highlight-current
                                :props="defaultProps"
                            ></el-tree>
                        </div>
                    </div>
                </el-row>
                <el-row>
                    <el-col>
                        <div class="data-title">数据存储时间设置</div>
                        <div class="data-content1">
                            <el-form-item label="存储时间:">
                                <el-time-picker v-model="time2" placeholder="任意时间点"> </el-time-picker>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <div class="data-title">执行前提条件</div>
                        <div class="data-content1">
                            <el-form-item label="前提条件:">
                                <el-select ref="select1" v-model="swicth" placeholder="请选择" style="width:40%;">
                                    <el-option
                                        v-for="item in swicthList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
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
            defaultProps: '',
            time1: '',
            time2: '',
            query: {
                who: '',
                title: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [
                {
                    id: 1,
                    name: 'CASEarth数据策略',
                    ip: '集合2',
                    root: '1年',
                    root1: '前提2'
                },
                {
                    id: 2,
                    name: 'CASEarth数据策略',
                    ip: '集合1',
                    root: '3个月',
                    root1: '前提1'
                }
            ],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            linshi: 1,
            feilinshi: -1,
            id: -1,
            content: '',
            editorOption: {
                placeholder: '数据产品发布请输入...'
            },
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
            tempForm: {
                linshi: '',
                ccsj: '',
                swicth: '',
                swicth: '',
                //编辑表单里的临时数据以上，用于数据回显；
                smzqclid: '',
                clmc: '',
                cllx: '',
                sjjh: '',
                qlsjjg: '',
                qlsjlx: '',
                sjccqid: '',
                sjsmzqclzxqttj: '',
                clzxsj: '',
                clzxzq: '',
                clyyzt: '',
                gxsj: '',
                rksj: '',
                cllx: '',
                bz: ''
            },
            storageTime: 1,
            storageType: '',
            storageTypeList: [{ value: 1, label: '月' }],
            swicth: '',
            swicthList: [{ value: 1, label: '条件1' }]
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
            // this.$set(this.query, 'pageIndex', 1);
            // this.getData();
            this.$http
                .get(this.api.api + 'sjgl/sjsmzqgl/queryLifecycleStrategyInfo', {
                    params: {
                        clmc: this.tempForm.clmc,

                        sjjh: this.tempForm.sjjh,

                        clyyzt: this.tempForm.clyyzt,

                        cllx: this.tempForm.cllx
                    }
                })
                .then(result => {
                    console.log(result);
                    if (result.data.status == 'True') {
                        let resultArr = result.data.data;
                        let length = resultArr.length;
                        this.tableData.length = 0;
                        for (let i = 0; i < length; i++) {
                            this.tableData.push({
                                id: resultArr[i].smzqclid,
                                name: resultArr[i].sjjh,
                                ip: resultArr[i].sjccqid,
                                root: resultArr[i].qlsjjg + resultArr[i].qlsjlx,
                                root1: resultArr[i].cllx
                            });
                        }
                    }
                })
                .catch(err => {
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
                        .post(this.api.api + 'sjgl/sjsmzqgl/deleteLifecycleStrategyInfo', {
                            params: {
                                smzqclid: this.tableData[index].id
                            }
                        })
                        .then(result => {
                            // console.log(result);
                            console.log(this.tableData[index].id);
                            if (result.data.code == 'True') {
                                this.$message.success('删除成功');
                                this.tableData.splice(index, 1);
                            }
                        })
                        .catch(err => {
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
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;

            this.$http
                .post(this.api.api + '/sjgl/sjsmzqgl/updateLifecycleStrategyInfo', {
                    params: {
                        smzqclid: this.tempForm.smzqclid,
                        qlsjjg: this.tempForm.qlsjjg,
                        clmc: this.tempForm.clmc,
                        qlsjlx: this.tempForm.qlsjlx
                    }
                })
                .then(result => {
                    if (result.data.status == 'True') {
                        this.$message.success('数据生命周期修改成功 ！');
                    }
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        saveAdd() {
            this.$http
                .post(this.api.api + 'sjgl/sjsmzqgl/addLifecycleStrategyInfo', {
                    params: {
                        smzqclid: this.tempForm.smzqclid,
                        clmc: this.tempForm.clmc,
                        cllx: this.tempForm.cllx,
                        sjjh: this.tempForm.sjjh,
                        qlsjjg: this.tempForm.qlsjjg,
                        qlsjlx: this.tempForm.qlsjlx,
                        sjccqid: this.tempForm.sjccqid,
                        sjsmzqclzxqttj: this.tempForm.sjsmzqclzxqttj,
                        clzxsj: this.tempForm.clzxsj,
                        clzxzq: this.tempForm.clzxzq,
                        clyyzt: this.tempForm.clyyzt,
                        gxsj: this.tempForm.gxsj,
                        rksj: this.tempForm.rksj,
                        bz: this.tempForm.bz
                    }
                })
                .then(result => {
                    console.log(result);
                    if (result.data.status == 'True') {
                        this.$message.success('数据生命周期添加成功 ！');
                    }
                    this.addVisible = false;
                })
                .catch(err => {
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

.data-title {
    background: #ebeef5;
    padding: 5px;
}

.data-content1 {
    padding: 20px 0;
}
</style>
