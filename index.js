
let tasks = [
  {
    id: 0,
    title: "Doing Laundary",
    dueDate: new Date (2020,1,28),
    completed : false,
    completeDate : null,
    createdDate: new Date (2020,1,23),
    deleted:false,
    note:"I need to get quarters first at Kroger."
  },
  {
    id: 1,
    title: "CS3744 Assignment 3",
    dueDate: new Date (2020,10,17),
    completed : false,
    completeDate : null,
    createdDate: new Date (2020,1,24),
    deleted:false,
    note:"I better start early cuz it looks pretty complicated.\r\nLooks like I have to read w3schools.com a lot."
  },
  {
    id: 2,
    title: "Getting AAA batteries",
    dueDate: null,
    completed : true,
    completeDate : new Date (2020,2,1),
    createdDate: new Date (2020,1,26),
    deleted:false,
    note:"for my remote control."
  },
  {
    id: 3,
    title: "Booking a flight ticket ACM CHI conference",
    dueDate: new Date (2020,12,15),
    completed : false,
    completeDate : null,
    createdDate: new Date (2020,2,26),
    deleted:false,
    note:"I would have to book a flight ticket to ACM CHI conference.\r\nKeep an eye on the cancellation policy. the conference may be cancelled due to the cornoa virus outbreak. :( Although flight tickets are getting cheaper."
  }

  
];

var taskID = 4;
var today = new Date();
var overdue_flag = 0;
var completed_flag = 0;

$(document).ready(function (){
    render();

  $( "#tasks" ).on( "click","input:checkbox", function( event ){ 
    var today = new Date();
    var id = $(this).attr("value");
      if(!tasks[id].completed){
        tasks[id].completed =true;
        tasks[id].completeDate = new Date(today.getFullYear(),today.getMonth(),today.getDate());
         render();
      }
      else{
        tasks[id].completed =false;
        tasks[id].completeDate = null;
        render();
      }
  });

  $("#tasks").on("click", "button", function(event){
      if($(this).attr('alt') == "Delete the task"){
         var message = confirm("Are you sure?");
        if(message){
        tasks[$(this).parents('tr').attr('id')].deleted = true;
        }
        render();
      }
  });

  $("#deleteCompletedTasks").on("click", function(event){
    var checkboxs = $("input:checkbox:checked").length;
    if (checkboxs > 1){
      var tasksNum = "tasks";
    }
    else{
      tasksNum = "task";
    }
    var message = confirm("Do you want to delete "+ checkboxs +" " + tasksNum + "?");
    if(message){
      for(i =0; i<tasks.length;i++){
        if(tasks[i].completed){
          tasks[i].deleted =true;
        }
      }
    }
    render();
  });

  $("#hidecompleted").on("click", function(event){
    if (completed_flag == 0){    //switch off 
      $("#hidecompleted").addClass("active");
       completed_flag = 1;
      $(".success").addClass("hidden"); //switch on
    }
    else {
      $("#hidecompleted").removeClass("active");
      completed_flag = 0;
      if(overdue_flag ==1){
        $(".none").addClass("hidden");
      }
      else {
        $(".success").removeClass("hidden");
      }
    }
  });

  $("#overdue").on("click", function(event){
    if (overdue_flag == 0){
      $("#overdue").addClass("active");
      overdue_flag = 1;
      $(".success").addClass("hidden");
      $(".none").addClass("hidden");
    }
    else {
      $("#overdue").removeClass("active");
      overdue_flag = 0;
      if(completed_flag == 1){
      $(".none").removeClass("hidden");
      }
      else{
      $(".success").removeClass("hidden");
      $(".none").removeClass("hidden");
      }
    }
  });

  $("button").on("click", function(event){
      if($(this).attr('class') == "btn btn-success addtask"){
        $(this).attr("data-toggle", "modal");
        $(this).attr("data-target", "#myModal");
      }
  });

  $("button").on("click", function(event){      
      if($(this).attr('type') =="submit"){
        var newTitle = $("#task-title").val();
        var givenDate = $("#due-date").val();
        var noteText = $("#task-note").val();
        if(newTitle == ""){
          alert("Task title is required");
        }
        else if (givenDate != "" && Number.isNaN(Date.parse(givenDate))){
          alert("Check your date format.");
        }
        else {
          if(givenDate == ""){
            var newTask = {
            id: taskID,
            title: newTitle,
            dueDate: null,
            completed : false,
            completeDate : null,
            createdDate: new Date(today.getFullYear(), today.getMonth() , today.getDate(), 0, 0, 0, 0),
            deleted:false,
            note: noteText
            };
            tasks.push(newTask);
            taskID++;
            $("#myModal").modal("hide");
          }
          else{
            givenDate = new Date(Date.parse(givenDate));
            var newTask = {
            id: taskID,
            title: newTitle,
            dueDate: givenDate,
            completed : false,
            completeDate : null,
            createdDate: new Date(today.getFullYear(), today.getMonth() , today.getDate(), 0, 0, 0, 0),
            deleted:false,
            note: noteText
            };
            tasks.push(newTask);
            taskID++;
           $("#myModal").modal("hide");
           }
        }
        render();
      }
  });
});

