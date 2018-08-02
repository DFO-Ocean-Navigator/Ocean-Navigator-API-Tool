var active_dataset
var panesPopulated = false;
var currentDepths

function toggleSidebar() {

  state = document.getElementById("sidebar-wrapper")
  console.warn(state)
  console.warn(document.getElementById("sidebar-wrapper").style.width)
  console.warn(state.style.offsetWidth)
  if (document.getElementById("sidebar-wrapper").style.width == '0px') {
    document.getElementById("sidebar-wrapper").style.width = '250px'
    document.getElementById("wrapper").style.paddingLeft = '250px'
  } else {
    document.getElementById("sidebar-wrapper").style.width = '0px'
    document.getElementById("wrapper").style.paddingLeft = '10px'
  }
  

}

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
}


//CREATES TABLE OF AVAILABLE DATASETS
//ALSO CREATES THE GENERAL STRUCTURE OF THE PANES
function getDatasets() {

  $.ajax({
    url: "http://navigator.oceansdata.ca/api/v1.0/datasets/?id", success: function(datasets){

      size = datasets.length;
      rows = 3 - (size % 3);    //Puts 5 datasets per row
      rows = (size + rows) / 3  //Determines number of rows required for datasets
      
      let createButtons = "";

      row = 0;
      cell = 0;
      paneCell = 0;

      //Controls the ROWS
      while (row < rows) {

        //Create row
        createButtons += "<tr class='dataset_buttons_table_row' id='row" + row + "_dataset_buttons_table_row' style='width=100%'>"
        col = 1 // Initialize(reset) col #

        //Controls the CELLS
        while (col <=3 && datasets[cell] !== undefined) { //Runs to the end of the row, or until there are no more datasets
          console.warn(datasets[cell]['id'])
          createButtons += "<td class='dataset_buttons_table_col' id='" + datasets[cell]['id'] + "_dataset_buttons_table_col' style='width: 33.33333%; height:100%'>"

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

        // Initializes divs for dataset information (Variables | Timestamps | Depths)
        while (col <= 3 && datasets[paneCell] !== undefined) {
          createButtons += "<div class='row" + row + "_pane_div' id='" + datasets[paneCell]['id'] + "_pane_div' style='display:none; padding: 20px; width: 100%'>"
          createButtons += '<table id=' + datasets[paneCell]['id'] + '_table_pane_div" style="width:100%;">'
          createButtons += '<tr id=' + datasets[paneCell]['id'] + 'row_table_pane_div" style="width: 100%;">'
          
          // Variables
          createButtons += '<td class="pane_cell" id="' + datasets[paneCell]['id'] + "_variables_pane_div" + '" style="vertical-align: text-top; border-right: 4px solid white;">'
          createButtons += '</td>'
          
          // Timestamps
          createButtons += '<td class="pane_cell" id="' + datasets[paneCell]['id'] + '_timestamps_pane_div" style="vertical-align: text-top;">'
          createButtons += '</td>'
          
          // Depths
          createButtons += '<td class="pane_cell" id="' + datasets[paneCell]['id'] + '_depths_pane_div" style="border-left: 4px solid white; vertical-align: text-top;">'
          createButtons += '</td>'
          createButtons += '</tr>'
          createButtons += '</table>'
          
          createButtons += "</div>"  //This is where the data will be populated

          col += 1
          paneCell += 1;
        }
        createButtons += "</td></tr>"
        row += 1
      }

      document.getElementById('dataset_buttons_table').innerHTML = createButtons

      populateVariables(datasets);
      populateTimestamps(datasets)
      constructDepthField(datasets);
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
        
        // Initializes Variable Table
        variableTable = "<table style='width: 100%; padding: 5px'>"
        
        // Sets Table title (Variable | ID)
        variableTable += "<tr class=variable_table_row' style='display: flex;'>";
        variableTable += "<td class='variable_value_table_col' style='font-size: 19px'>Variable</td>";
        variableTable += "<td class='variable_id_table_col' style='font-size: 19px'>ID</td>";
        variableTable += "</tr>"
        
        // Adds Variable Name | ID Pair to each row in the table
        for (variable in variables) {
          variableTable += "<tr class='variable_table_row' id='" + variables[variable]['id'] + "_" + datasets[number]['id'] + "_variable_table_row'>"
          variableTable += "<td class='variable_value_table_col' id='" + variables[variable]['id'] + "_" + datasets[number]['id'] + "_variable_value_table_col'>" + variables[variable]['value'] + "</td>"
          variableTable += "<td class='variable_id_table_col' id='" + variables[variable]['id'] + "_" + datasets[number]['id'] + "_variable_id_table_col'>" + variables[variable]['id'] + "</td>"
          variableTable += "</tr>"
        }
        variableTable += "</table>"
        
        // Places the Variable Table in the appropriate place
        requiredDiv = datasets[number]['id'] + "_variables_pane_div"
        document.getElementById(requiredDiv).innerHTML = variableTable
      },
      error: function() {

        // Displays an error message instead of the variable table
        variableTable = "<h4 class='error'>Variables Failed to Load</h4>"
        requiredDiv = datasets[number]['id'] + "_variables_pane_div"
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
        
      variableTable = "<table style='height: 100%; width: 100%; padding: 5px;'>"
        variableTable += "<tr class=variable_table_row' style='display: flex;'>";
        variableTable += "<td class='timestamp_value_table_col' style='font-size: 19px; text-align: left; '>Time</td>";
        variableTable += "<td class='timestamp_id_table_col' style='font-size: 19px'>Index</td>";
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

        requiredDiv = datasets[number]['id'] + "_timestamps_pane_div"
        document.getElementById(requiredDiv).innerHTML += variableTable
      
      },
      error: function() {
        variableTable = "<h4 class='error'>TimeStamps Failed to Load</h4>"
        requiredDiv = datasets[number]['id'] + "_timestamps_pane_div"
        document.getElementById(requiredDiv).innerHTML = variableTable

      }
    })
  })


}


