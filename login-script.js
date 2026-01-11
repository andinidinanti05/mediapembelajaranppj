// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://mediabelajarppj-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Login Siswa
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const namaInput = document.getElementById("nama").value.trim();
    const nisnInput = document.getElementById("nisn").value.trim();

    db.ref("siswa").once("value").then(snapshot => {
        const siswaData = snapshot.val();
        let found = false;

        for (const key in siswaData) {
            if (siswaData[key].nama === namaInput) {
                found = true;
                if (siswaData[key].nisn === nisnInput) {
                    // Login berhasil
                    document.getElementById("loginForm").style.display = "none";
                    document.getElementById("dashboard").style.display = "block";
                    document.getElementById("profil").innerText =
                        `Nama: ${siswaData[key].nama} | Kelas: ${siswaData[key].kelas} | Skor: ${siswaData[key].skor}`;

                    // Tampilkan leaderboard
                    const leaderboard = Object.values(siswaData).sort((a,b)=>b.skor-a.skor);
                    const lbList = document.getElementById("leaderboard");
                    lbList.innerHTML = "";
                    leaderboard.forEach(s => {
                        const li = document.createElement("li");
                        li.textContent = `${s.nama} - Skor: ${s.skor}`;
                        lbList.appendChild(li);
                    });

                } else {
                    alert("NISN salah");
                }
                break;
            }
        }

        if(!found) alert("Nama tidak terdaftar");
    });
});