let render = function(){
  $("#tasks").children("tbody").empty();
  for(i = 0; i< tasks.length;i++){
    if(tasks[i].deleted == false){
      doRender(tasks[i]);
    }
 }   
}
 
let doRender = function(currTask){
  let rowString = "";
  var today = new Date();
  var givenTitle = currTask.title;
    if (overdue_flag == 1){
      $("#overdue").removeClass("active");
    }
    if(completed_flag == 1){
      $("#hidecompleted").removeClass("active");
    }
    if(currTask.completed){
      rowString = "<tr id=\"" + currTask.id + "\" class=\"success\">";
      rowString = rowString + "<td class= \"text-center\"><input type=\"checkbox\" class=\"form-check-input\" value=\""+ currTask.id +"\" checked></td>";
      if (givenTitle.length > 30) {
        rowString = rowString + "<td class=\"text-center\"><del>"+ givenTitle.substring(0,30)+"..."+"</del></td>";
      }
      else
        rowString = rowString + "<td class=\"text-center\"><del>"+currTask.title +"</del></td>";
    }
    else if( currTask.dueDate != null && today.getTime() > currTask.dueDate.getTime() && !tasks[i].completed){
      rowString = "<tr id=\"" +  currTask.id + "\" class=\"danger\">";
      rowString = rowString + "<td class= \"text-center\"><input type=\"checkbox\" class=\"form-check-input\" value=\""+ currTask.id+"\"></td>";
      if (givenTitle.length > 30) {
        rowString = rowString + "<td class=\"text-center\">"+ givenTitle.substring(0,30)+"..."+"</td>";
      }
      else
        rowString = rowString + "<td class=\"text-center\">"+currTask.title +"</td>";
    }
    else {
      rowString = '<tr id="'+ currTask.id +'" class="none">';
      rowString = rowString + "<td class= \"text-center\"><input type=\"checkbox\" class=\"form-check-input\" value=\""+ currTask.id +"\"></td>";
      if (givenTitle.length > 30) {
        rowString = rowString + "<td class=\"text-center\">"+ givenTitle.substring(0,30)+"..."+"</td>";
      }
      else
        rowString = rowString + "<td class=\"text-center\">"+currTask.title +"</td>";
    }
    
    rowString = rowString + '<td class="text-center"><span class="text-right">'+
    '<button class="btn btn-xs btn-warning" data-toggle="collapse" data-target="#note-'+currTask.id+'" aria-expanded="true">'+
    '<span class="glyphicon glyphicon-triangle-bottom">'+
    '</span> Note</button>'+
    '</span></td>';
          
    if(currTask.dueDate != null){
      rowString = rowString + '<td class="text-center">'+
      ('0'+(currTask.dueDate.getMonth()+1)).slice(-2) +'/' + ('0'+(currTask.dueDate.getDate())).slice(-2) + '/'+ (currTask.dueDate.getFullYear()) + 
      '</td>';
    }
    else {
      var  nullDate = "";
      rowString = rowString + '<td class="text-center">'+ nullDate +'</td>';
   }

    if(tasks[i].completeDate == null){
      rowString = rowString + '<td class="text-center"></td>';
    }
    else {
      rowString = rowString + '<td class="text-center">'+
      ('0'+(currTask.completeDate.getMonth()+1)).slice(-2) +'/' + ('0'+(currTask.completeDate.getDate())).slice(-2) + '/'+ (currTask.completeDate.getFullYear()) +
      '</td>';
    }
      rowString = rowString + '<td class="text-center">'+
      '<button type="button" class="btn btn-danger btn-xs deletetask" alt="Delete the task" value="'+ currTask.id +'">'+
      '<span class="glyphicon glyphicon-trash">'+
      '</span></button>'+
      '<a target="_blank" href="mailto:?body='+ currTask.note +'&amp;subject='+ currTask.title +'">'+
      '<button type="button" class="btn btn-danger btn-xs emailtask" alt="Send an email" value="'+  currTask.id +'">'+
      '<span class="glyphicon glyphicon-envelope">'+
      '</span></button>'+
      '</a></td>';
      rowString = rowString +  '</tr>';
      rowString = rowString + '<tr id="note-'+currTask.id+'" class="collapse">';
      rowString = rowString +  '<td></td>';
      rowString =rowString +'<td colspan="5">';
      rowString =rowString + '<div class="well">';
      rowString =rowString + '<h3>'+currTask.title+'</h3>'
    var revisedNote = currTask.note;
    var BreakNote = revisedNote.replaceAll(/\r\n|\r|\n/g,"<br />");
      rowString =rowString + '<div> '+ BreakNote+'  </div>';
      rowString =rowString + '</div>';
      rowString =rowString + '</td>';
      rowString =rowString + '</tr>';
      $("#tasks").children("tbody").append(rowString); 
    var checkboxs = $("input:checkbox:checked").length;
    if(checkboxs == 0){
      $('#deleteCompletedTasks').prop('disabled', !($("input:checkbox").is(":checked")));
    }
    else{
      $("#deleteCompletedTasks").prop("disabled", false);
    }
}


 