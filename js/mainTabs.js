

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
    //document.getElementById(button).style.hover.backgroundColor = "rgb(204, 204, 204)"
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

function getDatasets() {
  let dataset_info = '';
  $.ajax({
    url: "http://navigator.oceansdata.ca/api/datasets/?id", success: function(result){
      dataset_info = result;
      console.warn(dataset_info);
      new_row = 0;
      dataset_buttons = '<table style="width: 100%"><h4>Dataset  (id)<h4>';
      size = dataset_info.length;
      console.warn(size)
      for (let i in result) {
        current_dataset = dataset_info[i]

        if (i == new_row) {
          dataset_buttons += '<tr style="width: 100%; height: 40px">'
          new_row += 5
        }

        dataset_buttons += '<td style="width: 20%; height: 40px; padding: 1px">'
        button_content = current_dataset['value'] + " (" + current_dataset['id'] + ")";
        dataset_buttons += '<button style="width: 100%; height: 100%; text-align: left; background-color: rgb(240, 240, 240)">' + button_content + '</button>'
        dataset_buttons += '</td>'

        if (i == new_row) {
          dataset_buttons += '</tr>'
        }
        
        
        console.warn(current_dataset['value']);
      }
      dataset_buttons += '</table>'
      console.warn(dataset_buttons)

      document.getElementById('datasets').innerHTML = dataset_buttons;
    }
  });
}
