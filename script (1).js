document.getElementById('nidForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nid = document.getElementById('nid').value;
  const dob = document.getElementById('dob').value;
  const apiKey = '1e0fc13be94e217f1ec34da77f2b4e83';
  const url = `https://unique-seba.com/api/servercopy2?api_key=${apiKey}&nid=${nid}&dob=${dob}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.nameBangla) {
        document.getElementById('report').classList.remove('hidden');
        document.getElementById('reportContent').innerHTML = `
          <h2>${data.nameEnglish} (${data.nameBangla})</h2>
          <img src="${data.photo}" alt="Photo" />
          <div class="qr">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${nid}" />
          </div>
          <p><strong>NID:</strong> ${data.nationalId}</p>
          <p><strong>জন্ম তারিখ:</strong> ${data.dateOfBirth}</p>
          <p><strong>পিতা:</strong> ${data.fatherName}</p>
          <p><strong>মাতা:</strong> ${data.motherName}</p>
          <p><strong>বর্তমান ঠিকানা:</strong> ${data.preAddress.addressLine}</p>
          <p><strong>স্থায়ী ঠিকানা:</strong> ${data.perAddress.addressLine}</p>
        `;
      } else {
        alert('তথ্য পাওয়া যায়নি। অনুগ্রহ করে সঠিক তথ্য দিন।');
      }
    })
    .catch(err => {
      console.error(err);
      alert('ডেটা লোড করতে সমস্যা হয়েছে।');
    });
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  const element = document.getElementById('reportContent');
  html2pdf().from(element).save('nid-report.pdf');
});
