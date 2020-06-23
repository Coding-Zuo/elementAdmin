<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户角色配置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
<!--                <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">-->
<!--                    <el-option key="1" label="广东省" value="广东省"></el-option>-->
<!--                    <el-option key="2" label="湖南省" value="湖南省"></el-option>-->
<!--                </el-select>-->
                <el-input v-model="query.name" placeholder="请输入待查询角色" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名称" align="center"></el-table-column>
                <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
                <el-table-column prop="name1" label="姓名" align="center"></el-table-column>
                <el-table-column prop="name2" label="用户密码" align="center"></el-table-column>
                <el-table-column prop="date" label="注册时间" align="center"></el-table-column>
                <el-table-column prop="jigou1" label="用户所属机构名称" align="center"></el-table-column>
                <el-table-column prop="jigou2" label="用户所属机构类型" align="center"></el-table-column>
                <el-table-column prop="name3" label="地址" align="center"></el-table-column>
                <el-table-column prop="name4" label="邮编" align="center"></el-table-column>
                <el-table-column prop="name5" label="电话号码" align="center"></el-table-column>
                <el-table-column prop="name5" label="传真号码" align="center"></el-table-column>
                <el-table-column prop="name5" label="邮箱" align="center"></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >用户权限修改</el-button>
<!--                        <el-button-->
<!--                                type="text"-->
<!--                                icon="el-icon-edit"-->
<!--                                @click="handleDelete(scope.$index, scope.row)"-->
<!--                        >用户信息修改</el-button>-->
                    </template>
                </el-table-column>
                <el-table-column label="是否启用" align="center">
                    <template slot-scope="scope">
                        <el-switch>禁用</el-switch>
                    </template>
                </el-table-column>
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
        <el-dialog title="用户权限修改" :visible.sync="editVisible" width="90%">
            <el-row>
							<el-col :span='16' style="width: 66.66667%">
								<el-transfer :titles='["所有角色","已授予角色"]' v-model="chuansuo" :data="chuansuoList"></el-transfer>
							</el-col>
							<el-col :span='8'>
								<div style='height:40px;line-height:40px;text-align:center;border-bottom:1px solid gray;'>已授予权限列表</div>
								<div class='data-table' style="width:450px;position:">
									<div class='left'>
										<div class='title'>数据权限</div>
										<div class='content' >
											<div class='item'>Envisat ERS-1 ERS-2</div>
											<div class='item'>IRS-P6 landsats landsat</div>
											<div class='item'>landsat phr-18 phr-1b </div>
											<div class='item'>radarsat-1 radarsat-2 spot-1 </div>
										</div>
									</div>
									<div class='left'>
										<div class='title'>功能权限</div>
										<div class='content'>
											<div class='item'>数据权限控制于系统</div>
											<div class='item'>数据权限控制于系统管理</div>
											<div class='item'>数据权限管理</div>
										</div>
									</div>
								</div>
							</el-col>
						</el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button  type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="添加" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="共享等级">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="等级描述">
                    <el-input type="textarea" v-model="form.address"></el-input>
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
            tableData: [
                {
                  id:1,
                  name:'superAdmin',
                    name1:'内置超级管理员',
                    name2:'admin12345',
                    userId:10001,
                    date:'2020-06-06',
                    jigou1:'中科院遥地所',
                    jigou2:'科研',
                },{
                    id:2,
                    name:'minmin',
                    name1:'李敏',
                    name2:'liminmin',
                    userId:10002,
                    date:'2020-06-06',
                    jigou1:'中科院遥地所',
                    jigou2:'高校',
                },{
                    id:3,
                    name:'chunling',
                    name1:'符春玲',
                    name2:'fuchunling',
                    userId:10003,
                    date:'2020-06-06',
                    jigou1:'中科院遥地所',
                },{
                    id:4,
                    name:'jun888',
                    name1:'郝建军',
                    name2:'12345678-',
                    userId:10004,
                    date:'2020-06-06',
                    jigou1:'中科院遥地所',
                },{
                    id:5,
                    name:'liujunyi',
                    name1:'刘俊义',
                    userId:10005,
                    name2:'admin12345',
                    date:'2020-06-06',
                    jigou1:'中科院遥地所',
                },
            ],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
						chuansuoList: [
							{
								key: 1,
								label: `备选项 1`,
								disabled: false
							},
							{
								key: 2,
								label: `备选项 3`,
								disabled: false
							},
							{
								key: 3,
								label: `备选项 2`,
								disabled: false
							},
						],
						chuansuo: []
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
        }
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

.data-table {
	margin-top: 20px;
	display:flex;
}

.left {
	width: 50%;
	float: left;
}

.left .title {
	width: 100%;
	height: 40px;
	line-height:40px;
	border:1px solid gray;
	text-align: center;
	
}

.content {
	border: 1px solid gray;
}
</style>
