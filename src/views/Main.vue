<template>
  <el-container style="height: 100%;">
    <el-header class="header">
      <el-row style="height: 100%;">
        <el-col :span="2" class="logo">
          <img :src="require('../assets/giada.png')" alt />
        </el-col>
        <el-col :span="16" class="title">JAHC高可靠无人值守系统</el-col>
        <el-col :span="5" class="time">
          <span>2019/09/30 12:30:22 周四</span>
          <el-popover popper-class="device-info-wrapper" placement="bottom" width="200" trigger="click">
            <h3>
              <img :src="require('../assets/device_info.png')" alt="">
              <span>设备信息</span>
            </h3>
            <el-divider></el-divider>
            <ul class="device-info-list">
              <li>
                <p>IP地址</p>
                <p>10.10.10.1</p>
              </li>
              <li>
                <p>物理地址</p>
                <p>AC-74-09-03-29-D3</p>
              </li>
              <li>
                <p>端口号</p>
                <p>65535</p>
              </li>
            </ul>
            <el-divider></el-divider>
            <h3>
              <img :src="require('../assets/log_out.png')" alt="">
              <span>退出登录</span>
            </h3>
            <img
              slot="reference"
              width="28"
              height="26"
              style="vertical-align:middle;margin-bottom:5px;cursor:pointer;"
              :src="require('@/assets/time_info.png')"
              alt
            />
          </el-popover>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="128px" style="height: 100%;">
        <el-menu
          default-active="1"
          class="main-menu"
          background-color="#0B154A"
          text-color="#fff"
          active-text-color="#fff"
          style="height: 100%;"
        >
          <el-menu-item index="1">
            <i class="el-icon-alarm-clock"></i>
            <span slot="title">定时开关机</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-s-order"></i>
            <span slot="title">日志</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-time"></i>
            <span slot="title">时区设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <el-card class="box-card">
          <el-form
            :inline="true"
            :model="searchForm"
            size="small"
            label-position="top"
            class="search-form"
          >
            <el-form-item label="设备状态">
              <el-select class="search-input" v-model="searchForm.device_state">
                <el-option label="全部" value="0"></el-option>
                <el-option label="开启" value="1"></el-option>
                <el-option label="关闭" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="IP地址">
              <el-input class="search-input" v-model="searchForm.ip" placeholder="请输入IP地址"></el-input>
            </el-form-item>
            <el-form-item label="物理地址">
              <el-input
                class="search-input"
                v-model="searchForm.physical_address"
                placeholder="请输入物理地址"
              ></el-input>
            </el-form-item>
            <el-form-item label="设备名称">
              <el-input class="search-input" v-model="searchForm.name" placeholder="请输入设备名称"></el-input>
            </el-form-item>
            <el-form-item label="下次关机时间">
              <el-date-picker
                class="search-input"
                v-model="searchForm.next_close"
                type="datetime"
                placeholder="选择关机时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="下次开机时间">
              <el-date-picker
                class="search-input"
                v-model="searchForm.next_start"
                type="datetime"
                placeholder="选择开机时间"
              ></el-date-picker>
            </el-form-item>
            <el-button type="primary" size="small">查询</el-button>
            <el-button type="plain" size="small" @click="dialogVisible = true">批量设置</el-button>
          </el-form>
        </el-card>
        <el-card style="margin-top:20px;" class="table-card">
          <el-table
            ref="multipleTable"
            :data="tableData"
            border
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="state" label="设备状态" class-name="state" width="80">
              <template slot-scope="scope">
                <img
                  width="16"
                  style="vertical-align:middle;"
                  :src="require(`@/assets/state${scope.row.state}.png`)"
                  alt
                />
                <span
                  :class="'state'+scope.row.state"
                  style="margin-left:5px;"
                >{{scope.row.state | stateFilter}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="device" label="设备" width="238"></el-table-column>
            <el-table-column prop="ip" label="IP地址" show-overflow-tooltip></el-table-column>
            <el-table-column prop="physical_address" label="物理地址" show-overflow-tooltip></el-table-column>
            <el-table-column prop="close" sortable label="下次关机时间" class-name="close"></el-table-column>
            <el-table-column prop="start" sortable label="下次开机时间" class-name="start"></el-table-column>
            <el-table-column label="编辑" width="80">
              <el-button type="text" size="small">开关机设置</el-button>
            </el-table-column>
          </el-table>
          <div class="paginator-wrapper">
            <div class="device-info"></div>
            <el-pagination
              class="pagination"
              small
              :current-page.sync="currentPage1"
              :page-size="100"
              layout="total, prev, pager, next"
              :total="1000"
            ></el-pagination>
          </div>
        </el-card>
      </el-main>
    </el-container>
    <el-dialog :visible.sync="dialogVisible" custom-class="start-close-box" width="540">
      <template slot="title">
        <span style="margin-right: 60px;">定时开关机设置</span>
        <el-select class="devices-select" v-model="value1" size="small" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </template>
      <div style="margin: 0 auto 10px;width: 500px;">
        <el-radio-group v-model="radio2" size="medium">
          <el-radio-button label="周一"></el-radio-button>
          <el-radio-button label="周二"></el-radio-button>
          <el-radio-button label="周三"></el-radio-button>
          <el-radio-button label="周四"></el-radio-button>
          <el-radio-button label="周五"></el-radio-button>
          <el-radio-button label="周六"></el-radio-button>
          <el-radio-button label="周日"></el-radio-button>
        </el-radio-group>
      </div>
      <el-table :data="timeTable" :row-class-name="handleRowStyle" style="width: 100%">
        <el-table-column width="30">
          <template slot-scope="scope">
            <el-radio v-model="activeRow" @change="handleTimeChange" :label="scope.$index"></el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="时间段">
          <template slot-scope="scope">第{{scope.$index + 1}}段</template>
        </el-table-column>
        <el-table-column prop="start" label="开机时间">
          <template slot-scope="scope">
            <el-time-select
              :class="{'time-select-box':true}"
              class="start"
              placeholder="起始时间"
              v-model="scope.row.start"
            ></el-time-select>
          </template>
        </el-table-column>
        <el-table-column label="关机时间">
          <template slot-scope="scope">
            <el-time-select
              :class="{'time-select-box':true}"
              class="close"
              placeholder="关机时间"
              v-model="scope.row.close"
            ></el-time-select>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <div class="next-time">
          <div class="start">
            <h5>下次开机时间</h5>
            <p>2019/09/30 12:30:22 周四</p>
          </div>
          <div class="close">
            <h5>下次开机时间</h5>
            <p>2019/09/30 12:30:22 周四</p>
          </div>
        </div>
        <div class="button-wrapper">
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      currentPage1: 1,
      activeRow: 0,
      radio2: '周一',
      dialogVisible: false,
      timeTable: [
        { start: '05:00', close: '06:00' },
        { start: '07:00', close: '06:00' },
        { start: '08:00', close: '06:00' }
      ],
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value1: [],
      tableData: [
        {
          state: '1',
          device: '/dev/md0p1',
          ip: '192.168.1.1',
          physical_address: 'A1-B1-G1-Z1-S1-F1',
          close: '2019/09/30  12:30:22  周四',
          start: '2019/09/30  12:30:23  周四'
        },
        {
          state: '2',
          device: '/dev/md0p1',
          ip: '192.168.1.1',
          physical_address: 'A1-B1-G1-Z1-S1-F1',
          close: '2019/09/30  12:30:22  周四',
          start: '2019/09/30  12:30:23  周四'
        }
      ],
      searchForm: {
        ip: '',
        physical_address: '',
        name: '',
        next_close: '',
        next_start: '',
        device_state: ''
      }
    }
  },
  methods: {
    handleTimeChange(label) {
      this.activeRow = label
    },
    handleRowStyle({ row, rowIndex }) {
      if (this.activeRow === rowIndex) {
        return 'active'
      }
    }
  },
  filters: {
    stateFilter(state) {
      let result = ''
      switch (state) {
        case '1':
          result = '在线'
          break
        case '2':
          result = '离线'
          break
        case '3':
          result = '修复中'
          break
        case '4':
          result = '异常'
          break
        default:
          break
      }
      return result
    }
  }
}
</script>

