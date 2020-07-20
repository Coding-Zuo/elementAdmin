<template>
    <section class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-rank"></i> 权限管理 </el-breadcrumb-item>
                <el-breadcrumb-item>管理员管辖范围数据配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container spaceAdjust">
            <div class="Jbgcolor">
                <div class="handle-box ">
                    管理员名称:&nbsp;
                    <el-select v-model="adminId" placeholder="管理员名称" class="handle-select mr10" style="width: 200px">
                        <el-option key="1" label="普通管理员" value="普通管理员"></el-option>
                        <el-option key="2" label="超级管理员" value="超级管理员"></el-option>
                    </el-select>
                </div>
                <div class="plugins-tips">
                    <div class="Jsearch" style="position: relative;">
                        卫星名称
                        <br />
                        <el-input
                            v-model="query.name"
                            placeholder="请输入卫星名称"
                            class="handle-input mr10"
                            style="margin-top: 10px"
                        ></el-input>
                        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                    </div>
                </div>
                <div class="drag-box">
                    <el-transfer
                        v-model="value"
                        :data="data"
                        style="width:1000px"
                        class="transfer-class"
                        :button-texts="['撤销', '添加']"
                    ></el-transfer>
                </div>
                <div class="Jbtns">
                    <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="handleSave()">确定</el-button>
                    <el-button type="primary" icon="el-icon-delete" class="handle-del mr10">取消</el-button>
                </div>
            </div>
            <div class="plugins-tips" style="margin-top: 30px">已添加管理员与管辖范围卫星:&nbsp;</div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="name" label="管理员名称" align="center"></el-table-column>
                <el-table-column prop="name1" label="添加卫星列表" align="center"></el-table-column>
            </el-table>
        </div>
    </section>
</template>

<script>
import draggable from 'vuedraggable';
import { fetchData } from '../../../../api/index';
export default {
    name: 'draglist',
    data() {
        return {
            adminId: '',
            // adminId: this.$store.state.adminId, //页面加载时需要该参数请求后台管理员身份
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [
                {
                    name: '外部共享数据授权管理员B',
                    name1: 'ERS-2 SPOT-1 SPOT-2 SPOT-3'
                },
                {
                    name: '外部共享数据授权管理员A',
                    name1: 'ERS-2 LANDSAT1 SPOT-1'
                },
                {
                    name: '超级数据维护管理员',
                    name1: 'THEOS PLEIADES SPOT-1A'
                }
            ],
            dragOptions: {
                animation: 120,
                scroll: true,
                group: 'sortlist',
                ghostClass: 'ghost-style'
            },
            data: [],
            value: [0]
        };
    },
    created() {
        // this.getData();
    },
    mounted() {
        this.$http
            .post(this.api.api + 'glyqxgl/querySatelliteNameByUserId', {
                params: {
                    adminId: this.adminId
                }
            })
            .then(result => {
                console.log(result);

                if (result.data.msg == 'OK') {
                    let resultArr = result.data.data;
                    let length = resultArr.length;
                    for (let i = 0; i < length; i++) {
                        this.data.push({
                            key: i,
                            label: resultArr[i],
                            disabled: false
                        });
                    }
                }
                //    this.satelliteList=
            })
            .catch(err => {
                console.log(err);
            });
    },
    components: {
        draggable
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
        removeHandle(event) {
            console.log(event);
            this.$message.success(`从 ${event.from.id} 移动到 ${event.to.id} `);
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        handleSave() {
            this.$http
                .post(api.api + 'glyqxgl/saveAdminDataRange', {
                    params: {
                        list: [
                            {
                                satelliteNames: this.data, //卫星名称
                                userId: this.adminId //用户id
                            }
                        ]
                    }
                })
                .then(result => {
                    console.log(result);
                    if (result.data.msg == 'OK') {
                        this.$message({
                            type: 'success',
                            message: '提交成功 ！'
                        });
                    }
                    //    this.satelliteList=
                })
                .catch(err => {
                    console.log(err);
                });

            //             {
            //   "list": [{
            // "satelliteNames": "WX-1 WX-2",
            // "userId": "100001"
            // }]
            // }
        }
    }
};
</script>
<style>
.transfer-class .el-transfer-panel {
    width: 350px;
}
.el-transfer-panel {
    width: 350px;
}
</style>
<style scoped>
.drag-box {
    display: flex;
    user-select: none;
}

.table {
    width: 100%;
    font-size: 14px;
    text-align: center;
}

.drag-box-item {
    flex: 1;
    max-width: 330px;
    min-width: 300px;
    background-color: #eff1f5;
    margin-right: 16px;
    border-radius: 6px;
    border: 1px #e1e4e8 solid;
}

.item-title {
    padding: 8px 8px 8px 12px;
    font-size: 14px;
    line-height: 1.5;
    color: #24292e;
    font-weight: 600;
}

.item-ul {
    padding: 0 8px 8px;
    height: 500px;
    overflow-y: scroll;
}

.item-ul::-webkit-scrollbar {
    width: 0;
}
transfer-class .el-transfer-panel {
     width: 350px;
}
.el-transfer-panel {
    width: 350px;
}

.drag-list {
    border: 1px #e1e4e8 solid;
    padding: 10px;
    margin: 5px 0 10px;
    list-style: none;
    background-color: #fff;
    border-radius: 6px;
    cursor: pointer;
    -webkit-transition: border 0.3s ease-in;
    transition: border 0.3s ease-in;
}

.drag-list:hover {
    border: 1px solid #20a0ff;
}

.drag-title {
    font-weight: 400;
    line-height: 25px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}

.ghost-style {
    display: block;
    color: transparent;
    border-style: dashed;
}

.handle-box {
    margin-bottom: 0px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.mr10 {
    margin-right: 10px;
}
/* css 样式覆盖 */
.plugins-tips {
    background: none !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
}
/* .spaceAdjust > div :nth-child(2) {
    margin: 0;
    padding: 0;
} */
.Jsearch {
    top: 0.5em;
    left: -0.5em;
}
.Jbgcolor {
    background: #ececec;
    padding: 1em 0 1em 1em;
}
.Jbtns {
    width: 85%;
    margin-top: 1.2em;
    display: flex;
    justify-content: space-evenly;
}
</style>
