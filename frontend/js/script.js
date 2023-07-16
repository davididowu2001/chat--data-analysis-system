// Define the functions as global functions on the window object
window.getDirectMessages = async function (userId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/chat/getdirectMessages?receiverID=${userId}`
    );
    if (response.ok) {
      const messages = await response.json();
      const messageDisplay = document.getElementById("message-display");
      messageDisplay.innerHTML = ""; // Clear any existing messages
      // After fetching the messages, find the user from the user list and display the username at the top
      const userList = document.getElementById("user-list");
      const userItems = userList.querySelectorAll("li");
      let username;
      userItems.forEach(function (userItem) {
        if (userItem.getAttribute("data-id") === userId) {
          username = userItem.textContent;
        }
      });
      document.getElementById("current-user-name").innerText = username;
      $(messageDisplay).fadeIn(2000);
      messages.forEach((message) => {
        const messageElement = document.createElement("div");
        const avatarElement = document.createElement("img");
        avatarElement.src = getGravatarUrl(message.sender); // Set the avatar URL based on the sender's username
        avatarElement.classList.add("avatar");
        messageElement.appendChild(avatarElement);
        messageElement.classList.add(
          message.sender === "YourUsername" ? "message-right" : "message-left"
        );

        const contentElement = document.createElement("div");
        contentElement.classList.add("content");
        contentElement.textContent = `${message.sender}: ${message.content}`;
        messageElement.appendChild(contentElement);

        const timestampElement = document.createElement("div");
        timestampElement.classList.add("timestamp");
        timestampElement.textContent = message.timestamp;
        messageElement.appendChild(timestampElement);

        messageDisplay.appendChild(messageElement);
      });
    }
  } catch (error) {
    console.error(error);
    // Display an error message to the user
    const notificationContainer = document.getElementById(
      "notification-container"
    );
    notificationContainer.textContent = "Failed to fetch messages";
    notificationContainer.classList.add("alert-danger");
    notificationContainer.classList.remove("alert-primary");
    notificationContainer.style.display = "block";
  }
};

window.getGroupMessages = async function (groupID) {
  console.log("Fetching messages for group ID:", groupID);
  try {
    const response = await fetch(
      `http://localhost:3002/api/chat/fetchgroupMessages?groupID=${groupID}`
    );
    if (response.ok) {
      const messages = await response.json();
      console.log("Fetched messages:", messages);
      const messageDisplay = document.getElementById("message-display");
      messageDisplay.innerHTML = ""; // Clear any existing messages
      $(messageDisplay).fadeIn(2000);


      messages.forEach((message) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add(
          message.sender === "YourUsername" ? "message-right" : "message-left"
        );

        const avatarElement = document.createElement("img");
        avatarElement.classList.add("avatar");
        avatarElement.src = getGravatarUrl(message.sender); // Replace with the path to the user's avatar image
        messageElement.appendChild(avatarElement);

        const contentElement = document.createElement("div");
        contentElement.classList.add("content");
        contentElement.textContent = `${message.sender}: ${message.content}`;
        messageElement.appendChild(contentElement);

        const timestampElement = document.createElement("div");
        timestampElement.classList.add("timestamp");
        timestampElement.textContent = message.timestamp; // Replace with the message's timestamp property
        messageElement.appendChild(timestampElement);

        messageDisplay.appendChild(messageElement);
      });
    }
  } catch (error) {
    console.error(error);
    // Display an error message to the user
    const notificationContainer = document.getElementById(
      "notification-container"
    );
    notificationContainer.textContent = "Failed to fetch group messages";
    notificationContainer.classList.add("alert-danger");
    notificationContainer.classList.remove("alert-primary");
    notificationContainer.style.display = "block";
  }
};
function onUserClick(username) {
    const userHeader = document.getElementById("current-user-name");
    const groupHeader = document.getElementById("current-group-name");
  
    userHeader.textContent = username;
    groupHeader.textContent = "";  // Clear the group name
  }
  
  function onGroupClick(groupName) {
    const userHeader = document.getElementById("current-user-name");
    const groupHeader = document.getElementById("current-group-name");
  
    groupHeader.textContent = groupName;
    userHeader.textContent = "";  // Clear the user name
  }

