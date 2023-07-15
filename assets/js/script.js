// navbar fixed
window.onscroll = function () {
  const nav = document.querySelector('nav');
  const fixedNav = nav.offsetTop;

  if (window.pageYOffset > fixedNav) {
    nav.classList.add('navbar-fixed');
  } else {
    nav.classList.remove('navbar-fixed');
  }
};
