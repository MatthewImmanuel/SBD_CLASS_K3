# Database Mahasiswa

Kelompok 3
Anggota :
- Adi Nugroho (2306208546)
- Matthew Immanuel (2306221024)

- database ini dapat menyimpan informasi mahasiswa seperti nama, NPM, status (mahasiswa) angkatan, program studi, status akademik total sks lulus, ipk, ip tiap semester serta nilai dari setiap mata kuliah yang diambil per semesternya. Database juga dapat menyimpan informasi seputar dosen seperti nama, nomor induk, status (dosen) serta mata kuliah yang diajarnya.

- database akan terhubung ke website untuk menampilkan data-data mahasiswa, sekaligus sebagai media bagi dosen untuk memasukkan nilai mata kuliah yang diambil mahasiswa tersebut.

- database dan website bersifat terpisah dan dideploy pada cloud yang berbeda. website akan dideploy menggunakan vercel (frontend) sedangkan database dan bagian backend akan dideploy pada river. user dapat mengakses website melalui internet dan melakukan login dengan username dan password. jika user yang login merupakan mahasiswa, dia dapat melihat data terkait perkuliahannya, sedangkan jika dosen yang melakukan login, maka ia dapat memasukkan nilai untuk semua mahasiswa yang mengikuti mata kuliahnya.

- sistem memasukkan nilai akan dilakukan oleh dosen mata kuliah melalui tabel mahasiswa dan nilai. 

- mahasiswa juga dapat mengisi IRS untuk mengambil mata kuliah di semester tertentu dengan syarat mata kuliah tersebut tersedia di database dan jumlah total sks dari keseluruhan mata kuliah tidak melebihi 24. mahasiswa dinyatakan lanjut ke semester berikutnya jika semua mata kuliah pada IRS sudah memiliki nilai lengkap. mahasiswa yang mendapat nilai rata-rata kurang dari C (60) pada mata kuliah tertentu dapat mengambil mata kuliah itu lagi pada semester berikutnya. Sedangkan jika nilainya melebihi angka tersebut, maka mahasiswa tidak dapat lagi memilih mata kuliah tersebut
