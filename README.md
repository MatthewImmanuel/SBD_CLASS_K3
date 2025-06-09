# Database Mahasiswa

Kelompok 3 <br>
Anggota :
- Adi Nugroho (2306208546)
- Matthew Immanuel (2306221024)

<h3> Deskripsi Project </h3>
- database ini dapat menyimpan informasi mahasiswa seperti nama, NPM, status (mahasiswa) angkatan, program studi, status akademik total sks lulus, ipk, ip tiap semester serta nilai dari setiap mata kuliah yang diambil per semesternya. Database juga dapat menyimpan informasi seputar dosen seperti nama, nomor induk, status (dosen) serta mata kuliah yang diajarnya.

- database akan terhubung ke website untuk menampilkan data-data mahasiswa, sekaligus sebagai media bagi dosen untuk memasukkan nilai mata kuliah yang diambil mahasiswa tersebut. <br>
  ![](https://i.ibb.co/jvGTSqjd/Screenshot-2025-06-09-063516.png)
  ![](https://i.ibb.co/CpVkK0NV/Screenshot-2025-06-09-063547.png)
  ![](https://i.ibb.co/4whgyX6F/Screenshot-2025-06-09-063632.png)
  ![](https://i.ibb.co/99FZ8Vww/Screenshot-2025-06-09-063651.png)
  

- database dan website bersifat terpisah dan dideploy pada cloud yang berbeda. website akan dideploy menggunakan vercel (frontend) sedangkan database dan bagian backend akan dideploy pada river. user dapat mengakses website melalui internet dan melakukan login dengan username dan password. jika user yang login merupakan mahasiswa, dia dapat melihat data terkait perkuliahannya, sedangkan jika dosen yang melakukan login, maka ia dapat memasukkan nilai untuk semua mahasiswa yang mengikuti mata kuliahnya.

- sistem memasukkan nilai akan dilakukan oleh dosen mata kuliah melalui tabel mahasiswa dan nilai. 

- mahasiswa juga dapat mengisi IRS untuk mengambil mata kuliah di semester tertentu dengan syarat mata kuliah tersebut tersedia di database dan jumlah total sks dari keseluruhan mata kuliah tidak melebihi 24. mahasiswa dinyatakan lanjut ke semester berikutnya jika semua mata kuliah pada IRS sudah memiliki nilai lengkap. mahasiswa yang mendapat nilai rata-rata kurang dari C (60) pada mata kuliah tertentu dapat mengambil mata kuliah itu lagi pada semester berikutnya. Sedangkan jika nilainya melebihi angka tersebut, maka mahasiswa tidak dapat lagi memilih mata kuliah tersebut.<br>

![](https://i.ibb.co/sJP3cpZs/Screenshot-2025-06-09-063602.png)

<h3> Proses Dockerisasi </h3>

- Dockerisasi pada project bertujuan agar website dapat dijalankan dengan mudah pada perangkat lain tanpa perlu memasang dependencies secara manual. Dockerisasi dilakukan dengan membagi frontend dan backend ke dalam image yang berbeda agar dapat digunakan secara fleksibel. Pada folder frontend dan backend, masing-masing memiliki file Dockerfile yang akan mengambil image template sebagai base dari image yang akan dibuat. Pada bagian backend, base image yang digunakan adalah node.js dengan konfigurasi sebagai berikut : <br><br>

  ![](https://i.ibb.co/Y4PdtvF1/Screenshot-2025-06-06-160511.png) <br><br>

  Pada konfigurasi tersebut, docker akan secara otomatis menjalankan npm install sehingga seluruh module yang diperlukan akan otomatis terpasang pada container, membuat website dapat langsung dijalankan. Sedangkan pada Dockerfile di folder      frontend, image yang digunakan adalah node serta nginx. image node.js tetap diperlukan untuk dapat menjalankan command npm run build untuk mem-build frontend. Nginx sendiri digunakan untuk menjalankan hasil dari build tanpa mengikutsertakan komponen-komponent dari node.js, membuat image yang dihasilkan jauh lebih kecil. Berikut adalah konfigurasi untuk Dockerfile pada frontend : <br><br>

  ![](https://i.ibb.co/vC7YvqD6/Screenshot-2025-06-06-165537.png) <br><br>

- Untuk dapat mengintegrasikan kedua image ke dalam satu kontainer, diperlukan file compose yang akan menyatukan proses build dari image frontend dan backend. setiap image akan dinamai dengan format docker_username/repo_name:tag agar dapat di-push ke docker hub. Setelah image di-push, maka siapa saja yang ingin menjalankan program hanya perlu melakukan clone terhadap github repository, lalu menjalankan command berikut : <br>
  docker-compose pull <br>
  untuk secara otomatis mengambil image yang ada pada repository docker hub. Setelah image ada pada perangkat lokal milik user, user hanya tinggal menjalankan program dengan command : <br>
  docker-compose up <br><br>

  tampilan repository pada docker hub : <br><br>
  ![](https://i.ibb.co/hxNKj43j/Screenshot-2025-06-06-171320.png) <br><br>
  
  command untuk pull image dari docker hub ke lokal : <br><br>
  ![](https://i.ibb.co/Z6jsYkbg/Screenshot-2025-06-06-155612.png) <br><br>
  
