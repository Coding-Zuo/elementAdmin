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
                <el-select v-model="queryParams.clyyzt" placeholder="应用状态" class="handle-select mr10">
                    <el-option key="1" label="启用" value="启用"></el-option>
                    <el-option key="2" label="停用" value="停用"></el-option>
                </el-select>
                <el-input v-model="queryParams.clmc" placeholder="策略名称" class="handle-input mr10"></el-input>
                <el-input v-model="queryParams.sjjh" placeholder="数据集合" class="handle-input mr10"></el-input>
                <el-input v-model="queryParams.cllx" placeholder="存储类型" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="getTableData()">搜索</el-button>
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
                <el-table-column prop="qttj" label="前提条件" align="center"></el-table-column>
                <el-table-column label="应用状态" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.AppStatus"
                            active-value="启用"
                            inactive-value="停用"
                            @change="changeSwitch(scope.row)"
                        />
                    </template>
                </el-table-column>
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
                    :current-page="queryParams.pageIndex"
                    :page-size="queryParams.pageSize"
                    @current-change="handlePageChange"
                ></el-pagination>
                <!-- :total="pageTotal" -->
            </div>
        </div>

        <!-- 编辑 弹出框 -->
        <el-dialog title="生命周期管理策略编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="tempForm" label-width="100px">
                <el-row>
                    <div class="data-title">存储区类型</div>
                    <el-col :span="12" style="margin-top: 20px;">
                        <el-form-item>
                            <el-radio-group v-model="tempForm.linshi">
                                <el-radio :label="1">非临时区</el-radio>
                                <el-radio :label="2">临时区</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <div class="data-title">策略名称</div>
                    <el-col :span="12" style="margin-top: 20px;">
                        <el-form-item label="策略名称:"><el-input v-model="tempForm.clmc"></el-input></el-form-item>
                    </el-col>
                </el-row>
                <!-- 非临时区 展示树形图 -->
                <el-row v-if="tempForm.linshi == 2">
                    <div class="data-title">数据集合</div>
                    <div class="data-content1">
                        <div>数据类型、产品级别选择</div>
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
                </el-row>
                <!-- 临时区展示 下拉选择框 -->
                <el-row v-else>
                    <div class="data-title">数据类型</div>
                    <div class="data-content1">
                        <div>数据类型选择</div>
                        <el-tree :data="sjlxPropsData" :props="sjlxProps" @node-click="sjlxPropsNodeClick"></el-tree>
                    </div>
                </el-row>
                <el-row>
                    <el-col>
                        <div class="data-title">数据存储时间设置</div>
                        <div class="data-content1">
                            <el-form-item label="存储时间:">
                                <el-input v-model="tempForm.ccsj" placeholder="任意时间点"> </el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <div class="data-title">执行前提条件</div>
                        <div class="data-content1">
                            <el-form-item label="前提条件:">
                                <el-select ref="select1" v-model="tempForm.qttj" placeholder="请选择" style="width: 40%;">
                                    <el-option
                                        v-for="item in qttjList"
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
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加 弹出框 -->
        <el-dialog title="生命周期管理策略添加" :visible.sync="addVisible" width="50%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-row>
                    <div class="data-title">存储区类型</div>
                    <el-col :span="12" style="margin-top: 20px;">
                        <el-form-item>
                            <el-radio-group v-model="tempForm.linshi">
                                <el-radio :label="1">非临时区</el-radio>
                                <el-radio :label="2">临时区</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <div class="data-title">策略名称</div>
                    <el-col :span="12" style="margin-top: 20px;">
                        <el-form-item label="策略名称:"><el-input v-model="form.title"></el-input></el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="tempForm.linshi == 1">
                    <div class="data-title">数据集合</div>
                    <div class="data-content1">
                        <div>数据类型、产品级别选择</div>
                        <div style="border: 1px solid gray; margin-top: 10px;">
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
                <el-row v-else>
                    <div class="data-title">数据类型</div>
                    <div class="data-content1">
                        <div>数据类型选择</div>
                        <el-select v-model="tempForm.sjlx">
                            <el-option value="数据类型一" label="数据类型一"></el-option>
                            <el-option value="数据类型二" label="数据类型二"></el-option>
                            <el-option value="数据类型三" label="数据类型三"></el-option>
                            <el-option value="数据类型四" label="数据类型四"></el-option>
                        </el-select>
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
                                <el-select ref="select1" v-model="tempForm.qttj" placeholder="请选择" style="width: 40%;">
                                    <el-option
                                        v-for="item in qttjList"
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
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
    name: 'Chanpin',
    data() {
        return {
            defaultProps: '',
            sjlxPropsData: [
                {
                    label: '一级 1',
                    children: [
                        {
                            label: '二级 1-1',
                            children: [
                                {
                                    label: '三级 1-1-1'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '一级 2',
                    children: [
                        {
                            label: '二级 2-1',
                            children: [
                                {
                                    label: '三级 2-1-1'
                                }
                            ]
                        },
                        {
                            label: '二级 2-2',
                            children: [
                                {
                                    label: '三级 2-2-1'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '一级 3',
                    children: [
                        {
                            label: '二级 3-1',
                            children: [
                                {
                                    label: '三级 3-1-1'
                                }
                            ]
                        },
                        {
                            label: '二级 3-2',
                            children: [
                                {
                                    label: '三级 3-2-1'
                                }
                            ]
                        }
                    ]
                }
            ],
            sjlxProps: {
                children: 'children',
                label: 'label'
            },
            time1: '',
            time2: '',
            // 查询请求参数
            queryParams: {
                clmc: '',
                sjjh: '',
                clyyzt: '',
                cllx: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [
                {
                    id: 2,
                    name: 'CASEarth数据策略',
                    ip: '集合1',
                    root: '3个月',
                    AppStatus: 1,
                    qttj: '前提1'
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
                placeholder: '数据产品发布请输入...'
            },
            tree: [
                {
                    id: 1,
                    label: '0级编目',
                    children: [
                        {
                            id: 4,
                            label: 'casearth卫星'
                        },
                        {
                            id: 5,
                            label: '1号卫星'
                        }
                    ]
                },
                {
                    id: 2,
                    label: '标准产品',
                    children: [
                        {
                            id: 5,
                            label: 'casearth卫星'
                        },
                        {
                            id: 6,
                            label: '1号卫星'
                        }
                    ]
                },
                {
                    id: 3,
                    label: '高级产品',
                    children: [
                        {
                            id: 5,
                            label: 'casearth卫星'
                        },
                        {
                            id: 6,
                            label: '1号卫星'
                        }
                    ]
                },
                {
                    id: 4,
                    label: '专题产品',
                    children: []
                }
            ],
            tempForm: {
                linshi: 1,
                ccsj: '',
                qttj: '',
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
            qttjList: [
                { value: '汇交完成', label: '汇交完成' },
                { value: '流转完成', label: '流转完成'},
                { value: '下载完成', label: '下载完成'}]
        };
    },
    created() {
        this.getTableData();
    },
    components: {
        quillEditor
    },
    methods: {
        // 获取列表中数据，搜索按钮
        getTableData() {
            var _this = this;

            console.log(this.queryParams);

            this.$api.SJCLGL.queryLifecycleStrategyInfo(this.queryParams)
                .then((result) => {
                    console.log(result);
                    if (result.status == 'True') {
                        let resultArr = result.data;
                        let length = resultArr.length;
                        _this.tableData.length = 0;
                        for (let i = 0; i < length; i++) {
                            this.tableData.push({
                                id: resultArr[i].smzqclid,
                                name: resultArr[i].sjjh,
                                ip: resultArr[i].sjccqid,
                                root: resultArr[i].qlsjjg + resultArr[i].qlsjlx,
                                AppStatus: resultArr[i].clyyzt,
                                qttj: resultArr[i].qttj
                            });
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 状态修改
        changeSwitch(row) {
            let params = {
                smzqclid: this.tempForm.smzqclid,
                clyyzt: row.AppStatus
            };

            console.log(params);

            this.$confirm('确定要操作吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$api.SJCLGL.UpdateStrategyUseStatus(params)
                        .then((result) => {
                            console.log(result);
                            if (result.msg == 'OK') {
                                this.$message.success('操作成功！');
                            } else {
                                this.$message.warning('操作失败！' + result.msg);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch(() => {
                    row.AppStatus = false;
                });
        },
        // 删除操作
        handleDelete(index, row) {
            let _this = this;
            //
            let params = {
                smzqclid: this.tableData[index].id
            };
            console.log(params);
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$api.SJCLGL.deleteLifecycleStrategyInfo(params)
                        .then((result) => {
                            console.log(result);
                            if (result.code == 'True') {
                                _this.$message.success('删除成功');
                                _this.getTableData();
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
            this.tempForm = {};
            // 临时处理，将行数据赋值给表格数据
            {              
                this.tempForm.smzqclid = row.id,
                this.tempForm.clmc = row.name,
                this.tempForm.sjccqid = row.ip,
                this.tempForm.clyyzt = row.AppStatus,
                this.tempForm.ccsj = row.root                    
            }

            console.log(row);
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;

            let params = {
                smzqclid: this.tempForm.smzqclid,
                qlsjjg: this.tempForm.qlsjjg,
                clmc: this.tempForm.clmc,
                qlsjlx: this.tempForm.qlsjlx
            };

            console.log(params);

            this.$api.SJCLGL.updateLifecycleStrategyInfo()
                .then((result) => {
                    if (result.status == 'True') {
                        this.$message.success('数据生命周期修改成功 ！');
                    }else{
                        this.$message.warning(result.msg);
                    }
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });

            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 调用接口添加策略
        saveAdd() {
            let params = {
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
            };

            console.log(params);
            this.$api.SJCLGL.addLifecycleStrategyInfo(params)
                .then((result) => {
                    console.log(result);
                    if (result.status == 'True') {
                        this.$message.success('数据生命周期添加成功 ！');
                    } else {
                        this.$message.warning(result.msg);
                    }
                    this.addVisible = false;
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
            this.$set(this.queryParams, 'pageIndex', val);
            this.getData();
        },
        // 数据类型树中节点点击
        sjlxPropsNodeClick() {}
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
