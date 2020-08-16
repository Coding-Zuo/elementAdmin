<template>
    <!-- 管理员数据操作权限设置 -->
    <div>
        <el-dialog
            v-dialogDrag
            :close-on-click-modal="false"
            :title="'数据操作权限设置 >> ' + dataManipulationType.roleName"
            :visible.sync="DMAOuterVisible"
            width="500"
            style="padding-bottom: 20px;"
        >
            <table border="1" style="width: 100%; border-collapse: collapse;" class="admin-data-table">
                <tr v-show="dataTypeShow[0]">
                    <td style="width: 50px;">查询</td>
                    <td>
                        <div v-for="(item, i) in satelliteRangeList" :key="i" v-show="item.wxdhs.length > 0">
                            <el-checkbox v-model="searchCheckboxs.checkAll[i]" @change="handleCheckAllChange($event, i, searchCheckboxs, 0)"
                                ><i class="el-icon-caret-bottom"></i><span>{{ item.productType }}</span></el-checkbox
                            >
                            <br />
                            <el-checkbox-group
                                v-model="searchCheckboxs.checkedCities[i]"
                                @change="handleCheckedCitiesChange($event, i, searchCheckboxs, 0)"
                                style="margin-left: 24px;"
                                v-if="item.wxdhs.length && item.wxdhs.length > 0"
                            >
                                <el-checkbox v-for="(wx, j) in item.wxdhs" :label="wx" :key="j">{{ wx }}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </td>
                </tr>
                <tr v-show="dataTypeShow[1]">
                    <td>迁移</td>
                    <td>
                        <div v-for="(item, i) in searchSatelliteList" :key="i" v-show="item.wxdhs.length > 0">
                            <el-checkbox
                                v-model="downloadCheckboxs.checkAll[i]"
                                @change="handleCheckAllChange($event, i, downloadCheckboxs, 1)"
                                ><i class="el-icon-caret-bottom"></i><span>{{ item.productType }}</span></el-checkbox
                            >
                            <br />
                            <el-checkbox-group
                                v-model="downloadCheckboxs.checkedCities[i]"
                                @change="handleCheckedCitiesChange($event, i, downloadCheckboxs, 1)"
                                style="margin-left: 24px;"
                            >
                                <el-checkbox v-for="(wx, j) in item.wxdhs" :label="wx" :key="j">{{ wx }}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </td>
                </tr>
                <tr v-show="dataTypeShow[2]">
                    <td>删除</td>
                    <td>
                        <div v-for="(item, i) in searchSatelliteList" :key="i" v-show="item.wxdhs.length > 0">
                            <el-checkbox v-model="deleteCheckboxs.checkAll[i]" @change="handleCheckAllChange($event, i, deleteCheckboxs, 2)"
                                ><i class="el-icon-caret-bottom"></i><span>{{ item.productType }}</span></el-checkbox
                            >
                            <br />
                            <el-checkbox-group
                                v-model="deleteCheckboxs.checkedCities[i]"
                                @change="handleCheckedCitiesChange($event, i, deleteCheckboxs, 2)"
                                style="margin-left: 24px;"
                            >
                                <el-checkbox v-for="(wx, j) in item.wxdhs" :label="wx" :key="j">{{ wx }}</el-checkbox>
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
    data() {
        return {
            // ----------------------------- 数据操作权限设置 ---------------------------
            DMAOuterVisible: false, // 数据操作权限外层弹窗显示、隐藏
            dataManipulationAuthorityData: {}, // 数据操作权限返回数据
            dataManipulationType: {
                roleId: '', // 当前角色id
                roleName: '' // 当前角色名称
            }, // 数据操作权限中转信息
            satelliteRangeList: [], // 卫星列表
            searchSatelliteList: [], // 查询选中卫星列表，用作迁移和删除的子集
            // ----------------------------- 多选项相关 --------------------------------
            dataTypeShow: [false, false, false],
            searchCheckboxs: {
                // 查询选项框
                checkAll: [], // 多选状态
                checkedCities: [], // 当前选中项
                isIndeterminate: [] // 不确定状态
            },
            downloadCheckboxs: {
                // 迁移选项框
                checkAll: [], // 多选状态
                checkedCities: [], // 当前选中项
                isIndeterminate: [] // 不确定状态
            },
            deleteCheckboxs: {
                // 删除选项框
                checkAll: [], // 多选状态
                checkedCities: [], // 当前选中项
                isIndeterminate: [] // 不确定状态
            }
        };
    },
    created() {
        this.initDataOpPrivilege();
    },
    methods: {
        // 操作权限初始化,获取卫星列表
        initDataOpPrivilege() {
            this.searchCheckboxs = {
                // 查询选项框
                checkAll: [],
                checkedCities: [],
                isIndeterminate: []
            };

            this.$api.GLYQXGL.initDataOpPrivilege().then((res) => {
                this.qxResultHandle(res, () => {
                    let rows = res.data;
                    for (var i = 0; i < rows.length; i++) {
                        this.searchCheckboxs.checkAll.push(false);
                        this.searchCheckboxs.checkedCities.push([]);
                        this.searchCheckboxs.isIndeterminate.push('');
                    }
                    console.log(res);
                    this.satelliteRangeList = rows;
                });
            });
        },
        // ----------------------------------- 数据操作权限设置 -------------------------------------
        // 数据操作权限设置按钮
        dataManipulationBtn(row, dataTypeShow) {
            // 0.判断数据类型是否显示
            this.dataTypeShow = dataTypeShow;
            // 1.将角色id和角色名称保存，方便使用
            this.DMAOuterVisible = true;
            this.dataManipulationType.roleId = row.roleId;
            this.dataManipulationType.roleName = row.roleName;
            // 2.初始化所有变量数据
            this.dataManipulationAuthorityData = {};
            this.searchSatelliteList = [];
            // 3.初始化查询，特殊处理
            this.searchCheckboxs = {
                // 查询选项框
                checkAll: [],
                checkedCities: [],
                isIndeterminate: []
            };
            for (var i = 0; i < this.satelliteRangeList.length; i++) {
                this.searchCheckboxs.checkAll.push(false);
                this.searchCheckboxs.checkedCities.push([]);
                this.searchCheckboxs.isIndeterminate.push('');
            }

            // for(var a=0;a<this.searchCheckboxs.checkedCities;a++){
            //     this.searchCheckboxs.checkedCities[a] = []
            // }
            // 4.初始化迁移和删除，相同处理
            this.downloadCheckboxs = {
                // 迁移选项框
                checkAll: [],
                checkedCities: [],
                isIndeterminate: []
            };
            this.deleteCheckboxs = {
                // 删除选项框
                checkAll: [],
                checkedCities: [],
                isIndeterminate: []
            };

            // 5.根绝角色id获取数据操作权限对应的卫星
            this.$api.GLYQXGL.queryDataOpPrivilege(row.roleId).then((res) => {
                this.qxResultHandle(res, () => {
                    this.dataManipulationAuthorityData = res.data;
                    this.parentcalssSelector();
                });
            });
        },
        // 生成查询（父级）选中项
        parentcalssSelector() {
            // 遍历生成对应的选项框数组

            for (var i = 0; i < this.satelliteRangeList.length; i++) {
                for (var j = 0; j < this.dataManipulationAuthorityData.searchList.length; j++) {
                    if (this.dataManipulationAuthorityData.searchList[j].productType == this.satelliteRangeList[i].productType) {
                        // this.searchCheckboxs.checkAll.push(false);
                        this.searchCheckboxs.checkedCities[i] = this.dataManipulationAuthorityData.searchList[j].wxdhs;
                        // this.searchCheckboxs.isIndeterminate.push('');
                    }
                }
            }
            this.subclassSelector();
        },
        // 初次生成迁移和删除的选中项
        subclassSelector() {
            // 获取当前已选查询项子集,保存到searchSatelliteList
            for (var i = 0; i < this.searchCheckboxs.checkedCities.length; i++) {
                // if (this.searchCheckboxs.checkedCities[i].length > 0) {
                this.searchSatelliteList.push({
                    productType: this.satelliteRangeList[i].productType,
                    wxdhs: this.searchCheckboxs.checkedCities[i]
                });
                // }
            }

            for (var a = 0; a < this.searchSatelliteList.length; a++) {
                // 当前已选 --> 迁移项 是查询项的选中子集
                this.downloadCheckboxs.checkAll.push(false);
                this.downloadCheckboxs.checkedCities.push([]);
                this.downloadCheckboxs.isIndeterminate.push('');

                for (var n = 0; n < this.dataManipulationAuthorityData.downloadList.length; n++) {
                    if (this.dataManipulationAuthorityData.downloadList[n].productType == this.searchSatelliteList[a].productType) {
                        this.downloadCheckboxs.checkedCities[a] = this.dataManipulationAuthorityData.downloadList[n].wxdhs;
                    }
                }

                // 当前已选 --> 删除项同上
                this.deleteCheckboxs.checkAll.push(false);
                this.deleteCheckboxs.checkedCities.push([]);
                this.deleteCheckboxs.isIndeterminate.push('');

                for (var k = 0; k < this.dataManipulationAuthorityData.deleteList.length; k++) {
                    if (this.dataManipulationAuthorityData.deleteList[k].productType == this.searchSatelliteList[a].productType) {
                        this.deleteCheckboxs.checkedCities[a] = this.dataManipulationAuthorityData.deleteList[k].wxdhs;
                    }
                }
            }
        },
        // 非初次生成迁移和删除选中项，查询选中项改变后生成迁移和删除选中项
        notSubclassSelector() {
            this.searchSatelliteList = [];
            // 获取当前已选查询项子集,保存到searchSatelliteList
            for (var i = 0; i < this.searchCheckboxs.checkedCities.length; i++) {
                // if (this.searchCheckboxs.checkedCities[i].length > 0) {
                this.searchSatelliteList.push({
                    productType: this.satelliteRangeList[i].productType,
                    wxdhs: this.searchCheckboxs.checkedCities[i]
                });
                // }
            }
        },
        // 数据操作权限设置提交（卫星设置范围提交）
        submitSatelliteBtn() {
            // 提交参数，各类参数解析
            let searchList = [];
            for (var i = 0; i < this.searchCheckboxs.checkedCities.length; i++) {
                if (this.searchCheckboxs.checkedCities[i].length > 0) {
                    searchList.push({
                        roleId: this.dataManipulationType.roleId,
                        privilegeType: '查询',
                        productType: this.satelliteRangeList[i].productType,
                        satelliteName: this.searchCheckboxs.checkedCities[i].join(',')
                    });
                }
            }

            let downloadList = [];
            for (var i = 0; i < this.downloadCheckboxs.checkedCities.length; i++) {
                if (this.downloadCheckboxs.checkedCities[i].length > 0) {
                    // 如果有卫星数据才去保存
                    if (this.getArrEqual(this.searchCheckboxs.checkedCities[i], this.downloadCheckboxs.checkedCities[i])) {
                        downloadList.push({
                            roleId: this.dataManipulationType.roleId,
                            privilegeType: '迁移',
                            productType: this.satelliteRangeList[i].productType,
                            satelliteName: this.getArrEqual(this.searchCheckboxs.checkedCities[i], this.downloadCheckboxs.checkedCities[i])
                        });
                    }
                }
            }

            let deletehList = [];
            for (var i = 0; i < this.deleteCheckboxs.checkedCities.length; i++) {
                if (this.deleteCheckboxs.checkedCities[i].length > 0) {
                    if (this.getArrEqual(this.searchCheckboxs.checkedCities[i], this.deleteCheckboxs.checkedCities[i])) {
                        deletehList.push({
                            roleId: this.dataManipulationType.roleId,
                            privilegeType: '删除',
                            productType: this.satelliteRangeList[i].productType,
                            satelliteName: this.getArrEqual(this.searchCheckboxs.checkedCities[i], this.deleteCheckboxs.checkedCities[i])
                        });
                    }
                }
            }

            let DataOpPrivilege = searchList.concat(downloadList, deletehList);
            console.log(DataOpPrivilege);
            // 发送提交请求
            this.$api.GLYQXGL.saveDataOpPrivilege({ list: DataOpPrivilege }).then((res) => {
                this.qxResultHandle(res, () => {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.DMAOuterVisible = false;
                });
            });
        },
        // --------------------------- 多选框中的操作 ------------------------------
        /// 查询、下载、删除选项之全选状态
        // 选中当前全部
        handleCheckAllChange(val, i, obj, type) {
            console.log(i, val, obj);
            obj.checkedCities[i] = val ? this.satelliteRangeList[i].wxdhs : [];
            obj.isIndeterminate[i] = false;
            if (type == 0) {
                this.notSubclassSelector();
            }
        },
        // 不定项状态，暂时小bug，其他功能不影响使用
        handleCheckedCitiesChange(value, i, obj, type) {
            console.log(value);
            var checkedCount = obj.checkedCities[i].length;
            if (type == 0) {
                this.notSubclassSelector();
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
                    if (arr1[j] === arr2[i]) {
                        newArr.push(arr1[j]);
                    }
                }
            }
            return newArr.join(',');
        }
    }
};
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