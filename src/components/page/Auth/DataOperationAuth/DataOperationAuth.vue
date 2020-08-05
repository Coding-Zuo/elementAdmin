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
                <el-button type="primary" icon="el-icon-setting" class="handle-del mr10" @click="() => {$router.push('/SearchAuthRank')}">数据开放等级设置</el-button>
                <el-button type="primary" icon="el-icon-setting" class="handle-del mr10" @click="() => {$router.push('/DownLoadAuthRank')}">数据共享级别设置</el-button>
                <el-button type="primary" icon="el-icon-setting" class="handle-del mr10" @click="() => {$router.push('/OrderLoadAuthRank')}">数据业务属性设置</el-button>
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
                <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="数据操作权限名称" align="center"></el-table-column>
                <el-table-column prop="quanxian" label="数据操作权限等级" align="center"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'basetable',
    data() {
        return {
            // 所有数据操作权限数据
            ptableDate: []
        };
    },
    created () {
        this.getDataOpPrivilege()
    },
    methods: {
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex === 0 || rowIndex === 6 || rowIndex === 12) {
                return 'el-table__row--striped warning-row';
            }
            return '';
        },
        // 提供所有数据操作权限
        getDataOpPrivilege () {
            this.$api.GLYQXGL.getDataOpPrivilege().then(res => {
                if (res.code == 1) {
                    let rows = res.data;
                    let items = [];
                    /* let rows = {
                        "ywsxs": [
                        {
                            "id": 1 ,
                        "purchaseType": "商业1" ,    
                        "lastModifiedTime": 1593335275400
                        } ,
                        {
                            "id": 3 ,
                            "purchaseType": "商业2" ,
                            "lastModifiedTime": 1594054516500
                        }
                        ] ,
                        "kfdjs": [
                        {
                            "id": 6 ,
                            "searchLevel": "内部开放" ,
                            "lastModifiedTime": 1593334200400
                        } ,
                        {
                            "id": 10 ,
                            "searchLevel": "专项开放" ,
                            "lastModifiedTime": 1594052284900
                        } ,
                        {
                            "id": 7 ,
                            "searchLevel": "一般开放" ,
                            "lastModifiedTime": 1594053512500
                        },
                        {
                            "id": 44 ,
                            "searchLevel": "一般开放" ,
                            "lastModifiedTime": 1594053512500
                        },{
                            "id": 78 ,
                            "searchLevel": "一般开放" ,
                            "lastModifiedTime": 1594053512500
                        }
                        ] ,
                        "gxjbs": [
                        {
                            "id": 2 ,
                            "downloadLevel": "共享级别1" ,
                            "lastModifiedTime": 1593334509600
                        } ,
                        {
                            "id": 3 ,
                            "downloadLevel": "一般共享" ,
                            "lastModifiedTime": 1594054045000
                        } ,
                        {
                            "id": 4 ,
                            "downloadLevel": "一般共享3" ,
                            "lastModifiedTime": 1594054160500
                        }
                        ]
                    }*/

                    // -------- 将相同类型的数据放到一起 --------
                    // 开放等级
                    for (var i = 0; i < rows.kfdjs.length; i++) {
                        items.push({ id: rows.kfdjs[i].id, name: '查询', quanxian: rows.kfdjs[i].searchLevel });
                    }
                    // 共享级别
                    for (var i = 0; i < rows.gxjbs.length; i++) {
                        items.push({ id: rows.gxjbs[i].id, name: '下载', quanxian: rows.gxjbs[i].downloadLevel });
                    }
                    // 业务属性
                    for (var i = 0; i < rows.ywsxs.length; i++) {
                        items.push({ id: rows.ywsxs[i].id, name: '订购', quanxian: rows.ywsxs[i].purchaseType });
                    }

                    this.ptableDate = items
                } else {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 合并表格相同的列操作
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
    }
};
</script>

<style>
.warning-row {
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
.warning-row {
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
