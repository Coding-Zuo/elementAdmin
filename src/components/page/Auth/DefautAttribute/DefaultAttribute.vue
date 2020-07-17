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
                <!--                </el-select>-->
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="addVisible = true">添加 </el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除 </el-button>
                <el-input v-model="query.name" placeholder="查询卫星名称" class="handle-input mr10"></el-input>
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
                <el-table-column prop="satelliteName" label="卫星名称" width="120" align="center"></el-table-column>
                <el-table-column prop="productType" label="产品类型" align="center"></el-table-column>
                <el-table-column prop="searchLevel" label="开放等级" width="155" align="center"> </el-table-column>
                <el-table-column prop="purchaseTypeName" label="业务属性" width="155" align="center"> </el-table-column>
                <el-table-column prop="downloadLevel" label="共享级别" width="155" align="center"> </el-table-column>
                <el-table-column prop="dataProviderName" label="数据生产者名称" width="180" align="center"> </el-table-column>
                <el-table-column prop="dataProviderContactInfo" label="数据联系人信息" width="180" align="center"> </el-table-column>
                <el-table-column
                    prop="productIllustrationFileRoute"
                    label="产品说明文件存储路径"
                    width="180"
                    align="center"
                ></el-table-column>
                <el-table-column prop="productQualityControlInfo" label="产品质量信息" width="180" align="center"> </el-table-column>
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
                    @current-change="handlePageChange"
                ></el-pagination>
                <!-- :total="pageTotal" -->
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑数据默认属性" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="editForm" label-width="70px">
                <el-form-item label="卫星名称" label-width="150px">
                    <el-select v-model="editForm.satelliteName" placeholder="卫星名称" style="width: 200px" class="handle-select mr10">
                        <el-option v-for="(item, index) in addForm.satelliteName" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品类型" label-width="150px">
                    <el-select v-model="editForm.productType" placeholder="产品类型" style="width: 200px" class="handle-select mr10">
                        <el-option v-for="(item, index) in addForm.productType" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开放等级" label-width="150px">
                    <el-select v-model="editForm.searchLevel" placeholder="开放等级" style="width: 200px" class="handle-select mr10">
                        <el-option v-for="(item, index) in addForm.searchLevel" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务属性" label-width="150px">
                    <el-select v-model="editForm.purchaseType" placeholder="业务属性" style="width: 200px" class="handle-select mr10">
                        <el-option v-for="(item, index) in addForm.purchaseType" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="共享目的" label-width="150px">
                    <el-input type="textarea" v-model="editForm.sharedPurpose"></el-input>
                </el-form-item>
                <el-form-item label="数据生产者名称" label-width="150px">
                    <el-input type="textarea" v-model="editForm.dataProviderName"></el-input>
                </el-form-item>
                <el-form-item label="数据联系人信息" label-width="150px">
                    <el-input v-model="editForm.dataProviderContactInfo"></el-input>
                </el-form-item>
                <el-form-item label="产品说明文件存储路径" label-width="155px">
                    <el-input v-model="editForm.productIllustrationFileRoute"></el-input>
                </el-form-item>
                <el-form-item label="产品质量控制信息" label-width="150px">
                    <el-input v-model="editForm.productQualityControlInfo"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="添加数据默认属性" :visible.sync="addVisible" width="50%">
            <el-form ref="form" :model="addForm" label-width="70px">
                <el-form-item label="卫星名称" label-width="150px">
                    <el-select v-model="addForm.satelliteName" placeholder="卫星名称" style="width: 200px" class="handle-select mr10">
                        <el-option v-for="(item, index) in form.satelliteName" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品类型" label-width="150px">
                    <el-select v-model="addForm.productType" placeholder="产品类型" style="width: 200px" class="handle-select mr10">
                        <el-option v-for="(item, index) in form.productType" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开放等级" label-width="150px">
                    <el-select v-model="addForm.searchLevel" placeholder="开放等级" style="width: 200px" class="handle-select mr10">
                        <el-option v-for="(item, index) in form.searchLevel" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务属性" label-width="150px">
                    <el-select v-model="addForm.purchaseType" placeholder="业务属性" style="width: 200px" class="handle-select mr10">
                        <el-option v-for="(item, index) in form.purchaseType" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="共享目的" label-width="150px">
                    <el-input type="textarea" v-model="addForm.sharedPurpose"></el-input>
                </el-form-item>
                <el-form-item label="数据生产者名称" label-width="150px">
                    <el-input type="" v-model="addForm.dataProviderName"></el-input>
                </el-form-item>
                <el-form-item label="数据联系人信息" label-width="150px">
                    <el-input v-model="addForm.dataProviderContactInfo"></el-input>
                </el-form-item>
                <el-form-item label="产品说明文件存储路径" label-width="155px">
                    <el-input v-model="addForm.productIllustrationFileRoute"></el-input>
                </el-form-item>
                <el-form-item label="产品质量控制信息" label-width="150px">
                    <el-input v-model="addForm.productQualityControlInfo"></el-input>
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
            addForm: {
                productQualityControlInfo: '',
                productIllustrationFileRoute: '',
                dataProviderContactInfo: '',
                dataProviderName: '',
                sharedPurpose: '',
                purchaseType: ['业务属性一', '业务属性二', '业务属性三'],
                searchLevel: [1, 2, 3],
                productType: ['产品类型一', '产品类型二', '产品类型三'],
                satelliteName: ['卫星一', '卫星三', '卫星二']
            },
            editForm: {
                productQualityControlInfo: '',
                productIllustrationFileRoute: '',
                dataProviderContactInfo: '',
                dataProviderName: '',
                sharedPurpose: '',
                purchaseType: ['业务属性一', '业务属性二', '业务属性三'],
                searchLevel: [1, 2, 3],
                productType: ['产品类型一', '产品类型二', '产品类型三'],
                satelliteName: ['卫星一', '卫星三', '卫星二']
            },
            tableData: [],
            form: {
                id: '',
                productQualityControlInfo: '',
                productIllustrationFileRoute: '',
                dataProviderContactInfo: '',
                dataProviderName: '',
                sharedPurpose: '',
                purchaseType: ['类型一', '类型二'],
                searchLevel: ['类型一', '类型二'],
                productType: ['类型一', '类型二'],
                satelliteName: ['卫星一', '卫星二']
            },
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            pageTotal: 0,
            idx: -1,
            id: -1
        };
    },
    created() {
        // this.getData();
    },
    mounted() {
        this.$http
            .get(this.api.api + 'glyqxgl/queryBusinessProperty', {
                params: {
                    // satelliteName: this.form.satelliteName
                }
            })
            .then(result => {
                let resultArr = result.data.data.rows;
                let length = result.data.data.rows.length;
                for (let i = 0; i <= length - 1; i++) {
                    this.tableData.push(resultArr[i]);
                }
            })
            .catch(err => {
                console.log(err);
            });
    },

    methods: {
        delAllSelection() {},
        findAllSelection() {
            if (this.query.name != '') {
                this.$http
                    .get(this.api.api + 'glyqxgl/queryBusinessProperty', {
                        params: { roleName: this.query.name }
                    })
                    .then(result => {
                        console.log(result);
                        this.tableData = [];
                        this.tableData.push(result.data.data.rows[0]);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                this.$message({
                    type: 'info',
                    message: '请输入查询参数 !'
                });
            }
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
            this.$http
                .post(this.api.api + '/glyqxgl/saveBusinessProperty', {
                    params: {
                        id: this.addForm.id,
                        satelliteName: this.addForm.satelliteName,
                        productType: this.addForm.productType,
                        searchLevel: this.addForm.searchLevel,
                        purchaseType: this.addForm.purchaseType,
                        downloadLevel: this.addForm.downloadLevel,
                        dataProviderName: this.addForm.dataProviderName,
                        dataProviderContactInfo: this.addForm.dataProviderContactInfo,
                        productIllustrationFileRoute: this.addForm.productIllustrationFileRoute,
                        productQualityControlInfo: this.addForm.productQualityControlInfo
                    }
                })
                .then(result => {
                    console.log(result);
                    if (result.data.msg == 'OK') {
                        this.$message({
                            message: '新增数据默认属性成功 ！',
                            type: 'success'
                        });
                        this.tableData.push({
                            id: this.addForm.id,
                            satelliteName: this.addForm.satelliteName,
                            productType: this.addForm.productType,
                            searchLevel: this.addForm.searchLevel,
                            purchaseType: this.addForm.purchaseType,
                            downloadLevel: this.addForm.downloadLevel,
                            dataProviderName: this.addForm.dataProviderName,
                            dataProviderContactInfo: this.addForm.dataProviderContactInfo,
                            productIllustrationFileRoute: this.addForm.productIllustrationFileRoute,
                            productQualityControlInfo: this.addForm.productQualityControlInfo
                        });
                        this.addVisible = false;
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
            console.log(row);
            this.editForm = {
                productQualityControlInfo: row.productQualityControlInfo,
                productIllustrationFileRoute: row.productIllustrationFileRoute,
                dataProviderContactInfo: row.dataProviderContactInfo,
                dataProviderName: row.dataProviderName,
                sharedPurpose: row.downloadLevel,
                purchaseType: row.purchaseType,
                searchLevel: row.searchLevel,
                productType: row.productType,
                satelliteName: row.satelliteName
            };
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