<style lang="stylus" scoped>
.devices-select
  width 302px
.time-select-box
  width 132px
.device-info-list
  padding-left 40px
  box-sizing border-box
  li
    padding 5px 0
    &:not(:last-child)
      border-bottom 1px solid #dcdfe6
.main
  background-color #F0F2F5
  .table-card
    .paginator-wrapper
      display flex
      margin-top 5px
      .device-info
        flex 3
      .pagination
        flex 1
  .search-form
    .search-input
      width 304px
      height 32px
    button
      margin-top 42px
  .el-table
    /deep/ th, /deep/ td
      height 36px
      padding 0
    /deep/ tbody
      td
        border-right 0
    /deep/ tbody .state
      .state1
        color #69C0FF
      .state2
        color #FF7875
      .state3
        color #FFD666
      .state4
        color #FF9C6E
    /deep/ tbody .close
      color #FF9C6E
    /deep/ tbody .start
      color #69C0FF
.header
  padding 0
  height 64px
  line-height 64px
  .title
    text-align center
  .time
    text-align right
    span
      &:first-child
        color #3B6FE6
      margin-right 20px
  .logo
    display flex
    justify-content center
    align-items center
    width 127px
    height 100%
    text-align center
    background #0B154A
    img
      width 88px
      height 28px
.main-menu
  background #0B154A
  /deep/ .el-menu-item
    display flex
    flex-direction column
    justify-content center
    align-items center
    height 128px
    &.is-active
      background-color #3B6FE6 !important
    i
      font-size 30px

.device-info-wrapper
  h3
    display flex
    align-items center
    height 26px
    img
      margin-right 5px
</style>
