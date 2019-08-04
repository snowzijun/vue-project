import { Button, Pagination, Table, TableColumn } from 'element-ui'
import './index.scss'
/* eslint-disable no-unused-vars */
export default {
  props: {
    // 表格数据
    data: {
      type: Array,
      default: () => [
        {
          name: 'sssss'
        }
      ]
    },
    // 字段列信息
    columns: {
      type: Array,
      default: () => []
    },
    // 工具条按钮
    buttons: {
      type: Array,
      default: () => []
    },
    // 是否分页
    pagination: {
      type: Boolean,
      default: true
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 总条数
    total: {
      type: Number,
      default: 0
    },
    // 当前页码
    currentPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    // 渲染表格
    _renderTable(h) {
      const { data } = this
      return (
        <div class="gd-table__container">
          <Table data={data}>{this._renderColumns(h)}</Table>
        </div>
      )
    },
    // 渲染表格列
    _renderColumns(h) {
      const { columns } = this
      return columns.map(column => {
        const {
          prop,
          label,
          width,
          useSlot = false,
          // 如果存在操作按钮，则actions为非空数组
          actions = []
        } = column
        // 如果使用插槽
        if (useSlot) {
          const columnScope = this.$scopedSlots.column
          return (
            <TableColumn
              prop={prop}
              label={label}
              width={width}
              {...{
                scopedSlots: {
                  default: scope => {
                    return columnScope ? columnScope(scope) : scope.row[prop]
                  }
                }
              }}
            ></TableColumn>
          )
        } else if (actions && actions.length > 0) {
          // 操作列默认居右
          const { fixed = 'right' } = column
          return (
            <TableColumn
              label={label}
              width={width}
              fixed={fixed}
              {...{
                scopedSlots: {
                  default: ({ row, column, $index }) => {
                    return actions
                      .filter(({ before }) => {
                        return before ? before(row, column, $index) : true
                      })
                      .map(({ click, text, ...rest }) => {
                        const onClick = () => click(row, column, $index)
                        return (
                          <Button
                            {...{ props: rest }}
                            type="text"
                            onClick={onClick}
                          >
                            {text}
                          </Button>
                        )
                      })
                  }
                }
              }}
            ></TableColumn>
          )
        } else {
          return <TableColumn {...{ props: column }}></TableColumn>
        }
      })
    },
    // 渲染工具栏
    _renderToolbar(h) {
      const { buttons } = this
      // 工具条按钮
      let toolbarBtns = null
      if (buttons.length > 0) {
        toolbarBtns = buttons.map(({ text, click, ...rest }) => {
          return (
            <Button {...{ props: rest }} onClick={click}>
              {text}
            </Button>
          )
        })
      }
      return (
        <div class="gd-table__toolbar">
          <div class="gd-table__buttons">{toolbarBtns}</div>
          {/** 可以将自定义内容插入工具条 */}
          <slot name="toolbar"></slot>
        </div>
      )
    },
    // 渲染分页
    _renderPage(h) {
      const { pagination, pageSize, total, currentPage } = this
      return pagination ? (
        <div class="gd-table__page">
          <Pagination
            total={total}
            currentPage={currentPage}
            pageSize={pageSize}
          ></Pagination>
        </div>
      ) : null
    }
  },

  render(h) {
    return (
      <div class="gd-table">
        {this._renderToolbar(h)}
        {this._renderTable(h)}
        {this._renderPage(h)}
      </div>
    )
  }
}
