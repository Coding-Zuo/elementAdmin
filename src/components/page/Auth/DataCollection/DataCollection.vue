<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i>
                    管理员权限管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>数据集合管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 表格展示 -->
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="addContent">新增集合</el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" :disabled="delDisabled" @click="delAllSelection"
                    >批量删除</el-button
                >
                <el-input
                    v-model="queryParams.dataSetName"
                    placeholder="查询数据集合名称"
                    @keyup.enter.native="queryList"
                    class="handle-input mr10"
                ></el-input>
                <el-button type="primary" icon="el-icon-search" @click="queryList">搜索</el-button>
            </div>
            <el-table
                :data="ptableData"
                border
                class="table table-check"
                ref="multipleTable"
                header-cell-class-name="table-header"
                :span-method="objectOneMethod"
                @selection-change="handleSelectionChange"
            >
                <!-- <el-table-column type="selection" width="55" align="center">
                    <template slot="header" slot-scope="scope">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
                    </template>
                    <template slot-scope="scope">
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox :label="scope.row.dataSetName" :key="scope.row.dataSetName"></el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-table-column> -->
                <el-table-column width="55" align="center">
                    <template slot="header" slot-scope="scope">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
                    </template>
                    <template slot-scope="scope">
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox :label="scope.row.dataSetName" :key="scope.row.dataSetName"></el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="dataSetName" label="数据集合名称" align="center"></el-table-column>
                <el-table-column prop="productType" label="集合内容" align="center"></el-table-column>
                <el-table-column label="操作" width="140" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            v-show="scope.row.id == '' ? false : true"
                            @click="handleEdit(scope.$index, scope.row.dataSetName)"
                        >
                            编辑
                        </el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            v-show="scope.row.id == '' ? false : true"
                            @click="handleDelete([scope.row.dataSetName])"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :page-size="queryParams.pageSize"
                    :current-page="queryParams.pageIndex"
                    @current-change="handlePageChange"
                    :total="pageTotal"
                ></el-pagination>
            </div>
        </div>

        <!-- 添加、编辑弹出框 -->
        <el-dialog
            v-dialogDrag
            :close-on-click-modal="false"
            :title="addOrEditTitle ? '新增数据集合' : '编辑数据集合'"
            :visible.sync="addOrEditVisible"
            width="70%"
        >
            <el-form ref="form" label-width="100px">
                <el-form-item label="数据集合名称"><el-input v-model="dataSetName" style="width: 200px;"></el-input></el-form-item>
                <div class="data-content">
                    <el-col :span="12" class="data-left">
                        <el-row style="margin-bottom: 10px;"><div>卫星名称</div></el-row>
                        <el-row>
                            <el-col :span="15"><el-input v-model="satelliteName" placeholder="请输入卫星名称"></el-input></el-col>
                            <el-col :span="3" :offset="1">
                                <el-button type="primary" icon="el-icon-search" @click="getSatelliteList">搜索</el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-card class="box-card" shadow="hover" style="width: 90%; margin-top: 10px;">
                                <div
                                    v-for="o in satelliteList"
                                    :key="o"
                                    :class="['text item', selectRow == o ? 'select' : '']"
                                    @click="handleCkeckedData(o)"
                                >
                                    {{ o }}
                                </div>
                            </el-card>
                        </el-row>
                    </el-col>
                    <el-col :span="12" class="data-right">
                        <el-col :span="24">
                            <div class="type-title">
                                <span>已选择产品类型</span>
                                <el-button type="text" @click="claerAll">清空</el-button>
                            </div>
                            <div class="yesType">
                                <div
                                    class="item"
                                    @click="handleProduct(index)"
                                    v-for="(item, index) in ckeckedProduct.selected"
                                    :key="index"
                                >
                                    {{ item }}
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="24">
                            <div class="type-title">
                                <span>未选择产品类型</span>
                                <el-button type="text" @click="checkedAll">全选</el-button>
                            </div>
                            <div class="yesType">
                                <div
                                    class="item"
                                    @click="handleUnProduct(index)"
                                    v-for="(item, index) in ckeckedProduct.unselected"
                                    :key="index"
                                >
                                    {{ item }}
                                </div>
                            </div>
                        </el-col>
                    </el-col>
                </div>
            </el-form>
            <el-row style="margin: 20px 0; dispaly: flex; justify-content: end; float: right;">
                <el-button @click="submitSave()" type="primary" :disabled="newAddData.length <= 0">确定</el-button>
                <el-button @click="addOrEditVisible = false">取消</el-button>
            </el-row>
            <el-table
                :data="newAddData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="dataSetName" label="新增数据集合名称" align="center"></el-table-column>
                <el-table-column prop="satelliteName" label="已选卫星名称" align="center"></el-table-column>
                <el-table-column prop="productType" label="已选产品类型" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.productType.join(' ') }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="handleDeleteChecked(scope.$index, scope.row)" plain>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'basetable',
    data() {
        return {
            // 复选框
            checkAll: false,
            checkedCities: [],
            isIndeterminate: true,
            // ------------------ 查询、删除---------------------
            queryParams: {
                // 查询参数
                dataSetName: '',
                pageIndex: 1,
                pageSize: 10
            },
            ptableData: [], // 表格数据
            multipleSelection: [], // 保存删除数据
            delDisabled: true, // 批量删除按钮状态
            // ---------------------- 新增、编辑 ------------------
            satelliteName: '', // 获取卫星列表参数 --> 卫星名称
            satelliteList: ['WX-2', 'WX-1', 'WX-3', 'WX-4', 'WX-5', 'WX-6'], // 卫星列表
            productType: [], // 产品类型
            jiuDataSetName: '', // 修改的时候存的旧数据集合名称
            dataSetName: '', // 接受数据集合名称，添加表单项
            selectRow: '', // 当前选中行
            newAddData: [], // 存放新增数据项
            ckeckedProduct: {
                // 产品类型选择
                selected: [],
                unselected: []
            },
            addOrEditTitle: true, // 弹窗标题，true 新增、 false 编辑
            addOrEditVisible: false, // 新增、编辑弹窗
            pageTotal: 100
        };
    },
    created() {
        this.queryList();
        this.getProductType();
        this.getSatelliteList();
    },
    watch: {
        // 集合名称改变，对应改变选中项中的集合名称
        dataSetName(val) {
            this.newAddData.forEach((v) => {
                v.dataSetName = val;
            });
        }
    },
    methods: {
        // 选择某一项
        handleCheckedCitiesChange(val) {
            // console.log(val);
            let checkedCount = val.length;
            // 数组去重
            let dataSetNames = [];
            this.ptableData.forEach((v) => {
                dataSetNames.push(v.dataSetName);
            });
            let num = Array.from(new Set(dataSetNames)).length;

            this.checkAll = checkedCount === num;
            this.isIndeterminate = checkedCount > 0 && checkedCount < num.length;
            this.multipleSelection = val;
            this.delDisabled = this.multipleSelection.length > 0 ? false : true;
        },
        // 全选
        handleCheckAllChange(status) {
            this.checkedCities = [];
            this.ptableData.forEach((item) => {
                item.checked = !status;
            });
            let dataSetNames = [];
            if (status) {
                this.ptableData.forEach((v) => {
                    dataSetNames.push(v.dataSetName);
                });
                this.checkedCities = Array.from(new Set(dataSetNames));
                this.isIndeterminate = false;
            } else {
                this.checkedCities = [];
                this.isIndeterminate = true;
            }

            this.multipleSelection = this.checkedCities;
            this.delDisabled = this.multipleSelection.length > 0 ? false : true;
            console.log(this.checkedCities);
        },
        // ========================= 查询和删除 ==============================
        // 数据集合列表查询
        queryList() {
            this.$api.GLYQXGL.queryDataSet(this.queryParams).then((res) => {
                this.qxResultHandle(res, () => {
                    this.ptableData = res.data.rows;
                    this.ptableData.forEach((item) => {
                        item.checkedName = dataSetName;
                    });
                    this.pageTotal = res.data.Total;
                    this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                });
            });
        },
        // 分页导航查询
        handlePageChange(val) {
            console.log(val);
            this.queryParams.pageIndex = val;
            this.queryList();
        },
        // 多选操作
        handleSelectionChange(val) {
            this.delDisabled = val.length > 0 ? false : true;
            this.multipleSelection = [];

            for (let i = 0; i < val.length; i++) {
                this.multipleSelection.push(val[i].dataSetName);
            }
            // console.log(this.multipleSelection)
        },
        // 批量删除
        delAllSelection() {
            this.handleDelete(this.multipleSelection);
        },
        // 数据集合删除
        handleDelete(ids) {
            console.log(ids);
            var than = this;
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    // 执行删除操作,目前传入数据为[‘数据集合1’,’数据集合2’]形式
                    than.$api.GLYQXGL.deleteDataSet(ids).then((res) => {
                        this.qxResultHandle(res, () => {
                            this.queryList();
                            than.$message({
                                message: res.data.msg,
                                type: 'success'
                            });
                        });
                    });
                })
                .catch(() => {});
        },
        // =============================== 获取卫星和产品类型 ===============================
        // 获取卫星列表
        getSatelliteList() {
            this.$api.GLYQXGL.querySatelliteName(this.satelliteName).then((res) => {
                this.qxResultHandle(res, () => {
                    this.satelliteList = res.data;
                });
            });
        },
        // 产品类型查询
        getProductType() {
            this.$api.GLYQXGL.queryProductType().then((res) => {
                this.qxResultHandle(res, () => {
                    this.productType = res.data;
                });
            });
        },
        // ===================================== 编辑、新增操作 ===========================
        // 编辑操作
        handleEdit(index, dataSetName) {
            this.getSatelliteList();
            this.getProductType();
            console.log(dataSetName);
            this.addOrEditVisible = true;
            this.addOrEditTitle = false;
            // 获取同一个数据集合下面的所有卫星
            this.newAddData = [];
            this.jiuDataSetName = dataSetName;
            this.dataSetName = dataSetName;
            this.ptableData.forEach((v) => {
                if (dataSetName == v.dataSetName) {
                    console.log(v.productType);
                    this.newAddData.push({
                        dataSetName: v.dataSetName,
                        productType: v.productType.split(','),
                        satelliteName: v.satelliteName
                    });
                }
            });
            this.selectOne();
        },
        // 点击新增按钮
        addContent() {
            this.getSatelliteList();
            this.getProductType();
            this.addOrEditVisible = true;
            this.addOrEditTitle = true;
            this.newAddData = [];
            this.selectRow = '';
            this.dataSetName = '';
            this.ckeckedProduct = {
                // 产品类型选择
                selected: [],
                unselected: []
            };
        },
        // 点击卫星选中卫星列表中单个卫星，操作生成选中数据集合表
        handleCkeckedData(o) {
            this.selectRow = o;
            if (!this.dataSetName) {
                this.$message({
                    message: '数据集合名称不能为空！',
                    type: 'warning'
                });
                return false;
            }

            // 初始化未选产品和已选产品
            this.ckeckedProduct.unselected = [];
            for (var i = 0; i < this.productType.length; i++) {
                this.ckeckedProduct.unselected.push(this.productType[i]);
            }
            this.ckeckedProduct.selected = [];

            // 将卫星名存到表中
            if (this.newAddData.length === 0) {
                this.newAddData.push({
                    dataSetName: this.dataSetName,
                    productType: [],
                    satelliteName: o
                });
            } else {
                // 如果已经添加了，则返回，否则继续创建数据
                for (var i = 0; i < this.newAddData.length; i++) {
                    if (this.newAddData[i].satelliteName == o) {
                        // 将当前卫星的选中项传送到已选区域
                        this.ckeckedProduct.selected = this.newAddData[i].productType;
                        // 删除两数组中相同元素
                        this.ckeckedProduct.unselected = this.ckeckedProduct.unselected.filter((item) => {
                            return this.newAddData[i].productType.indexOf(item) == -1;
                        });
                        // 将未选区域中的卫星删除
                        return false;
                    }
                }
                this.newAddData.push({
                    dataSetName: this.dataSetName,
                    productType: [],
                    satelliteName: o
                });
            }
            // console.log(this.newAddData)
        },
        // 点击产品，将产品添加到对应卫星的数据集合中
        handleUnProduct(index) {
            // console.log(this.ckeckedProduct.selected)
            this.ckeckedProduct.selected.push(this.ckeckedProduct.unselected[index]);
            // 去重
            // this.ckeckedProduct.selected = [...new Set(this.ckeckedProduct.selected)]
            this.ckeckedProduct.unselected.splice(index, 1);

            if (this.newAddData.length > 0) {
                // 找到表中已有的卫星，将产品添加进去
                this.newAddData.forEach((v) => {
                    if (v.satelliteName == this.selectRow) {
                        v.productType = this.ckeckedProduct.selected;
                        return false;
                    }
                });
            } else {
                this.$message({
                    message: '请选择卫星！',
                    type: 'waring'
                });
            }
        },
        // 点击产品，将已选产品撤销，放到未选产品中
        handleProduct(index) {
            this.ckeckedProduct.unselected.push(this.ckeckedProduct.selected[index]);
            this.ckeckedProduct.selected.splice(index, 1);
        },
        // 删除不需要的一条数据
        handleDeleteChecked(index, row) {
            // 删除当前项
            this.newAddData.splice(index, 1);
            // 如果删除的这一项等于当前选中的这一项，则跳转到第一项
            if (row.satelliteName == this.selectRow) {
                this.selectOne();
            }
        },
        // 全选
        checkedAll() {
            // 找到当前选中的卫星，讲所有产品插入
            this.newAddData.forEach((v) => {
                if (v.satelliteName == this.selectRow) {
                    v.productType = this.ckeckedProduct.selected.concat(this.ckeckedProduct.unselected);
                    this.ckeckedProduct.selected = v.productType;
                    this.ckeckedProduct.unselected = [];
                    return false;
                }
            });
        },
        // 清空
        claerAll() {
            this.newAddData.forEach((v) => {
                if (v.satelliteName == this.selectRow) {
                    this.ckeckedProduct.unselected = this.ckeckedProduct.selected.concat(this.ckeckedProduct.unselected);
                    v.productType = [];
                    this.ckeckedProduct.selected = [];
                    return false;
                }
            });
        },
        // 如果删除，或者刚进入，默认选中表格中第一项，如果表格中没有数据则清空已选和未选和当前选中卫星
        selectOne() {
            if (this.newAddData.length > 0) {
                this.selectRow = this.newAddData[0].satelliteName;
                this.ckeckedProduct.selected = this.newAddData[0].productType;
                this.ckeckedProduct.unselected = this.productType.filter((item) => {
                    return this.newAddData[0].productType.indexOf(item) == -1;
                });
            } else {
                this.selectRow = '';
                this.ckeckedProduct.selected = [];
                this.ckeckedProduct.unselected = [];
            }
        },
        // 编辑、新增提交保存
        submitSave() {
            let list = [];

            // 新增
            if (this.addOrEditTitle) {
                this.newAddData.forEach((v) => {
                    list.push({
                        ...v,
                        productType: v.productType.join(' ')
                    });
                });

                this.$api.GLYQXGL.insertDataSet({ list }).then((res) => {
                    this.qxResultHandle(res, () => {
                        this.queryList();
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                        this.addOrEditVisible = false;
                    });
                });
            }

            // 编辑
            if (!this.addOrEditTitle) {
                // 将旧的数据集合名称带上
                this.newAddData.forEach((v) => {
                    list.push({
                        ...v,
                        dataSetName: this.jiuDataSetName + ',' + v.dataSetName,
                        productType: v.productType.join(' ')
                    });
                });
                this.$api.GLYQXGL.updateDataSet({ list }).then((res) => {
                    this.qxResultHandle(res, () => {
                        this.queryList();
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                        this.addOrEditVisible = false;
                    });
                });
            }
        },
        // =================================== 表格合并操作 ============================
        objectOneMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                const _row = this.setTable(this.ptableData).two[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                };
            }
            if (columnIndex === 1) {
                const _row = this.setTable(this.ptableData).two[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                };
            }
            if (columnIndex === 2) {
                const _row = this.setTable(this.ptableData).two[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                };
            }
            // if (columnIndex === 3) {
            //     const _row = this.setTable(this.ptableData).two[rowIndex];
            //     const _col = _row > 0 ? 1 : 0;
            //     return {
            //         rowspan: _row,
            //         colspan: _col
            //     };
            // }
            if (columnIndex === 4) {
                const _row = this.setTable(this.ptableData).two[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                };
            }
        },
        setTable(tableData) {
            let spanOneArr = [],
                spanTwoArr = [],
                concatOne = 0,
                concatTwo = 0;
            tableData.forEach((item, index) => {
                if (index === 0) {
                    spanOneArr.push(1);
                    spanTwoArr.push(1);
                } else {
                    if (item.checkedName === tableData[index - 1].checkedName) {
                        //第一列需合并相同内容的判断条件
                        spanOneArr[concatOne] += 1;
                        spanOneArr.push(0);
                    } else {
                        spanOneArr.push(1);
                        concatOne = index;
                    }

                    if (item.id === tableData[index - 1].id) {
                        //第一列需合并相同内容的判断条件
                        spanOneArr[concatOne] += 1;
                        spanOneArr.push(0);
                    } else {
                        spanOneArr.push(1);
                        concatOne = index;
                    }

                    if (item.dataSetName === tableData[index - 1].dataSetName) {
                        //第二列和需合并相同内容的判断条件
                        spanTwoArr[concatTwo] += 1;
                        spanTwoArr.push(0);
                    } else {
                        spanTwoArr.push(1);
                        concatTwo = index;
                    }
                }
            });
            return {
                one: spanOneArr,
                two: spanTwoArr
            };
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

.data-content {
    border: 1px solid gray;
    padding: 20px;
    overflow: auto;
    display: flex;
}

.text {
    border-radius: 5px;
    padding: 0.5em;
    cursor: pointer;
}

.select {
    background: rgb(206, 204, 204);
}

.data-left {
    border-right: 1px solid gray;
}

.data-right {
    margin-left: 10px;
    border-left: 1px solid gray;
    padding: 0 20px;
}

.type-title {
    display: flex;
    justify-content: space-between;
    padding: 10px;
}

.yesType {
    border: 1px solid #eee;
    height: 100px;
    overflow: auto;
    display: flex;
    flex-wrap: warp;
}

.yesType .item {
    width: 35%;
    height: 30px;
    background: #eee;
    margin-left: 5px;
    margin-top: 10px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
}
.table-check /deep/ .el-checkbox__label {
    display: none;
}
</style>
