function addBlkRow(table) {

    var newrow = document.createElement("tr");
    var numericColumn = createRowColumn(newrow);
    var checkColumn = createRowColumn(newrow);
    var dateColumn = createRowColumn(newrow);
    var emptyColumn = createRowColumn(newrow);
    var removeColumn = createRowColumn(newrow);
  
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkColumn.appendChild(checkbox);
  
    var datebox = document.createElement("input");
    datebox.setAttribute("type", "date");
    //datebox.setAttribute("id", "mydate"); //don't reuse id's
    dateColumn.appendChild(datebox);
  
    emptyColumn.setAttribute("contenteditable", "true");
  
    var remove = document.createElement("input");
    remove.setAttribute("type", "button");
    remove.setAttribute("value", "Delete Row");
    remove.setAttribute("onClick", "deleteRow(this)");
    removeColumn.appendChild(remove);
  
    //var table = document.getElementById('t1');
    var tbody = table.querySelector('tbody') || table;
    var count = tbody.getElementsByTagName('tr').length;
    numericColumn.innerText = count.toLocaleString() + '.';
  
    tbody.appendChild(newrow);
  }

  export default addBlkRow;