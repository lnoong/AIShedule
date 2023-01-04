async function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
  const ownClassFrame = dom.getElementById('frame5201-002')
  let course = null
  let classes = null
  if (ownClassFrame !== null) {
    //课程信息
    course = ownClassFrame.contentDocument.getElementById("GVxkall").cloneNode(true)
    //课表信息
    classes = ownClassFrame.contentDocument.getElementById("GVxkkb").cloneNode(true)
  }
  else {
    return null
  }
  course.className = "courses"
  classes.className = "classes"
  let result = dom.createElement("div")
  result.append(course)
  result.append(classes)
  return result.innerHTML
}