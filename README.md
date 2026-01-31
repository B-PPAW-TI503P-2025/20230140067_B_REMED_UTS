PerpusTrack (Library Borrowing with Location Tracking)

1. Pendahuluan
PerpusTrack (Library Borrowing with Location Tracking) adalah sistem manajemen perpustakaan berbasis web yang dilengkapi dengan fitur pelacakan lokasi (Geolocation) dalam proses peminjaman buku. Aplikasi ini dikembangkan untuk meningkatkan keamanan serta akurasi data peminjaman dengan mencatat lokasi pengguna secara real-time saat melakukan transaksi peminjaman.
Sistem ini menerapkan kontrol akses berbasis peran (role-based access control) yang membedakan hak akses antara admin dan user. Dengan demikian, pengelolaan data perpustakaan dapat dilakukan secara lebih terstruktur dan aman.

2. Cara Menjalankan Aplikasi
Untuk menjalankan aplikasi PerpusTrack 

2.1 Prasyarat
Pastikan perangkat telah terpasang:
•	Node.js (versi 14 atau terbaru)
•	MySQL Server / Laragon
•	MySQL Workbench
•	Visual Studio Code
•	Postman (untuk pengujian API)

2.2 Langkah Instalasi
1.	Ekstrak Source Code
Pastikan seluruh file aplikasi berada dalam satu folder project.
2.	Instalasi Dependensi
Buka terminal pada folder project dan jalankan perintah:
3.	npm install
4.	Konfigurasi Database
o	Buat database baru dengan nama:
o	CREATE DATABASE library_db;
o	Sesuaikan konfigurasi koneksi database pada file:
o	config/database.js
5.	Menjalankan Server
Jalankan aplikasi menggunakan perintah:
6.	node app.js
Server akan berjalan pada alamat:
http://localhost:3000

3. Dokumentasi Antarmuka
Berikut adalah komponen utama dari antarmuka pengguna aplikasi PerpusTrack:

3.1 Login Admin
(image)
Deskripsi:
Halaman login admin digunakan oleh pengelola perpustakaan untuk mengelola data sistem. Admin dapat mengakses dashboard yang menyediakan fitur:
•	Manajemen data buku (Create, Read, Update, Delete)
•	Monitoring stok buku
•	Melihat riwayat peminjaman beserta informasi lokasi peminjam

3.2 Login User
(image)
Deskripsi:
Halaman login user diperuntukkan bagi mahasiswa atau anggota perpustakaan. User dapat melihat daftar buku yang tersedia dan melakukan peminjaman buku.
Untuk melakukan peminjaman, user wajib mengaktifkan izin lokasi (Geolocation) pada browser agar sistem dapat mencatat koordinat peminjaman.

4. Daftar API (Endpoints)
Aplikasi PerpusTrack menggunakan RESTful API dengan sistem autentikasi berbasis role melalui custom header.

4.1 Public Endpoints
Endpoint yang dapat diakses oleh semua pengguna terautentikasi:
•	GET /api/books
Mengambil seluruh daftar koleksi buku.
•	GET /api/books/:id
Mengambil detail buku berdasarkan ID.

4.2 Admin Mode
Membutuhkan header:
x-user-role: admin
Endpoint yang tersedia:
•	POST /api/books
Menambahkan data buku baru ke dalam sistem.
•	PUT /api/books/:id
Memperbarui informasi buku (judul, penulis, dan stok).
•	DELETE /api/books/:id
Menghapus data buku dari sistem berdasarkan ID
(Buku yang telah memiliki riwayat peminjaman tidak dapat dihapus untuk menjaga konsistensi data).

4.3 User Mode
Membutuhkan header:
x-user-role: user
x-user-id: [id_user]
Endpoint yang tersedia:
•	POST /api/borrow
Melakukan peminjaman buku.
Payload wajib menyertakan:
o	bookId
o	latitude
o	longitude

5. Penutup
Aplikasi PerpusTrack (Library Borrowing with Location Tracking) diharapkan dapat membantu pengelolaan perpustakaan secara lebih efektif dan aman. Integrasi fitur geolokasi memberikan nilai tambah dalam pencatatan aktivitas peminjaman serta meningkatkan transparansi data bagi pengelola perpustakaan.

Dashboard Admin
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/16cd2cd2-4c3b-4765-b0db-86754d0845b2" />
Dashboard User
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/bb7d1be6-d3a4-427d-b055-dfef3aa3c7d7" />

Test API

Resgiter
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/97296531-7e34-4db1-8354-7af5d43f8a2c" />
Login
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/2e37ef43-eabb-4139-920b-e8cbe1b03086" />
Get semua buku 
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/4b0be848-9ad1-4aa5-99ec-d805d5e75061" />
Get buku by id
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/c9d15fe7-4927-425d-8eb6-7333a26f4f98" />
Update buku x-user-role = admin
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/1ffa792c-679c-4729-8d02-8f3570850888" />
Buku tidak bisa di hapus karena sudah pernah di pinjam
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/f036e64a-d616-493a-b680-d4b16d570a49" />
Hapus buku yang belum di pinjam
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/cc7b312c-0f39-49ce-a947-a799b0ab5c34" />
Tambah buku 
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/214b058b-4bbc-4fdd-a1c1-0960f68d09d0" />
Pinjam buku x-user-role = user dan id user 2
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/7c0b898a-df7a-49da-a7c6-73baa995d7fa" />
Get borrow logs x-user-role = admin
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/26613eb0-ec55-43f8-9e38-fb9f9d517d0a" />
Struktur database
<img width="750" height="756" alt="image" src="https://github.com/user-attachments/assets/5f2ef955-3a04-4eea-9d04-8bc94e0ba330" />
Struktur tabel books
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/50220f0e-7e3b-4e33-9b0e-4d94d104d446" />
Struktur tabel borrowlogs
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/ebd9d770-b56b-40af-b87f-0212ff9baaba" />
Struktur tabel user
<img width="940" height="529" alt="image" src="https://github.com/user-attachments/assets/1208c66d-3493-42a8-9af0-76d870e5745b" />

 
