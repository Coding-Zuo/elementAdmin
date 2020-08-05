<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i>
                    权限管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>数据集合管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="addContent">新增集合</el-button>
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
                <el-input v-model="queryParams.dataSetName" placeholder="查询数据集合名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="queryList">搜索</el-button>
            </div>
            <el-table
                :data="ptableDate"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                :span-method="objectOneMethod"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="数据集合名称" align="center"></el-table-column>
                <el-table-column prop="content" label="集合内容" align="center"></el-table-column>
                <el-table-column label="操作" width="140" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            v-show="scope.row.id == '' ? false : true"
                            @click="handleEdit(scope.$index, scope.row)"
                        >
                            编辑
                        </el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            v-show="scope.row.id == '' ? false : true"
                            :visible.sync="scope.row.id === '' ? false : true"
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
                    :page-size="query.pageSize"
                    :current-page="query.pageIndex"
                    @current-change="handlePageChange"
                    :total="pageTotal"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="共享等级"><el-input v-model="query.name" style="width: 200px;"></el-input></el-form-item>
                <el-form-item label="卫星名称">
                    <el-input v-model="form.name" placeholder="请输入卫星名称" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="getSatelliteList">搜索</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
            <el-table
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="JHMC" label="新增数据集合名称" align="center"></el-table-column>
                <el-table-column prop="WXMC" label="已选卫星名称" align="center"></el-table-column>
                <el-table-column prop="CPLX" label="已选产品类型" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog title="添加" :visible.sync="addVisible" width="50%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="数据集合名称"><el-input v-model="form.name" style="width: 200px;"></el-input></el-form-item>
                <div class="data-content">
                    <el-col :span="12" class="data-left">
                        <el-row style="margin-bottom: 10px;"><div>卫星名称</div></el-row>
                        <el-row>
                            <el-col :span="15"><el-input v-model="query.name" placeholder="请输入卫星名称"></el-input></el-col>
                            <el-col :span="3" :offset="1">
                                <el-button type="primary" icon="el-icon-search" @click="getSatelliteList">搜索</el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-card class="box-card" shadow="hover" style="width: 90%; margin-top: 10px;">
                                <div
                                    v-for="o in satelliteList"
                                    :key="o"
                                    :class="['text item', select == o ? 'select' : '']"
                                    @click="selectItem(o)"
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
                                <span style="cursor: pointer; color: blue;">清空</span>
                            </div>
                            <div class="yesType">
                                <div class="item" v-for="(item, index) in productTyp" :key="index">{{ item }}</div>
                            </div>
                        </el-col>
                        <el-col :span="24">
                            <div class="type-title">
                                <span>未选择产品类型</span>
                                <span style="cursor: pointer; color: blue;">全选</span>
                            </div>
                            <div class="yesType">
                                <div class="item" v-for="(item, index) in productType" :key="index">{{ item }}</div>
                            </div>
                        </el-col>
                    </el-col>
                </div>
            </el-form>
            <el-row style="margin: 20px 0; dispaly: flex; justify-content: end; float: right;">
                <el-button @click="addHandle()">应用</el-button>
                <el-button
                    @click="
                        addVisible = false;
                        addHandle();
                    "
                    >确定</el-button
                >
                <el-button @click="addVisible = false">取消</el-button>
            </el-row>
            <el-table
                :data="NewAddData"
                border
                class="table"
                ref="multipleTable"
                v-model="ProductTypeQuery"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column prop="collectName" label="新增数据集合名称" align="center"></el-table-column>
                <el-table-column prop="selectSatelliteName" label="已选卫星名称" align="center"></el-table-column>
                <el-table-column prop="selectProductName" label="已选产品类型" align="center"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button>
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
            deleteDisabled: true,
            queryParams: { // 查询参数
                dataSetName: '',
                pageIndex: 1,
                pageSize: 10
            },
            ptableDate: [
                {
                    "id": 1 ,
                    "dataSetName": "数据集合2" ,
                    "satelliteName": "WX-1" ,
                    "productType": "产品一号1 产品类型2" ,
                    "lastModifiedTime": 1593339504500
                }, {
                    "id": 2 ,
                    "dataSetName": "数据集合1" ,
                    "satelliteName": "WX-2" ,
                    "productType": "产品一号1 产品类型2" ,
                    "lastModifiedTime": 1593339504600
                }
            ], // 表格数据
            multipleSelection: [], // 保存删除数据
            satelliteName: '', // 获取卫星列表参数 --> 卫星名称
            satelliteList: [], // 卫星列表
            productType: [], // 产品类型

            query: {},
            dataSetName: '', //用于接收参数用
            spanArr: [],
            select: '',
            NewAddData: [{ JHMC: '', WXMC: '', CPLX: '' }],
            productTyp: [],
            ProductTypeQuery: [],
            delList: [],
            editVisible: false, // 编辑
            addVisible: false, // 新增
            pageTotal: 100,
            form: [],
            idx: -1,
            id: -1
        };
    },
    created() {
        // this.getData();
        this.queryList()
    },
    methods: {
        // 数据集合列表查询
        queryList () {
            // this.$api.GLYQXGL.queryDataSet(this.queryParams).then(res => {
            //     if (res.code == 1) {
            //         this.ptableDate = res.data.rows
            //         this.pageTotal = res.data.Total


            //     } else {
            //         console.log(res)
            //     }
            // }).catch(err => {
            //     console.log(err)
            // })

            let rows = [
                {
                    "id": 1 ,
                    "dataSetName": "数据集合2" ,
                    "satelliteName": "WX-1" ,
                    "productType": "产品一号1 产品类型2" ,
                    "lastModifiedTime": 1593339504500
                }, {
                    "id": 2 ,
                    "dataSetName": "数据集合1" ,
                    "satelliteName": "WX-2" ,
                    "productType": "产品一号1 产品类型2" ,
                    "lastModifiedTime": 1593339504600
                }
            ]

            // for (var i = 0; i < )
        },
        // 多选操作
        handleSelectionChange(val) {
            this.deleteDisabled = val.length > 0 ? false : true
            this.multipleSelection = []

            for (let i = 0; i < val.length; i++) {
                this.multipleSelection.push(val[i].dataSetName)
            }
            // console.log(this.multipleSelection)
        },
        // 批量删除
        delAllSelection() {
            this.handleDelete(this.multipleSelection)
        },
        // 数据集合删除
        handleDelete(ids) {
            console.log(ids)
            var than = this;
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                // 执行删除操作,目前传入数据为[‘数据集合1’,’数据集合2’]形式
                than.$api.GLYQXGL.deleteDataSet(ids).then(res => {
                    if (res.code == 1) {
                        this.queryList()
                        than.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                    } else {
                        console.log(res)
                    }
                }).catch(err => {
                    console.log(err)
                })
            })
            .catch(() => {});
        },
        // 获取卫星列表
        getSatelliteList () {
            this.$api.GLYQXGL.querySatelliteName(this.satelliteName).then(res => {
                if (res.code == 1) {
                    this.satelliteList = res.data
                } else {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 产品类型查询
        getProductType () {
            this.$api.GLYQXGL.queryProductType().then(res => {
                if (res.code == 1) {
                    this.productType = res.data
                } else {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 点击新增按钮
        addContent() {
            this.getSatelliteList();
            this.getProductType();
            this.addVisible = true;
        },
        // 新增保存
        addHandle() {
            this.$http
                .post(this.api.api + 'glyqxgl/insertDataSet', {
                    params: {
                        list: [
                            {
                                dataSetName: this.form.name,
                                productType: this.productTyp,
                                satelliteName: this.query.name
                            }
                        ]
                    }
                })
                .then((result) => {
                    console.log(result);
                    if (result.data.msg == 'OK') {
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                    }
                    //    this.satelliteList=
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        // 编辑操作
        handleEdit(index, row) {
            console.log(row);
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$http
                .get(this.api.api + 'glyqxgl/updateDataSet', {
                    params: {
                        dataSetName: this.form.name,
                        productType: this.productTyp,
                        satelliteName: this.query.name
                    }
                })
                .then((result) => {
                    if (result.data.msg == 'OK') {
                        let length = result.data.data.rows.length;
                        let resultArr = result.data.data.rows;
                        for (let i = 1; i <= length + 1, i++; ) {
                            this.ptableDate.push({
                                id: resultArr[i - 1].id,
                                name: resultArr[i - 1].satelliteName,
                                content: resultArr[i - 1].productType
                            });
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航查询
        handlePageChange(val) {
            console.log(pageIndex)
            this.queryParams.pageIndex = pageIndex;
            this.queryList()
        },
        
        //选中列表
        selectItem(o) {
            this.select = o;
        },
        objectOneMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                const _row = this.setTable(this.ptableDate).one[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                };
            }
            if (columnIndex === 1) {
                const _row = this.setTable(this.ptableDate).two[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                };
            }
            if (columnIndex === 2) {
                const _row = this.setTable(this.ptableDate).two[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                };
            }
            if (columnIndex === 4) {
                const _row = this.setTable(this.ptableDate).two[rowIndex];
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
                    if (item.id === tableData[index - 1].id) {
                        //第一列需合并相同内容的判断条件
                        spanOneArr[concatOne] += 1;
                        spanOneArr.push(0);
                    } else {
                        spanOneArr.push(1);
                        concatOne = index;
                    }

                    if (item.name === tableData[index - 1].name) {
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
    },
    mounted() {
        //
        this.$http
            .get(this.api.api + 'glyqxgl/queryDataSet', {
                params: {
                    dataSetName: this.dataSetName
                }
            })
            .then((result) => {
                if (result.data.msg == 'OK') {
                    let length = result.data.data.rows.length;
                    let resultArr = result.data.data.rows;
                    for (let i = 0; i <= length; i++) {
                        this.ptableDate.push({
                            id: resultArr[i].id,
                            name: resultArr[i].satelliteName,
                            content: resultArr[i].productType
                        });
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
    padding: 10px 0;
}

.select {
    background: gray;
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
}
</style>
