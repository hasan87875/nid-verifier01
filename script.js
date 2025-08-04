function fetchData() {
  const nid = document.getElementById('nid').value;
  const dob = document.getElementById('dob').value;
  const url = `https://unique-seba.com/api/servercopy2?api_key=1e0fc13be94e217f1ec34da77f2b4e83&nid=${nid}&dob=${dob}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.nameEnglish) {
        document.getElementById('output').classList.remove('hidden');
        document.getElementById('photo').src = data.photo;
        document.getElementById('qrImage').src = `https://api.qrserver.com/v1/create-qr-code/?data=${data.nationalId}&size=100x100`;
        document.getElementById('nameEn').innerText = data.nameEnglish;
        document.getElementById('nameBn').innerText = data.nameBangla;
        document.getElementById('nidNo').innerText = data.nationalId;
        document.getElementById('dobText').innerText = data.dateOfBirth;
        document.getElementById('father').innerText = data.fatherName;
        document.getElementById('mother').innerText = data.motherName;
        document.getElementById('religion').innerText = data.religion;
        document.getElementById('gender').innerText = data.gender;
        document.getElementById('preAddr').innerText = data.preAddress.addressLine;
        document.getElementById('perAddr').innerText = data.perAddress.addressLine;
      } else {
        alert("তথ্য পাওয়া যায়নি!");
      }
    })
    .catch(err => {
      alert("সমস্যা হয়েছে ডেটা আনতে।");
      console.error(err);
    });
}

function downloadPDF() {
  const element = document.getElementById('output');
  html2pdf().from(element).save("nid-report.pdf");
}
