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

// Send Email
document.getElementById('emailForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Menghentikan pengiriman form default

  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;

  var body = 'Nama: ' + name + '\nEmail: ' + email + '\nPesan:\n' + message;

  Email.send({
    SecureToken: '11c7a92f-674c-42e9-840c-67d477d439a4',
    To: 'nazalprastya@gmail.com',
    From: email,
    Subject: 'Pesan dari Form Kirim Email',
    Body: body,
  }).then(function (message) {
    if (message === 'OK') {
      alert('Email berhasil dikirim!');
      document.getElementById('emailForm').reset();
    } else {
      alert('Maaf, terjadi kesalahan saat mengirim email.');
    }
  });
});
