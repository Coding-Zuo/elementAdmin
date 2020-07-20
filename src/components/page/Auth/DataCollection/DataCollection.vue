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
                <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">
                    批量删除
                </el-button>
                <!--                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">-->
                <!--                    <el-option key="1" label="广东省" value="广东省"></el-option>-->
                <!--                    <el-option key="2" label="湖南省" value="湖南省"></el-option>-->
                <!--                </el-select>-->
                <el-input v-model="query.name" placeholder="查询数据集合名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
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
                <el-table-column label="操作" width="180" align="center">
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
                            @click="handleDelete(scope.$index, scope.row)"
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
                ></el-pagination>
                <!-- :total="pageTotal" -->
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="共享等级"><el-input v-model="query.name" style="width: 200px"></el-input></el-form-item>
                <el-form-item label="卫星名称">
                    <el-input v-model="form.name" placeholder="请输入卫星名称" class="handle-input mr10"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
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
                <el-form-item label="数据集合名称"><el-input v-model="form.name" style="width: 200px"></el-input></el-form-item>
                <div class="data-content">
                    <el-col :span="12" class="data-left">
                        <el-row style="margin-bottom:10px;"><div>卫星名称</div></el-row>
                        <el-row>
                            <el-col :span="15"><el-input v-model="query.name" placeholder="请输入卫星名称"></el-input></el-col>
                            <el-col :span="3" :offset="1">
                                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-card class="box-card" shadow="hover" style="width:90%;margin-top:10px;">
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
                                <span style="cursor:pointer;color:blue;">清空</span>
                            </div>
                            <div class="yesType">
                                <div class="item" v-for="(item, index) in productTyp" :key="index">{{ item }}</div>
                            </div>
                        </el-col>
                        <el-col :span="24">
                            <div class="type-title">
                                <span>未选择产品类型</span>
                                <span style="cursor:pointer;color:blue;">全选</span>
                            </div>
                            <div class="yesType">
                                <div class="item" v-for="(item, index) in productType" :key="index">{{ item }}</div>
                            </div>
                        </el-col>
                    </el-col>
                </div>
            </el-form>
            <el-row style="margin:20px 0;dispaly:flex;justify-content:end;float:right;">
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
import { fetchData } from '../../../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            productType: [],
            dataSetName: '', //用于接收参数用
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            spanArr: [],
            select: '',
            ptableDate: [
                {
                    id: '1',
                    name: 'landsat卫星数据集合',
                    content: 'landsat5 0级编目数据 标准产品 深加工产品 专题产品'
                }
            ],
            NewAddData: [{ JHMC: '', WXMC: '', CPLX: '' }],
            productTyp: [],
            ProductTypeQuery: [],
            satelliteList: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            pageTotal: 0,
            form: [],
            idx: -1,
            id: -1
        };
    },
    created() {
        // this.getData();
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
        addContent() {
            this.addVisible = true;
            this.$http
                //查询卫星名称
                .get(this.api.api + 'glyqxgl/querySatelliteName', {
                    params: {
                        satelliteName: this.form.name
                    }
                })
                .then(result => {
                    this.satelliteList = result.data.data;
                    console.log(this.satelliteList);
                })
                .catch(err => {});
            //产品类型查询
            this.$http
                .get(this.api.api + 'glyqxgl/queryProductType', {})
                .then(result => {
                    console.log(result);
                    if (result.data.msg == 'OK') {
                        this.productType = result.data.data;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
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
                .then(result => {
                    console.log(result);
                    if (result.data.msg == 'OK') {
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        });
                    }
                    //    this.satelliteList=
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
            this.$http
                .post(this.api.api + 'glyqxgl/deleteDataSet', {
                    params: str
                })
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
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
                .then(result => {
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
                .catch(err => {
                    console.log(err);
                });
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
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
            .then(result => {
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
            .catch(err => {
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
