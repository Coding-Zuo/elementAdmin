<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>

                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>

                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">{{
                                    threeItem.title
                                }}</el-menu-item>
                            </el-submenu>

                            <!-- v-show="isAuth(subItem.number)" -->
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>

                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-s-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-monitor',
                    title: '系统监控',
                    index: '1',
                    subs: [
                        {
                            index: 'waibu',
                            title: '设备监控',
                            subs: [
                                {
                                    index: 'waibu',
                                    title: '设备监控'
                                },
                                {
                                    index: 'charts1',
                                    title: '日志'
                                }
                            ]
                        },
                        {
                            index: 'charts1',
                            title: '日志'
                        }
                    ]
                },
                {
                    icon: 'el-icon-document-copy',
                    index: '2',
                    title: '数据归档',
                    subs: [
                        {
                            index: 'Finished',
                            title: '已完成任务管理'
                        },
                        {
                            index: 'Implement',
                            title: '在执行任务管理'
                        },
                        {
                            index: 'Pending',
                            title: '待处理任务管理'
                        },
                        {
                            index: 'DataZip',
                            title: '资源信息配置'
                        }
                    ]
                },
                {
                    icon: 'el-icon-files',
                    title: '数据维护管理',
                    index: '3',
                    subs: [
                        {
                            index: 'DataQuery',
                            title: '数据查询维护'
                        },
                        {
                            index: 'DataAttribute',
                            title: '数据属性维护'
                        },
                        {
                            index: 'storage',
                            title: '存储区维护'
                        },
                        {
                            index: 'huishou',
                            title: '数据回收站'
                        }
                        // {
                        //     index: 'editor',
                        //     title: '人工数据迁移'
                        // }, {
                        //     index: 'editor1',
                        //     title: '人工数据交汇'
                        // }, {
                        //     index: 'editor2',
                        //     title: '人工数据流转'
                        // }, {
                        //     index: 'dialog1',
                        //     title: '人工数据清理'
                        // },
                    ]
                },
                {
                    icon: 'el-icon-c-scale-to-original',
                    title: '数据策略管理',
                    index: '4',
                    subs: [
                        {
                            index: 'Service',
                            title: '数据流转服务策略管理'
                        },
                        {
                            index: 'strategy',
                            title: '数据汇交策略管理'
                        },
                        {
                            index: 'qianyi',
                            title: '数据迁移策略管理'
                        },
                        {
                            index: 'shengming',
                            title: '数据生命周期策略管理'
                        }
                    ]
                },
                {
                    icon: 'el-icon-suitcase',
                    index: '5',
                    title: '门户网站管理',
                    subs: [
                        // {
                        //     index: 'orders',
                        //     title: '订单处理'
                        // },
                        {
                            index: '5-2',
                            title: '信息发布',
                            subs: [
                                {
                                    index: 'News',
                                    title: '新闻动态发布'
                                },
                                // {
                                //     index: 'Hangye',
                                //     title: '行业报道发布'
                                // },
                                {
                                    index: 'Tongzhi',
                                    title: '通知公告发布'
                                },
                                {
                                    index: 'weixingjieshao',
                                    title: '卫星介绍发布'
                                }
                                // {
                                //     index: 'Fagui',
                                //     title: '法规标准发布'
                                // },
                                // {
                                //     index: 'Chanpin',
                                //     title: '数据产品发布'
                                // },
                            ]
                        },
                        {
                            index: 'swapper1',
                            title: '影像展厅资源配置'
                        },
                        {
                            index: 'swapper',
                            title: '轮播图静态资源配置'
                        }
                    ]
                },
                {
                    icon: 'el-icon-s-custom',
                    title: '管理员权限管理',
                    index: '6',
                    subs: [
                        // {
                        //     index: 'DataOperationAuth',
                        //     title: '数据操作权限管理'
                        // },
                        {
                            index: 'DefautAttribute',
                            title: '数据默认业务属性管理'
                        },
                        {
                            index: 'DataOperationAuth1',
                            title: '数据操作权限管理'
                        },
                        {
                            index: 'DataCollection',
                            title: '数据集合管理'
                        },
                        {
                            index: 'AdminDataScope',
                            title: '管理员管辖数据范围配置'
                        },
                        {
                            index: 'Characteristic',
                            title: '管理员角色权限管理'
                        },
                        {
                            index: 'Users',
                            title: '管理员用户角色配置'
                        }
                    ]
                },
                {
                    icon: 'el-icon-user',
                    title: '网站用户权限管理',
                    index: '7',
                    subs: [
                        {
                            index: 'DataOperationAuth',
                            title: '数据操作权限管理'
                        },
                        {
                            index: 'Characteristic1',
                            title: '网站用户角色权限管理'
                        },
                        {
                            index: 'Users1',
                            title: '网站用户角色配置'
                        }
                    ]
                }

                // {
                //     icon: 'el-icon-lx-emoji',
                //     title: '数据交互服务',
                //     index: '4',
                //     subs: [
                //
                //         {
                //             index: 'ServiceReceiveAddress',
                //             title: '数据流转服务接收地址管理'
                //         },
                //
                //         {
                //             index: 'DataReceiveAddress',
                //             title: '数据汇交服务接收地址管理'
                //         }
                //     ]
                // },

                // {
                //     icon: 'el-icon-rank',
                //     index: '6',
                //     title: '用户权限管理',
                //     subs: [
                //         {
                //             index: 'drag',
                //             title: '拖拽列表'
                //         },
                //         {
                //             index: 'dialog',
                //             title: '拖拽弹框'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-global',
                //     index: 'i18n',
                //     title: '国际化功能'
                // },
                // {
                //     icon: 'el-icon-lx-warn',
                //     index: '7',
                //     title: '错误处理',
                //     subs: [
                //         {
                //             index: 'permission',
                //             title: '权限测试'
                //         },
                //         {
                //             index: '404',
                //             title: '404页面'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-redpacket_fill',
                //     index: '/donate',
                //     title: '支持作者'
                // }
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', (msg) => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    },
    methods: {
        isAuth(num) {
            var auth = [1000, 2000, 3000];
            // for (var i = 0; i < auth.length; i++) {
            //     if (num === auth[i]) {
            //         return false
            //     }
            // }
        }
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
