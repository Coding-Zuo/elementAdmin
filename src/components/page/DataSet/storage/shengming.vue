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
                <!-- 调试接口用 -->
                <el-table-column label="调试用，clzxsj" prop="clzxsj" align="center"></el-table-column>
                <el-table-column label="调试用，clzxzq" prop="clzxzq" align="center"></el-table-column>
                <el-table-column label="调试用，clzxzqlx" prop="clzxzqlx" align="center"></el-table-column>
                <!--  调试接口用-->
                <el-table-column prop="name" label="策略名称" align="center"></el-table-column>
                <el-table-column prop="sjjh" label="数据集合" align="center"></el-table-column>
                <el-table-column prop="ccTime" label="存储时长" align="center"></el-table-column>
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
                    :total="dataTotal"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑 弹出框 -->
        <!-- addVisible -->
        <el-dialog title="生命周期管理策略编辑" :visible.sync="addVisible" width="50%">
            <!-- <el-dialog title="生命周期管理策略编辑" :visible.sync="editVisible" width="50%"> -->
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
                    <el-form-item label="策略名称:"><el-input v-model="tempForm.clmc"></el-input></el-form-item>
                </el-row>
                <!-- 非临时区 展示树形图 -->
                <el-row v-if="tempForm.linshi == 1">
                    <div class="data-title">数据集合</div>
                    <div class="data-content1">
                        <div>数据类型、产品级别选择</div>
                        <el-tree
                            :data="sjlxPropsTreeData"
                            show-checkbox
                            default-expand-all
                            node-key="id"
                            ref="tree"
                            highlight-current
                            :props="sjlxTreeProps"
                        ></el-tree>
                    </div>
                </el-row>
                <!-- 临时区展示 下拉选择框 -->
                <el-row v-else>
                    <div class="data-title">数据类型</div>
                    <div class="data-content1">
                        <div>数据类型选择</div>
                        <el-select v-model="tempForm.sjlx">
                            <el-option
                                v-for="item in sjlxPropsOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </div>
                </el-row>
                <el-row>
                    <el-col>
                        <div class="data-title">数据存储时间设置</div>
                        <div class="data-content1">
                            <el-form-item label="清理时间间隔">
                                <el-input v-model="tempForm.qlsjjg" placeholder=" 年月日"> </el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <div class="data-title">
                            清理时间类型
                        </div>
                        <div class="data-content1">
                            <el-form-item label="清理时间类型">
                                <el-select v-model="tempForm.qlsjlx" placeholder="任意时间点">
                                    <el-option value="年" label="年"></el-option>
                                    <el-option value="月" label="月"></el-option>
                                    <el-option value="日" label="日"></el-option>
                                    <el-option value="周" label="周"></el-option>
                                    <el-option value="天" label="天"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <div class="data-title">执行前提条件</div>
                        <div class="data-content1">
                            <el-form-item label="前提条件:">
                                <el-select ref="select1" v-model="tempForm.zxqttj" placeholder="请选择" style="width: 40%;">
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
                <el-button type="primary" @click="saveAdd">确 定</el-button>
                <!-- <el-button type="primary" @click="saveEdit">确 定</el-button> -->
            </span>
        </el-dialog>
        <!-- 添加 弹出框 -->
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
            sjlxPropsOptions: [
                { label: '汇交数据', value: '汇交数据' },
                { label: '流转数据', value: '流转数据' }
            ],
            sjlxPropsTreeData: [
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
            sjlxTreeProps: '',
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
                // {
                //     id: 2,
                //     name: 'CASEarth数据策略',
                //     ip: '集合1',
                //     ccTime: '3个月',
                //     AppStatus: 1,
                //     qttj: '前提1'
                // }
            ],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            dataTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            content: '',
            editorOption: {
                placeholder: '数据产品发布请输入...'
            },
            tempForm: {
                linshi: 1,
                qlsjjg: '',
                qttj: '',
                sjjh: '数据集合',
                //编辑表单里的临时数据以上，用于数据回显；
                smzqclid: '',
                clmc: 'wejodfoejfileril',
                cllx: '',
                sjlx: '',
                qttj: '',
                sjjh: '',
                qlsjjg: '',
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
                { value: '流转完成', label: '流转完成' },
                { value: '下载完成', label: '下载完成' }
            ]
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
            this.$api.QIANYI_SHENGMING.queryLifecycleStrategyInfo(this.queryParams)
                .then((result) => {
                    console.log(result);
                    if (result.status == true) {
                        let resultArr = result.data.rows;
                        let length = resultArr.length;
                        _this.tableData.length = 0;
                        for (let i = 0; i < length; i++) {
                            _this.tableData.push({
                                id: resultArr[i].smzqclid,
                                name: resultArr[i].clmc,
                                sjjh: resultArr[i].sjjh,
                                ccTime: resultArr[i].qlsjjg + resultArr[i].qlsjlx,
                                AppStatus: resultArr[i].clyyzt,
                                clzxsj: resultArr[i].clzxsj,
                                clzxzq: resultArr[i].clzxzq,
                                clzxzqlx: resultArr[i].clzxzqlx,
                                qttj: resultArr[i].zxqttj
                            });
                        }
                        this.dataTotal = result.data.size;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 状态修改
        changeSwitch(row) {
            let params = {
                smzqclid: row.id,
                clyyzt: row.AppStatus
            };

            console.log(params);

            this.$confirm('确定要操作吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$api.QIANYI_SHENGMING.UpdateStrategyUseStatus_SMZQ(params)
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
                smzqclid: '[' + this.tableData[index].id + ']'
            };
            console.log(params);
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$api.QIANYI_SHENGMING.deleteLifecycleStrategyInfo(params)
                        .then((result) => {
                            if (result.status == true) {
                                console.log(1);
                                this.$message.info(result.data);
                                // 删除成功以后消息提示为空字符串
                                // _this.$message.success('删除成功');
                                _this.getTableData();
                            } else {
                                this.$message.error(result.data);
                            }
                            console.log(result);
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
            // 临时处理，将行数据赋值给表格数据
            this.tempForm.smzqclid = row.id;
            this.tempForm.sjjh = row.sjjh;
            this.tempForm.clmc = row.name;
            this.tempForm.zxqttj = row.qttj;
            this.tempForm.clyyzt = row.AppStatus;
            this.tempForm.qlsjjg = row.ccTime;
            this.tempForm.clzxsj = row.clzxsj;
            this.tempForm.clzxzq = row.clzxzq;
            this.tempForm.clzxzqlx = row.clzxzqlx;
            this.editVisible = true;
            // console.log(row);
        },
        // 保存编辑
        saveEdit() {
            let type = '';
            switch (this.tempForm.linshi) {
                case 1:
                    type = '非临时区';
                    break;
                case 2:
                    type = '临时区';
                    break;
                default:
                    break;
            }
            // this.editVisible = false;
            let params = {
                //参数请勿修改！！！！！！！！！
                smzqclid: this.tempForm.smzqclid,
                qlsjjg: this.tempForm.qlsjjg,
                qlsjlx: this.tempForm.qlsjlx,
                sjjh: this.tempForm.sjjh,
                clmc: this.tempForm.clmc,
                zxqttj: this.tempForm.zxqttj,
                clzxsj: this.tempForm.clzxsj,
                clzxzq: this.tempForm.clzxzq,
                clzxzqlx: this.tempForm.clzxzqlx,
                cllx: type
            };
            console.log(params);
            this.$api.QIANYI_SHENGMING.updateLifecycleStrategyInfo(params)
                .then((result) => {
                    if (result.status == 'True') {
                        this.$message.success('数据生命周期修改成功 ！');
                        //             his.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        // this.$set(this.tableData, this.idx, this.form);
                    } else {
                        this.$message.warning(result.msg);
                    }
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 调用接口添加策略
        saveAdd() {
            let type = '';
            switch (this.tempForm.linshi) {
                case 1:
                    type = '非临时区';
                    break;
                case 2:
                    type = '临时区';
                    break;
                default:
                    break;
            }
            // this.editVisible = false;
            let paramsAdd = {
                //参数请勿修改！！！！！！！！！
                // qlsjjg: this.tempForm.qlsjjg,
                // qlsjlx: this.tempForm.qlsjlx,
                // sjjh: this.tempForm.sjjh,
                // clmc: this.tempForm.clmc,
                // zxqttj: this.tempForm.zxqttj,
                // clzxsj: this.tempForm.clzxsj,
                // clzxzq: this.tempForm.clzxzq,
                // //策略执行周期类型
                // clzxzqlx: this.tempForm.clzxzqlx,
                // clyyzt: '停用',
                // bz: '备注',
                // cllx: type
                qlsjjg: this.tempForm.qlsjjg,
                qlsjlx: this.tempForm.qlsjlx,
                sjjh: this.tempForm.sjjh,
                clmc: this.tempForm.clmc,
                zxqttj: this.tempForm.zxqttj,
                clzxsj: this.tempForm.clzxsj,
                clzxzq: this.tempForm.clzxzq,
                //策略执行周期类型
                clzxzqlx: this.tempForm.clzxzqlx,
                clyyzt: this.tempForm.clyyzt,
                bz: this.tempForm.bz,
                cllx: type
            };
            console.log(paramsAdd);
            this.$api.QIANYI_SHENGMING.addLifecycleStrategyInfo(paramsAdd)
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
            this.getTableData();
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
