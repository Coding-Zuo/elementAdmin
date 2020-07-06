<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<i class="el-icon-lx-calendar"></i>
					数据归档
				</el-breadcrumb-item>
				<el-breadcrumb-item>资源信息配置</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-input v-model="query.who" placeholder="原信息名称" class="handle-input mr10"></el-input>
				<el-input v-model="query.who" placeholder="命名标识" class="handle-input mr10"></el-input>
				<el-select v-model="query.title" placeholder="资源类型" class="handle-select mr10">
					<el-option key="1" label="标题1" value="标题1"></el-option>
					<el-option key="2" label="标题2" value="标题2"></el-option>
				</el-select>
				<el-select v-model="query.title" placeholder="配置类型" class="handle-select mr10">
					<el-option key="1" label="标题1" value="标题1"></el-option>
					<el-option key="2" label="标题2" value="标题2"></el-option>
				</el-select>
				<el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
				<el-button type="primary" icon="el-icon-add" class="handle-del mr10" @click="addContent">添加</el-button>
			</div>
			<el-table
				:data="tableData"
				border
				class="table"
				ref="multipleTable"
				header-cell-class-name="table-header"
				@selection-change="handleSelectionChange"
			>
				<el-table-column prop="name" label="原信息名称" align="center"></el-table-column>
				<el-table-column prop="name1" label="命名标识" align="center"></el-table-column>
				<el-table-column prop="name2" label="资源类型" align="center"></el-table-column>
				<el-table-column prop="name3" label="数据库表" align="center"></el-table-column>
				<el-table-column prop="name4" label="数据来源" align="center"></el-table-column>
				<el-table-column prop="name5" label="资源描述" align="center"></el-table-column>
				<el-table-column prop="name6" label="配置类型" align="center"></el-table-column>
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
						<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">
							删除
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
		<el-dialog title="编辑" :visible.sync="editVisible" width="50%">
			<el-form ref="form" :model="form" label-width="70px">
				<el-form-item label="标题"><el-input v-model="form.title"></el-input></el-form-item>
				<el-form-item label="作者"><el-input v-model="form.who"></el-input></el-form-item>
				<quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveEdit">确 定</el-button>
			</span>
		</el-dialog>
		<el-dialog title="归档资源信息添加" :visible.sync="addVisible" width="50%">
			<el-form ref="form" :model="form" label-width="120px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="元信息名称"><el-input v-model="form.infoName"></el-input></el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="命名标识"><el-input v-model="form.nameType"></el-input></el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="资源类型">
							<el-select v-model="infoType" placeholder="请选择">
								<el-option
									v-for="item in infoTypeList"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="数据库表"><el-input v-model="form.dataList"></el-input></el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="配置类型">
							<el-select v-model="setType" placeholder="请选择">
								<el-option
									v-for="item in setTypeList"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="数据来源"><el-input v-model="form.dataIn"></el-input></el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="资源描述">
							<el-input v-model="form.fileWrite" style='height:100px;'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8" :offset='4'>
						<div 
							style='width: 150px;height:35px;background:#409EFF;line-height:35px;text-align:center;color:#fff;'
						>
							资源信息配置
						</div>
					</el-col>
				</el-row>
				<el-row>
					<el-button type="primary"><i class="el-icon-upload el-icon--right"></i>添加</el-button>
					<el-table
					    :data="tableData"
					    border
					    style="width: 100%;margin-top:15px;">
					    <el-table-column
					      prop="file"
					      label="监控目录"
					     >
					    </el-table-column>
					    <el-table-column
					      prop="isTrue"
					      label="是否启用"
					     >
					    </el-table-column>
					    <el-table-column
					      prop="set"
					      label="操作">
					    </el-table-column>
					  </el-table>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveAdd">确 定</el-button>
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
			tableData: [
				{
					name: 'LANDSAT8标准产品',
					name1: 'LANDSAT8',
					name2: '标准产品',
					name3: 'mssjzy_qxwxcpb',
					name4: '历史存档数据',
					name5: '',
					name6: 'xml'
				},
				{
					name: 'SPOT-6标准产品',
					name1: 'SPOT-6',
					name2: '标准产品',
					name3: 'jksjzy_qxwxcpb',
					name4: '历史存档数据',
					name5: '',
					name6: '文件名'
				}
			],
			multipleSelection: [],
			delList: [],
			editVisible: false,
			addVisible: false,
			pageTotal: 0,
			form: {},
			idx: -1,
			id: -1,
			content: '',
			editorOption: {
				placeholder: '新闻动态发布请输入...'
			},
			infoType: '',
			infoTypeList: [{ value: 1, label: '类型1' }],
			setType: '',
			setTypeList: [{ value: 1, label: '类型1' }]
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
			this.addVisible = true
		},
		// 编辑操作
		handleEdit(index, row) {
			this.idx = index
			this.form = row
			this.addVisible = true;
			// this.editVisible = true
		},
		// 保存编辑
		saveEdit() {
			this.editVisible = false
			this.$message.success(`修改第 ${this.idx + 1} 行成功`)
			this.$set(this.tableData, this.idx, this.form)
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
