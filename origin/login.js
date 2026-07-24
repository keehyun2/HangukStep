// HTML에서 필요한 요소를 가져온다.
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const authTitle = document.getElementById("authTitle");
const authDescription = document.getElementById("authDescription");

// 로그인 탭을 눌렀을 때 실행
loginTab.addEventListener("click", function () {
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");

  loginTab.classList.add("is-active");
  signupTab.classList.remove("is-active");

  authTitle.innerHTML = "Login";

  authDescription.innerHTML =
    "Masuk untuk melanjutkan pembelajaranmu.";
});

// 회원가입 탭을 눌렀을 때 실행
signupTab.addEventListener("click", function () {
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");

  loginTab.classList.remove("is-active");
  signupTab.classList.add("is-active");

  authTitle.innerHTML = "Daftar";

  authDescription.innerHTML =
    "Buat akun baru untuk mulai belajar.";
});

// 로그인 버튼을 눌렀을 때 실행
loginForm.addEventListener("submit", function (event) {
  // form의 기본 새로고침을 막는다.
  event.preventDefault();

  alert("화면은 정상입니다. 실제 로그인은 백엔드 연결이 필요합니다.");
});

// 회원가입 버튼을 눌렀을 때 실행
signupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const password =
    document.getElementById("signupPassword").value;

  const passwordCheck =
    document.getElementById("signupPasswordCheck").value;

  if (password !== passwordCheck) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  alert("회원가입 화면은 정상입니다. 실제 저장은 백엔드가 필요합니다.");
});
