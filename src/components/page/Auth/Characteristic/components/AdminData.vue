<template>
    <!-- 管理员数据操作权限设置 -->
    <div>
        <el-dialog :title="'数据操作权限设置 >> ' + dataManipulationType.roleName" :visible.sync="DMAOuterVisible" width="500" style="padding-bottom: 20px;">
            <table border="1" style="width:100%;border-collapse:collapse;" class="admin-data-table">
                <tr>
                    <td style="width: 50px;">查询</td>
                    <td>
                        <div v-for="(item, i) in satelliteRangeList" :key="i">
                            <el-checkbox :indeterminate="searchCheckboxs.isIndeterminate[i]" v-model="searchCheckboxs.checkAll[i]" @change="handleSearchCheckAllChange($event, i)"><i class="el-icon-caret-bottom"></i><span>{{item.productType}}</span></el-checkbox>
                            <br>
                            <el-checkbox-group v-model="searchCheckboxs.checkedCities[i]" @change="handleSearchCheckedCitiesChange($event, i)" style="margin-left: 24px;">
                                <el-checkbox v-for="(wx, j) in item.wxdhs" :label="wx" :key="j">{{wx}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>迁移</td>
                    <td>
                        <div v-for="(item, i) in satelliteRangeList" :key="i">
                            <el-checkbox :indeterminate="downloadCheckboxs.isIndeterminate[i]" v-model="downloadCheckboxs.checkAll[i]" @change="handleDownloadCheckAllChange($event, i)"><i class="el-icon-caret-bottom"></i><span>{{item.productType}}</span></el-checkbox>
                            <br>
                            <el-checkbox-group v-model="downloadCheckboxs.checkedCities[i]" @change="handleDownloadCheckedCitiesChange($event, i)" style="margin-left: 24px;">
                                <el-checkbox v-for="(wx, j) in item.wxdhs" :label="wx" :key="j">{{wx}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>删除</td>
                    <td>
                        <div v-for="(item, i) in satelliteRangeList" :key="i">
                            <el-checkbox :indeterminate="deleteCheckboxs.isIndeterminate[i]" v-model="deleteCheckboxs.checkAll[i]" @change="handleDeleteCheckAllChange($event, i)"><i class="el-icon-caret-bottom"></i><span>{{item.productType}}</span></el-checkbox>
                            <br>
                            <el-checkbox-group v-model="deleteCheckboxs.checkedCities[i]" @change="handleDeleteCheckedCitiesChange($event, i)" style="margin-left: 24px;">
                                <el-checkbox v-for="(wx, j) in item.wxdhs" :label="wx" :key="j">{{wx}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </td>
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
            DMAOuterVisible: false, // 数据操作权限外层弹窗显示、隐藏
            dataManipulationAuthorityData: {}, // 数据操作权限返回数据
            dataManipulationType: {
                roleId: '', // 当前角色id
                roleName: '' // 当前角色名称
            }, // 数据操作权限中转信息
            searchSatelliteRange: [], // 查询操作卫星列表
            relocateSatelliteRange: [], // 迁移操作卫星列表
            deleteSatelliteRange: [], // 删除操作卫星列表
            satelliteName: '', // 卫星名称
            satelliteRangeList: [], // 卫星列表
            // ----------------------------- 多选项相关 --------------------------------
            searchCheckboxs: { // 查询选项框
                checkAll: [], // 多选状态
                checkedCities: [], // 当前选中项
                isIndeterminate: [] // 不确定状态
            },
            downloadCheckboxs: { // 下载选项框
                checkAll: [], // 多选状态
                checkedCities: [], // 当前选中项
                isIndeterminate: [] // 不确定状态
            },
            deleteCheckboxs: { // 删除选项框
                checkAll: [], // 多选状态
                checkedCities: [], // 当前选中项
                isIndeterminate: [] // 不确定状态
            }
        }
    },
    created () {
        this.initDataOpPrivilege()
    },
    methods: {
        // ----------------------------------- 数据操作权限设置 -------------------------------------
        // 数据操作权限设置按钮
        dataManipulationBtn (row) {
            // this.querySatelliteName() // 放到进入页面时调用
            // 根绝角色id获取数据操作权限对应的卫星
            // this.$api.GLYQXGL.queryDataOpPrivilege(row.roleId).then(res => {
            //     if (res.code == 1) {
                    
            //         let item = res.data
            //         this.dataManipulationAuthorityData = item

                    var ab = {
                        "searchStr": null,
                        "downloadStr": null,
                        "deleteStr": null,
                        "searchList": [
                        {
                            "productType": "产品一号",
                            "wxdhs": [
                            "WX-1",
                            "WX-2"
                            ]
                        },
                        {
                            "productType": "产品二号",
                            "wxdhs": [
                            "WX-1",
                            "WX-2"
                            ]
                        }
                        ],
                        "downloadList": [{
                            "productType": "产品一号",
                            "wxdhs": [
                            "WX-1",
                            "WX-2"
                            ]
                        },
                        {
                            "productType": "产品二号",
                            "wxdhs": [
                            "WX-1",
                            "WX-2"
                            ]
                        }],
                        "deleteList": [{
                            "productType": "产品一号",
                            "wxdhs": [
                            "WX-1",
                            "WX-2"
                            ]
                        },
                        {
                            "productType": "产品二号",
                            "wxdhs": [
                            "WX-1",
                            "WX-2"
                            ]
                        }]
                    }

                    // 遍历生成对应的选项框数组
                    for (var i = 0; i < this.satelliteRangeList.length; i++) {
                        // 当前已选 --> 查询项
                        this.searchCheckboxs.checkAll.push(false)
                        this.searchCheckboxs.checkedCities.push([])
                        this.searchCheckboxs.isIndeterminate.push('')

                        for (var j = 0; j < ab.searchList.length; j++) {
                            if (ab.searchList[j].productType == this.satelliteRangeList[i].productType) {
                                this.searchCheckboxs.checkedCities[i] = ab.searchList[j].wxdhs
                            }
                        }
                        
                        // 当前已选 --> 下载项
                        this.downloadCheckboxs.checkAll.push(false)
                        this.downloadCheckboxs.checkedCities.push([])
                        this.downloadCheckboxs.isIndeterminate.push('')

                        for (var n = 0; n < ab.downloadList.length; n++) {
                            if (ab.downloadList[n].productType == this.satelliteRangeList[i].productType) {
                                this.downloadCheckboxs.checkedCities[i] = ab.downloadList[n].wxdhs
                            }
                        }

                        // 当前已选 --> 删除项
                        this.deleteCheckboxs.checkAll.push(false)
                        this.deleteCheckboxs.checkedCities.push([])
                        this.deleteCheckboxs.isIndeterminate.push('')

                        for (var k = 0; k < ab.deleteList.length; k++) {
                            if (ab.deleteList[k].productType == this.satelliteRangeList[i].productType) {
                                this.deleteCheckboxs.checkedCities[i] = ab.deleteList[k].wxdhs
                            }
                        }
                    }


                // } else {
                //     console.log(res)
                // }
            // }).catch(err => {
            //     console.log(err)
            // })
            // 将角色id和角色名称保存，方便使用
            this.dataManipulationType.roleId = row.roleId
            this.dataManipulationType.roleName = row.roleName
            this.DMAOuterVisible = true
        },
        // 数据操作权限设置提交（卫星设置范围提交）
        submitSatelliteBtn () {
            // 提交参数
            // 各类参数解析
            let searchList = []
            for (var i = 0; i < this.searchCheckboxs.checkedCities.length; i++) {
                if (this.searchCheckboxs.checkedCities[i].length > 0) {
                    searchList.push({
                        roleId: this.dataManipulationType.roleId,
                        privilegeType: '查询',
                        productType: this.satelliteRangeList[i].productType,
                        satelliteName: this.searchCheckboxs.checkedCities[i].join(',')
                    })
                }
            }

            let downloadList = []
            for (var i = 0; i < this.deleteCheckboxs.checkedCities.length; i++) {
                if (this.deleteCheckboxs.checkedCities[i].length > 0) {
                    downloadList.push({
                        roleId: this.dataManipulationType.roleId,
                        privilegeType: '下载',
                        productType: this.satelliteRangeList[i].productType,
                        satelliteName: this.deleteCheckboxs.checkedCities[i].join(',')
                    })
                }
            }

            let deletehList = []
            for (var i = 0; i < this.deleteCheckboxs.checkedCities.length; i++) {
                if (this.deleteCheckboxs.checkedCities[i].length > 0) {
                    deletehList.push({
                        roleId: this.dataManipulationType.roleId,
                        privilegeType: '查询',
                        productType: this.satelliteRangeList[i].productType,
                        satelliteName: this.deleteCheckboxs.checkedCities[i].join(',')
                    })
                }
            }



            console.log(searchList.concat(downloadList, deletehList))
            // 发送提交请求
            this.$api.GLYQXGL.saveDataOpPrivilege().then(rs => {
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
        // 操作权限初始化
        initDataOpPrivilege () {
            // this.$api.GLYQXGL.initDataOpPrivilege().then(res => {
            //     if (res.code == 1) {
            //         this.satelliteRangeList = res.data
            //     } else {
            //         console.log(res)
            //     }
            // }).catch(err => {
            //     console.log(err)
            // })
            let wxList = [{
                    "productType": "产品二号",
                    "wxdhs": [
                        "WX-2",
                        "WX-1",
                        "WX-3"
                    ]
                }, {
                    "productType": "产品一号",
                    "wxdhs": [
                        "WX-2",
                        "WX-1",
                    ]
                }]
                this.satelliteRangeList = wxList
        },
        // --------------------------- 多选框中的操作 ------------------------------
        /// 查询选项
        // 选中当前全部
        handleSearchCheckAllChange(val, i) {
            console.log(i,val)
            this.searchCheckboxs.checkedCities[i] = val ? this.satelliteRangeList[i].wxdhs : [];
            this.searchCheckboxs.isIndeterminate[i] = false;
        },
        // 不定项状态，暂时存在问题，其他功能不影响使用
        handleSearchCheckedCitiesChange(value, i) {
            // console.log(this.searchCheckboxs.checkedCities[i].length, i)
            // let checkedCount = this.searchCheckboxs.checkedCities[i].length;
            // this.searchCheckboxs.checkAll[i] = (checkedCount === this.satelliteRangeList[i].wxdhs.length);
            // this.searchCheckboxs.isIndeterminate[i] = (checkedCount > 0 && checkedCount < this.satelliteRangeList[i].wxdhs.length);
            // console.log(this.searchCheckboxs.checkAll[i], this.searchCheckboxs.isIndeterminate[i])
        },
        /// 下载
        // 选中当前全部
        handleDownloadCheckAllChange(val, i) {
            console.log(i,val)
            this.searchCheckboxs.checkedCities[i] = val ? this.satelliteRangeList[i].wxdhs : [];
            this.searchCheckboxs.isIndeterminate[i] = false;
        },
        // 不定项状态，暂时存在问题，其他功能不影响使用
        handleDownloadCheckedCitiesChange(value, i) {
            // console.log(this.searchCheckboxs.checkedCities[i].length, i)
            // let checkedCount = this.searchCheckboxs.checkedCities[i].length;
            // this.searchCheckboxs.checkAll[i] = (checkedCount === this.satelliteRangeList[i].wxdhs.length);
            // this.searchCheckboxs.isIndeterminate[i] = (checkedCount > 0 && checkedCount < this.satelliteRangeList[i].wxdhs.length);
            // console.log(this.searchCheckboxs.checkAll[i], this.searchCheckboxs.isIndeterminate[i])
        },
        /// 删除
        // 选中当前全部
        handleDeleteCheckAllChange(val, i) {
            console.log(i,val)
            this.searchCheckboxs.checkedCities[i] = val ? this.satelliteRangeList[i].wxdhs : [];
            this.searchCheckboxs.isIndeterminate[i] = false;
        },
        // 不定项状态，暂时存在问题，其他功能不影响使用
        handleDeleteCheckedCitiesChange(value, i) {
            // console.log(this.searchCheckboxs.checkedCities[i].length, i)
            // let checkedCount = this.searchCheckboxs.checkedCities[i].length;
            // this.searchCheckboxs.checkAll[i] = (checkedCount === this.satelliteRangeList[i].wxdhs.length);
            // this.searchCheckboxs.isIndeterminate[i] = (checkedCount > 0 && checkedCount < this.satelliteRangeList[i].wxdhs.length);
            // console.log(this.searchCheckboxs.checkAll[i], this.searchCheckboxs.isIndeterminate[i])
        }
    }
}
</script>

<style>
.admin-data-table tr > td:first-child {
    text-align: center;
    padding: 1em;
}
.admin-data-table tr > td:last-child {
    text-align: left;
    padding: 1em;
}
</style>