var $userNameFld
var $passwordFld
var $firstNameFld
var $lastNameFld
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
  $userNameFld.val(selectedUser.userName)
  $passwordFld.val(selectedUser.password)
  $firstNameFld.val(selectedUser.firstName)
  $lastNameFld.val(selectedUser.lastName)
  $roleFld.val(selectedUser.role)
}

function deleteUser(event) {
  var deleteBtn = jQuery(event.target)
  var theIndex = deleteBtn.attr("id")
  var theId = users[theIndex]._id

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
    .prepend(`
     <tr class="wbdv-template wbdv-user wbdv-hidden">
       <td class="wbdv-userName">${user.userName}</td>
       <td>&nbsp;</td>
       <td class="wbdv-firstName">${user.firstName}</td>
       <td class="wbdv-lastName">${user.lastName}</td>
       <td class="wbdv-role">${user.role}</td>
       <td class="wbdv-actions">
       <span class="pull-right">
          <i class="float-right fa-2x fa fa-pencil wbdv-select" id="${user._id}"></i>
          <i class="float-right fa-2x fa fa-times wbdv-delete" id="${i}"></i>
       </span>
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
  selectedUser.userName = $userNameFld.val()
  selectedUser.password = $passwordFld.val()
  selectedUser.firstName = $firstNameFld.val()
  selectedUser.lastName = $lastNameFld.val()
  selectedUser.role = $roleFld.val()

  userService.updateUser(selectedUser._id, selectedUser)
  .then(status => {
    var index = users.findIndex(user => user._id === selectedUser._id)
    users[index] = selectedUser
    renderUsers(users)
  })

  $userNameFld.val("")
  $passwordFld.val("")
  $firstNameFld.val("")
  $lastNameFld.val("")
}

function init() {
  $userNameFld = $(".wbdv-username-fld")
  $passwordFld = $(".wbdv-password-fld")
  $firstNameFld = $(".wbdv-firstname-fld")
  $lastNameFld = $(".wbdv-lastname-fld")
  $roleFld = $(".wbdv-role-fld")

  theTableBody = jQuery("tbody")

  $createBtn = jQuery(".wbdv-create")
  $createBtn.click(function() {
    var User = {
      userName: $userNameFld.val(),
      password: $passwordFld.val(),
      firstName: $firstNameFld.val(),
      lastName: $lastNameFld.val(),
      role: $roleFld.val()
    }
    createUser(User)
    $userNameFld.val("")
    $passwordFld.val("")
    $firstNameFld.val("")
    $lastNameFld.val("")
  })

  $updateBtn = $(".wbdv-update")
  $updateBtn.click(updateUser)

  userService.findAllUsers()
  .then(function (actualUsersFromServer) {
    users = actualUsersFromServer
    renderUsers(users)
  })
}

jQuery(init)