//Constructs the depth table and fills it with the required values
function constructDepthField(datasets) {

  $(num_datasets).each(function() {
    var number = this;
    
    $.ajax({
      url: "http://navigator.oceansdata.ca/api/v1.0/depth/?dataset=" + datasets[number]['id'] + "&variable=votemper", success: function(depths) {
    

        minDepth = depths[1]['value'];
        maxDepth = depths[depths.length - 1]['value'];

        contents =  '<div style="font-size: 19px; text-align: left;">Depth</h3>'
        contents += '<div style="padding-bottom: 20px; text-align: justify; ">In each dataset, data can be found at various depth layers. This tool allows you to provide your desired depth and will return the depth of the nearest available layer, and the associated index to be used in the navigators API </div>'
        contents += '<table style="width:100%;">'

        // Sets Min Depth
        contents += '<tr class="depth_table_row">'
        contents += '<td class="depth_cells_left">Min Depth</td>'
        contents += '<td class="depth_cells">' + minDepth + '</td>'
        contents += '</tr>'

        // Sets Max Depth
        contents += '<tr class="depth_table_row" style="border-bottom: 2px solid white">'
        contents += '<td class="depth_cells_left">Max Depth</td>'
        contents += '<td class="depth_cells">' + maxDepth + '</td>'
        contents += '</tr>'
        contents += '<tr>'
        contents += '<td colspan="2" style="padding-top: 20px; padding-bottom: 10px;">'
        contents += '<table style="width:100%;">'
        
        // User Input depth field
        contents += '<tr class="depth_table_row">'
        contents += '<td class="depth_cells_left">Desired Depth (m)</td>'
        contents += '<td style="text-align: right;"><input type="text" name="desiredDepth" id="' + datasets[number]['id'] + '_desiredDepthValue"></td>'
        contents += '</tr>'

        // Search Button
        contents += '<tr class="depth_table_row" style="text-align: right;">' 
        contents += '<td><button onclick="' + "search('" + datasets[number]['id'] + "'" + ')" style="background-color: rgb(175,175,175); width: 50%;">Search</button></td>'
        contents += '</tr>'
        contents += '</table>'
        contents += '</td>'
        contents += '</tr>'

        // Nearest depth(s) to user input
        contents += '<tr class="depth_table_row" style="padding-top: 10px;">'
        contents += '<td class="depth_cells_left">Nearest Index</td>'
        contents += '<td class="depth_cells_output" id="' + datasets[number]['id'] + '_index_depths_pane_div"></td>'
        contents += '</tr>'
        contents += '<tr class="depth_table_row">'
        contents += '<td class="depth_cells_left">Nearest Depth</td>'
        contents += '<td class="depth_cells_output" id="' + datasets[number]['id'] + '_result_depths_pane_div"></td>'
        contents += '</tr>'
        contents += '</table>'
        

        requiredDiv = datasets[number]['id'] + "_depths_pane_div"
        document.getElementById(requiredDiv).innerHTML += contents;
      },
      error: function() {
        content = "<h4 class='error'>Depth Failed to Load</h4>"
        requiredDiv = datasets[number]['id'] + "_depths_pane_div"
        document.getElementById(requiredDiv).innerHTML = content

      }
    })
  })

}

