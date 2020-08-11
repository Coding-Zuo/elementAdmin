<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 数据归档</el-breadcrumb-item>
                <el-breadcrumb-item>已完成任务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="执行序号" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="资源类型" width="155" align="center"></el-table-column>
                <el-table-column prop="name1" label="卫星代号" align="center"></el-table-column>
                <el-table-column prop="name2" label="数据目录" align="center"></el-table-column>
                <el-table-column prop="name3" label="数据名称" align="center"></el-table-column>
                <el-table-column prop="name4" label="数据大小(MB)" align="center"></el-table-column>
                <el-table-column prop="name5" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="name6" label="完成时间" align="center"></el-table-column>
                <el-table-column label="处理结果" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.state === '成功' ? 'success' : scope.row.state === '失败' ? 'danger' : ''">{{ scope.row.state }} </el-tag>
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
                    :total="pageTotal"
                ></el-pagination>
            </div>
        </div>
        <div class="container" style="margin-top: 20px;">
            <div class="handle-box">
                任务日志
                <div style="margin-top: 30px;">
                    <p v-for="(i, j) in logList" :key="j">{{ i.rksj }} {{ i.rznr }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 5,
            },
            logList: [],
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
        };
    },

    methods: {
        // 多选操作单选化
        handleSelectionChange(val) {
            if (val.length > 1) {
                this.$refs.multipleTable.clearSelection();
                this.$refs.multipleTable.toggleRowSelection(val.pop());
                this.multipleSelection = val;
            } else if (val.length == 1) {
                this.multipleSelection = val;
                if (this.multipleSelection[0].id) {
                    let id = this.multipleSelection[0].id;
                    console.log(id);
                    this.getLogs(id);
                } else {
                    return;
                }
            }
        },
        getLogs(param) {
            this.$api.SJGD.queryJobLogList({
                zxxh: param, //执行序号
            })
                .then(result => {
                    console.log(result);
                    if (result.msg == '成功') {
                        this.logList = result.data.items;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 分页导航
        handlePageChange(val) {
            console.log(val);
            this.$api.SJGD.queryJobList({
                rwzt: '已完成',
                pageNo: val,
                pageSize: 20,
            })
                .then(res => {
                    console.log(res);
                    let data = res.data;
                    if (res.msg == '成功') {
                        let dataArr = data.items;
                        let length = dataArr.length;
                        this.tableData.length = 0;
                        for (let i = 0; i < length; i++) {
                            this.tableData.push({
                                id: dataArr[i].zxxh,
                                name: dataArr[i].zylx,
                                name1: dataArr[i].wxbh,
                                name2: dataArr[i].sjml,
                                name3: dataArr[i].sjmc,
                                name4: dataArr[i].sjdx,
                                name5: dataArr[i].cjsj,
                                name6: dataArr[i].wcsj,
                                state: dataArr[i].rwzt,
                            });
                        }
                        this.query.pageIndex = data.pageNo;
                        this.query.pageSize = data.pageSize;
                        this.pageTotal = data.totalNum;
                    } else {
                        this.$message({
                            type: 'info',
                            message: res.msg,
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
    },
    mounted() {
        //页面加载进来时调取的接口，
        this.$api.SJGD.queryJobList({
            rwzt: '已完成',
            pageNo: this.query.pageIndex,
            pageSize: this.query.pageSize,
        })
            .then(res => {
                console.log(res);
                let data = res.data;
                if (res.msg == '成功') {
                    let dataArr = data.items;
                    let length = dataArr.length;
                    this.tableData.length = 0;
                    for (let i = 0; i < length; i++) {
                        this.tableData.push({
                            id: dataArr[i].zxxh,
                            name: dataArr[i].zylx,
                            name1: dataArr[i].wxbh,
                            name2: dataArr[i].sjml,
                            name3: dataArr[i].sjmc,
                            name4: dataArr[i].sjdx,
                            name5: dataArr[i].cjsj,
                            name6: dataArr[i].wcsj,
                            state: dataArr[i].rwzt,
                        });
                    }
                    this.query.pageIndex = data.pageNo;
                    this.query.pageSize = data.pageSize;
                    this.pageTotal = data.totalNum;
                }
            })
            .catch(err => {
                console.log(err);
            });
    },
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

.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
