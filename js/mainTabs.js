

function openTab(evt, name) {

  var i, tabcontent, tablinks;

  //Hides elements in class tabcontent
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

//Changes color of the tab button
/*
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active","");
  }
*/
  document.getElementById(name).style.display = "block";
  evt.currentTarget.classname += "active";

}

function openContents(event, name, all, button) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("expand-contents");
  
  if (document.getElementById(name).style.display == "block") {
    document.getElementById(name).style.display = "none"
    document.getElementById(all).style.backgroundColor = "white";
    document.getElementById(button).style.backgroundColor = "initial";
    document.getElementById(button).style.hover.backgroundColor = "rgb(204, 204, 204)"
  } else {
    document.getElementById(name).style.display = "block"
    document.getElementById(all).style.backgroundColor = "rgb(204, 204, 204)";
    document.getElementById(button).style.backgroundColor = "rgb(204, 204, 204)";
  }
    /*
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  */
/*
  tablinks = document.getElementsByClassName("expand-button");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].classnme.replace("active", "");
  }
*/
  //document.getElementById(name).style.display = "block";
  //evt.currentTarget.classname += "active";

}