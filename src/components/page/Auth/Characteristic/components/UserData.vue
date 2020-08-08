<template>
    <!-- 管理员数据操作权限设置 -->
    <div>
        <el-dialog :title="'数据操作权限设置 >> ' + dataManipulationType.roleName" :visible.sync="DMAOuterVisible" width="70%" style="padding-bottom: 20px;">
            <table border="1" style="width:100%;border-collapse:collapse;" class="admin-data-table">

                <tr>
                    <td style="width: 50px;">查询</td>
                    <td style="width: 250px;">
                        <el-checkbox v-show="accessLevel.searchLevels.length > 0" :indeterminate="searchLevels.isIndeterminate" v-model="searchLevels.checkAll" @change="handleLevelCheckAllChange($event, searchLevels, 0)">全选</el-checkbox>
                        <br>
                        <el-checkbox-group v-model="searchLevels.checkedCities" @change="handleLevelCheckedCitiesChange($event, searchLevels, 0)" style="margin-left: 24px;">
                            <el-checkbox v-for="(item, i) in accessLevel.searchLevels" :key="i" :label="item.id">{{item.level}}</el-checkbox>
                        </el-checkbox-group>
                    </td>
                    <td>
                        <div v-for="(item, i) in satelliteRangeList" :key="i" v-show="item.wxdhs.length > 0">
                            <el-checkbox  v-model="searchCheckboxs.checkAll[i]" @change="handleCheckAllChange($event, i, searchCheckboxs, 0)"><i class="el-icon-caret-bottom"></i><span>{{item.productType}}</span></el-checkbox>
                            <br>
                            <el-checkbox-group v-model="searchCheckboxs.checkedCities[i]" @change="handleCheckedCitiesChange($event, i, searchCheckboxs, 0)" style="margin-left: 24px;">
                                <el-checkbox v-for="(wx, j) in item.wxdhs" :label="wx" :key="j">{{wx}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>下载</td>
                    <td style="width: 250px;">
                        <el-checkbox v-show="accessLevel.downloadLevels.length > 0" :indeterminate="downloadLevels.isIndeterminate" v-model="downloadLevels.checkAll" @change="handleLevelCheckAllChange($event, searchLevels, 0)">全选</el-checkbox>
                        <br>
                        <el-checkbox-group v-model="downloadLevels.checkedCities" @change="handleLevelCheckedCitiesChange($event, downloadLevels, 0)" style="margin-left: 24px;">
                            <el-checkbox v-for="(item, i) in accessLevel.downloadLevels" :key="i" :label="item.id">{{item.level}}</el-checkbox>
                        </el-checkbox-group>
                    </td>
                    <td>
                        <div v-for="(item, i) in searchSatelliteList" :key="i" v-show="item.wxdhs.length > 0">
                            <el-checkbox v-model="downloadCheckboxs.checkAll[i]" @change="handleCheckAllChange($event, i, downloadCheckboxs, 1)"><i class="el-icon-caret-bottom"></i><span>{{item.productType}}</span></el-checkbox>
                            <br>
                            <el-checkbox-group v-model="downloadCheckboxs.checkedCities[i]" @change="handleCheckedCitiesChange($event, i, downloadCheckboxs, 1)" style="margin-left: 24px;">
                                <el-checkbox v-for="(wx, j) in item.wxdhs" :label="wx" :key="j">{{wx}}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>订购</td>
                    <td style="width: 250px;">
                        <el-checkbox v-show="accessLevel.deleteLevels.length > 0" :indeterminate="deleteLevels.isIndeterminate" v-model="deleteLevels.checkAll" @change="handleLevelCheckAllChange($event, searchLevels, 0)">全选</el-checkbox>
                        <br>
                        <el-checkbox-group v-model="deleteLevels.checkedCities" @change="handleLevelCheckedCitiesChange($event, deleteLevels, 0)" style="margin-left: 24px;">
                            <el-checkbox v-for="(item, i) in accessLevel.deleteLevels" :key="i" :label="item.id">{{item.level}}</el-checkbox>
                        </el-checkbox-group>
                    </td>
                    <td>
                        <div v-for="(item, i) in searchSatelliteList" :key="i" v-show="item.wxdhs.length > 0">
                            <el-checkbox v-model="deleteCheckboxs.checkAll[i]" @change="handleCheckAllChange($event, i, deleteCheckboxs, 2)"><i class="el-icon-caret-bottom"></i><span>{{item.productType}}</span></el-checkbox>
                            <br>
                            <el-checkbox-group v-model="deleteCheckboxs.checkedCities[i]" @change="handleCheckedCitiesChange($event, i, deleteCheckboxs, 2)" style="margin-left: 24px;">
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
            satelliteRangeList: [], // 卫星列表
            searchSatelliteList: [], // 查询选中卫星列表，用作下载和订购的子集
            // ----------------------------- 多选项相关 --------------------------------
            searchCheckboxs: { // 查询选项框
                checkAll: [],
                checkedCities: [],
                isIndeterminate: []
            },
            downloadCheckboxs: { // 下载选项框
                checkAll: [],
                checkedCities: [],
                isIndeterminate: []
            },
            deleteCheckboxs: { // 订购选项框
                checkAll: [],
                checkedCities: [],
                isIndeterminate: []
            },
            // ---------------------- 开放等级、共享级别、业务属性相关 ---------------------------
            accessLevel: { // 初始化数据
                searchLevels: [], // 开放等级
                downloadLevels: [], // 共享级别
                deleteLevels: [] // 业务属性
            },
            // 选中项
            searchLevels: { // 开放等级
                checkAll: false,
                checkedCities: [11, 6, 60],
                isIndeterminate: true
            },
            downloadLevels: { // 共享级别
                checkAll: false,
                checkedCities: [],
                isIndeterminate: true
            },
            deleteLevels: { // 业务属性
                checkAll: false,
                checkedCities: [],
                isIndeterminate: true
            }
        }
    },
    created () {
        this.initDataOpPrivilege()
    },
    methods: {
        // 操作权限初始化,获取卫星列表
        initDataOpPrivilege () {
            this.$api.GLYQXGL.initDataOpPrivilege().then(res => {
                if (res.code == 1) {
                    this.satelliteRangeList = res.data
                } else {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // ----------------------------------- 数据操作权限设置 -------------------------------------
        // 数据操作权限设置按钮
        dataManipulationBtn (row) {
            // 1.将角色id和角色名称保存，方便使用
            this.DMAOuterVisible = true
            this.dataManipulationType.roleId = row.roleId
            this.dataManipulationType.roleName = row.roleName
            // 2.初始化所有变量数据
            this.dataManipulationAuthorityData = {};
            this.searchSatelliteList = []
            this.searchCheckboxs = { // 查询选项框
                checkAll: [],
                checkedCities: [],
                isIndeterminate: []
            },
            this.downloadCheckboxs = { // 下载选项框
                checkAll: [],
                checkedCities: [],
                isIndeterminate: []
            },
            this.deleteCheckboxs = { // 订购选项框
                checkAll: [],
                checkedCities: [],
                isIndeterminate: []
            }
            // 3.初始化开放等级、共享级别、业务属性
            this.searchLevels = { // 开放等级
                checkAll: false,
                checkedCities: [],
                isIndeterminate: true
            },
            this.downloadLevels = { // 共享级别
                checkAll: false,
                checkedCities: [],
                isIndeterminate: true
            },
            this.deleteLevels = { // 业务属性
                checkAll: false,
                checkedCities: [],
                isIndeterminate: true
            }

            // 根绝角色id获取数据操作权限对应的卫星
            this.$api.GLYQXGL.queryDataOpPrivilege(row.roleId).then(res => {
                if (res.code == 1) {
                    // ------ 开放等级、共享级别、业务属性相关 --------
                    this.searchLevels.checkedCities = res.data.searchStr.split(',')
                    this.downloadLevels.checkedCities = res.data.downloadStr.split(',')
                    this.deleteLevels.checkedCities = res.data.deleteStr.split(',')

                    // -------- 数据操作项 ----------
                    this.dataManipulationAuthorityData = res.data
                    this.parentcalssSelector()
                } else {
                    console.log(res)
                }
            }).catch(err => {
                console.log(err)
            })
        },
        // 生成查询（父级）选中项
        parentcalssSelector () {
            // 遍历生成对应的选项框数组
            for (var i = 0; i < this.satelliteRangeList.length; i++) {
                // 当前已选 --> 查询项
                this.searchCheckboxs.checkAll.push(false)
                this.searchCheckboxs.checkedCities.push([])
                this.searchCheckboxs.isIndeterminate.push('')

                for (var j = 0; j < this.dataManipulationAuthorityData.searchList.length; j++) {
                    if (this.dataManipulationAuthorityData.searchList[j].productType == this.satelliteRangeList[i].productType) {
                        this.searchCheckboxs.checkedCities[i] = this.dataManipulationAuthorityData.searchList[j].wxdhs
                    }
                }
            }
            this.subclassSelector()
        },
        // 初次生成下载和订购的选中项
        subclassSelector () {
            // 获取当前已选查询项子集,保存到searchSatelliteList
            for (var i = 0; i < this.searchCheckboxs.checkedCities.length; i++) {
                // if (this.searchCheckboxs.checkedCities[i].length > 0) {
                    this.searchSatelliteList.push({
                        productType: this.satelliteRangeList[i].productType,
                        wxdhs: this.searchCheckboxs.checkedCities[i]
                    })
                // }
            }

            for (var a = 0; a < this.searchSatelliteList.length; a++) {
                // 当前已选 --> 下载项 是查询项的选中子集
                this.downloadCheckboxs.checkAll.push(false)
                this.downloadCheckboxs.checkedCities.push([])
                this.downloadCheckboxs.isIndeterminate.push('')

                for (var n = 0; n < this.dataManipulationAuthorityData.downloadList.length; n++) {
                    if (this.dataManipulationAuthorityData.downloadList[n].productType == this.searchSatelliteList[a].productType) {
                        this.downloadCheckboxs.checkedCities[a] = this.dataManipulationAuthorityData.downloadList[n].wxdhs
                    }
                }

                // 当前已选 --> 订购项同上
                this.deleteCheckboxs.checkAll.push(false)
                this.deleteCheckboxs.checkedCities.push([])
                this.deleteCheckboxs.isIndeterminate.push('')

                for (var k = 0; k < this.dataManipulationAuthorityData.deleteList.length; k++) {
                    if (this.dataManipulationAuthorityData.deleteList[k].productType == this.searchSatelliteList[a].productType) {
                        this.deleteCheckboxs.checkedCities[a] = this.dataManipulationAuthorityData.deleteList[k].wxdhs
                    }
                }
            }
        },
        // 非初次生成下载和订购选中项，查询选中项改变后生成下载和订购选中项
        notSubclassSelector () {
            this.searchSatelliteList = []
            // 获取当前已选查询项子集,保存到searchSatelliteList
            for (var i = 0; i < this.searchCheckboxs.checkedCities.length; i++) {
                // if (this.searchCheckboxs.checkedCities[i].length > 0) {
                    this.searchSatelliteList.push({
                        productType: this.satelliteRangeList[i].productType,
                        wxdhs: this.searchCheckboxs.checkedCities[i]
                    })
                // }
            }
        },
        // 数据操作权限设置提交（卫星设置范围提交）
        submitSatelliteBtn () {
            // 提交参数，各类参数解析
            let searchList = []
            for (var i = 0; i < this.searchCheckboxs.checkedCities.length; i++) {
                if (this.searchCheckboxs.checkedCities[i].length > 0) {
                    searchList.push({
                        roleId: this.dataManipulationType.roleId,
                        privilegeType: '查询',
                        privilegeLevel: this.searchLevels.checkedCities.join(','),
                        productType: this.satelliteRangeList[i].productType,
                        satelliteName: this.searchCheckboxs.checkedCities[i].join(',')
                    })
                }
            }

            let downloadList = []
            for (var i = 0; i < this.downloadCheckboxs.checkedCities.length; i++) {
                if (this.downloadCheckboxs.checkedCities[i].length > 0) {
                    // 如果有卫星数据才去保存
                    if (this.getArrEqual(this.searchCheckboxs.checkedCities[i], this.downloadCheckboxs.checkedCities[i])) {
                        downloadList.push({
                            roleId: this.dataManipulationType.roleId,
                            privilegeType: '下载',
                            privilegeLevel: this.downloadLevels.checkedCities.join(','),
                            productType: this.satelliteRangeList[i].productType,
                            satelliteName: this.getArrEqual(this.searchCheckboxs.checkedCities[i], this.downloadCheckboxs.checkedCities[i])
                        })
                    }
                }
            }

            let deletehList = []
            for (var i = 0; i < this.deleteCheckboxs.checkedCities.length; i++) {
                if (this.deleteCheckboxs.checkedCities[i].length > 0) {
                    if (this.getArrEqual(this.searchCheckboxs.checkedCities[i], this.deleteCheckboxs.checkedCities[i])) {
                        deletehList.push({
                            roleId: this.dataManipulationType.roleId,
                            privilegeType: '订购',
                            privilegeLevel: this.deleteLevels.checkedCities.join(','),
                            productType: this.satelliteRangeList[i].productType,
                            satelliteName: this.getArrEqual(this.searchCheckboxs.checkedCities[i], this.deleteCheckboxs.checkedCities[i])
                        })
                    }
                }
            }

            let DataOpPrivilege = searchList.concat(downloadList, deletehList)
            console.log(DataOpPrivilege)
            // 发送提交请求
            this.$api.GLYQXGL.saveDataOpPrivilege({list: DataOpPrivilege}).then(res => {
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
        // --------------------------- 多选框中的操作 ------------------------------
        /// 查询、下载、订购选项之全选状态
        // 选中当前全部
        handleCheckAllChange(val, i, obj, type) {
            console.log(i,val, obj)
            obj.checkedCities[i] = val ? this.satelliteRangeList[i].wxdhs : [];
            obj.isIndeterminate[i] = false;
            if (type == 0) {
                this.notSubclassSelector()
            }
        },
        // 不定项状态，暂时存在问题，其他功能不影响使用
        handleCheckedCitiesChange(value, i, obj, type) {
            console.log(value)
            var checkedCount = obj.checkedCities[i].length;
            if (type == 0) {
                this.notSubclassSelector()
                obj.checkAll[i] = checkedCount === this.satelliteRangeList[i].wxdhs.length;
            } else if (type == 1) {
                // this.deleteCheckboxs.checkAll[i] = checkedCount == this.searchSatelliteList[i].wxdhs.length;
            } else if (type == 2) {
                // this.deleteCheckboxs.checkAll[i] = checkedCount == this.searchSatelliteList[i].wxdhs.length;
            }
            // this.searchCheckboxs.isIndeterminate[i] = (checkedCount > 0 && checkedCount < this.satelliteRangeList[i].wxdhs.length);
        },
        // -------------------- 其他数据解析方法 ----------------------------
        // 两个数组中取相同的值
        getArrEqual(arr1, arr2) {
            let newArr = [];
            for (let i = 0; i < arr2.length; i++) {
                for (let j = 0; j < arr1.length; j++) {
                    if(arr1[j] === arr2[i]){
                        newArr.push(arr1[j]);
                    }
                }
            }
            return newArr.join(',');
        },
        // ============================= 权限等级 ===========================
        handleLevelCheckAllChange(value, obj, type) {
            var ids = []
            if (type == 0) {
                this.accessLevel.searchLevels.forEach(element => {
                    ids.push(element.id)
                });
            }
            if (type == 1) {
                this.accessLevel.downloadLevels.forEach(element => {
                    ids.push(element.id)
                });
            }
            if (type == 2) {
                this.accessLevel.deleteLevels.forEach(element => {
                    ids.push(element.id)
                });
            }
            obj.checkedCities = value ? ids : [];
            obj.isIndeterminate = false;
        },
        handleLevelCheckedCitiesChange(value, obj, type) {
            var checkedCount1 = obj.checkedCities.length;
            if (type == 0) {
                obj.checkAll = checkedCount1 === this.accessLevel.searchLevels.length;
                obj.isIndeterminate = checkedCount1 > 0 && checkedCount1 < this.accessLevel.searchLevels.length;
            }
            if (type == 1) {
                obj.checkAll = checkedCount1 === this.accessLevel.downloadLevels.length;
                obj.isIndeterminate = checkedCount1 > 0 && checkedCount1 < this.accessLevel.downloadLevels.length;
            }
            if (type == 2) {
                obj.checkAll = checkedCount1 === this.accessLevel.deleteLevels.length;
                obj.isIndeterminate = checkedCount1 > 0 && checkedCount1 < this.accessLevel.deleteLevels.length;
            }
        }
    }
}
</script>

<style>
.admin-data-table tr > td {
    text-align: left;
    padding: 1em;
}
.admin-data-table tr > td:first-child {
    text-align: center;
}
.admin-data-table tr > td:last-child {
    text-align: left;
}
</style>