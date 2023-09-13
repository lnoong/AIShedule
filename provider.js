async function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document)
{
  await loadTool("AIScheduleTools");
  let ownOriginalData = dom.getElementById("frame5201-002");
  let allOriginalDataByClassName = dom.getElementsByClassName("layui-layer-content");
  let allOriginalData = null;
  if(allOriginalDataByClassName.length > 0)
  {
    allOriginalData = allOriginalDataByClassName[0].getElementsByTagName("iframe")[0];
  }
  else 
  {
    allOriginalData = null;
  }
  let coursesInfo = null;
  let scheduleInfo = null;
  let dataType = dom.createElement("span");
  dataType.textContent  = "";
  if (ownOriginalData !== null && allOriginalData == null) 
  {
    //学分制选课课表
    dataType.textContent  = "OWN";
    coursesInfo = ownOriginalData.contentDocument.getElementById("GVxkall").cloneNode(true);
    scheduleInfo = ownOriginalData.contentDocument.getElementById("GVxkkb").cloneNode(true) ;
  }
  else if ((ownOriginalData == null && allOriginalData !== null)||(ownOriginalData !== null && allOriginalData !== null))
  {
    //所有班级课表
    dataType.textContent  = "ALL";
    coursesInfo = allOriginalData.contentDocument.getElementById("GVkbk").cloneNode(true);
    scheduleInfo = allOriginalData.contentDocument.getElementById("GVkb").cloneNode(true) ;
  }
  else 
  {
    await AIScheduleAlert("请打开课表页面");
    return "do not continue";
  }

  coursesInfo.className = "coursesInfo";
  scheduleInfo.className = "scheduleInfo";
  dataType.className = "dataType";

  let result = dom.createElement("div");
  result.append(coursesInfo);
  result.append(scheduleInfo);
  result.append(dataType);

  return result.innerHTML;
}