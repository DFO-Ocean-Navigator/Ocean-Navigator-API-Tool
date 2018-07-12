var active_dataset
var panesPopulated = false;

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
    document.getElementById(button).style.backgroundColor = "block";
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

function updateSelection(datasetid) {
  nextDiv = datasetid + "_pane_div"
  console.warn("DATASET ID:")
  console.warn(datasetid)
  console.warn("ACTIVE DATASET:")
  console.warn(active_dataset)
  if (active_dataset === undefined) { //No other dataset is being displaying
    active_dataset = datasetid
    document.getElementById(nextDiv).style.display = 'inline-flex';
    document.getElementById(datasetid + "_dataset_button").className = 'ui-state-active'
    document.getElementById(nextDiv).style.backgroundColor = "rgb(204,204,204)"
  } else if (active_dataset === datasetid) {  //The selected dataset is already being displayed
    
    document.getElementById(nextDiv).style.display = 'none';
    document.getElementById(datasetid + '_dataset_button').className = ''
    document.getElementById(nextDiv).style.backgroundColor = "rgb(255,255,255)";
    
    active_dataset = undefined

  } else {  // A different dataset from the one being selected is displayed
    
    previousDataset = active_dataset + "_pane_div"
    document.getElementById(active_dataset + '_dataset_button').className = '';
    
    document.getElementById(previousDataset).style.display = 'none';  //Close previous dataset
    document.getElementById(nextDiv).style.display = 'inline-flex';         //Open new dataset
    document.getElementById(datasetid + '_dataset_button').className = 'ui-state-active'; //Arrow animation
    document.getElementById(nextDiv).style.backgroundColor = "rgb(204,204,204)";

    active_dataset = datasetid; //Update current dataset being displayed
  
  }

  console.warn(active_dataset)
}


//CREATES TABLE OF AVAILABLE DATASETS
//ALSO CREATES THE GENERAL STRUCTURE OF THE PANES
function getDatasets() {

  $.ajax({
    url: "http://navigator.oceansdata.ca/navigator/api/datasets/?id", success: function(datasets){

      size = datasets.length;
      rows = 5 - (size % 5);    //Puts 5 datasets per row
      rows = (size + rows) / 5  //Determines number of rows required for datasets
      
      let createButtons = "";

      row = 0;
      cell = 0;
      paneCell = 0;

      //Controls the ROWS
      while (row < rows) {

        //Create row
        createButtons += "<tr class='dataset_buttons_table_row' id='row" + row + "_dataset_buttons_table_row' style='width=20%'>"
        col = 1 // Initialize(reset) col #

        //Controls the CELLS
        while (col <=5 && datasets[cell] !== undefined) { //Runs to the end of the row, or until there are no more datasets
          
          createButtons += "<td class='dataset_buttons_table_col' id='" + datasets[cell]['id'] + "_dataset_buttons_table_col' style='width: 20%; height:100%'>"

          createButtons += "<button id='" + datasets[cell]['id'] + "_dataset_button' " + "onclick=" +"'updateSelection(" + '"' + datasets[cell]['id'] + '")' + "'" + ' style="text-align: left; width: 100%; height: 60px"' + ">"
          createButtons += "<i class='fa fa-angle-down ' style='font-size: 20px;'></i>"
          createButtons += "<h4 style='display: inline; padding: 20px'>" + datasets[cell]['value'] + " (" + datasets[cell]['id'] + ")</h4>"
          createButtons += "</button>"

          createButtons += "</td>"
          col += 1;
          cell += 1;
        }
        createButtons += "</tr>"
        createButtons += "<tr class='information_pane_row' id='row" + row + "_pane_row'>"
        createButtons += "<td class='information_pane_col' id='row" + row + "_pane_col' colspan='5'>"
        col = 1
        while (col <= 5 && datasets[paneCell] !== undefined) {
          createButtons += "<div class='row" + row + "_pane_div' id='" + datasets[paneCell]['id'] + "_pane_div' style='display:none; padding: 20px; width: 100%'>"
          createButtons += "</div>"  //This is where the data will be populated

          col += 1
          paneCell += 1;
        }
        createButtons += "</td></tr>"
        row += 1
      }
      console.warn(createButtons)
      document.getElementById('dataset_buttons_table').innerHTML = createButtons

      populateVariables(datasets);
      populateTimestamps(datasets)
      //populateDepths(datasets);
    }
  })
  createTable = "<table class='dataset_buttons_table' id='dataset_buttons_table'></table>"
  document.getElementById('load_datasets').innerHTML = createTable

}

