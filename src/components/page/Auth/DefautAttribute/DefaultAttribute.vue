<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>数据默认业务属性管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!--                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">-->
                <!--                    <el-option key="1" label="广东省" value="广东省"></el-option>-->
                <!--                    <el-option key="2" label="湖南省" value="湖南省"></el-option>-->
                <!--                </el-select>-->
                <!--                <el-input v-model="query.name" placeholder="查询卫星名称" class="handle-input mr10"></el-input>-->
                <!--                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>-->
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="addVisible = true">添加 </el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除 </el-button>
                <el-button type="primary" icon="el-icon-search" class="handle-del mr10" @click="findAllSelection">查询 </el-button>
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
                <el-table-column prop="name" label="卫星名称" width="120" align="center"></el-table-column>
                <el-table-column prop="category" label="产品类型" align="center"></el-table-column>
                <el-table-column prop="name1" label="开放等级" width="155" align="center">
                    <!--                    <el-select v-model="query.address" placeholder="开放等级" align="center" class="handle-select mr10">-->
                    <!--                        <el-option key="1" label="一般开放" value="一般开发"></el-option>-->
                    <!--                        <el-option key="2" label="专项开放" value="专项开放"></el-option>-->
                    <!--                        <el-option key="2" label="内部开放" value="内部开放"></el-option>-->
                    <!--                        <el-option key="2" label="内部受控1级" value="内部受控1级"></el-option>-->
                    <!--                    </el-select>-->
                </el-table-column>
                <el-table-column prop="name2" label="业务属性" width="155" align="center">
                    <!--                    <el-select v-model="query.address" placeholder="业务属性" class="handle-select mr10">-->
                    <!--                        <el-option key="1" label="商业" value="商业"></el-option>-->
                    <!--                    </el-select>-->
                </el-table-column>
                <el-table-column prop="name3" label="共享级别" width="155" align="center">
                    <!--                    <el-select v-model="query.address" placeholder="共享级别" class="handle-select mr10">-->
                    <!--                        <el-option key="1" label="一般共享" value="一般共享"></el-option>-->
                    <!--                    </el-select>-->
                </el-table-column>
                <el-table-column prop="name4" label="数据生产者名称" width="180" align="center">
                    <!--                    <el-input v-model="query.name" placeholder="可输入生产者名称" style="width: 140px" class="handle-input mr10"></el-input>-->
                </el-table-column>
                <el-table-column prop="name5" label="数据联系人信息" width="180" align="center">
                    <!--                    <el-input v-model="query.name" placeholder="可输入联系人信息" style="width: 140px" class="handle-input mr10"></el-input>-->
                </el-table-column>
                <el-table-column prop="name6" label="产品说明文件存储路径" width="180" align="center">
                    <!--                    <el-input v-model="query.name" placeholder="可输入存储路径" style="width: 140px" class="handle-input mr10"></el-input>-->
                </el-table-column>
                <el-table-column prop="name7" label="产品质量信息" width="180" align="center">
                    <!--                    <el-input v-model="query.name" placeholder="可输入存储质量控制信息" style="width: 140px" class="handle-input mr10"></el-input>-->
                </el-table-column>
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
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
            <!--            <el-button-->
            <!--                    type="primary"-->
            <!--                    icon="el-icon-check"-->
            <!--                    class="handle-del mr10"-->
            <!--                    @click="addContent"-->
            <!--            >确认-->
            <!--            </el-button>-->
            <!--            <el-button-->
            <!--                    type="primary"-->
            <!--                    icon="el-icon-close"-->
            <!--                    class="handle-del mr10"-->
            <!--                    @click="delAllSelection"-->
            <!--            >取消-->
            <!--            </el-button>-->
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑数据默认属性" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="卫星名称" label-width="150px">
                    <el-select v-model="query.address" placeholder="卫星名称" style="width: 200px" class="handle-select mr10">
                        <!--                    <el-option key="1" label="广东省" value="广东省"></el-option>-->
                        <!--                    <el-option key="2" label="湖南省" value="湖南省"></el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item label="产品类型" label-width="150px">
                    <el-select v-model="query.address" placeholder="产品类型" style="width: 200px" class="handle-select mr10">
                        <!--                    <el-option key="1" label="广东省" value="广东省"></el-option>-->
                        <!--                    <el-option key="2" label="湖南省" value="湖南省"></el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item label="开放等级" label-width="150px">
                    <el-select v-model="query.address" placeholder="开放等级" style="width: 200px" class="handle-select mr10">
                        <!--                    <el-option key="1" label="广东省" value="广东省"></el-option>-->
                        <!--                    <el-option key="2" label="湖南省" value="湖南省"></el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item label="业务属性" label-width="150px">
                    <el-select v-model="query.address" placeholder="业务属性" style="width: 200px" class="handle-select mr10">
                        <!--                    <el-option key="1" label="广东省" value="广东省"></el-option>-->
                        <!--                    <el-option key="2" label="湖南省" value="湖南省"></el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item label="共享目的" label-width="150px">
                    <el-input type="textarea" v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="数据生产者名称" label-width="150px">
                    <el-input type="textarea" v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="数据联系人信息" label-width="150px">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="产品说明文件存储路径" label-width="155px">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="产品质量控制信息" label-width="150px">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="添加数据默认属性" :visible.sync="addVisible" width="50%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="卫星名称" label-width="150px">
                    <el-select v-model="form.satelliteName" placeholder="卫星名称" style="width: 200px" class="handle-select mr10">
                        <!--                    <el-option key="1" label="广东省" value="广东省"></el-option>-->
                        <!--                    <el-option key="2" label="湖南省" value="湖南省"></el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item label="产品类型" label-width="150px">
                    <el-select v-model="form.productType" placeholder="产品类型" style="width: 200px" class="handle-select mr10">
                        <!--                    <el-option key="1" label="广东省" value="广东省"></el-option>-->
                        <!--                    <el-option key="2" label="湖南省" value="湖南省"></el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item label="开放等级" label-width="150px">
                    <el-select v-model="form.searchLevel" placeholder="开放等级" style="width: 200px" class="handle-select mr10">
                        <!--                    <el-option key="1" label="广东省" value="广东省"></el-option>-->
                        <!--                    <el-option key="2" label="湖南省" value="湖南省"></el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item label="业务属性" label-width="150px">
                    <el-select v-model="form.purchaseType" placeholder="业务属性" style="width: 200px" class="handle-select mr10">
                        <!--                    <el-option key="1" label="广东省" value="广东省"></el-option>-->
                        <!--                    <el-option key="2" label="湖南省" value="湖南省"></el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item label="共享目的" label-width="150px">
                    <el-input type="textarea" v-model="form.sharedPurpose"></el-input>
                </el-form-item>
                <el-form-item label="数据生产者名称" label-width="150px">
                    <el-input type="" v-model="form.dataProviderName"></el-input>
                </el-form-item>
                <el-form-item label="数据联系人信息" label-width="150px">
                    <el-input v-model="form.dataProviderContactInfo"></el-input>
                </el-form-item>
                <el-form-item label="产品说明文件存储路径" label-width="155px">
                    <el-input v-model="form.productIllustrationFileRoute"></el-input>
                </el-form-item>
                <el-form-item label="产品质量控制信息" label-width="150px">
                    <el-input v-model="form.productQualityControlInfo"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="addContent()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import api from '../../../../mock';
