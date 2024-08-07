if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
  document.documentElement.classList.add("firefox");
}
window.onload = function () {
  var chat = document.getElementById("chat");
  chat.scrollTop = chat.scrollHeight;
};
// фнтерфейс перевірки пароля
