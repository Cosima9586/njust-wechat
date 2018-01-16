// pages/test/today.js
var app = getApp();

Page({
  data: {
    stv: {
      windowWidth: 0,
      lineWidth: 0,
      offset: 0,
      tStart: false
    },

    activeTab: 0,
    weeks: [], //['第 1 周', '第 2 周', ...]

    curYear: new Date().getFullYear(),
    curMonth: new Date().getMonth() + 1,
    curDate: new Date().getDate(),
    curDay: new Date().getDay(),
    curWeek: "第 1 周",
    tabs: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], //['周一\n15日', '周二\n16日', ...]
    classTable: '',
    activeClass: []
  },

  onLoad: function (options) {
      this.setData({
          classTable: app.globalData.classTable
      });
    /* 页面加载： 年、月、日、星期几，和对应校历的周数，并初始化tabs；
     * 4. 获取全部课表，初始化课表；
     * 5. 根据周数，更新课表页面
     */
    try {

      // 1. 获取窗口大小，设置ui；
      let { tabs } = this.data;
      var res = wx.getSystemInfoSync()
      this.windowWidth = res.windowWidth;
      this.data.stv.lineWidth = this.windowWidth / this.data.tabs.length;
      this.data.stv.windowWidth = res.windowWidth;
      this.setData({
        stv: this.data.stv,
        curMonth: new Date().getMonth() + 1,
        curYear: new Date().getFullYear()
      })

      // 2. 获取校历，初始化选择器的周数
      this.timeTable = app.globalData.timeTable;
      let keysofTimeTable = Object.keys(this.timeTable);

      for (let i in keysofTimeTable) {
        this.data.weeks.push('第 ' + keysofTimeTable[i] + ' 周');
      }
      this.setData(
        {
          weeks: this.data.weeks,
        }
      )

      //3. 获取当天信息：年、月、日、星期几，和对应校历的周数，并初始化tabs

      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let date = new Date().getDate();
      let day = new Date().getDay();

      let fullDate = year + '-' + month + '-' + date;
      let weekNum = this.getCurrentWeek(fullDate); // 当前周的数字形式
      let weekString = '第 ' + weekNum + ' 周'; // 当前周的字符串形式

      for (let i in this.timeTable[weekNum]){
        let tmp = this.timeTable[weekNum][i]
        this.data.tabs[i] = this.data.tabs[i].split('\n')[0] + '\n' + tmp.split('-')[2] + '日';
      }

      console.log(this.data.classTable);
      this.tabsCount =tabs.length;

      this.setData({ 
        tabs: this.data.tabs,
        curYear: year,
        curMonth: month,
        curDate: date,
        curDay: day,
        curWeek: weekString,
      });

      // 4. 获取全部课表，初始化课表；

      // TODO

      // 5. 根据周数，获取本周课表，初始化activeClass
      this._updateSelectedPage(this.data.curDay-1);

    } catch (e) {
    }
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)

    let selectedWeekDate = this.timeTable[(parseInt(e.detail.value) + 1) + ''][0];
    console.log(selectedWeekDate);

    this.setData({
      tabs: this.data.tabs,
      curWeek: this.data.weeks[e.detail.value],
      curMonth: selectedWeekDate.split('-')[1],
      curYear: selectedWeekDate.split('-')[0],
    });

    let curDay = parseInt(selectedWeekDate.split('-')[2])
    for (let i in this.data.tabs) {

      this.data.tabs[i] = this.data.tabs[i].split('\n')[0] + '\n ' + (curDay + parseInt(i)) + '日';
    }
    // console.log(this.data.tabs);

    this.setData({ tabs: this.data.tabs });

    this._updateSelectedPage(0);
  },

  getCurrentWeek: function (curDate) {
    let tmp = this.timeTable;
    for (let i in tmp) {
      for (let j of tmp[i]) {
        if (curDate == j) {
          return i;
        }
      }
    }
  },

  getActiveClass: function () {

    let week = parseInt(this.data.curWeek.split(' ')[1]);
    let day = parseInt(this.data.activeTab) + 1 + '';

    console.log("查询课程，第", week, '周， 星期', day);
    let allClass = this.data.classTable[day];

    let activeClass = [];
    let activeSession = [];
    for (let i in allClass) {
      let tmpWeeks = allClass[i]['weeks'];
      for (let j in tmpWeeks) {
        if (tmpWeeks[j] == week) {
          activeClass.push(allClass[i]);
          activeSession.push(allClass[i]['sessions'])
        }
      }
    }

    // console.log(activeSession)

    let retClass = [];
    
    let flag = 1;
    let len = activeClass.length;
    if(len == 0) {
      while (flag <= 13) {
        let emptyClass = {
          'name': '',
          'classroom': '',
          'teacher': '',
          'sessions': [flag]
        };
        retClass.push(emptyClass);
        flag++;
      }
    }
    for (let i in activeClass) {
      let session = activeClass[i]['sessions']
      if (flag == session[0]) {
        retClass.push(activeClass[i]);
        flag = session[session.length - 1] + 1;
      } else {
          while (flag < activeClass[i]['sessions'][0]) {
            let emptyClass = {
              'name': '',
              'classroom': '',
              'teacher': '',
              'sessions': [flag]
            };
            retClass.push(emptyClass);
            flag++;
          }
          retClass.push(activeClass[i]);
          flag = session[session.length - 1] + 1; 
      }
      if (i == len - 1) {
        while (flag <= 13) {
          let emptyClass = {
            'name': '',
            'classroom': '',
            'teacher': '',
            'sessions': [flag]
          };
          retClass.push(emptyClass);
          flag++;
        }
      }
    }

    // console.log(retClass)

    this.setData({
      activeClass: retClass
    });
  },
  handlerStart(e) {
    let { clientX, clientY } = e.touches[0];
    this.startX = clientX;
    this.tapStartX = clientX;
    this.tapStartY = clientY;
    this.data.stv.tStart = true;
    this.tapStartTime = e.timeStamp;
    this.setData({ stv: this.data.stv })
  },
  handlerMove(e) {
    let { clientX, clientY } = e.touches[0];
    let { stv } = this.data;
    let offsetX = this.startX - clientX;
    this.startX = clientX;
    stv.offset += offsetX;
    if (stv.offset <= 0) {
      stv.offset = 0;
    } else if (stv.offset >= stv.windowWidth * (this.tabsCount - 1)) {
      stv.offset = stv.windowWidth * (this.tabsCount - 1);
    }
    this.setData({ stv: stv });
  },
  handlerCancel(e) {

  },
  handlerEnd(e) {
    let { clientX, clientY } = e.changedTouches[0];
    let endTime = e.timeStamp;
    let { tabs, stv, activeTab } = this.data;
    let { offset, windowWidth } = stv;
    //快速滑动
    if (endTime - this.tapStartTime <= 300) {
      //向左
      if (Math.abs(this.tapStartY - clientY) < 50) {
        if (this.tapStartX - clientX > 5) {
          if (activeTab < this.tabsCount - 1) {
            this.setData({ activeTab: ++activeTab })
          }
        } else {
          if (activeTab > 0) {
            this.setData({ activeTab: --activeTab })
          }
        }
        stv.offset = stv.windowWidth * activeTab;
      } else {
        //快速滑动 但是Y距离大于50 所以用户是左右滚动
        let page = Math.round(offset / windowWidth);
        if (activeTab != page) {
          this.setData({ activeTab: page })
        }
        stv.offset = stv.windowWidth * page;
      }
    } else {
      let page = Math.round(offset / windowWidth);
      if (activeTab != page) {
        this.setData({ activeTab: page })
      }

      stv.offset = stv.windowWidth * page;
    }
    stv.tStart = false;
    this.setData({ stv: this.data.stv })
    this.data.activeClass = this.getActiveClass();
  },

  // page从0开始标记
  _updateSelectedPage(page) {
    // ui的更新
    let { tabs, stv, activeTab } = this.data;
    activeTab = page;
    this.setData({ activeTab: activeTab })
    stv.offset = stv.windowWidth * activeTab;
    this.setData({ stv: this.data.stv })

    // 当前课表的更新
    this.data.activeClass = this.getActiveClass();
  },
  handlerTabTap(e) {
    this._updateSelectedPage(e.currentTarget.dataset.index);
  },

  lower: function (e) {
    console.log(e)
  },
})