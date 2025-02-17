import socket from "./src/socket.js";

console.log("소켓 객체 확인:", socket);
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM 로드 완료!");
  const app = document.querySelector(".app");

  if (!app) {
    console.error("❌ 'app' 요소를 찾을 수 없음!");
    return;
  }
  console.log(
    "✅ join-user 버튼 확인:",
    document.querySelector(".join-screen #join-user")
  );
  let uname;

  app
    .querySelector(".join-screen #join-user")
    .addEventListener("click", function () {
      let username = app.querySelector(".join-screen #username").value;
      if (username.length == 0) {
        console.warn("⚠️ 유저 이름이 비어 있음!");
        return;
      }

      console.log(`✅ 유저 이름 입력됨: ${username}`);
      console.log("✅ 소켓 연결 상태:", socket.connected);
      setTimeout(() => {
        console.log("✅ newuser 이벤트 emit 실행!");

        socket.emit("newuser", username);
      }, 500);

      uname = username;
      app.querySelector(".join-screen").classList.remove("active");
      app.querySelector(".chat-screen").classList.add("active");
    });

  app
    .querySelector(".chat-screen #send-message")
    .addEventListener("click", function () {
      let message = app.querySelector(".chat-screen #message-input").value;
      if (message.length == 0) {
        console.warn("⚠️ 메시지가 비어 있음!");
        return;
      }
      renderMessage("my", {
        username: uname,
        text: message,
      });
      socket.emit("chat", {
        username: uname,
        text: message,
      });
      app.querySelector(".chat-screen #message-input").value = "";
    });

  app
    .querySelector(".chat-screen #exit-chat")
    .addEventListener("click", function () {
      socket.emit("exituser", uname);
      window.location.href = window.location.href;
    });

  socket.on("update", function (update) {
    renderMessage("update", update);
  });
  socket.on("chat", function (message) {
    renderMessage("other", message);
  });

  function renderMessage(type, message) {
    let messageContainer = app.querySelector(".chat-screen .messages");
    if (!messageContainer) {
      console.error("❌ 메시지 컨테이너를 찾을 수 없음!");
      return;
    }
    if (type == "my") {
      let el = document.createElement("div");
      el.setAttribute("class", "message my-message");
      el.innerHTML = `
          <div>
            <div class="name">You</div>
            <div class="text">${message.text}</div>
          </div>
      `;
      messageContainer.appendChild(el);
    } else if (type == "other") {
      let el = document.createElement("div");
      el.setAttribute("class", "message other-message");
      el.innerHTML = `
          <div>
            <div class="name">${message.username}</div>
            <div class="text">${message.text}</div>
          </div>
      `;
      messageContainer.appendChild(el);
    } else if (type == "update") {
      let el = document.createElement("div");
      el.setAttribute("class", "update");
      el.innerText = message;
      messageContainer.appendChild(el);
    }
    //스크롤
    messageContainer.scrollTop =
      messageContainer.scrollHeight - messageContainer.clientHeight;
  }
});
