function weeks_parser(week_range, single_or_double_week = "") {
  let week_ranges = week_range.split(",")
  let result = []
  for (let i = 0; i < week_ranges.length; i++) {
    let range = week_ranges[i].split("-")
    for (let week = Number(range[0]); week <= Number(range[1]); week++) {
      if (single_or_double_week === "单" && week % 2 === 1) {
        result.push(week)
      } else if (single_or_double_week === "双" && week % 2 === 0) {
        result.push(week)
      } else if (single_or_double_week === "") {
        result.push(week)
      }
    }
  }

  return result
}

function get_courses($, mode = "") {
  let courses_ele = $("table.courses").find("tr.dg1-item")
  let courses = new Map()
  for (let i = 0; i < courses_ele.length; i++) {
    let tr_ele = $(courses_ele[i]).children()
    let courses_name = $(tr_ele[1]).text()
    let teacher = $(tr_ele[5]).text()
    teacher = teacher.split(";").join(" ")
    if (teacher.substr(-1) === " ") {
      teacher = teacher.slice(0, -1)
    }
    courses.set(courses_name, teacher)
  }
  return courses
}

function classParser(week_table,courses) {
  let result = []
  for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
    for (let classIndex = 0; classIndex < 12; classIndex++) {
      let sectionInfo = week_table[classIndex][dayIndex]
      sectionInfo=sectionInfo.replace(/\s\s\s\s+/g,"   ");
      let sectionInfoSplit = sectionInfo.split("/")
      sectionInfoSplit.splice(sectionInfoSplit.length-1,1)
      let tempClassIndex=classIndex+1
      let staticClassIndex=classIndex
      for(let classNum=0;classNum<sectionInfoSplit.length;classNum++){
        sectionsArry=[]
        let classInfo=sectionInfoSplit[classNum].split(" ")
        sectionsArry.push(tempClassIndex)
        while(week_table[staticClassIndex][dayIndex]===week_table[tempClassIndex][dayIndex]){
          tempClassIndex++
          classIndex++
          sectionsArry.push(tempClassIndex)
      }
      tempClassIndex=staticClassIndex+1
      result.push({
        name: classInfo[0],
        position: classInfo[1],
        teacher: courses.get(classInfo[0]),
        weeks: weeks_parser(classInfo[3], classInfo[2]),
        day: dayIndex + 1,
        sections: sectionsArry
      })
      }
    }
  }
  return result
}

function getClassInfo($) {
  let week_table_ele = $("table.classes").find("tr.dg1-item")
  let week_table = []
  for (let classIndex = 0; classIndex < 12; classIndex++) {
    let $lines = $(week_table_ele[classIndex]).children()
    let lines = []
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      lines[dayIndex] = $($lines[dayIndex + 1]).text()
    }
    week_table[classIndex] = lines//外层是节数，内层是每天该节的课程信息
  }
  return week_table
}

function scheduleHtmlParser(html) {
  const $ = cheerio.load(html, { decodeEntities: false })
  let result = []
  result = classParser(getClassInfo($, get_courses($, "")),get_courses($, ""))
  return result
}
