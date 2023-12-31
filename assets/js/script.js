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
// document.getElementById('emailForm').addEventListener('submit', function (event) {
//   event.preventDefault(); // Menghentikan pengiriman form default

//   var name = document.getElementById('name').value;
//   var email = document.getElementById('email').value;
//   var message = document.getElementById('message').value;

//   var body = 'Nama: ' + name + '\nEmail: ' + email + '\nPesan:\n' + message;

//   Email.send({
//     SecureToken: '11c7a92f-674c-42e9-840c-67d477d439a4',
//     To: 'nazalprastya@gmail.com',
//     From: email,
//     Subject: 'Pesan dari Form Kirim Email',
//     Body: body,
//   }).then(function (message) {
//     if (message === 'OK') {
//       alert('Email berhasil dikirim!');
//       document.getElementById('emailForm').reset();
//     } else {
//       alert('Maaf, terjadi kesalahan saat mengirim email.');
//     }
//   });
// });

window.onload = function () {
  var downloadBtn = document.getElementById('downloadBtn');
  downloadBtn.addEventListener('click', downloadImage);
};

function downloadImage() {
  var url = 'assets/portofolio/portofolio.png';
  var a = document.createElement('a');
  a.href = url;
  a.download = 'CV-Nazal.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// send email
function SendMail() {
  // Ambil nomor WhatsApp dan pesan dari form
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Basic validation for required fields
  if (!name || !email || !message) {
    alert('Please fill in all required fields');
    return;
  }

  var params = {
    from_name: name,
    email: email,
    tanggal: new Date().toLocaleDateString(),
    message: message,
  };
  emailjs
    .send('service_supqeev', 'template_u3fanhj', params)
    .then(function (res) {
      alert('Success ' + res.status);
    })
    .catch(function (err) {
      alert('An error occurred while sending the email. Please try again later.');
    });
}
