<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-calendar"></i>
					数据策略管理
				</el-breadcrumb-item>
				<el-breadcrumb-item>数据汇交策略管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-select v-model="query.title" placeholder="数据级别" class="handle-select mr10">
					<el-option key="1" label="标题1" value="标题1"></el-option>
					<el-option key="2" label="标题2" value="标题2"></el-option>
				</el-select>
				<el-select v-model="query.title" placeholder="策略状态" class="handle-select mr10">
					<el-option key="1" label="标题1" value="标题1"></el-option>
					<el-option key="2" label="标题2" value="标题2"></el-option>
				</el-select>
				<el-select v-model="query.title" placeholder="卫星代号" class="handle-select mr10">
					<el-option key="1" label="标题1" value="标题1"></el-option>
					<el-option key="2" label="标题2" value="标题2"></el-option>
				</el-select>
				<el-input v-model="query.who" placeholder="策略名称" class="handle-input mr10"></el-input>
				<el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
				<el-button type="primary" icon="el-icon-add" class="handle-del mr10" @click="addContent">添加</el-button>
				<el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">
					批量删除
				</el-button>
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
				<el-table-column prop="id" label="编号" align="center"></el-table-column>
				<el-table-column prop="name1" label="策略名称" align="center"></el-table-column>
				<el-table-column prop="name2" label="数据级别" align="center"></el-table-column>
				<el-table-column prop="name3" label="策略状态" align="center"></el-table-column>
				<el-table-column prop="name4" label="卫星代号" align="center"></el-table-column>
				<!--                <el-table-column label="账户余额">-->
				<!--                    <template slot-scope="scope">￥{{scope.row.money}}</template>-->
				<!--                </el-table-column>-->
				<!--                <el-table-column label="头像(查看大图)" align="center">-->
				<!--                    <template slot-scope="scope">-->
				<!--                        <el-image-->
				<!--                            class="table-td-thumb"-->
				<!--                            :src="scope.row.thumb"-->
				<!--                            :preview-src-list="[scope.row.thumb]"-->
				<!--                        ></el-image>-->
				<!--                    </template>-->
				<!--                </el-table-column>-->
				<el-table-column label="操作" width="180" align="center">
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
						<el-button type="text" icon="el-icon-edit" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
						<el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">
							停用
						</el-button>
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
		<el-dialog
			:title="editType == '0' ? '添加' : editType == '1' ? '编辑' : '详情'"
			:visible.sync="editVisible"
			width="50%"
		>
			<el-form ref="form" :model="form" label-width="130px">
				<!-- 接收地址配置 -->
				<el-row>
					<div class="data-title" v-if='editType == 0 || editType == 1'>接收地址配置</div>
					<div class="data-title" v-if='editType == 2'>交汇方式选择</div>
					<div class="data-content">
						<div class="overflow-auto" v-if='editType != 2'>
							<el-col :span="12">
								<el-form-item label="地址名称:"><el-input v-model="form.location"></el-input></el-form-item>
							</el-col>
						</div>
						<div class="content">
							<!-- 共享项目路径 -->
							<el-row style="padding-bottom:20px;"><el-radio v-model="radio" label="1">共享目录</el-radio></el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item label="共享目录路径:"><el-input v-model="form.path"></el-input></el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item label="存储文件夹名称:"><el-input v-model="form.fileName"></el-input></el-form-item>
								</el-col>
							</el-row>
							<!-- ftp -->
							<el-row style="padding-bottom:20px;"><el-radio v-model="radio" label="2">ftp</el-radio></el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item label="ip地址:"><el-input v-model="form.ip"></el-input></el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="端口:"><el-input v-model="form.port"></el-input></el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item label="存储文件夹名称:"><el-input v-model="form.fileName2"></el-input></el-form-item>
								</el-col>
								<el-col :span="12">
									<el-form-item label="密码:"><el-input v-model="form.password"></el-input></el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="12">
									<el-form-item label="用户名:"><el-input v-model="form.username"></el-input></el-form-item>
								</el-col>
							</el-row>
						</div>
					</div>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveEdit">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { fetchData } from '../../../../api/index'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
	name: 'News',
	data() {
		return {
			query: {
				who: '',
				title: '',
				pageIndex: 1,
				pageSize: 10
			},
			radio: false, //共享目录单选框
			tableData: [
				{
					id: 1,
					name1: '0级策略',
					name2: '0级编目数据',
					name3: '未生效',
					name4: 'CASEarth'
				},
				{
					id: 2,
					name1: '1级策略',
					name2: '1级产品数据',
					name3: '已生效',
					name4: 'CASEarth'
				},
				{
					id: 3,
					name1: '1级策略更新版',
					name2: '2级数据产品',
					name3: '已生效',
					name4: 'CASEarth'
				},
				{
					id: 4,
					name1: '4级策略',
					name2: '4级产品数据',
					name3: '未生效',
					name4: 'CASEarth'
				},
				{
					id: 5,
					name1: '4级策略最新',
					name2: '高级产品数据',
					name3: '未生效',
					name4: 'CASEarth'
				}
			],
			multipleSelection: [],
			delList: [],
			editVisible: false,
			editType: '', //弹出框类型 0添加 1编辑 2详情
			pageTotal: 0,
			form: {},
			idx: -1,
			id: -1,
			content: '',
			editorOption: {
				placeholder: '新闻动态发布请输入...'
			}
		}
	},
	created() {
		// this.getData();
	},
	components: {
		quillEditor
	},
	methods: {
		// 获取 easy-mock 的模拟数据
		getData() {
			fetchData(this.query).then(res => {
				console.log(res)
				this.tableData = res.list
				this.pageTotal = res.pageTotal || 50
			})
		},
		// 触发搜索按钮
		handleSearch() {
			this.$set(this.query, 'pageIndex', 1)
			this.getData()
		},
		// 删除操作
		handleDelete(index, row) {
			// 二次确认删除
			this.$confirm('确定要删除吗？', '提示', {
				type: 'warning'
			})
				.then(() => {
					this.$message.success('删除成功')
					this.tableData.splice(index, 1)
				})
				.catch(() => {})
		},
		// 多选操作
		handleSelectionChange(val) {
			this.multipleSelection = val
		},
		delAllSelection() {
			const length = this.multipleSelection.length
			let str = ''
			this.delList = this.delList.concat(this.multipleSelection)
			for (let i = 0; i < length; i++) {
				str += this.multipleSelection[i].name + ' '
			}
			this.$message.error(`删除了${str}`)
			this.multipleSelection = []
		},
		addContent() {
			this.editType = '0'
			this.editVisible = true
		},
		// 编辑操作
		handleEdit(index, row) {
			this.editType = '1'
			this.idx = index
			this.form = row
			this.editVisible = true
		},
		// 保存编辑
		saveEdit() {
			this.editVisible = false
			this.$message.success(`修改第 ${this.idx + 1} 行成功`)
			this.$set(this.tableData, this.idx, this.form)
		},
		//详情
		handleDetail(index, row) {
			this.editType = '2'
			this.editVisible = true
		},
		saveAdd() {},
		onEditorChange({ editor, html, text }) {
			this.content = html
		},
		// 分页导航
		handlePageChange(val) {
			this.$set(this.query, 'pageIndex', val)
			this.getData()
		}
	}
}
</script>

<style scoped>
.handle-box {
	margin-bottom: 20px;
}

.overflow-auto {
	overflow: auto;
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

.data-title {
	background: #ebeef5;
	padding: 5px;
}

.data-content {
	padding: 20px 0;
	overflow: auto;
}

.table-td-thumb {
	display: block;
	margin: auto;
	width: 40px;
	height: 40px;
}

.content {
	border-top: 1px solid gray;
	border-bottom: 1px solid gray;
	padding: 20px 0;
	overflow: auto;
}
</style>