//ADDS DATA TO EMPTY TABLE OF AVAILABLE VARIABLES
function populateVariables(datasets) {

  num_datasets = datasets.length
  num_datasets = Array.apply(null, Array(num_datasets));
  num_datasets = num_datasets.map(function (x, i) {return i})
  
  $(num_datasets).each(function() {
    var number = this;
    $.ajax({
      url: "http://navigator.oceansdata.ca/api/v1.0/variables/?dataset=" + datasets[number]['id'], success: function(variables) {
        
        variableTable = "<table style='border: 1px solid black; padding: 5px'>"
        variableTable += "<tr class=variable_table_row'>";
        variableTable += "<td class='variable_value_table_col' style='font-size: 19px'>Variable</td>";
        variableTable += "<td class='variable_id_table_col' style='font-size: 19px'>ID</td>";
        variableTable += "</tr>"
        for (variable in variables) {
          variableTable += "<tr class='variable_table_row' id='" + variables[variable]['id'] + "_" + datasets[number]['id'] + "_variable_table_row'>"
          variableTable += "<td class='variable_value_table_col' id='" + variables[variable]['id'] + "_" + datasets[number]['id'] + "_variable_value_table_col'>" + variables[variable]['value'] + "</td>"
          variableTable += "<td class='variable_id_table_col' id='" + variables[variable]['id'] + "_" + datasets[number]['id'] + "_variable_id_table_col'>" + variables[variable]['id'] + "</td>"
          variableTable += "</tr>"
        }
        variableTable += "</table>"

        requiredDiv = datasets[number]['id'] + "_pane_div"
        document.getElementById(requiredDiv).innerHTML = variableTable
      }
    })
  })
}

//ADDS DATA TO EMPTY TABLE OF AVAILABLE TIMESTAMPS
function populateTimestamps(datasets) {

  num_datasets = datasets.length
  num_datasets = Array.apply(null, Array(num_datasets));
  num_datasets = num_datasets.map(function (x, i) {return i})
  
  $(num_datasets).each(function() {
    var number = this;
    $.ajax({
      url: "http://navigator.oceansdata.ca/api/v1.0/timestamps/?dataset=" + datasets[number]['id'], success: function(timestamps) {
        
      variableTable = "<table style='border: 1px solid black; padding: 5px;'>"
        variableTable += "<tr class=variable_table_row'>";
        variableTable += "<td class='timestamp_value_table_col'></td>"
        variableTable += "<td class='variable_value_table_col' style='font-size: 19px'>Time</td>";
        variableTable += "<td class='variable_id_table_col' style='font-size: 19px'>Index</td>";
        variableTable += "</tr>"
        
        variableTable += "<tr class='variable_table_row' id='" + timestamps[0]['id'] + "_" + datasets[number]['id'] + "_variable_table_row'>"
        variableTable += "<td class='timestamp_table_col' id='first_timestamp_value_table_col'>" + 'First' + "</td>"
        variableTable += "<td class='timestamp_table_col' id='" + timestamps[0]['id'] + "_" + datasets[number]['id'] + "_variable_id_table_col'>" + timestamps[0]['value'] + "</td>"
        variableTable += "<td class='timestamp_index_table_col'>" + timestamps[0]['id'] + "</td>"
        variableTable += "</tr>"
        
        variableTable += "<tr class='variable_table_row' id='" + timestamps[0]['id'] + "_" + datasets[number]['id'] + "_variable_table_row'>"
        variableTable += "<td class='timestamp_table_col' id='first_timestamp_value_table_col'>" + 'Last' + "</td>"
        variableTable += "<td class='timestamp_table_col' id='" + timestamps[0]['id'] + "_" + datasets[number]['id'] + "_variable_id_table_col'>" + timestamps[timestamps.length - 1]['value'] + "</td>"
        variableTable += "<td class='timestamp_index_table_col'>" + timestamps[timestamps.length - 1]['id'] + "</td>"
        variableTable += "</tr>"

        variableTable += "</table>"

        requiredDiv = datasets[number]['id'] + "_pane_div"
        document.getElementById(requiredDiv).innerHTML += variableTable
      
      }
    })
  })


}

//ADDS DATA TO EMPTY TABLE OF AVAILABLE DEPTHS
function populateDepths(datasets) {
  /*
  num_datasets = datasets.length
  num_datasets = Array.apply(null, Array(num_datasets));
  num_datasets = num_datasets.map(function (x, i) {return i})
  
  $(num_datasets).each(function() {
    var number = this;
    $.ajax({
      url: "http://trinity:50/navigator/api//?dataset=" + datasets[number]['id'], success: function(variables) {
        console.warn("VARIABLES: ")
        console.warn(variables)
      }
    })
  })
  */
}
