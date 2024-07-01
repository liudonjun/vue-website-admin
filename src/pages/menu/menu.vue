<template>
  <n-data-table :columns="columns" :data="data" :row-key="rowKey" default-expand-all />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { NDataTable } from 'naive-ui'

type RowData = {
  name: string
  index: string
  children?: RowData[]
}
export default defineComponent({
  components: {
    NDataTable
  },
  setup() {
    const data: RowData[] = [
      {
        name: '07akioni',
        index: '07',
        children: [
          {
            name: '08akioni',
            index: '08',
            children: [
              {
                name: '09akioni',
                index: '09'
              },
              {
                name: '10akioni',
                index: '10'
              }
            ]
          }
        ]
      },
      {
        name: '11akioni',
        index: '11'
      }
    ]
    const columns: DataTableColumns<RowData> = [
      {
        type: 'selection'
      },
      {
        title: 'name',
        key: 'name'
      },
      {
        title: 'index',
        key: 'index'
      }
    ]
    return {
      rowKey: (row: RowData) => row.index,
      columns,
      data
    }
  }
})
</script>