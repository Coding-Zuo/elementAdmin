<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 管理员权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>数据操作权限管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
<!--                <el-button-->
<!--                    type="primary"-->
<!--                    icon="el-icon-plus"-->
<!--                    class="handle-del mr10"-->
<!--                    @click="addContent"-->
<!--                >添加权限</el-button>-->
                <el-button
                    type="primary"
                    icon="el-icon-setting"
                    class="handle-del mr10"
                    @click="goQuanxian"
                >数据开放等级设置</el-button>
                <el-button
                    type="primary"
                    icon="el-icon-setting"
                    class="handle-del mr10"
                    @click="goDownload"
                >数据共享级别设置</el-button>
                <el-button
                    type="primary"
                    icon="el-icon-setting"
                    class="handle-del mr10"
                    @click="goDinggou"
                >数据业务属性设置</el-button>
<!--                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">-->
<!--                    <el-option key="1" label="广东省" value="广东省"></el-option>-->
<!--                    <el-option key="2" label="湖南省" value="湖南省"></el-option>-->
<!--                </el-select>-->
<!--                <el-input v-model="query.name" placeholder="查询数据操作权限名称" class="handle-input mr10"></el-input>-->
<!--                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>-->
            </div>
            <el-table
                :data="ptableDate"
                border
                class="table"
                ref="multipleTable"
                :span-method="objectOneMethod"
                :row-class-name="tableRowClassName"
                header-cell-class-name="table-header"
            >
<!--                <el-table-column type="selection" width="55" align="center"></el-table-column>-->
                <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="数据操作权限名称" align="center"></el-table-column>
                <el-table-column prop="address" label="数据操作权限等级" align="center"></el-table-column>
<!--                <el-table-column label="操作" width="180" align="center">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-button-->
<!--                            type="text"-->
<!--                            icon="el-icon-edit"-->
<!--                            @click="handleEdit(scope.$index, scope.row)"-->
<!--                        >编辑</el-button>-->
<!--                        <el-button-->
<!--                            type="text"-->
<!--                            icon="el-icon-delete"-->
<!--                            class="red"-->
<!--                            @click="handleDelete(scope.$index, scope.row)"-->
<!--                        >删除</el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
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

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="添加" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
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
            ptableDate: [
                {
                  id:1,
                  name:'查询',
                  address:'一般开放'
                },{
                    id:2,
                    name:'查询',
                    address:'内部开放'
                },{
                    id:3,
                    name:'查询',
                    address:'专项开放'
                },{
                    id:4,
                    name:'查询',
                    address:'内部受控级别1'
                },{
                    id:5,
                    name:'查询',
                    address:'内部受控级别2'
                },{
                    id:6,
                    name:'查询',
                    address:'内部受控级别3'
                },{
                    id:7,
                    name:'下载',
                    address:'一般共享'
                },{
                    id:8,
                    name:'下载',
                    address:'一般共享'
                },{
                    id:9,
                    name:'下载',
                    address:'内部共享'
                },{
                    id:10,
                    name:'下载',
                    address:'内部受控级别1'
                },{
                    id:11,
                    name:'下载',
                    address:'内部受控级别2'
                },{
                    id:12,
                    name:'下载',
                    address:'内部受控级别3'
                },{
                    id:13,
                    name:'订购',
                    address:'商业'
                },
            ],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            spanArr:[],
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // tableRowClassName({row,rowIndex}){
        //     if(rowIndex===0){
        //         return 'warning-row'
        //     }
        //     if(rowIndex===6){
        //         return 'warning-row'
        //     }
        //     if(rowIndex===12){
        //         return 'warning-row'
        //     }
        // },
        tableRowClassName({row, rowIndex}) {
            if (rowIndex === 0 || rowIndex===6 || rowIndex===12) {
                return 'el-table__row--striped warning-row';
            }
            return '';
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            this.$http.get('http://localhost/wzyhqxgl/getDataOpPrivilege')
            .then(res=>{
                if(res.data.msg=='OK'){
                    console.log(res.data.data)
                    this.ptableDate=res.data.data;
                }
            })
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        addContent(){
            this.addVisible = true;
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
        goQuanxian(){
            //通过push进行跳转
            this.$router.push('/SearchAuthRank')
        },
        goDownload(){
            this.$router.push('/DownLoadAuthRank')
        },
        goDinggou(){
            this.$router.push('/OrderLoadAuthRank')
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
        } ,
        objectOneMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                const _row = this.setTable(this.ptableDate).one[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                };
            }
            if (columnIndex === 1 ) {
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
        },


    }
};
</script>
<style>
    .warning-row{
        background-color: #00d1b2;
    }
</style>
<style scoped>
    .el-table .warning-row {
        background: #00d1b2;
    }
.handle-box {
    margin-bottom: 20px;
}
.warning-row{
    background-color: #00d1b2;
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
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
