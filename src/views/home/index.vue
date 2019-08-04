<template>
  <div>
    <gd-table :buttons="buttons" :columns="columns">
      <template v-slot:column="scope">
        {{ scope.row.sex }}
      </template>
    </gd-table>
  </div>
</template>
<script>
import { GdTable } from '@/components'
export default {
  components: {
    GdTable
  },
  data: function() {
    return {
      buttons: [
        {
          text: 'dsdsds',
          id: '测试',
          disabled: false,
          click: () => {
            // 点击按钮时禁用按钮
            this.buttons[0].disabled = true
          }
        }
      ],
      columns: [
        {
          prop: 'name',
          label: '标题'
        },
        {
          prop: 'sex',
          label: '性别',
          useSlot: true
        },
        {
          label: '操作',
          actions: [
            {
              id: 'a',
              // text: '确定',
              icon: 'el-icon-edit',
              click: row => {
                alert(row.name)
              }
            }
          ]
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped></style>
