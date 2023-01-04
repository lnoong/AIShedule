/**
 * 时间配置函数，此为入口函数，不要改动函数名
 */
async function scheduleTimer({
  providerRes,
  parserRes
} = {}) {
  return {
      totalWeek: 19, // 总周数：[1, 30]之间的整数
      startSemester: '', // 开学时间：时间戳，13位长度字符串，推荐用代码生成
      startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
      showWeekend: true, // 是否显示周末
      forenoon: 5, // 上午课程节数：[1, 10]之间的整数
      afternoon: 4, // 下午课程节数：[0, 10]之间的整数
      night: 3, // 晚间课程节数：[0, 10]之间的整数
      sections: [
          { section: 1, startTime: "08:00", endTime: "08:45" },
          { section: 2, startTime: "08:50", endTime: "09:35" },
          { section: 3, startTime: "09:45", endTime: "10:30" },
          { section: 4, startTime: "10:40", endTime: "11:25" },
          { section: 5, startTime: "11:30", endTime: "12:15" },
          { section: 6, startTime: "13:30", endTime: "14:15" },
          { section: 7, startTime: "14:20", endTime: "15:05" },
          { section: 8, startTime: "15:15", endTime: "16:00" },
          { section: 9, startTime: "16:05", endTime: "16:50" },
          { section: 10, startTime: "18:30", endTime: "19:15" },
          { section: 11, startTime: "19:20", endTime: "20:05" },
          { section: 12, startTime: "20:15", endTime: "21:00" }
      ], // 课程时间表，注意：总长度要和上边配置的节数加和对
  }
}
