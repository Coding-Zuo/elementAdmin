<template>
	<div class='dataMigration'>
		<div class="crumbs">
		    <el-breadcrumb separator="/">
		        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 人工数据迁移</el-breadcrumb-item>
<!--		        <el-breadcrumb-item>人工数据迁移</el-breadcrumb-item>-->
		    </el-breadcrumb>
		</div>
		<div class='container'>
			<!-- 搜索start -->
			<div class='search'>
				<el-col :span='6'>
					<div class='data-select'>
						<el-card class="box-card">
						  <div slot="header" class="clearfix">
						    <span>数据集选择</span>
						  </div>
						  <div class="text item">
						    <el-checkbox v-model="product">产品数据集</el-checkbox>
						  </div>
							<div class="text item">
							  <el-checkbox v-model="oasear">OASEar th数据集</el-checkbox>
							</div>
						</el-card>
					</div>
				</el-col>
				<el-col :span='18'>
					<el-form ref="form" label-width="120px" style='padding: 0 20px;'>
					 <el-row>
						 <el-col :span='12'>
							 <el-form-item label="数据入库时间:">
								 <el-date-picker
									 v-model="date"
									 type="datetimerange"
									 range-separator="至"
									 start-placeholder="开始日期"
									 end-placeholder="结束日期"
									>
								 </el-date-picker>
							 </el-form-item>
						 </el-col>
					 </el-row>
					 <el-row>
						 <el-col :span='12'>
							 <el-form-item label="卫星名称:">
								<el-select v-model="satelliteName" placeholder="请选择">
									<el-option
										v-for="item in satelliteList"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							 </el-form-item>
						 </el-col>
						 <el-col :span='12'>
							 <el-form-item label="传感器:">
								<el-select v-model="sensorName" placeholder="请选择">
									<el-option
										v-for="item in sensorList"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							 </el-form-item>
						 </el-col>
					 </el-row>
					 <el-row>
						 <el-col :span='12'>
							 <el-form-item label="数据业务属性:">
								<el-select v-model="dataBusiness" placeholder="请选择">
									<el-option
										v-for="item in dataBusinessList"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							 </el-form-item>
						 </el-col>
						 <el-col :span='12'>
							 <el-form-item label="数据共享级别:">
								<el-select v-model="dataShare" placeholder="请选择">
									<el-option
										v-for="item in dataShareList"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							 </el-form-item>
						 </el-col>
					 </el-row>
					 <el-row>
						 <el-col :span='12'>
							 <el-form-item label="分辨率:">
								<el-select v-model="dpi" placeholder="请选择">
									<el-option
										v-for="item in dpiList"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							 </el-form-item>
						 </el-col>
						 <el-col :span='12'>
							 <el-form-item label="迁移目的存储区:">
								<el-select v-model="migration" placeholder="请选择">
									<el-option
										v-for="item in migrationList"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
							 </el-form-item>
						 </el-col>
					 </el-row>
					 <el-row class='data-map'>
						 <el-col :span='20'>
							 <el-tabs type="border-card">
							   <el-tab-pane label="数据集选择">
									 <el-row>
										 <el-col :span='12'>
											 <el-form-item label="左上经度:">
												<el-select v-model="leftTop1" placeholder="请选择">
													<el-option
														v-for="item in leftTop1List"
														:key="item.value"
														:label="item.label"
														:value="item.value">
													</el-option>
												</el-select>
											 </el-form-item>
										 </el-col>
										 <el-col :span='12'>
											 <el-form-item label="左上推度:">
												<el-select v-model="leftTop2" placeholder="请选择">
													<el-option
														v-for="item in leftTop2List"
														:key="item.value"
														:label="item.label"
														:value="item.value">
													</el-option>
												</el-select>
											 </el-form-item>
										 </el-col>
									 </el-row>
									 <el-row>
										 <el-col :span='12'>
											 <el-form-item label="右下经度:">
												<el-select v-model="rightBottom1" placeholder="请选择">
													<el-option
														v-for="item in rightBottom1List"
														:key="item.value"
														:label="item.label"
														:value="item.value">
													</el-option>
												</el-select>
											 </el-form-item>
										 </el-col>
										 <el-col :span='12'>
											 <el-form-item label="右下推度:">
												<el-select v-model="rightBottom2" placeholder="请选择">
													<el-option
														v-for="item in rightBottom2List"
														:key="item.value"
														:label="item.label"
														:value="item.value">
													</el-option>
												</el-select>
											 </el-form-item>
										 </el-col>
									 </el-row>
								 </el-tab-pane>
							   <el-tab-pane label="SHAPE文件导入">
									 SHAPE文件导入
								 </el-tab-pane>
							 </el-tabs>
						 </el-col>
						 <el-col :span='4' class='search-btn'>
							 <el-button 
								type="primary" 
								size="medium" 
								style='margin-left:10px;'
							>
								查询
							</el-button>
							 <el-button 
								type="primary" 
								size="medium"
								style='margin-left:10px;margin-top:10px;'
							>
								数据迁移
							</el-button>
						 </el-col>
					 </el-row>
					</el-form>
				</el-col>
			</div>
			<!-- 搜索end -->
			<div class='partition'></div>
			<!-- 表格seart -->
			<!-- 表格end -->
			<div>
				<el-table
					ref="multipleTable"
					:data="tableData"
					tooltip-effect="dark"
					border=true
					style="width: 100%;margin-top: 10px;"
					@selection-change="handleSelectionChange">
					<el-table-column
						type="selection"
					>
					</el-table-column>
					<el-table-column
						label="数据ID"
						prop='id'
					>
						
					</el-table-column>
					<el-table-column
						prop="name"
						label="卫星名称"
					>
					</el-table-column>
					<el-table-column
						prop="address"
						label="传感器"
						show-overflow-tooltip>
					</el-table-column>
					<el-table-column
						prop="date"
						label="入库时间"
						show-overflow-tooltip>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'dataMigration',
		data() {
			return {
				product: false, //产品数据集
				oasear: false, //oasear数据集
				date: [new Date(), new Date()], //选中日期
				satelliteName: '', //选中卫星名称
				satelliteList:[ //卫星列表
					{value: '01',label: '卫星一'},
					{value: '02',label: '卫星二'},
					{value: '03',label: '卫星三'},
				], 
				sensorName: '', //传感器名称
				sensorList: [ //传感器列表
					{value: '01',label: 'KBCK'},
					{value: '02',label: 'KBCJ'},
					{value: '03',label: 'HBUD'},
				],
				dataBusiness: '', //数据业务属性
				dataBusinessList: [ //数据业务属性列表
					{value: '01',label: '共享'},
					{value: '02',label: '独享'},
				],
				dataShare: '', //数据共享
				dataShareList: [ //数据共享列表
					{value: '01',label: '共享级别1'},
					{value: '02',label: '共享级别2'},
				],
				dpi: '', //分辨率
				dpiList: [ //分辨率列表
					{value: '01',label: '1024'},
					{value: '02',label: '1920'},
				],
				migration: '', //迁移目的存储地
				migrationList: [ //迁移目标列表
					{value: '01',label: '存储区A'},
					{value: '02',label: '存储区B'},
				],
				leftTop1: '',
				leftTop1List: [
					{value: '01',label: '114.1'},
					{value: '02',label: '108.6'},
				],
				leftTop2: '',
				leftTop2List: [
					{value: '01',label: '45'},
					{value: '02',label: '63'},
				],
				rightBottom1: '',
				rightBottom1List: [
					{value: '01',label: '114.1'},
					{value: '02',label: '108.6'},
				],
				rightBottom2: '',
				rightBottom2List: [
					{value: '01',label: '45'},
					{value: '02',label: '63'},
				],
				tableData: [{
					id: 1,
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					id: 2,
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					id: 3,
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					id: 4,
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					id: 5,
					date: '2016-05-08',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					id: 6,
					date: '2016-05-06',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					id: 7,
					date: '2016-05-07',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}],
				multipleSelection: []
			}
		},
		methods: {
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			}
		}
	}
</script>

<style>
	.container {
		overflow: auto;
	}
	
	.search {
		overflow: auto;
	}
	
	.data-map {
		position: relative;
	}
	
	.data-map .search-btn {
		position: absolute;
		right: 0;
		bottom: 0;
	}
	
	.partition {
		margin-top: 10px;
		height: 10px;
		background: #eee;
	}
</style>
