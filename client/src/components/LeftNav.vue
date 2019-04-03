<template>
  <el-row class="menu_page">
    <el-col >
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff">
        <router-link to="/home">
          <el-menu-item index="0">
            <span slot="title">首页</span>
          </el-menu-item>
          <div v-for="item in items" :key="item.name">
            <el-submenu v-if="item.children" :index="item.path" :key="item.path">
              <div slot="title">
                <span>{{item.name}}</span>
              </div>
              <router-link v-for="(citem,cindex) in item.children" :to="citem.path"  :key="cindex">
                <el-menu-item :index="cindex.path">
                  <span slot="title">{{citem.name}}</span>
                </el-menu-item>
              </router-link>
            </el-submenu>
          </div>
        </router-link>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'left-nav',
  data() {
    return {
      items: [
        {
          name: '资金管理',
          path: "fund",
          children: [
            { path: "fundlist", name:"资金流水" }
          ]
        },
        {
          name: '信息管理',
          path: "info",
          children: [
            { path: "infoshow", name:"个人信息" }
          ]
        }
      ]
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 150px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 150px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>