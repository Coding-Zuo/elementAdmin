<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>数据默认业务属性管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 列表 -->
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="handleAdd">添加 </el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" :disabled="deleteDisabled" @click="delAllSelection">批量删除</el-button>
                <el-input @keyup.enter.native="queryList" v-model="queryParams.satelliteName" placeholder="请输入待查询卫星名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" class="handle-del mr10" @click="queryList ">查询</el-button>
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
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete([scope.row.id])"
                            >删除
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
                    :total="pageTotal"
                ></el-pagination>
                <!-- :total="pageTotal" -->
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="dialogTitle ? '新增数据默认业务属性' : '编辑数据默认业务属性'" :visible.sync="visible" width="50%">
            <el-form ref="sjmrywsxform" :model="businessPropertyForm" label-width="70px">
                <!-- 此处id默认占位 -->
                <el-form-item label="id" prop="id" style="display:none;">
                    <el-input type="textarea" v-model="businessPropertyForm.id"></el-input>
                </el-form-item>
                <el-form-item label="卫星名称" label-width="150px" prop="satelliteName">
                    <el-select v-model="businessPropertyForm.satelliteName" placeholder="卫星名称" style="width: 200px;" class="handle-select mr10">
                        <el-option v-for="(item, index) in wxOptions" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品类型" label-width="150px" prop="productType">
                    <el-select v-model="businessPropertyForm.productType" placeholder="产品类型" style="width: 200px;" class="handle-select mr10">
                        <el-option v-for="(item, index) in cplxOptions" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开放等级" label-width="150px" prop="searchLevel">
                    <el-select v-model="businessPropertyForm.searchLevel" placeholder="开放等级" style="width: 200px;" class="handle-select mr10">
                        <el-option v-for="(item, index) in kfdjOptions" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务属性" label-width="150px" prop="purchaseType">
                    <el-select v-model="businessPropertyForm.purchaseType" placeholder="业务属性" style="width: 200px;" class="handle-select mr10">
                        <el-option v-for="(item, index) in ywsxOptions" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="共享目的" label-width="150px" prop="sharedPurpose">
                    <el-input type="textarea" v-model="businessPropertyForm.sharedPurpose"></el-input>
                </el-form-item>
                <el-form-item label="数据生产者名称" label-width="150px" prop="dataProviderName">
                    <el-input type="textarea" v-model="businessPropertyForm.dataProviderName"></el-input>
                </el-form-item>
                <el-form-item label="数据联系人信息" label-width="150px" prop="dataProviderContactInfo">
                    <el-input v-model="businessPropertyForm.dataProviderContactInfo"></el-input>
                </el-form-item>
                <el-form-item label="产品说明文件存储路径" label-width="155px" prop="productIllustrationFileRoute">
                    <el-input v-model="businessPropertyForm.productIllustrationFileRoute"></el-input>
                </el-form-item>
                <el-form-item label="产品质量控制信息" label-width="150px" prop="productQualityControlInfo">
                    <el-input v-model="businessPropertyForm.productQualityControlInfo"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="submitFrom">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'basetable',
    data() {
        return {
            // 查询参数
            queryParams: {
                satelliteName: null,
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [
                {
                    "id": 1 ,
                    "satelliteName": "WX-1" ,
                    "productType": "产品一号" ,
                    "searchLevel": "6" ,
                    "searchLevelName": "开放等级5" ,
                    "purchaseType": "1" ,
                    "purchaseTypeName": "业务属性7" ,
                    "downloadLevel": "2" ,
                    "downloadLevelName": "共享级别1" ,
                    "dataProviderName": "zhansan" ,
                    "dataProviderContactInfo": "lianxiren" ,
                    "productIllustrationFileRoute": "cunchulujing" ,
                    "productQualityControlInfo": "zhiliangxinxi" ,
                    "lastModifiedTime": 1593338594600
                }, {
                    "id": 2 ,
                    "satelliteName": "WX-1" ,
                    "productType": "产品一号" ,
                    "searchLevel": "6" ,
                    "searchLevelName": "开放等级5" ,
                    "purchaseType": "1" ,
                    "purchaseTypeName": "业务属性7" ,
                    "downloadLevel": "2" ,
                    "downloadLevelName": "共享级别1" ,
                    "dataProviderName": 'cgscabcxcbuhgusda' ,
                    "dataProviderContactInfo": 'cgscabcxcbuhgusda' ,
                    "productIllustrationFileRoute": 'cgscabcxcbuhgusda' ,
                    "productQualityControlInfo": 'cgscabcxcbuhgusda' ,
                    "lastModifiedTime": 1593338594600
                }
            ], // 表格数据
            dialogTitle: true, // true 新增，false 修改
            businessPropertyForm: { // 业务属性数据
                id: '',
                satelliteName: '' ,
                productType: '',
                searchLevel: '',
                purchaseType: '',
                downloadLevel: '',
                dataProviderName: '',
                dataProviderContactInfo: '',
                productIllustrationFileRoute: '',
                productQualityControlInfo: ''
            },
            multipleSelection: [], // 保存选中数据
            wxOptions: [], // 卫星列表
            cplxOptions: [], // 产品类型
            kfdjOptions: [], // 开放等级
            ywsxOptions: [], // 业务属性
            visible: false,
            pageTotal: 100,
            deleteDisabled: true // 批量删除是否禁用
        };
    },
    created() {
        this.getAllDict()
        this.queryList()
    },
    methods: {
        // 获取所有页面需要的下拉框选项
        getAllDict () {
            // 卫星列表
            // 产品类型
            // 开放等级
            // 业务属性
        },
        // 数据默认业务属性查询
        queryList () {
            this.$api.GLYQXGL.queryBusinessProperty(this.queryParams).then(res => {
                if (res.code == 1) {
                    this.tableData = res.data.rows
                } else {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 分页查询
        handlePageChange(pageIndex) {
            console.log(pageIndex)
            this.queryParams.pageIndex = pageIndex;
            this.queryList()
        },
        // 新增按钮
        handleAdd () {
            this.dialogTitle = true
            this.visible = true
            this.$nextTick(() => {
                this.$refs['sjmrywsxform'].resetFields();
            })
        },
        // 编辑按钮
        handleEdit (index, row) {
            this.dialogTitle = false
            this.visible = true
            // 此处对对象进行浅拷贝，防止修改直接修改源对象
            this.businessPropertyForm = Object.assign({}, row)
        },
        // 新增或者编辑提交
        submitFrom () {
            console.log(this.businessPropertyForm)
            this.$api.GLYQXGL.saveBusinessProperty(this.businessPropertyForm).then(res => {
                if (res.code == 1) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.queryList()
                    this.visible = false
                } else {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 多选操作
        handleSelectionChange(val) {
            this.deleteDisabled = val.length > 0 ? false : true
            this.multipleSelection = []

            for (let i = 0; i < val.length; i++) {
                this.multipleSelection.push(val[i].id)
            }
            // console.log(this.multipleSelection)
        },
        // 批量删除
        delAllSelection() {
            this.handleDelete(this.multipleSelection)
        },
        // 删除操作
        handleDelete(ids) {
            var than = this;
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                // 执行删除操作,目前传入数据为[1,2,3]形式
                console.log(ids)
            })
            .catch(() => {});
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
