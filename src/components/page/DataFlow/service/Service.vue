<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i>
                    数据策略管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>数据流转服务策略管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.title" placeholder="数据级别" class="handle-select mr10">
                    <el-option key="1" label="标题1" value="标题1"></el-option>
                    <el-option key="2" label="标题2" value="标题2"></el-option>
                </el-select>
                <el-select v-model="query.title" placeholder="策略状态" class="handle-select mr10">
                    <el-option key="1" label="标题1" value="标题1"></el-option>
                    <el-option key="2" label="标题2" value="标题2"></el-option>
                </el-select>
                <el-select v-model="query.title" placeholder="卫星代号" class="handle-select mr10">
                    <el-option key="1" label="标题1" value="标题1"></el-option>
                    <el-option key="2" label="标题2" value="标题2"></el-option>
                </el-select>
                <el-input v-model="query.who" placeholder="策略名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-add" @click="getLoctaionVisible = true">接收地址管理</el-button>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-add" class="handle-del mr10" @click="addContent">添加</el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">
                    批量删除
                </el-button>
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
                <el-table-column prop="id" label="编号" align="center"></el-table-column>
                <el-table-column prop="name1" label="策略名称" align="center"></el-table-column>
                <el-table-column prop="name2" label="数据级别" align="center"></el-table-column>
                <el-table-column prop="name3" label="策略状态" align="center"></el-table-column>
                <el-table-column prop="name4" label="卫星代号" align="center"></el-table-column>
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
                <el-table-column label="操作" width="280" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                        <el-button
                            type="text"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                            :type="scope.row.name3 === '未生效' ? (scope.row.state = '启用') : (scope.row.state = '停用')"
                        >
                            {{ scope.row.state }}
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
            </div>
        </div>
        <!-- 添加弹出框 -->
        <el-dialog title="数据流转策略新增" :visible.sync="addVisible" width="50%">
            <el-form ref="form" :model="form" label-width="130px">
                <el-row>
                    <div class="data-title">策略名称</div>
                    <div class="data-content">
                        <el-col :span="12"><el-input v-model="form.strategyName"></el-input></el-col>
                    </div>
                    <div class="data-title">数据集合选择</div>
                    <div class="data-content">
                        <el-row style="padding-bottom:20px;padding-top:20px;">
                            <el-col :span="12">
                                <el-select v-model="dataMap" placeholder="请选择">
                                    <el-option
                                        v-for="item in dataMapList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="集合内容:"><el-input v-model="form.mapValue"></el-input></el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="data-title">流转方式选择</div>
                    <div class="data-content">
                        <div class="content">
                            <!-- 共享项目路径 -->
                            <el-row style="padding-bottom:20px;">
                                <el-col :span="12"><el-radio v-model="radio" label="1">共享目录</el-radio></el-col>
                                <el-col :span="12">
                                    <el-button style="float:right;" @click="detailVisible = true">流转地址</el-button>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="共享目录路径:"><el-input v-model="form.path"></el-input></el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="存储文件夹名称:"><el-input v-model="form.fileName"></el-input></el-form-item>
                                </el-col>
                            </el-row>
                            <!-- ftp -->
                            <el-row style="padding-bottom:20px;"><el-radio v-model="radio" label="2">ftp</el-radio></el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="ip地址:"><el-input v-model="form.ip"></el-input></el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="端口:"><el-input v-model="form.port"></el-input></el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="存储文件夹名称:"><el-input v-model="form.fileName2"></el-input></el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="密码:"><el-input v-model="form.password"></el-input></el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="用户名:"><el-input v-model="form.username"></el-input></el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑 -->
        <el-dialog title="数据流转策略新增" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" label-width="130px">
                <el-row>
                    <div class="data-title">流转方式选择</div>
                    <div class="data-content">
                        <div class="content">
                            <!-- 共享项目路径 -->
                            <el-row style="padding-bottom:20px;">
                                <el-col :span="12"><el-radio v-model="radio" label="1">共享目录</el-radio></el-col>
                                <el-col :span="12">
                                    <el-button style="float:right;" @click="detailVisible = true">流转地址</el-button>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="共享目录路径:"><el-input v-model="form.path"></el-input></el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="存储文件夹名称:"><el-input v-model="form.fileName"></el-input></el-form-item>
                                </el-col>
                            </el-row>
                            <!-- ftp -->
                            <el-row style="padding-bottom:20px;"><el-radio v-model="radio" label="2">ftp</el-radio></el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="ip地址:"><el-input v-model="form.ip"></el-input></el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="端口:"><el-input v-model="form.port"></el-input></el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="存储文件夹名称:"><el-input v-model="form.fileName2"></el-input></el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="密码:"><el-input v-model="form.password"></el-input></el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="用户名:"><el-input v-model="form.username"></el-input></el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 流转地址 -->
        <el-dialog :visible.sync="dataVisible" width="50%" title="选择数据流转地址">
            <el-row style="margin-top:20px;">
                <el-table
                    ref="multipleTable2"
                    :data="locationData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    border="true"
                >
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column label="编号" prop="num" width="50"></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="time" label="入库时间" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ip" label="IP地址" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="file" label="文件目录" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="type" label="共享类型" show-overflow-tooltip></el-table-column>
                </el-table>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dataVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 详情 -->
        <el-dialog :visible.sync="detailVisible" width="40%" title="转流服务地址详情">
            <div class="detailTable">
                <el-table :data="tableData2" stripe style="width: 100%">
                    <el-table-column prop="idNum" label="地址编号" width="95"> </el-table-column>
                    <el-table-column prop="acceptType" label="接受类型" width="95"> </el-table-column>
                    <el-table-column prop="dataPath" label="数据路径" width="95"> </el-table-column>
                    <el-table-column prop="addreName" label="地址名称" width="95"> </el-table-column>
                    <el-table-column prop="ipName" label="ip地址" width="95"> </el-table-column>
                    <el-table-column prop="storeTime" label="入库时间" width="95"> </el-table-column>
                </el-table>
            </div>
        </el-dialog>
        <!-- 流转地址管理 -->
        <el-dialog :visible.sync="getLoctaionVisible" width="30%" title="流转地址管理">
            <el-button type="primary" @click="strategicManagement = true"><i icon="el-icon-seeting"></i>数据流转策略管理</el-button>
            <el-button type="primary" @click="dataVisible = true"><i icon="el-icon-seeting"></i>数据流转地址管理</el-button>
        </el-dialog>
        <!-- 数据汇交策略管理 -->
        <el-dialog :visible.sync="strategicManagement" width="50%" title="数据流转策略管理">
            <el-row>
                <el-col :span="16">
                    <el-col :span="5">
                        <el-select placeholder="数据级别"> </el-select>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-select placeholder="策略状态"> </el-select>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-select placeholder="卫星代号"> </el-select>
                    </el-col>
                    <el-col :span="5" :offset="1">
                        <el-input placeholder="策略名称"></el-input>
                    </el-col>
                </el-col>
                <el-col :span="8">
                    <el-col :span="7" :offset="1"><el-button @click="addVisible = true">添加</el-button></el-col>
                    <el-col :span="7" :offset="1"><el-button>查询</el-button></el-col>
                    <el-col :span="7" :offset="1"><el-button>删除</el-button></el-col>
                </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
                <el-table ref="multipleTable2" :data="locationData" tooltip-effect="dark" style="width: 100%" :border="true">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column label="编号" prop="num" width="50"></el-table-column>
                    <el-table-column prop="name" label="策略名称" width="100px"></el-table-column>
                    <el-table-column prop="time" label="数据级别" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ip" label="策略状态" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ip" label="卫星代号" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button size="mini" @click="handleEdit2(scope.$index, scope.row)">修改</el-button>
                            <el-button size="mini" @click="handleDetail2(scope.$index, scope.row)">详情</el-button>
                            <el-button size="mini" @click="handleStart(scope.$index, scope.row)">启用</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row style="margin-top:20px;" type="flex" justify="end">
                <el-col>
                    <el-pagination :page-sizes="[5, 10, 15]" :page-size="100" layout="sizes, prev, pager, next" :total="5"> </el-pagination>
                </el-col>
            </el-row>
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
    name: 'News',
    data() {
        return {
            query: {
                who: '',
                title: '',
                pageIndex: 1,
                pageSize: 10
            },
            radio: false, //共享目录单选框
            addVisible: false,
            editVisible: false,
            detailVisible: false,
            locationVisible: false,
            dataVisible: false,
            getLoctaionVisible: false,
            strategicManagement: false,
            tableData: [
                {
                    id: 1,
                    name1: '0级策略',
                    name2: '0级编目数据',
                    name3: '未生效',
                    name4: 'CASEarth'
                },
                {
                    id: 2,
                    name1: '1级策略',
                    name2: '1级产品数据',
                    name3: '已生效',
                    name4: 'CASEarth'
                },
                {
                    id: 3,
                    name1: '1级策略更新版',
                    name2: '2级数据产品',
                    name3: '已生效',
                    name4: 'CASEarth'
                },
                {
                    id: 4,
                    name1: '4级策略',
                    name2: '4级产品数据',
                    name3: '未生效',
                    name4: 'CASEarth'
                },
                {
                    id: 5,
                    name1: '4级策略最新',
                    name2: '高级产品数据',
                    name3: '未生效',
                    name4: 'CASEarth'
                }
            ],
            tableData2: [
                {
                    idNum: 'xxx',
                    acceptType: 'xxx',
                    dataPath: 'xxx',
                    addreName: 'xxx',
                    ipName: 'xxx',
                    storeTime: 'xxx'
                }
            ],
            multipleSelection: [],
            delList: [],
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            content: '',
            editorOption: {
                placeholder: '新闻动态发布请输入...'
            },
            dataMap: '',
            dataMapList: [{ value: 1, label: '数据1' }],
            locationData: [
                {
                    time: '2016-05-03',
                    name: '卫星1',
                    num: '1518',
                    ip: '127.0.0.1',
                    file: 'c:/localhost',
                    type: '共享'
                },
                {
                    time: '2016-05-03',
                    name: '卫星1',
                    num: '1518',
                    ip: '127.0.0.1',
                    file: 'c:/localhost',
                    type: '共享'
                },
                {
                    time: '2016-05-03',
                    name: '卫星1',
                    num: '1518',
                    ip: '127.0.0.1',
                    file: 'c:/localhost',
                    type: '共享'
                },
                {
                    time: '2016-05-03',
                    name: '卫星1',
                    num: '1518',
                    ip: '127.0.0.1',
                    file: 'c:/localhost',
                    type: '共享'
                }
            ],
            multipleSelection2: []
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
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        //详情
        handleDetail() {
            this.detailVisible = true;
        },
        saveAdd() {},
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

.data-title {
    background: #ebeef5;
    padding: 5px;
}

.data-content {
    padding: 20px 0;
    overflow: auto;
}

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}

.detailTable {
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
}

.table-item {
    width: 20%;
    height: 40px;
    border-left: 1px solid gray;
    border-top: 1px solid gray;
    float: left;
    line-height: 40px;
    text-align: center;
}

.border-right {
    border-right: 1px solid gray;
}

.border-bottom {
    border-bottom: 1px solid gray;
}

.bg-blue {
    background: #409eff;
}
</style>
