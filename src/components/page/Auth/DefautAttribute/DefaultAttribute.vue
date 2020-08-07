<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>数据默认业务属性管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 列表展示 -->
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="handleAdd">添加 </el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" :disabled="deleteDisabled" @click="delAllSelection"
                    >批量删除</el-button
                >
                <el-input
                    @keyup.enter.native="queryList"
                    v-model="queryParams.satelliteName"
                    placeholder="请输入待查询卫星名称"
                    class="handle-input mr10"
                ></el-input>
                <el-button type="primary" icon="el-icon-search" class="handle-del mr10" @click="queryList">查询</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" min-width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" min-width="55" align="center"></el-table-column>
                <el-table-column prop="satelliteName" label="卫星名称" min-width="120" align="center"></el-table-column>
                <el-table-column prop="productType" label="产品类型" min-width="120" align="center"></el-table-column>
                <el-table-column prop="searchLevelName" label="开放等级" min-width="100" align="center"> </el-table-column>
                <el-table-column prop="purchaseTypeName" label="业务属性" min-width="120" align="center"> </el-table-column>
                <el-table-column prop="downloadLevelName" label="共享级别" min-width="100" align="center"> </el-table-column>
                <el-table-column prop="dataProviderName" label="数据生产者名称" min-width="180" align="center"> </el-table-column>
                <el-table-column prop="dataProviderContactInfo" label="数据联系人信息" min-width="180" align="center"> </el-table-column>
                <el-table-column
                    prop="productIllustrationFileRoute"
                    label="产品说明文件存储路径"
                    min-width="180"
                    align="center"
                ></el-table-column>
                <el-table-column prop="productQualityControlInfo" label="产品质量信息" min-width="180" align="center"> </el-table-column>
                <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑 </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete([scope.row.id])">删除</el-button>
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
                <el-form-item label="id" prop="id" style="display: none;">
                    <el-input type="textarea" v-model="businessPropertyForm.id"></el-input>
                </el-form-item>
                <el-form-item label="卫星名称" label-width="150px" prop="satelliteName">
                    <el-select
                        v-model="businessPropertyForm.satelliteName"
                        placeholder="卫星名称"
                        style="width: 200px;"
                        class="handle-select mr10"
                    >
                        <el-option v-for="(item, index) in wxOptions" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品类型" label-width="150px" prop="productType">
                    <el-select
                        v-model="businessPropertyForm.productType"
                        placeholder="产品类型"
                        style="width: 200px;"
                        class="handle-select mr10"
                    >
                        <el-option v-for="(item, index) in cplxOptions" :key="index" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开放等级" label-width="150px" prop="searchLevel">
                    <el-select
                        v-model="businessPropertyForm.searchLevel"
                        placeholder="开放等级"
                        style="width: 200px;"
                        class="handle-select mr10"
                    >
                        <el-option v-for="(item, index) in kfdjOptions" :key="index" :label="item.searchLevel" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务属性" label-width="150px" prop="purchaseType">
                    <el-select
                        v-model="businessPropertyForm.purchaseType"
                        placeholder="业务属性"
                        style="width: 200px;"
                        class="handle-select mr10"
                    >
                        <el-option
                            v-for="(item, index) in ywsxOptions"
                            :key="index"
                            :label="item.purchaseType"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="共享级别" label-width="150px" prop="downloadLevel">
                    <el-select
                        v-model="businessPropertyForm.downloadLevel"
                        placeholder="共享级别"
                        style="width: 200px;"
                        class="handle-select mr10"
                    >
                        <el-option
                            v-for="(item, index) in gxjbOptions"
                            :key="index"
                            :label="item.downloadLevel"
                            :value="item.id"
                        ></el-option>
                    </el-select>
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
                // {
                //     "id": 1 ,
                //     "satelliteName": "WX-1" ,
                //     "productType": "产品一号" ,
                //     "searchLevel": "6" ,
                //     "searchLevelName": "开放等级5" ,
                //     "purchaseType": "1" ,
                //     "purchaseTypeName": "业务属性7" ,
                //     "downloadLevel": "2" ,
                //     "downloadLevelName": "共享级别1" ,
                //     "dataProviderName": "zhansan" ,
                //     "dataProviderContactInfo": "lianxiren" ,
                //     "productIllustrationFileRoute": "cunchulujing" ,
                //     "productQualityControlInfo": "zhiliangxinxi" ,
                //     "lastModifiedTime": 1593338594600
                // }
            ], // 表格数据
            dialogTitle: true, // true 新增，false 修改
            businessPropertyForm: {
                // 业务属性数据
                id: '',
                satelliteName: '', // 卫星名称编号
                productType: '', // 产品类型编号
                searchLevel: '', // 开放等级编号
                purchaseType: '', // 业务属性编号
                downloadLevel: '', // 共享级别编号
                dataProviderName: '', // 数据生产者名称
                dataProviderContactInfo: '', // 数据联系人信息
                productIllustrationFileRoute: '', // 产品说明文件存储路径
                productQualityControlInfo: '' // 产品质量控制信息
            },
            multipleSelection: [], // 保存选中数据
            wxOptions: [], // 卫星列表选项
            cplxOptions: [], // 产品类型选项
            kfdjOptions: [], // 开放等级选项
            ywsxOptions: [], // 业务属性选项
            gxjbOptions: [], // 共享级别选项
            visible: false,
            pageTotal: 100,
            deleteDisabled: true // 批量删除是否禁用
        };
    },
    created() {
        this.queryList();
        this.getAllDict();
    },
    methods: {
        // 获取所有页面需要的下拉框选项
        getAllDict() {
            // 卫星列表
            this.$api.GLYQXGL.querySatelliteName()
                .then((res) => {
                    if (res.code == 1) {
                        this.wxOptions = res.data;
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

            // 产品类型
            this.$api.GLYQXGL.queryProductType()
                .then((res) => {
                    if (res.code == 1) {
                        this.cplxOptions = res.data;
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

            // 开放等级
            this.$api.GLYQXGL.querySearchLevel()
                .then((res) => {
                    if (res.code == 1) {
                        this.kfdjOptions = res.data.rows;
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

            // 业务属性
            this.$api.GLYQXGL.queryPurchaseType()
                .then((res) => {
                    if (res.code == 1) {
                        this.ywsxOptions = res.data.rows;
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

            // 共享级别
            this.$api.GLYQXGL.queryShareLevel()
                .then((res) => {
                    console.log(res);
                    if (res.code == 1) {
                        let arr = res.data.rows;
                        let length = arr.length;
                        for (let i = 0; i < length; i++) {
                            this.gxjbOptions.push(arr[i]);
                        }
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 数据默认业务属性查询
        queryList() {
            this.$api.GLYQXGL.queryBusinessProperty(this.queryParams)
                .then((res) => {
                    if (res.code == 1) {
                        this.tableData = res.data.rows;
                        this.pageTotal = res.data.Total;
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 分页查询
        handlePageChange(pageIndex) {
            console.log(pageIndex);
            this.queryParams.pageIndex = pageIndex;
            this.queryList();
        },
        // 新增按钮
        handleAdd() {
            this.dialogTitle = true;
            this.visible = true;
            // 重置表单项，id为空
            // this.$nextTick(() => {
            //     this.$refs['sjmrywsxform'].resetFields();
            // })
            for (let key in this.businessPropertyForm) {
                this.businessPropertyForm[key] = '';
            }
        },
        // 编辑按钮
        handleEdit(index, row) {
            this.dialogTitle = false;
            this.visible = true;
            for (let key in this.businessPropertyForm) {
                this.businessPropertyForm[key] = row[key];
            }
            // 如果表单中的项跟每条数据的项一致，可以采用此方法浅拷贝，防止修改直接修改源对象
            // this.businessPropertyForm = Object.assign({}, row)
        },
        // 新增或者编辑提交
        submitFrom() {
            console.log(this.businessPropertyForm);
            this.$api.GLYQXGL.saveBusinessProperty(this.businessPropertyForm)
                .then((res) => {
                    if (res.code == 1) {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                        this.queryList();
                        this.visible = false;
                    } else {
                        console.log(res);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 多选操作
        handleSelectionChange(val) {
            this.deleteDisabled = val.length > 0 ? false : true;
            this.multipleSelection = [];

            for (let i = 0; i < val.length; i++) {
                this.multipleSelection.push(val[i].id);
            }
            // console.log(this.multipleSelection)
        },
        // 批量删除
        delAllSelection() {
            this.handleDelete(this.multipleSelection);
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
                    console.log(ids);
                    than.$api.GLYQXGL.deleteBusinessProperty(ids)
                        .then((res) => {
                            if (res.code == 1) {
                                than.queryList();
                                than.$message({
                                    message: res.msg,
                                    type: 'success'
                                });
                            } else {
                                console.log(res);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
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
