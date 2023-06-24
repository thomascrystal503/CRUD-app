/*Note to grader: code from the lab 
npm install the json server 
set the url to a const for ease of use
*/
const URL_ENDPOINT = "http://localhost:3000/runnersArray";
/*To make the table. Get the url and run an anonymous function on the data to iterate over each 
 runner in the array. For each object, the table body from the HTML is appended with an id, name, race, 
 & button. The data is displayed on the page.  The button runs the function deleteUser when clicked, taking in the runner's assigned
 unique ID as a parameter
  */
$.get(URL_ENDPOINT).then((data) => {
  data.map((runner) => {
    $("tbody").append(
      $(`<tr>
      <td>${runner.id}</td>
      <td>${runner.fullName}</td>
      <td>${runner.raceName}</td>
      <td>
      <button onclick='deleteUser(${runner.id})' class="btn btn-danger">Delete</button>
      </td></tr>`)
    );
  });
});

/*To ADD runner. using jQuery to get the button element with the id="submitRunner" 
when clicked the post method finds the URL for the array and adds the object values to the keys in the
array*/
$("#submitRunner").click(function () {
  $.post(URL_ENDPOINT, {
    fullName: $("#fullName").val(),
    raceName: $("#newRace").val(),
  });
});

/*To DELETE runner. The id is passed into the function where the ajax method Delete is used. 
The id is added to the end of the URL to locate the unique runner. Then the runner object is deleted.
 */
function deleteUser(id) {
  $.ajax(`${URL_ENDPOINT}/${id}`, {
    method: "DELETE",
  });
}

/*to UPDATE. The function updateUser takes in no parameters but uses ajax PUT method to update
the already existing runner with new info from the user input. The id is set as a variable to the
value of the unique ID input from the user...adds the id to the end of the URL to locate the unique 
runner object. PUT changes the existing object values to the new values for that key-value pair. 
As I was coding this, the light bulb went off for the reason why to add the id at the end of the URL. 
Hooray! */
function updateUser() {
  let id = $("#updateId").val();

  $.ajax(`${URL_ENDPOINT}/${id}`, {
    method: "PUT",
    data: {
      fullName: $("#updateName").val(),
      raceName: $("#updateRace").val(),
    },
  });
}

/* UPDATE button. jQuery gets the button from the id on the HTML button element. When clicked
the function updateUser is called. */
$("#updateRunner").click(updateUser);

/*-------Thank you----------------the End------------------------------- */

/*Disregard Code below.    Code below for my understanding */

/*let id = 0;

document.getElementById("add").addEventListener("click", () => {
  //console.log("Clicked");
  let createdDate = new Date();
  let table = document.getElementById("list");
  let row = table.insertRow(1);
  row.setAttribute("id", `item-${id}`);
  row.insertCell(0).innerHTML = `${createdDate.getFullYear()}-${
    createdDate.getMonth() + 1
  }-${createdDate.getDate()}`;
  row.insertCell(1).innerHTML = document.getElementById("first-name").value;
  row.insertCell(2).innerHTML = document.getElementById("last-name").value;
  row.insertCell(3).innerHTML = document.getElementById("state").value;
  let actions = row.insertCell(4);
  actions.appendChild(createDeleteButton(id));
  //document.getElementById("new-task").value = " ";
  actions.appendChild(createEditButton(id));
});
function createDeleteButton(id) {
  let btn = document.createElement("button");
  btn.className = "btn btn-danger";
  btn.id = id;
  btn.innerHTML = "Delete";
  btn.onclick = () => {
    console.log(`Deleting row with id: item-${id}`);
    let elementToDelete = document.getElementById(`item-${id}`);
    elementToDelete.parentNode.removeChild(elementToDelete);
  };
  return btn;
}
function createEditButton(id) {
  console.log("clicked");
  let btn = document.createElement("button");
  btn.className = "btn btn-info";
  btn.id = id;
  btn.innerHTML = "Edit";
  btn.onclick = () => {
    console.log(`Editing row with id: item-${id}`);
    let elementToEdit = document.getElementById(`item-${id}`);
    elementToEdit.parentNode.replaceChild(elementToEdit);
  };
  return btn;
}*/