window.getUsers = async function () {
  try {
    const response = await fetch("http://localhost:3002/api/users/getUsers");
    if (response.ok) {
      const users = await response.json();
      const userList = document.getElementById("user-list");
      userList.innerHTML = ""; // Clear any existing users
      users.forEach((user) => {
        const userElement = document.createElement("li");
        const avatarElement = document.createElement("img");
        avatarElement.src = getGravatarUrl(user.username);
        console.log("Avatar URL:", getGravatarUrl(user.username));
        avatarElement.classList.add("avatar");

        const usernameElement = document.createElement("span");
        userElement.textContent = `${user.username}`;
        userElement.appendChild(usernameElement);
        userElement.appendChild(avatarElement);

        userElement.setAttribute("data-id", user.id);
        userElement.onclick = function () {
          const userId = this.getAttribute("data-id");
          currentChatType = "direct";
          currentTargetId = userId;
          getDirectMessages(userId);
          onUserClick(user.username);
        };
        userList.appendChild(userElement);
        
      });
    }
  } catch (error) {
    console.error(error);
    // Display an error message to the user
    const notificationContainer = document.getElementById(
      "notification-container"
    );
    notificationContainer.textContent = "Failed to fetch users";
    notificationContainer.classList.add("alert-danger");
    notificationContainer.classList.remove("alert-primary");
    notificationContainer.style.display = "block";
  }
};

window.getGroups = async function () {
  try {
    const response = await fetch("http://localhost:3002/api/group/getGroupz");
    if (response.ok) {
      const groups = await response.json();
      const groupList = document.getElementById("group-list");
      groupList.innerHTML = ""; // Clear any existing groups
      groups.forEach((group) => {
        const groupElement = document.createElement("li");
        groupElement.textContent = group.name;
        groupElement.setAttribute("data-id", group.id);
        groupElement.onclick = () => {
          currentChatType = "group";
          currentTargetId = group.id;
          getGroupMessages(group.id);
          console.log("clicked", group.id);
          onGroupClick(group.name);
        };
        groupList.appendChild(groupElement);
      });
    }
  } catch (error) {
    console.error(error);
    // Display an error message to the user
    const notificationContainer = document.getElementById(
      "notification-container"
    );
    notificationContainer.textContent = "Failed to fetch groups";
    notificationContainer.classList.add("alert-danger");
    notificationContainer.classList.remove("alert-primary");
    notificationContainer.style.display = "block";
  }
};

let currentChatType = null;
let currentTargetId = null;

window.sendMessage = async function (message) {
  try {
    if (currentChatType === "direct") {
      const response = await fetch(
        "http://localhost:3002/api/chat/senddirectMessages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderID: 1,
            receiverID: currentTargetId,
            message,
          }),
        }
      );

      console.log(response);

      if (response.ok) {
        console.log("Message send successfully..");
        // Refresh the messages after sending a new one
        getDirectMessages(currentTargetId);
        console.log("Message send successfully..");
      } else {
        throw new Error("Failed to send the direct message");
      }
    } else if (currentChatType === "group") {
      const response = await fetch(
        "http://localhost:3002/api/chat/sendgroupMessages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            groupID: currentTargetId,
            senderID: 1,
            message,
          }),
        }
      );

      if (response.ok) {
        // Refresh the messages after sending a new one
        getGroupMessages(currentTargetId);
        console.log("Group works?");
      } else {
        throw new Error("Failed to send the group message");
      }
    }
  } catch (error) {
    console.error(error);
    // Display an error message to the user
    const notificationContainer = document.getElementById(
      "notification-container"
    );
    notificationContainer.textContent = "Failed to send the message";
    notificationContainer.classList.add("alert-danger");
    notificationContainer.style.display = "block";
  }
};

window.createGroup = async function (id, name) {
  const response = await fetch("http://localhost:3002/api/group/createGroups", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      name,
    }),
  });

  if (response.ok) {
    const jsonResponse = await response.json();
    console.log("Group created successfully:", jsonResponse);
    location.reload();
  } else {
    throw new Error("Failed to create the group");
  }
};

window.addUserToGroup = async function (groupId, userId) {
  try {
    const response = await fetch(
      "http://localhost:3002/api/group/addUsertoGroups",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupId,
          userId,
        }),
      }
    );

    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("User added successfully:", jsonResponse);
      // Refresh the group messages after adding a new user
      getGroupMessages(groupId);
    } else {
      throw new Error("Failed to add the user to the group");
    }
  } catch (error) {
    console.error(error);
    // Display an error message to the user
    const notificationContainer = document.getElementById(
      "notification-container"
    );
    notificationContainer.textContent = "Failed to add user to group";
    notificationContainer.classList.add("alert-danger");
    notificationContainer.style.display = "block";
  }
};
window.fillUserDropdown = async function () {
  try {
    const response = await fetch("http://localhost:3002/api/users/getUsers");
    if (response.ok) {
      const users = await response.json();
      const userDropdown = document.getElementById("user-select");
      userDropdown.innerHTML = ""; // Clear any existing users
      users.forEach((user) => {
        const userOption = document.createElement("option");
        userOption.value = user.id;
        userOption.textContent = user.username;
        userDropdown.appendChild(userOption);
      });
    }
  } catch (error) {
    console.error(error);
    alert("Failed to fetch users");
  }
};

