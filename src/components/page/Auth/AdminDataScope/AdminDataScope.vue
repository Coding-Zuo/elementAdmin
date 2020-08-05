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
                <div class="handle-box">
                    管理员名称&nbsp;
                    <el-select @change="getUserAdministerSatellite" v-model="adminId" placeholder="管理员名称" class="handle-select" style="width: 200px;">
                        <el-option v-for="item in adminOptions" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option>
                    </el-select>
                </div>
                <el-divider></el-divider>
                <div class="plugins-tips">
                    <div class="Jsearch" style="position: relative;">
                        卫星名称
                        <el-input
                            v-model="satelliteName"
                            placeholder="请输入卫星名称"
                            class="handle-input mr10"
                            style="margin-top: 10px;"
                        ></el-input>
                        <el-button type="primary" icon="el-icon-search" @click="querySatelliteName">搜索</el-button>
                    </div>
                </div>
                <div class="drag-box">
                    <el-transfer
                        @change="handleChange"
                        v-model="userSatelliteList"
                        :data="satelliteList"
                        :titles="['未添加卫星列表项', '已添加卫星列表项']"
                        class="transfer-class"
                        :button-texts="['撤销', '添加']"
                    ></el-transfer>
                </div>
                <div class="Jbtns">
                    <el-button type="primary" icon="el-icon-plus" class="handle-del mr10" @click="saveAdminDataRange()">确定</el-button>
                    <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="handleCancel">取消</el-button>
                </div>
            </div>

            <!-- 已添加管理员与管辖范围卫星列表 -->
            <!-- <div class="plugins-tips" style="margin-top: 10px;">已添加管理员与管辖范围卫星列表</div> -->
            <h5 style="margin: 10px 0;">已添加管理员与管辖范围卫星列表</h5>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="userId" label="管理员编号" align="center"></el-table-column>
                <el-table-column label="管理员名称" align="center">
                    <template slot-scope="scope">
                        <span v-for="(item, i) in adminOptions" :key="i" v-show="item.roleId == scope.row.userId">{{item.roleName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="satelliteNames" label="添加卫星列表" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.satelliteNames.join(' ')}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </section>
</template>

<script>
export default {
    name: 'draglist',
    data() {
        return {
            adminId: '', // 管理员id
            adminOptions: [
                // {
                //     "id": 2,
                //     "roleId": 10002,
                //     "roleName": "管理员12",
                //     "roleDescription": "123132",
                //     "lastModifiedTime": 1593796015400
                // }
            ], // 管理员选项
            satelliteName: '', // 卫星名称
            satelliteList: [
                // {key: 'WX-1', label: 'WX-1'},
                // {key: 'WX-2', label: 'WX-2'},
                // {key: 'WX-3', label: 'WX-3'}
            ], // 卫星列表
            // 已添加管理员与管辖范围卫星列表
            tableData: [],
            // 管理员用户当前管辖卫星列表
            userSatelliteList: []
        };
    },
    created() {
        this.queryRole()
        this.querySatelliteName()
    },
    methods: {
        // 获取管理员列表（也就是角色信息查询）
        queryRole () {
            this.$api.GLYQXGL.queryRole().then(res => {
                if (res.code == 1) {
                    this.adminOptions = res.data.rows
                } else {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 获取卫星列表
        querySatelliteName () {
            this.satelliteList = []
            this.$api.GLYQXGL.querySatelliteName(this.satelliteName).then(res => {
                if (res.code == 1) {
                    for (var i = 0; i < res.data.length; i++) {
                        this.satelliteList.push({
                            key: res.data[i],
                            label: res.data[i]
                        })
                    }
                } else {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 根据用户Id获取对应的管辖卫星列表
        getUserAdministerSatellite (value) {
            console.log(value)
            this.$api.GLYQXGL.querySatelliteNameByUserId(value).then(res => {
                if (res.code == 1) {

                    // 当前存在卫星列表
                    this.userSatelliteList = res.data

                    // 直接将当前数据存到表格中，作为展示
                    if (this.tableData.length == 0) {
                        this.tableData.push({
                            userId: this.adminId,
                            satelliteNames: res.data
                        })
                    } else {
                        // 循环遍历是否有当前id的数据,如果是直接替换
                        for (let j = 0; j < this.tableData.length; j++) {
                            if (this.tableData[j].userId == this.adminId) {
                                return this.tableData[j].satelliteNames = res.data
                            }
                        }

                        // 如果循环结束还没有对应的项，则添加一组数据
                        this.tableData.push({
                            userId: this.adminId,
                            satelliteNames: res.data
                        })
                    }
                } else {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 管辖数据范围保存，标红字段为 , 拼接
        saveAdminDataRange () {
            // console.log(this.tableData)
            let list = []
            for (let v = 0; v < this.tableData.length; v++) {
                list.push({
                    ...this.tableData[v],
                    satelliteNames: this.tableData[v].satelliteNames.join(',')
                })
            }
            console.log(list)

            // 如果list中没有数据,取消提交
            if (list.length == 0) {
                this.$message({
                    message: '请选择需要保存的数据！',
                    type: 'info'
                })
                return false
            }

            // 提交数据
            this.$api.GLYQXGL.saveAdminDataRange({list}).then(res => {
                if (res.code == 1) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })

                    // 保存成功后清掉表格中数据、以及其他数据，以免重复提交
                    this.tableData = []
                    this.userSatelliteList = []
                    this.adminId = ''
                } else {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 右侧列表变时，保存对应管理员用户下的卫星列表
        handleChange (value, direction, movedKeys) {
            // console.log(value, direction, movedKeys)
            if (!this.adminId) {
                this.$message({
                    message: '请选择管理员名称',
                    type: 'info'
                })
            } else if (this.tableData.length == 0) {
                this.tableData.push({
                    userId: this.adminId,
                    satelliteNames: value
                })
            } else {
                // 循环遍历是否有当前id的数据,如果是直接替换
                for (let j = 0; j < this.tableData.length; j++) {
                    if (this.tableData[j].userId == this.adminId) {
                        return this.tableData[j].satelliteNames = value
                    }
                }

                // 如果循环结束还没有对应的项，则添加一组数据
                this.tableData.push({
                    userId: this.adminId,
                    satelliteNames: value
                })
            }
            // console.log(this.tableData)
        },
        // 取消当前所有选中项操作
        handleCancel () {
            this.adminId = '';
            this.tableData = [];
            this.userSatelliteList = [];
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
    width: 200px;
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
    padding: 1em 1em 1em 1em;
}
.Jbtns {
    width: 85%;
    margin-top: 1.2em;
    display: flex;
    justify-content: space-evenly;
}
</style>
