async function scheduleTimer({providerRes,parserRes} = {}) 
{
  let dateEle = document.getElementById("topdv").getElementsByTagName('li')[0].textContent;
  let date = dateEle.replace(/\s+/g, '');
  
  let timeInfo = {
    totalWeek: 0,
    startSemester: "",
    startWithSunday: false,
    showWeekend: true,
    forenoon: 0,
    afternoon: 0,
    night: 0,
    sections: [
        { section: 1, startTime: "00:00", endTime: "00:00" },
        { section: 2, startTime: "00:00", endTime: "00:00" },
        { section: 3, startTime: "00:00", endTime: "00:00" },
        { section: 4, startTime: "00:00", endTime: "00:00" },
        { section: 5, startTime: "00:00", endTime: "00:00" },
        { section: 6, startTime: "00:00", endTime: "00:00" },
        { section: 7, startTime: "00:00", endTime: "00:00" },
        { section: 8, startTime: "00:00", endTime: "00:00" },
        { section: 9, startTime: "00:00", endTime: "00:00" },
        { section: 10, startTime: "00:00", endTime: "00:00" },
        { section: 11, startTime: "00:00", endTime: "00:00" },
        { section: 12, startTime: "00:00", endTime: "00:00" }]};

  let totalWeek = 19; // 总周数：[1, 30]之间的整数
  let startSemester = startTimeParser(date); // 开学时间：时间戳，13位长度字符串，推荐用代码生成
  let forenoon= 5; // 上午课程节数：[1, 10]之间的整数
  let afternoon= 4; // 下午课程节数：[0, 10]之间的整数
  let night=3;// 晚间课程节数：[0, 10]之间的整数
  let sections= 
  //2023/10/07起
  [
    { section: 1,  startTime: "08:00", endTime: "08:40" },
    { section: 2,  startTime: "08:45", endTime: "09:25" },
    { section: 3,  startTime: "09:35", endTime: "10:15" },
    { section: 4,  startTime: "10:25", endTime: "11:05" },
    { section: 5,  startTime: "11:10", endTime: "11:50" },

    { section: 6,  startTime: "13:30", endTime: "14:10" },
    { section: 7,  startTime: "14:15", endTime: "14:55" },
    { section: 8,  startTime: "15:05", endTime: "15:45" },
    { section: 9,  startTime: "15:50", endTime: "16:30" },

    { section: 10, startTime: "18:30", endTime: "19:10" },
    { section: 11, startTime: "19:15", endTime: "19:55" },
    { section: 12, startTime: "20:05", endTime: "20:45" }];





  /*2023/10/07前
  [
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
    { section: 12, startTime: "20:15", endTime: "21:00" }]; // 课程时间表，注意：总长度要和上边配置的节数加和对
  */

  timeInfo.totalWeek = totalWeek;
  timeInfo.startSemester = startSemester;
  timeInfo.forenoon = forenoon;
  timeInfo.afternoon = afternoon;
  timeInfo.night = night;
  timeInfo.sections = sections;
  return timeInfo;
}


function startTimeParser(dateString)
{
  //今天是星期二2023年9月12日23-24-1学期|第2周
  // 解析日期信息
  const dateParts = dateString.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
  const year = parseInt(dateParts[1]);
  const month = parseInt(dateParts[2]) - 1; // 月份从0开始计数，减1
  const day = parseInt(dateParts[3]);
  const weeksString = dateString.match(/第(\d+)周/);
  const weeks = parseInt(weeksString[1]);

  const currentDate = new Date(year, month, day);
  const currentDayOfWeek = currentDate.getDay();
  const firstWeekMonday = new Date(currentDate);
  firstWeekMonday.setDate(currentDate.getDate() - currentDayOfWeek + 1-7*(weeks-1));

  let startTimeStamp = "";
  startTimeStamp = firstWeekMonday.getTime().toString();
  return startTimeStamp;
}

