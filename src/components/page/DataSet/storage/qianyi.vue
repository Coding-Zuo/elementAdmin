<template>
    <div>
        <!-- <div @click="blur"> -->
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
                <el-button type="primary" icon="el-icon-add" class="handle-del mr10" @click="addContent">添加</el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">
                    批量删除
                </el-button>
                <!-- <el-select v-model="something"> -->
                <!-- <el-option key="1" label="启用" value="启用"></el-option> -->
                <!-- <el-option key="2" label="停用" value="停用"></el-option> -->
                <!-- </el-select> -->
                <el-input v-model="tempForm.clmc" placeholder="策略名称" class="handle-input mr10"></el-input>
                <el-input v-model="tempForm.qysjjh" placeholder="数据集合" class="handle-input mr10"></el-input>
                <el-input v-model="tempForm.clyyzt" placeholder="存储时长" class="handle-input mr10"></el-input>
                <el-input v-model="tempForm.clzxzq" placeholder="应用状态" class="handle-select mr10"></el-input>
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
                <el-table-column prop="name" label="策略名称" align="center"></el-table-column>
                <el-table-column prop="name2" label="存储时间" align="center"></el-table-column>
                <el-table-column prop="name3" label="迁移存储区" align="center"></el-table-column>
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
                <el-table-column label="应用状态" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.AppStatus"
                            :active-value="true"
                            :inactive-value="false"
                            @change="changeSwitch(scope.row, $event)"
                        />
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="280" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改 </el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">详情 </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">
                            停用
                        </el-button>
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
        <el-dialog :title="editType == '0' ? '添加' : editType == '1' ? '编辑' : '详情'" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" label-width="130px">
                <!-- 策略名称设置 -->
                <el-row>
                    <div class="data-title">策略名称设置</div>
                    <div class="data-content">
                        <el-col :span="12">
                            <el-form-item label="策略名称:">
                                <el-input v-model="tempForm.clmc"></el-input>
                            </el-form-item>
                        </el-col>
                    </div>
                </el-row>
                <!-- 数据类型、产品级别配置 -->
                <el-row>
                    <div class="data-title">数据集合</div>
                    <div class="data-content">
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
                <!-- 数据当前存储信息设置 -->
                <el-row>
                    <div class="data-title">数据当前存储信息设置</div>
                    <div class="data-content">
                        <el-row>
                            <el-col :span="18">
                                <el-form-item label="数据当前存储区:">
                                    <el-select v-model="tempForm.sjdqccqid" placeholder="请选择" ref="select0">
                                        <el-option
                                            v-for="item in dataStorageList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="18" style="display: flex;">
                                <el-form-item label="存储时间:">
                                    <el-input-number v-model="tempForm.qysjjg" :min="1" :max="100" style="width:40%;"></el-input-number>
                                    <el-select ref="select1" v-model="tempForm.qysjlx" placeholder="请选择" style="width:40%;">
                                        <el-option
                                            v-for="item in storageTypeList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="18" style="display: flex;">
                                <el-form-item label="数据下载热度:">
                                    <el-select ref="select2" v-model="tempForm.zgfwjb" placeholder="请选择">
                                        <el-option
                                            v-for="item in dataHeatList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="18" style="display: flex;">
                                <el-form-item label="数据存储使用阈值:">
                                    <el-select ref="select3" v-model="tempForm.sjdqccqsyyzbfb" placeholder="请选择">
                                        <el-option
                                            v-for="item in thresholdList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="18" style="margin-bottom: 20px;">
                                <el-checkbox v-model="checked" style="margin-right:10px;margin-top: 5px;">提升数据下载热度 </el-checkbox>
                                <el-select ref="select4" v-model="tempForm.promoteSpeed" placeholder="请选择">
                                    <el-option
                                        v-for="item in promoteSpeedList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="18" style="display: flex;">
                                <el-checkbox v-model="tempForm.checked" style="margin-right:10px;margin-top: 5px;"
                                    >减少数据存储时间
                                </el-checkbox>
                                <el-select ref="select5" v-model="tempForm.reduce" placeholder="请选择">
                                    <el-option
                                        v-for="item in reduceList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
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
                                <el-form-item label="数据当前存储区:">
                                    <el-time-picker v-model="tempForm.clzxkssj"></el-time-picker>
                                </el-form-item>
                                <el-form-item label="策略执行周期:">
                                    <div style="display:flex;">
                                        <el-input-number v-model="tempForm.clzxzq"></el-input-number>
                                        <el-select v-model="tempForm.clzzzqdw" placeholder="年/月/周/天">
                                            <el-option
                                                v-for="item in storageTypeList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            ></el-option>
                                        </el-select>
                                    </div>
                                </el-form-item>
                                <el-form-item label="策略执行状态">
                                    <el-input v-model="tempForm.clyyzt"></el-input>
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
                                <el-select ref="select6" v-model="tempForm.sjqyccqid" placeholder="请选择">
                                    <el-option
                                        v-for="item in storageSetList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </div>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" v-if="editType == 0" @click="saveAdd()">确 定</el-button>
                <el-button type="primary" v-else @click="saveEdit()">确 定</el-button>
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
            tempForm: {
                zgfwjb: '',
                qysjjh: '',
                clzxzq: '',
                qyclid: '',
                clmc: '',
                qysjjg: '',
                qysjlx: '',
                sjdqccqid: '',
                sjqyccqid: '',
                sjdqccqsyyzbfb: '',
                ccqsycyzhqysjfwzgjb: '',
                clzxkssj: '',
                clyyzt: ''
            },
            tableData: [
                {
                    id: 1,
                    name: 'CASEarth数据迁移策略',
                    name3: '存储区1',
                    name2: '3个月',
                    state: '启用'
                },
                {
                    id: 2,
                    name: '数据迁移策略',
                    name3: '存储区2',
                    name2: '1年',
                    state: '启用'
                }
            ],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            editType: '', //弹窗类型： 0添加 1编辑 2详情
            pageTotal: 0,
            form: {
                tacticsName: '' //策略名称
            },
            idx: -1,
            id: -1,
            content: '',
            dataType: '', //层级选择器 选中内容
            props: { multiple: true }, //层级选择器 开启多选
            defaultProps: {},
            checked: [],
            options: [
                //层级选择器数据
                {
                    value: 1,
                    label: 'OASTAR卫星',
                    children: [
                        {
                            value: 2,
                            label: '0级数据',
                            children: [
                                { value: 3, label: '产品一' },
                                { value: 4, label: '产品2' }
                            ]
                        },
                        {
                            value: 7,
                            label: '1级数据',
                            children: [
                                { value: 8, label: '产品3' },
                                { value: 9, label: '产品4' }
                            ]
                        },
                        {
                            value: 12,
                            label: '2级数据',
                            children: [
                                { value: 13, label: '产品5' },
                                { value: 14, label: '产品六' }
                            ]
                        }
                    ]
                }
            ],
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
            dataStorageList: [
                {
                    //数据当前存储区
                    value: '选项1',
                    label: '存储1'
                },
                {
                    value: '选项2',
                    label: '存储2'
                },
                {
                    value: '选项3',
                    label: '存储3'
                }
            ],
            tempForm: {
                storageType: '', //存储事件类型
                dataStorage: '', //数据当前存储区
                storageTime: '', //存储时间
                //新增迁移策略
                clmc: '',
                qysjjh: '',
                qysjjg: '',
                qysjlx: '',
                sjdqccqid: '',
                sjqyccqid: '',
                sjdqccqsyyzbfb: '',
                zgfwjb: '',
                clzxkssj: '',
                clzxzq: '',
                clyyzt: '',
                //备选项
                promoteSpeed: '',
                clmc: '',
                qysjjh: '',
                clyyzt: '',
                clzxzq: ''
            },
            storageTypeList: [
                {
                    value: '年',
                    label: '年'
                },
                {
                    //存储时间类型
                    value: '月',
                    label: '月'
                },
                {
                    value: '周',
                    label: '周'
                },
                {
                    value: '天',
                    label: '天'
                }
            ],
            dataHeatList: [
                //数据下载热度列表
                {
                    value: '1',
                    label: '1次'
                },
                {
                    value: '2',
                    label: '2次'
                }
            ],
            dataHeat: '', //数据下载热度
            thresholdList: [
                //数据阈值列表
                { value: '1', Label: '80%' }
            ],
            threshold: '', //数据阈值
            promoteSpeedList: [
                //提升数据下载热度
                { value: '1', Label: '20%' }
            ],
            promoteSpeed: '',
            reduceList: [
                //减少数据存储时间
                { value: '1', Label: '20%' }
            ],
            reduce: '',
            storageSetList: [
                //数据迁移存储区设置
                { value: '1', Label: '存储区1' }
            ],
            storageSet: ''
        };
    },
    created() {
        // this.getData();
    },
    components: {
        quillEditor
    },
    methods: {
        blur() {
            this.$refs.select0.blur();
            this.$refs.select1.blur();
            this.$refs.select2.blur();
            this.$refs.select3.blur();
            this.$refs.select4.blur();
            this.$refs.select5.blur();
            this.$refs.select6.blur();
        },
        handleSearch() {
            if (this.tempForm.clmc !== '' && this.tempForm.qysjj !== '' && this.tempForm.clyyz !== '' && this.tempForm.clzxz !== '') {
                this.$http
                    .post(this.api.api + 'sjgl/sjqygl/queryMigrationStrategyInfo', {
                        params: {
                            clmc: this.clmc,
                            qysjjh: this.qysjjh,
                            clyyzt: this.clyyzt,
                            clzxzq: this.clzxzq
                        }
                    })
                    .then(result => {
                        console.log(result);
                        let resultArr = result.data.data;
                        let length = resultArr.length;
                        this.tableData.length = 0;
                        for (let i = 0; i < length; i++) {
                            this.tableData.push({
                                id: resultArr[i].qyclid,
                                name: resultArr[i].qysjjh,
                                name3: resultArr[i].sjdqccqid,
                                name2: resultArr[i].qysjjg + resultArr[i].qysjlx,
                                state: resultArr[i].clyyzt
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                this.$message.info('请输入参数 ！');
            }
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$http
                        .post(this.api.api + 'sjgl/sjqygl/deleteMigrationStrategyInfo', {
                            params: {
                                qyclid: this.tempForm.qyclid
                            }
                        })
                        .then(result => {
                            console.log(result);
                            if (result.data.status == 'True') {
                                this.$message.success('数据删除成功 ！');
                                // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
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
            this.editType = '0';
            this.editVisible = true;
        },
        changeSwitch(row, e) {
            console.log(e);
            this.$confirm('确定要操作吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$http
                        .post(this.api.api + 'sjgl/sjqygl/UpdateStrategyUseStatus', {
                            params: {
                                smzqclid: this.tempForm.smzqclid,
                                clyyzt: row.AppStatus
                            }
                        })
                        .then(result => {
                            console.log(result);
                            if (result.data.msg == 'OK') {
                                this.$message.success('操作成功 ！');
                            } else {
                                this.$message.success('操作失败 ！');
                                row.AppStatus = false;
                            }
                        })
                        .catch(err => {
                            row.AppStatus = false;
                            console.log(err);
                        });
                })
                .catch(() => {
                    row.AppStatus = false;
                });
        },
        // 编辑操作
        handleEdit(index, row) {
            this.editType = '1';
            this.idx = index;
            this.tempForm.sjqyccqid = row.id;
            this.tempForm.clmc = row.name;
            this.tempForm.sjdqccqid = row.name3;
            this.editVisible = true;
        },
        // 新增管理策略
        saveAdd() {
            this.editVisible = false;
            // this.$set(this.tableData, this.idx, this.form);
            this.$http
                .post(this.api.api + 'sjgl/sjqygl/addMigrationStrategyInfo', {
                    params: {
                        qyclid: this.tempForm.qyclid,
                        clmc: this.tempForm.clmc,
                        qysjjh: this.tempForm.qysjjh,
                        qysjjg: this.tempForm.qysjjg,
                        qysjlx: this.tempForm.qysjlx,
                        sjdqccqid: this.tempForm.sjdqccqid,
                        sjqyccqid: this.tempForm.sjqyccqid,
                        sjdqccqsyyzbfb: this.tempForm.sjdqccqsyyzbfb,
                        ccqsycyzhqysjfwzgjb: this.tempForm.ccqsycyzhqysjfwzgjb,
                        clzxkssj: this.tempForm.clzxkssj,
                        clzxzq: this.tempForm.clzxzq,
                        clyyzt: this.tempForm.clyyztm
                    }
                })
                .then(result => {
                    console.log(result);
                    if (result.data.status == 'True') {
                        this.$message.success('数据追加成功 ！');
                        // this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //编辑管理策略
        saveEdit(index, row) {
            this.editVisible = false;
            // this.$set(this.tableData, this.idx, this.form);
            this.$http
                .post(this.api.api + 'sjgl/sjqygl/updateMigrationStrategyInfo', {
                    params: {
                        qyclid: this.tempForm.qyclid,
                        clyyzt: this.tempForm.clyyztm
                    }
                })
                .then(result => {
                    console.log(result);
                    if (result.data.status == 'True') {
                        this.$message.success(`提交修改成功 ！`);
                    }
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