function search(dataset) {
  valueDiv = dataset + "_desiredDepthValue"
  value = document.getElementById(valueDiv).value

  $.ajax({
    url: "http://navigator.oceansdata.ca/api/v1.0/depth/?dataset=" + dataset + "&variable=votemper", success: function(a) {
      
      var values = [];
      for (num in a) {
        
        let i = a[num]['value']
        i = Number(i.replace(" m", ""))
        values.push(i)
      }

      if(value < a[1]['value']) {
        result = a[1]['value'];
        index = 1;
        if ((value - values[index + 1] == (values[index + 2] - value))) {
          result += ", " + values[index + 2];
          index += ", " + 1;
        } else if((value - values[index + 1]) > (values[index + 2] - value)) {
          result = values[index + 2];
          index = index + 1;
        }
        requiredDiv = dataset + "_index_depths_pane_div"
        document.getElementById(requiredDiv).innerHTML = 1;
        requiredDiv = dataset + "_result_depths_pane_div"
        document.getElementById(requiredDiv).innerHTML = result;
        return;
      }
      if(value > a[a.length-1]) {
        result = a[a.length - 1];
        index = a.length - 1;
        if ((value - values[index + 1] == (values[index + 2] - value))) {
          result += ", " + values[index + 2];
          index += ", " + (index + 1);
        }

        requiredDiv = dataset + "_index_depths_pane_div"
        document.getElementById(requiredDiv).innerHTML = length-1;
        requiredDiv = dataset + "_result_depths_pane_div"
        document.getElementById(requiredDiv).innerHTML = result;
        return;
      }
      
      lo = 1;
      hi = a.length - 2;

      while (lo <= hi) {
        mid = Math.floor((hi + lo) / 2);

       if (value < values[mid]) {
            hi = mid - 1;
        } else if (value > values[mid]) {
            lo = mid + 1;
        } else {

          result = values[mid];
          index = mid - 1;
          if ((value - values[index + 1] == (values[index + 2] - value))) {
            result += ", " + values[index + 2];
            index += ", " + (index + 1);
          } else if((value - values[index + 1]) > (values[index + 2] - value)) {
            result = values[index + 2];
            index = index + 1;
          }
          requiredDiv = dataset + "_index_depths_pane_div"
          document.getElementById(requiredDiv).innerHTML = index;
          requiredDiv = dataset + "_result_depths_pane_div"
          document.getElementById(requiredDiv).innerHTML = result;
          return;
        }
      }
    
      result = (a[lo] - value) < (value - values[hi]) ? values[lo] : values[hi];
      index = (a[lo] - value) < (value - values[hi]) ? lo : hi;
      index = index - 1

      if ((value - values[index + 1] == (values[index + 2] - value))) {
        result += "m, " + values[index + 2] + "m";
        index += ", " + (index + 1);
      } else if((value - values[index + 1]) > (values[index + 2] - value)) {
        result = values[index + 2];
        index = index + 1;
      }
      
      //Sets Index Number
      requiredDiv = dataset + "_index_depths_pane_div"
      document.getElementById(requiredDiv).innerHTML = index;
      
      //Sets Value
      requiredDiv = dataset + "_result_depths_pane_div"
      document.getElementById(requiredDiv).innerHTML = result;
    }
    
  })
}
