var userNameFld
var $passwordFld
var firstNameFld
var lastNameFld
var $roleFld
var $createBtn
var $updateBtn
var theTableBody
var userService = new AdminUserServiceClient()
var users = []

function createUser(user) {
  userService.createUser(user)
  .then(function (actualUser) {
    users.push(actualUser)
    renderUsers(users)
  })
}

var selectedUser
function selectUser(event) {
  var selectBtn = jQuery(event.target)
  var theId = selectBtn.attr("id")
  selectedUser = users.find(user => user._id === theId)
  userNameFld.val(selectedUser.userName)
  $passwordFld.val(selectedUser.password)
  firstNameFld.val(selectedUser.firstName)
  lastNameFld.val(selectedUser.lastName)
  $roleFld.val(selectedUser.role)
}

function deleteUser(event) {
  console.log(event.target)
  var deleteBtn = jQuery(event.target)
  var theUser = deleteBtn.attr("user")
  var theIndex = deleteBtn.attr("id")
  var theId = users[theIndex]._id
  console.log(theUser)
  console.log(theIndex)

  userService.deleteUser(theId)
  .then(function (status) {
    users.splice(theIndex, 1)
    renderUsers(users)
  })
}

function renderUsers(users) {
  theTableBody.empty()
  for (var i = 0; i < users.length; i++) {
    var user = users[i]
    theTableBody
    .append(`
     <tr>
       <td>${user.userName}</td>
       <td>&nbsp;</td>
       <td>${user.firstName}</td>
       <td>${user.lastName}</td>
       <td>${user.role}</td>
       <td>
          <button class="wbdv-delete" id="${i}">Delete</button>
          <button class="wbdv-select" id="${user._id}">Select</button>
       </td>
      </tr>
    `)
  }
  jQuery(".wbdv-delete")
  .click(deleteUser)
  jQuery(".wbdv-select")
  .click(selectUser)
}

function updateUser() {
  console.log(selectedUser)
  selectedUser.userName = userNameFld.val()
  selectedUser.password = $passwordFld.val()
  selectedUser.firstName = firstNameFld.val()
  selectedUser.lastName = lastNameFld.val()
  selectedUser.role = $roleFld.val()
  userService.updateUser(selectedUser._id, selectedUser)
  .then(function (status) {
    var index = users.findIndex(user => user._id === selectedUser._id)
    users[index] = selectedUser
    renderUsers(users)
  })
}

function init() {
  userNameFld = $(".wbdv-username-fld")
  $passwordFld = $(".wbdv-password-fld")
  firstNameFld = $(".wbdv-firstname-fld")
  lastNameFld = $(".wbdv-lastname-fld")
  $roleFld = $(".wbdv-role-fld")
  theTableBody = jQuery("tbody")

  $createBtn = jQuery(".wbdv-create-btn")
  $createBtn.click(() => {
    createUser({
      userName: $userNameFld.val(),
      password: $passwordFld.val(),
      firstName: $firstNameFld.val(),
      lastName: $lastNameFld.val(),
      role: $roleFld.val()
    })
    userNameFld.val("")
    $passwordFld.val()
    firstNameFld.val("")
    lastNameFld.val("")
    $roleFld.val("")
  })

  $updateBtn = $(".wbdv-update-btn")
  $updateBtn.click(updateUser)

  userService.findAllUsers()
  .then(function (actualUsersFromServer) {
    users = actualUsersFromServer
    renderUsers(users)
  })
}

jQuery(init)