import { fetchData } from '../../../../api/index';

export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [
                {
                    id: 1,
                    name: 'ENVISAT',
                    name1: '一级开发',
                    name2: '商业',
                    name3: '一般共享',
                    name4: '中科院遥地所',
                    name5: '李先生',
                    category: '0级编目数据'
                },
                {
                    id: 2,
                    name: 'ENVISAT',
                    name1: '一般开放',
                    name2: '商业',
                    name3: '高级共享',
                    name4: '武汉大学',
                    name5: '李先生',
                    category: '标准产品'
                },
                {
                    id: 3,
                    name: 'ENVISAT',
                    name1: '一般开放',
                    name2: '商业',
                    name3: '高级共享',
                    name4: '武汉大学',
                    name5: '李先生',
                    category: '深加工产品'
                },
                {
                    id: 4,
                    name: 'ENVISAT',
                    name1: '一般开放',
                    name2: '商业',
                    name3: '高级共享',
                    name4: '武汉大学',
                    name5: '李先生',
                    category: '专题产品'
                },
                {
                    id: 5,
                    name: 'ERS-1',
                    name1: '一般开放',
                    name2: '商业',
                    name3: '高级共享',
                    name4: '武汉大学',
                    name5: '李先生',
                    category: '0级编目数据'
                },
                {
                    id: 6,
                    name: 'ERS-1',
                    name1: '一般开放',
                    name2: '商业',
                    name3: '高级共享',
                    name4: '武汉大学',
                    name5: '李先生',
                    category: '深加工产品'
                },
                {
                    id: 7,
                    name: 'ERS-1',
                    name1: '一般开放',
                    name2: '商业',
                    name3: '高级共享',
                    name4: '武汉大学',
                    name5: '李先生',
                    category: '专题产品'
                }
            ],
            form: {
                id: '',
                productQualityControlInfo: '',
                productIllustrationFileRoute: '',
                dataProviderContactInfo: '',
                dataProviderName: '',
                sharedPurpose: '',
                purchaseType: '',
                searchLevel: '',
                productType: '',
                satelliteName: ''
            },
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        // this.getData();
    },
    methods: {
        getDataInfo(str) {
            this.$http
                .get(ap.api + '/glyqxgl/queryBusinessProperty', {
                    params: {
                        satelliteName: str
                    }
                })
                .then(result => {
                    this.tableData.length = 0;
                    this.tableData.push();
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        delAllSelection() {
            this.getDataInfo(str);
        },
        findAllSelection() {
            this.getDataInfo(str);
        },
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
        addContent() {
            this.addVisible = true;
            this.$http
                .post(api.api + '/glyqxgl/saveBusinessProperty')
                .then(result => {
                    console.log(result);
                    if (result.mas == 'OK') {
                        this.$message({
                            message: '恭喜你，这是一条成功消息',
                            type: 'success'
                        });
                        this.$message({
                            type: 'success',
                            message: '提交成功 ！'
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.$message({
                        type: 'fail',
                        message: '提交失败'
                    });
                });
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
    text-align: center;
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
    text-align: center;
}
</style>
