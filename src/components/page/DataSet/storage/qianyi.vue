<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i>
                    数据策略管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>数据迁移策略管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!-- 页面上方的搜索部分 -->
                <el-button type="primary" icon="el-icon-add" class="handle-del mr10" @click="addQYCL">添加</el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">
                    批量删除
                </el-button>
                <el-input v-model="editForm.clmc" placeholder="策略名称" class="handle-input mr10"></el-input>
                <el-input v-model="editForm.qysjjh" placeholder="数据集合" class="handle-input mr10"></el-input>
                <el-input v-model="editForm.qyssjg" placeholder="存储时长" class="handle-input mr10"></el-input>
                <el-input v-model="editForm.wxmc" placeholder="卫星名称" class="handle-input mr10"></el-input>
                <el-input v-model="editForm.cplx" placeholder="产品类型" class="handle-input mr10"></el-input>
                <el-select v-model="editForm.clyyzt" placeholder="应用状态">
                    <el-option v-for="item in appStatusList" :key="item.value" :index="item.index" :value="item.value"> </el-option>
                </el-select>
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
                <el-table-column prop="ccsj" label="存储时间" align="center"></el-table-column>
                <el-table-column prop="qyccq" label="迁移存储区" align="center"></el-table-column>
                <el-table-column label="应用状态" align="center">
                    <template slot-scope="scope">
                        <el-switch :value="scope.row.state" active-value="启用" inactive-value="停用" @change="stopSwitch(scope.row, scope.index, $event)" />
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="280" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改 </el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">详情 </el-button>
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
                    :total="query.dataTotal"
                ></el-pagination>
            </div>
        </div>
        <!-- 单条数据编辑、详情、添加、弹出框 -->
        <el-dialog :title="editType == '0' ? '添加' : editType == '1' ? '编辑' : '详情'" :visible.sync="editFormVisible" width="50%">
            <el-form ref="form" :model="form" label-width="130px">
                <!-- 策略名称设置 -->
                <el-row>
                    <div class="data-title">策略名称设置</div>
                    <div class="data-content">
                        <el-col :span="12">
                            <el-form-item label="策略名称:">
                                <el-input v-model="editForm.clmc"></el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                </el-row>
                <!-- 数据类型、产品级别配置 -->
                <el-row>
                    <div class="data-title">数据集合</div>
                    <div class="data-content">
                        <div>数据类型、产品级别选择</div>
                        <div style="border: 1px solid gray; margin-top: 10px;">
                            <!-- <el-input v-model="editForm.qysjjh"></el-input>选择相应的数据集合 -->
                            <el-tree
                                :data="tree"
                                show-checkbox
                                default-expand-all
                                node-key="label"
                                ref="tree"
                                highlight-current
                                :props="defaultProps"
                                @check-change="get_Sjjh()"
                            ></el-tree>
                        </div>
                    </div>
                </el-row>
                <!-- 数据当前存储信息设置 -->
                <el-row>
                    <div class="data-title">数据当前存储信息设置</div>
                    <div class="data-content">
                        <el-row>
                            <el-col :span="18">
                                <el-form-item label="数据当前存储区:">
                                    <el-input v-model="editForm.sjdqccqid" placeholder="数据当前存储区ID" ref="select0"> </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="18" style="display: flex;">
                                <el-form-item label="存储时间:">
                                    <el-input-number v-model="editForm.qysjjg" :min="1" :max="100" style="width: 40%;"></el-input-number>
                                    <el-select ref="select1" v-model="editForm.qysjlx" placeholder="请选择" style="width: 40%;">
                                        <el-option v-for="item in storageTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="18" style="display: flex;">
                                <el-form-item label="数据下载热度:">
                                    <el-input-number ref="select2" v-model="editForm.zgfwjb" placeholder="请选择">
                                        <!-- <el-option
                                            v-for="item in dataHeatList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        ></el-option> -->
                                    </el-input-number>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="18" style="display: flex;">
                                <el-form-item label="数据存储使用阈值:">
                                    <el-input-number ref="select3" v-model="editForm.ccqyzbfb" placeholder="请选择">
                                        <!-- <el-option
                                            v-for="item in thresholdList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        ></el-option> -->
                                    </el-input-number>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="18" style="margin-bottom: 20px;">
                                <el-checkbox v-model="checked" style="margin-right: 10px; margin-top: 5px;">提升数据下载热度 </el-checkbox>
                                <el-input ref="select4" v-model="editForm.promoteSpeed" placeholder="请选择">
                                    <!-- <el-option
                                        v-for="item in promoteSpeedList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option> -->
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="18" style="display: flex;">
                                <el-checkbox v-model="editForm.checked" style="margin-right: 10px; margin-top: 5px;">减少数据存储时间 </el-checkbox>
                                <el-input ref="select5" v-model="editForm.reduce" placeholder="请选择">
                                    <!-- <el-option
                                        v-for="item in reduceList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option> -->
                                </el-input>
                            </el-col>
                        </el-row>
                    </div>
                </el-row>
                <!-- 策略执行设置 -->
                <el-row>
                    <div class="data-title">策略执行设置</div>
                    <div class="data-content">
                        <el-row>
                            <el-col :span="18">
                                <el-form-item label="数据执行时间:">
                                    <el-date-picker v-model="editForm.clzxkssj"></el-date-picker>
                                </el-form-item>
                                <el-form-item label="策略执行周期:">
                                    <div style="display: flex;">
                                        <el-input-number v-model="editForm.clzxzq"></el-input-number>

                                        <el-select v-model="editForm.clzxzqlx" placeholder="年/月/周/天">
                                            <el-option v-for="item in storageTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </div>
                                </el-form-item>
                                <el-form-item label="策略执行状态">
                                    <el-input v-model="editForm.clyyzt"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </el-row>
                <!-- 数据迁移存储区设置 -->
                <el-row>
                    <div class="data-title">数据迁移存储区设置</div>
                    <div class="data-content">
                        <el-col :span="18">
                            <el-form-item label="迁移存储区:">
                                <el-select ref="select6" v-model="editForm.sjqyccqid" placeholder="请选择">
                                    <el-option v-for="item in storageSetList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </div>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" v-if="editType == 0" @click="saveAdd()">确 定</el-button>
                <el-button type="primary" v-else @click="saveEditForm()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// import QIANYI_SHENGMING from ""
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
    name: 'Chanpin',
    data() {
        return {
            query: {
                pageIndex: 1,
                pageSize: 5,
                dataTotal: 0,
            },
            editForm: {
                qysjjh: '',
                zgfwjb: '',
                qysjjh: {},
                clzxzq: '',
                qyclid: '',
                clmc: '',
                qysjjg: '',
                qysjlx: '',
                clzxzqlx: '',
                sjdqccqid: '',
                sjqyccqid: '',
                ccqyzbfb: '',
                ccqsycyzhqysjfwzgjb: '',
                clzxkssj: '',
                clyyzt: '',
            },
            tableData: [
                {
                    id: 'abc',
                    name: 'abc',
                    ccsj: 'abc',
                    qyccq: 'abc',
                    state: '启用',
                },
                {
                    id: 'abc',
                    name: 'abc',
                    ccsj: 'abc',
                    qyccq: 'abc',
                    state: '启用',
                },
                {
                    id: 'abc',
                    name: 'abc',
                    ccsj: 'abc',
                    qyccq: 'abc',
                    state: '启用',
                },
            ],
            multipleSelection: [],
            delList: [],
            editFormVisible: false,
            editType: '', //弹窗类型： 0添加 1编辑 2详情
            pageTotal: 0,
            form: {
                tacticsName: '', //策略名称
            },

            idx: -1,
            id: -1,
            content: '',
            dataType: '', //层级选择器 选中内容
            props: { multiple: true }, //层级选择器 开启多选
            defaultProps: {},
            checked: [],
            tree: [
                {
                    label: '1级数据',
                    children: [
                        {
                            label: '1级产品',
                        },
                        {
                            label: '1级编目',
                        },
                    ],
                },
                {
                    label: '2级数据',
                    children: [
                        {
                            label: '2级产品',
                        },
                        {
                            label: '2级编目',
                        },
                    ],
                },
                {
                    label: '高级产品',
                    children: [],
                },
                {
                    label: '专题产品',
                    children: [],
                },
            ],
            checkedTreeNode: [],
            dataStorageList: [
                {
                    //数据当前存储区
                    value: '选项1',
                    label: '存储1',
                },
                {
                    value: '选项2',
                    label: '存储2',
                },
                {
                    value: '选项3',
                    label: '存储3',
                },
            ],
            editForm: {
                id: '',
                storageType: '', //存储事件类型
                dataStorage: '', //数据当前存储区
                storageTime: '', //存储时间
                //新增迁移策略
                clmc: '',
                qysjjh: '',
                qysjjg: '',
                qysjlx: '',
                cplx: '',
                wxmc: '',
                sjdqccqid: '',
                sjqyccqid: '',
                ccqyzbfb: '',
                zgfwjb: '',
                clzxkssj: '',
                clzxzq: '',
                //备选项
                promoteSpeed: '',
                clmc: '',
                qysjjh: '',
                clyyzt: '',
                clzxzq: '',
            },
            storageTypeList: [
                //存储时间类型
                {
                    value: '年',
                    label: '年',
                },
                {
                    value: '月',
                    label: '月',
                },
                {
                    value: '周',
                    label: '周',
                },
                {
                    value: '天',
                    label: '天',
                },
            ],
            dataHeatList: [
                //数据下载热度列表
                {
                    value: '1',
                    label: '1次',
                },
                {
                    value: '2',
                    label: '2次',
                },
            ],
            dataHeat: '', //数据下载热度
            thresholdList: [
                //数据阈值列表
                { value: '1', Label: '80%' },
            ],
            threshold: '', //数据阈值
            promoteSpeedList: [
                //提升数据下载热度
                { value: '1', Label: '20%' },
            ],
            promoteSpeed: '',
            reduceList: [
                //减少数据存储时间
                { value: '1', Label: '20%' },
            ],
            reduce: '',
            storageSetList: [
                //数据迁移存储区设置
                { value: '1', Label: '存储区1' },
            ],
            storageSet: '',
            appStatusList: [
                { index: 1, value: '启用' },
                { index: 2, value: '停用' },
            ],
        };
    },
    mounted() {
        this.handleSearch({
            pageSize: this.query.pageSize,
            pageIndex: this.query.pageIndex,
        });
    },
    components: {
        // quillEditor //is not defined
    },
    methods: {
        handleSearch(pageSize, pageIndex) {
            let params = {
                clmc: this.editForm.clmc,
                qysjjh: this.editForm.qysjjh,
                qyssjg: this.editForm.qyssjg,
                clyyzt: this.editForm.clyyzt,
                cplx: this.editForm.cplx,
                wxmc: this.editForm.wxmc,
                pageSize: this.query.pageSize,
                pageIndex: this.query.pageIndex,
            };
            this.$api.QIANYI_SHENGMING.queryMigrationStrategyInfo(params)
                .then(result => {
                    console.log(result);
                    let resultArr = result.data.rows;
                    let length = resultArr.length;
                    this.tableData.length = 0;
                    for (let i = 0; i < length; i++) {
                        this.tableData.push({
                            id: resultArr[i].qyclid,
                            name: resultArr[i].clmc,
                            qyccq: resultArr[i].sjdqccqid,
                            ccsj: resultArr[i].qysjjg + resultArr[i].qysjlx,
                            state: resultArr[i].clyyzt,
                        });
                    }
                    this.query.dataTotal = result.data.size;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 停用操作
        stopSwitch(row, index) {
            // console.log(row);
            let params = {
                qyclid: row.id,
                // 文档中不包含，暂定策略应用状态 0 停用，1 启用
                clyyzt: row.state == '启用' ? '停用' : '启用',
            };
            this.$confirm('确定要停用吗？', '提示', {
                type: 'warning',
            })
                .then(() => {
                    console.log(params);
                    this.$api.QIANYI_SHENGMING.UpdateStrategyUseStatus_QY(params)
                        .then(result => {
                            console.log(result);
                            if (result.code == 1) {
                                this.$message.success('操作成功！');
                                this.tableData[index].state = params.clyyzt;
                            } else {
                                this.$message.error(result.msg);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(() => {});
        },
        // 删除单条数据操作
        handleDelete(index, row) {
            // 二次确认删除;
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning',
            })
                .then(() => {
                    let params = {
                        qyclid: '[' + row.id + ']',
                    };
                    console.log(params);
                    this.$api.QIANYI_SHENGMING.deleteMigrationStrategyInfo(params)
                        .then(result => {
                            console.log(result);
                            if (result.data.code == 1) {
                                this.$message.success('删除操作成功！');
                            } else {
                                this.$message.error(result.data.msg);
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
            for (let i = 0; i < val.length; i++) {
                this.multipleSelection.push(val[i].id);
            }
        },
        delAllSelection() {
            console.log(this.multipleSelection);
            this.multipleSelection = [];

            // const length = this.multipleSelection.length;
            // let str = '';
            // this.delList = this.delList.concat(this.multipleSelection);
            // for (let i = 0; i < length; i++) {
            //     str += this.multipleSelection[i].name + ' ';
            // }
            // this.$message.error(`删除了${str}`);
            // this.multipleSelection = [];
        },
        addQYCL() {
            this.editType = '0';
            this.editFormVisible = true;
        },
        // 编辑操作
        handleEdit(index, row) {
            this.editType = '1';
            this.idx = index;
            this.editForm.qyclid = row.id;
            this.editForm.clmc = row.name;
            this.editForm.sjdqccqid = row.qyccq;
            this.editFormVisible = true;
            console.log(new Date());
        },
        // 新增 弹窗保存事件 新增管理策略
        saveAdd() {
            this.editFormVisible = false;
            // 传参变量
            let params = {
                zgfwjb: this.editForm.zgfwjb,
                qyclid: this.editForm.qyclid,
                clmc: this.editForm.clmc,
                qysjjh: 'ceshi', //迁移数据集合
                // qysjjh: this.editForm.qysjjh,
                qysjjg: this.editForm.qysjjg,
                qysjlx: this.editForm.qysjlx,
                sjdqccqid: this.editForm.sjdqccqid,
                sjqyccqid: this.editForm.sjqyccqid,
                ccqyzbfb: parseInt(this.editForm.ccqyzbfb, 10),
                clzxkssj: this.editForm.clzxkssj,
                clzxzq: this.editForm.clzxzq,
                clyyzt: '停用',
            };
            console.log(params);
            console.log(typeof parseInt(this.editForm.ccqyzbfb, 10));

            this.$api.QIANYI_SHENGMING.addMigrationStrategyInfo(params)
                .then(result => {
                    console.log(result);
                    if (result.status == true) {
                        this.$message.success('数据添加成功 ！');
                    } else {
                        this.$message.error('数据添加失败！' + result.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        get_Sjjh() {
            let dataKey = [];
            let dataValue = [];
            //通过半选得到上层节点，相当于属性名，
            let childNode = this.$refs.tree.getCheckedNodes();
            //通过全选得到子节点，相当于属性值
            let fatherNode = this.$refs.tree.getHalfCheckedNodes();
            console.log();
            for (let i = 0; i < fatherNode.length; i++) {
                dataKey.push({
                    key: fatherNode[i].label,
                });
            }
            for (let i = 0; i < childNode.length; i++) {
                dataValue.push({
                    value: childNode[i].label,
                });
            }
            // console.log(dataKey);
            console.log(dataValue);
        },
        // 编辑 弹窗保存事件 数据迁移策略管理 数据
        saveEditForm() {
            this.editFormVisible = false;
            // 传参变量
            let params = {
                zgfwjb: this.editForm.zgfwjb,
                qyclid: this.editForm.qyclid,
                clzxzqlx: this.editForm.clzxzqlx,
                clmc: this.editForm.clmc,
                qysjjh: 'ceshi', //迁移数据集合， 对应树形结构
                // qysjjh: this.editForm.qysjjh,
                qysjjg: this.editForm.qysjjg,
                qysjlx: this.editForm.qysjlx,
                sjdqccqid: this.editForm.sjdqccqid,
                sjqyccqid: this.editForm.sjqyccqid,
                ccqyzbfb: parseInt(this.editForm.ccqyzbfb, 10),
                clzxkssj: this.editForm.clzxkssj,
                clzxzq: this.editForm.clzxzq,
                clyyzt: '停用',
            };
            //
            this.$api.QIANYI_SHENGMING.updateMigrationStrategyInfo(params)
                .then(result => {
                    console.log(result);
                    if (result.status == true) {
                        this.$message.success('数据修改成功 ！');
                    } else {
                        this.$message.error('数据修改失败！' + result.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 分页导航
        handlePageChange(val) {
            this.query.pageIndex = val;
            this.handleSearch({
                pageSize: this.query.pageSize,
                pageIndex: this.query.pageIndex,
            });
        },
    },
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

.data-title {
    background: #ebeef5;
    padding: 5px;
}

.data-content {
    padding: 20px 0;
    /* overflow: auto; */
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
