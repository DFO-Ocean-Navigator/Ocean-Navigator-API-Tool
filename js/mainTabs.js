

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
    document.getElementById(button).className = 'howto_button'
    document.getElementById(name).style.display = "none"
    document.getElementById(all).style.backgroundColor = "rgb(245, 245, 245)";
    document.getElementById(button).style.backgroundColor = "initial";
    //document.getElementById(button).style.hover.backgroundColor = "rgb(204, 204, 204)"
  } else {

    document.getElementById(button).className = 'ui-state-active'
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
      row = 0;
      dataset_buttons = '<table style="width: 100%"><h4>Dataset  (id)<h4>';
      size = dataset_info.length;
      console.warn(size)
      col = 0
      for (let i in result) {
        current_dataset = dataset_info[i]

        if (col == 0) {
          dataset_buttons += '<tr id=' + "'rowNumber" + row + "' " + 'style="width: 100%; height: 40px">'
          
        }

        dataset_buttons += '<td style="width: 20%; height: 40px; padding: 1px">'
        button_content = current_dataset['value'] + " (" + current_dataset['id'] + ")";
        dataset_buttons += '<button id="' + current_dataset['id'] + '" onclick="openDataset(' + "'" + current_dataset['id'] + "', 'row" + row + "'" + ')" style="width: 100%; height: 100%; text-align: left; background-color: rgb(240, 240, 240)">' + button_content + '</button>'
        dataset_buttons += '</td>'
        console.warn("COL: ")
        console.warn(col)

        if (col == 4) {
          dataset_buttons += '</tr>'
          dataset_buttons += "<tr id='row" + row + "'" + "style='width: 100%;'>"
          dataset_buttons += "</tr>"

          col = -1
          row += 1
        }
        
        
        console.warn(current_dataset['value']);

        col += 1
      }
      dataset_buttons += '</table>'
      console.warn(dataset_buttons)

      document.getElementById('load_datasets').innerHTML = dataset_buttons;
      
      
    }
  });
}

function openDataset(dataset_id, rowClass) {

  //Button not active
  if (document.getElementById(dataset_id).className !== "datasetactive") {
    if (document.querySelector('.datasetactive') !== null) {
      elements = document.getElementsByClassName('datasetactive')
      console.warn("LENGTH: ")
      console.warn(elements.length)
      for (var i = elements.length - 1, item; item = elements[i]; i--) {
        elements[i].className = ""
      }
      
    }
    document.getElementById(dataset_id).className = "datasetactive"
    document.getElementById(rowClass).style.display = 'table-row'
  
  //Button Active
  } else {
    document.getElementById(rowClass).style.display = 'none'
    document.getElementById(dataset_id).className = ""
  }
  
  dataset_values = "<td class='inputvalues_tab' colspan='5'>"
  
  dataset_values += "HELLO WORLD"
  dataset_values += populateVariables(dataset_id)
  
  dataset_values += "</td>"

  
  if (document.querySelector('.inputvalues_tab') !== null) {
    elements = document.getElementsByClassName('inputvalues_tab')
    for (var i = elements.length - 1, item; item = elements[i]; i--) {
      elements[i].style.display = 'none';
    }
  }
  document.getElementById(rowClass).innerHTML = dataset_values


}

function populateVariables(dataset_id) {
  console.warn(dataset_id)

  i = "http://localhost:5000/api/variables/?dataset=" + dataset_id


  //httpRequest = new XMLHttpRequest();
  //httpRequest.open('GET', i, true)
  //httpRequest.send(null)
  console.warn(i)
  $.ajax({
    url: i, success: function(result){
      dataset_info = result;
      console.warn(dataset_info);
      
      variableTable = "<table>"

      //CREATE TITLE
      variableTable += '<tr><h3>Variables</h3></tr>'

      for (let i in result) {
    
        variableTable += '<tr>'
    
    
        variableTable += '</tr>'
    
      }
    
      variableTable += "</table>"
      console.warn("IN AJAX")
       
      //Adds HTML to webpage
      //document.getElementById('load_datasets').innerHTML = dataset_buttons;
      
      
    },
  });
  console.warn("After AJAX")
  
  
}