window.fillGroupDropdown = async function () {
  try {
    const response = await fetch("http://localhost:3002/api/group/getGroups");
    if (response.ok) {
      const groups = await response.json();
      const groupDropdown = document.getElementById("group-select");
      groupDropdown.innerHTML = ""; // Clear any existing groups
      groups.forEach((group) => {
        const groupOption = document.createElement("option");
        groupOption.value = group.id;
        groupOption.textContent = group.name;
        groupDropdown.appendChild(groupOption);
      });
    }
  } catch (error) {
    console.error(error);
    alert("Failed to fetch groups");
  }
};

window.submitForm = async function (event) {
  event.preventDefault();

  const groupId = document.getElementById("group-select").value;
  const userId = document.getElementById("user-select").value;

  try {
    await addUserToGroup(groupId, userId);
    $("#addUserToGroupModal").modal("hide");
    alert("User added to group successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to add user to group");
  }
};

document.addEventListener("DOMContentLoaded", function () {
  getUsers();
  getGroups();
  // fillUserDropdown();
  // fillGroupDropdown ();

  // Add the event listener for the search input inside the DOMContentLoaded event listener
  const searchInput = document.getElementById("search-users");
  const userList = document.getElementById("user-list");

  searchInput.addEventListener("keyup", function (event) {
    const searchText = event.target.value.toLowerCase();
    const userItems = userList.querySelectorAll("li");
    userItems.forEach(function (userItem) {
      const username = userItem.textContent.toLowerCase();
      if (username.indexOf(searchText) === -1) {
        userItem.style.display = "none";
      } else {
        userItem.style.display = "block";
      }
    });

    const form = document.getElementById("add-user-to-group-form");
    if (form) {
      form.addEventListener("submit", submitForm);
    } else {
      console.error("Form 'add-user-to-group-form' not found");
    }

   
  });

  const searchMessagesInput = document.getElementById("search-messages");
  const messageDisplay = document.getElementById("message-display");

  searchMessagesInput.addEventListener("keyup", function (event) {
    const searchText = event.target.value.toLowerCase();
    const messageItems = messageDisplay.querySelectorAll("div");
    messageItems.forEach(function (messageItem) {
      const messageText = messageItem.textContent.toLowerCase();
      if (messageText.indexOf(searchText) === -1) {
        messageItem.style.display = "none";
      } else {
        messageItem.style.display = "block";
      }
    });
  });

  document
    .getElementById("group-creation-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const groupId = document.getElementById("group-id").value;
      const groupName = document.getElementById("group-name").value;

      try {
        await createGroup(groupId, groupName);
        $("#groupCreationModal").modal("hide");
        alert("Group created successfully!");
      } catch (error) {
        console.error(error);
        alert("Failed to create the group");
      }
    });

  // const messageDisplay = document.getElementById('message-display');

  const messageForm = document.getElementById("message-form");
  messageForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const messageInput = document.getElementById("message-input");
    const message = messageInput.value.trim();

    if (message.length > 0) {
      await sendMessage(message);

      messageInput.value = ""; // Clear the message input after sending
    }
  });
  document
    .getElementById("add-user-to-group-form")
    .addEventListener("submit", submitForm);

  // Filling the dropdowns when the modal is shown
  $("#addUserToGroupModal").on("show.bs.modal", function (e) {
    fillUserDropdown();
    fillGroupDropdown();
  });
});
// Add a dark mode button
$("#navbarNav").append(
  '<button class="btn btn-outline-secondary" type="button" id="button-dark-mode"><i class="fas fa-moon"></i></button>'
);

// Toggle the dark mode when the button is clicked
$("#button-dark-mode").click(function () {
  $("body").toggleClass("dark-mode");
});
function getGravatarUrl(username) {
  // Create a fake email address using the username
  const fakeEmail = `${username}@example.com`.trim().toLowerCase();
  const emailHash = md5(fakeEmail);
  return `https://www.gravatar.com/avatar/${emailHash}?s=48&d=identicon&r=g`;
}
