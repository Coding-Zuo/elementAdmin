<template>
    <!-- 管理员权限修改 -->
    <div>
        <el-dialog :title="addOrEditTitle ? '用户信息新增' : '用户信息编辑'" :visible.sync="adminAuthVisible" width="50%">
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="adminAuthVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUserinfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'AdminAuth',
    data () {
        return {
            adminAuthVisible: false, // 弹框显示隐藏


        }
    },
    created () {},
    methods: {
        // 获取所有角色列表
        // 
    }
}
</script>

<style>

</style>