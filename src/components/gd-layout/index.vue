<template>
  <el-container>
    <el-header>
      <gd-header />
    </el-header>
    <el-container>
      <el-aside>
        <gd-aside />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import GdAside from './components/aside'
import GdHeader from './components/header'
export default {
  name: 'GdLayout',
  components: {
    GdAside,
    GdHeader
  }
}
</script>
