function weeksNumParser(weekRange, weekParity = "") 
{
  let weekRanges = weekRange.split(",");
  let result = [];
  for (let i = 0; i < weekRanges.length; i++) 
  {
    let range = weekRanges[i].split("-");
    for (let week = Number(range[0]); week <= Number(range[1]); week++) 
    {
      if (weekParity === "单" && week % 2 === 1) 
      {
        result.push(week);
      } 
      else if (weekParity === "双" && week % 2 === 0) 
      {
        result.push(week);
      } 
      else if (weekParity === "") 
      {
        result.push(week);
      }
    }
  }
  return result;
}


function ownCoursesParser($) 
{
  let trEle = $("table.coursesInfo").find("tr.dg1-item");
  let courses = new Map();
  for (let i = 0; i < trEle.length; i++) 
  {
    let tr = $(trEle[i]).children();
    let coursesName = $(tr[1]).text();
    let teacherName = $(tr[5]).text();
    teacherName = teacherName.split(";").join(" ");
    if (teacherName.substr(-1) === " ") 
    {
      teacherName = teacherName.slice(0, -1);
    }
    courses.set(coursesName, teacherName);
  }
  return courses;
}


function allCoursesParser($) 
{
  let trEle = $("table.coursesInfo").find("tr.dg1-item");
  let courses = new Map();
  for (let i = 0; i < trEle.length; i++) 
  {
    let tr = $(trEle[i]).children();
    let coursesName = $(tr[2]).text();
    let teacherName = $(tr[7]).text();
    teacherName = teacherName.split(";").join(" ");
    if (teacherName.substr(-1) === " ") 
    {
      teacherName = teacherName.slice(0, -1);
    }
    courses.set(coursesName, teacherName);
  }
  return courses;
}

function getScheduleInfo($) 
{
  let trEle = $("table.scheduleInfo").find("tr.dg1-item");
  let scheduleInfo = [];
  for (let classIndex = 0; classIndex < 12; classIndex++) 
  {
    let $rows = $(trEle[classIndex]).children();
    let rows = [];
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) 
    {
      rows[dayIndex] = $($rows[dayIndex + 1]).text();
    }
    scheduleInfo[classIndex] = rows; //外层是节数，内层是每天该节的课程信息
  }
  return scheduleInfo;
}


function ownScheduleParser(scheduleInfo,courses) 
{
  let result = [];
  for (let dayIndex = 0; dayIndex < 7; dayIndex++) 
  {
    for (let classIndex = 0; classIndex < 12; classIndex++) 
    {
      let sectionInfo = scheduleInfo[classIndex][dayIndex];
      sectionInfo = sectionInfo.replace(/\s\s\s\s+/g,"   ");
      let sectionInfoSplit = sectionInfo.split("/");
      sectionInfoSplit.splice(sectionInfoSplit.length-1,1);
      let tempClassIndex = classIndex + 1;
      let staticClassIndex = classIndex;
      for(let classNum = 0; classNum < sectionInfoSplit.length; classNum++)
      {
        sectionsArry = [];
        let classInfo = sectionInfoSplit[classNum].split(" ");
        sectionsArry.push(tempClassIndex);
        while(scheduleInfo[staticClassIndex][dayIndex] === scheduleInfo[tempClassIndex][dayIndex])
        {
          tempClassIndex++;
          classIndex++;
          sectionsArry.push(tempClassIndex);
        }
        tempClassIndex = staticClassIndex + 1;
        result.push({
          name: classInfo[0],
          position: classInfo[1],
          teacher: courses.get(classInfo[0]),
          weeks: weeksNumParser(classInfo[3], classInfo[2]),
          day: dayIndex + 1,
          sections: sectionsArry});
      }
    }
  }
  return result;
}

function allScheduleParser(scheduleInfo,courses) 
{
  let result = [];
  for (let dayIndex = 0; dayIndex < 7; dayIndex++) 
  {
    for (let classIndex = 0; classIndex < 12; classIndex++) 
    {
      let sectionInfo = scheduleInfo[classIndex][dayIndex];
      sectionInfo = sectionInfo.replace(/\s\s\s\s+/g,"   ");
      let sectionInfoSplit = sectionInfo.split("/");
      sectionInfoSplit.splice(sectionInfoSplit.length-1,1);
      let tempClassIndex = classIndex + 1;
      let staticClassIndex = classIndex;
      for(let classNum = 0; classNum < sectionInfoSplit.length; classNum++)
      {
        sectionsArry = [];
        let classInfo = sectionInfoSplit[classNum].split(" ");
        sectionsArry.push(tempClassIndex);
        while(scheduleInfo[staticClassIndex][dayIndex] === scheduleInfo[tempClassIndex][dayIndex])
        {
          tempClassIndex++;
          classIndex++;
          sectionsArry.push(tempClassIndex);
        }
        tempClassIndex = staticClassIndex + 1;
        result.push({
          name: classInfo[0],
          position: classInfo[2],
          teacher: courses.get(classInfo[0]),
          weeks: weeksNumParser(classInfo[4], classInfo[3]),
          day: dayIndex + 1,
          sections: sectionsArry});
      }
    }
  }
  return result;
}

function scheduleHtmlParser(html) 
{
  const $ = cheerio.load(html, { decodeEntities: false });
  let dataType = $("span.dataType").text();
  let courseInfo = null;
  let scheduleInfo = null;
  let result = null;

  if(dataType == "OWN")
  {
    courseInfo = ownCoursesParser($);
    scheduleInfo = getScheduleInfo($);
    result = ownScheduleParser(scheduleInfo,courseInfo);
  }
  else if(dataType == "ALL")
  {
    courseInfo = allCoursesParser($);
    scheduleInfo = getScheduleInfo($);
    result = allScheduleParser(scheduleInfo,courseInfo);
  }
  else
  {
    return "do not continue";
  }
  return result;
}
