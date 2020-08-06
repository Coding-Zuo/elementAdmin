<template>
    <!-- 管理员数据操作权限设置 -->
    <div>
        <el-dialog :title="'数据操作权限设置 >> ' + dataManipulationType.roleName" :visible.sync="DMAOuterVisible" width="500" style="padding-bottom: 20px;">
            <table border="1" style="width:100%;text-align: center;border-collapse:collapse;">
                <tr>
                    <td style="width: 50px;">查询</td>
                    <td></td>
                </tr>
                <tr>
                    <td>迁移</td>
                    <td></td>
                </tr>
                <tr>
                    <td>删除</td>
                    <td></td>
                </tr>
            </table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="DMAOuterVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitSatelliteBtn">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'AdminData',
    data () {
        return {
            // ----------------------------- 数据操作权限设置 ---------------------------
            DMAOuterVisible: true, // 数据操作权限外层弹窗显示、隐藏
            dataManipulationAuthorityData: {}, // 数据操作权限返回数据
            dataManipulationType: {
                roleId: '', // 当前角色id
                roleName: '' // 当前角色名称
            }, // 数据操作权限中转信息
            searchSatelliteRange: [], // 查询操作卫星列表
            relocateSatelliteRange: [], // 迁移操作卫星列表
            deleteSatelliteRange: [], // 删除操作卫星列表
            satelliteName: '', // 卫星名称
            satelliteRangeList: [
                // {
                //     key: 'WX-1',
                //     label: 'WX-1'
                // }, {
                //     key: 'WX-2',
                //     label: 'WX-2'
                // }, {
                //     key: 'WX-8',
                //     label: 'WX-8'
                // }, {
                //     key: 'WX-4',
                //     label: 'WX-4'
                // }, {
                //     key: 'WX-5',
                //     label: 'WX-5'
                // }, {
                //     key: 'WX-6',
                //     label: 'WX-6'
                // }
            ], // 卫星列表
            shuttleBoxCheckItems: [], // 穿梭框选中项value
        }
    },
    created () {},
    methods: {
        // ----------------------------------- 数据操作权限设置 -------------------------------------
        // 获取卫星列表
        querySatelliteName () {
            this.satelliteRangeList = []
            this.$api.GLYQXGL.querySatelliteName(this.satelliteName).then(res => {
                if (res.code == 1) {
                    let rows = res.data
                    for (let i = 0; i < rows.length; i++) {
                        this.satelliteRangeList.push({
                            key: rows[i],
                            label: rows[i]
                        })
                    }
                } else {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 数据操作权限设置按钮
        dataManipulationBtn (row) {
            // this.querySatelliteName() // 放到进入页面时调用
            // 根绝角色id获取数据操作权限对应的卫星
            this.$api.GLYQXGL.queryDataOpPrivilege(row.roleId).then(res => {
                if (res.code == 1) {
                    // 模拟数据
                    // let item = {
                    //     "id": 2,
                    //     "roleId": 10001,
                    //     "searchSatelliteRange": "WX-5 WX-3",
                    //     "relocateSatelliteRange": "",
                    //     "deleteSatelliteRange": "WX-4",
                    //     "lastModifiedTime": 1593462484900
                    // }

                    let item = res.data
                    this.dataManipulationAuthorityData = item

                    // 将查询、迁移、删除三组数据解析为数组，方便穿梭框使用
                    /// 查询
                    if (item.searchSatelliteRange) {
                        this.searchSatelliteRange = item.searchSatelliteRange.split(' ')
                    } else {
                        this.searchSatelliteRange = []
                    }
                    /// 迁移
                    if (item.relocateSatelliteRange) {
                        this.relocateSatelliteRange = item.relocateSatelliteRange.split(' ')
                    } else {
                        this.relocateSatelliteRange = []
                    }
                    /// 删除
                    if (item.deleteSatelliteRange) {
                        this.deleteSatelliteRange = item.deleteSatelliteRange.split(' ')
                    } else {
                        this.deleteSatelliteRange = []
                    }
                } else {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err)
            })
            // 将角色id和角色名称保存，方便使用
            this.dataManipulationType.roleId = row.roleId
            this.dataManipulationType.roleName = row.roleName
            this.DMAOuterVisible = true
        },
        // 设置卫星范围按钮
        setSatelliteBtn (type) {
            this.dataManipulationType.type = type;
            this.DMAInnerVisible = true;
            switch (type) {
                case 0:
                    this.shuttleBoxCheckItems = this.searchSatelliteRange;
                    break;
                case 1:
                    this.shuttleBoxCheckItems = this.relocateSatelliteRange;
                    break;
                case 2:
                    this.shuttleBoxCheckItems = this.deleteSatelliteRange;
                    break;
            }
        },
        // 保存设置对应的卫星范围
        saveSatelliteBtn () {
            switch (this.dataManipulationType.type) {
                case 0:
                    this.searchSatelliteRange = this.shuttleBoxCheckItems;
                    break;
                case 1:
                    this.relocateSatelliteRange = this.shuttleBoxCheckItems;
                    break;
                case 2:
                    this.deleteSatelliteRange = this.shuttleBoxCheckItems;
                    break;
            }
            this.DMAInnerVisible = false
        },
        // 数据操作权限设置提交（卫星设置范围提交）
        submitSatelliteBtn () {
            // 提交参数
            let fromData = {
                roleId: this.dataManipulationType.roleId,
                searchSatelliteRange: this.searchSatelliteRange.join(' '),
                relocateSatelliteRange: this.relocateSatelliteRange.join(' '),
                deleteSatelliteRange: this.deleteSatelliteRange.join(' ')
            }

            console.log(fromData)
            // 发送提交请求
            this.$api.GLYQXGL.saveDataOpPrivilege(fromData).then(rs => {
                if (res.code == 1) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                } else {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err)
            })
        },
    }
}
</script>

<style>

</style>