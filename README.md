
# 🩺<img width="60" height="59" alt="image" src="https://github.com/user-attachments/assets/cc4cc0e4-c5c5-437c-aa77-f35f4b02d6e8" />
 VetRelief – Blockchain-based Animal Shelter Donation System

VetRelief is a decentralized web application that enables **transparent animal shelter donations** using **blockchain and Web3** technology.  
It combines a **Node.js + Express backend**, **React/Next.js frontend**, and **Ethereum smart contracts** deployed via **Truffle** and **Ganache**.

---

## 🌐 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React.js / Next.js, Web3.js, Axios, TailwindCSS |
| **Backend** | Node.js, Express.js, MySQL |
| **Blockchain** | Solidity, Truffle, Ganache CLI, MetaMask |
| **Database** | MySQL |
| **Authentication** | JWT (Login/Signup for Admins & Users) |
| **Storage** | Local Uploads for Shelter Images / Receipts |

---

## 🧱 Features

- 🧩 **Blockchain Integration** for secure and transparent donation tracking  
- 👤 **User Authentication** (Login/Signup using JWT)  
- 🐶 **Shelter Management** – Add, View, and Manage Shelters  
- 💸 **Donation System** – Users can donate using MetaMask wallet  
- 🧾 **Receipts & History** – View previous donations  
- 🛡️ **Admin Panel** – Manage shelters and view total funds  
- 🪙 **Smart Contract** – Handles donation transfers & ledger  

---

## ⚙️ Project Structure

```

VetRelief/
│
├── blockchain/
│   ├── contracts/
│   │   └── VetRelief.sol
│   ├── migrations/
│   │   └── 2_deploy_contracts.js
│   ├── truffle-config.js
│   └── package.json
│
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── shelters.js
│   │   └── donations.js
│   ├── uploads/
│   ├── db.js
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── App.js
│   │   ├── web3.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── .env
│
├── README.md
└── .gitignore

````

---

## 🧠 Smart Contract Details

| Contract | Address | Network ID |
|-----------|----------|-------------|
| VetRelief | `0x4fc97364a36A865DBe0E085cD7A9d4Bcad00EFCc` | 1337 (Local Ganache) |

Deployed by account:  
`0x4f09a0121867191929267d569747ad9447e1afD1`

---

## 🧩 Application Flow

1. **User Registration/Login** → via Express + MySQL + JWT  
2. **Admin Dashboard** → Add shelters with wallet addresses  
3. **MetaMask Integration** → Connect wallet and donate securely  
4. **Smart Contract** → Records donation on-chain  
5. **Backend** → Stores receipts & donor info in MySQL  
6. **Frontend UI** → Displays shelters, total donations, and history  

---
---

## 🖼️ Screenshots

### 🏠 Main Page
![Screenshot_12-10-2025_16125_localhost](https://github.com/user-attachments/assets/c2a397e5-6bd4-48c0-b52f-c1d206923982)


### 🔐 Login Page
![Screenshot_12-10-2025_15133_localhost](https://github.com/user-attachments/assets/d54b403d-91b7-4bf7-ba98-756582c11810)



### 🧾 Signup Page
![Screenshot_12-10-2025_151326_localhost](https://github.com/user-attachments/assets/cab00e15-91c8-49e8-ae30-c2ff06faf43f)


### 🧑‍💼 Admin Dashboard
![Screenshot_12-10-2025_153927_localhost](https://github.com/user-attachments/assets/f4820816-0fe8-4254-b167-475575a00c8f)


### ➕ Add Shelter
![Screenshot_12-10-2025_153951_localhost](https://github.com/user-attachments/assets/d30eb153-0ff3-44a8-a2a2-8ec1d7ae0051)

<img width="1915" height="823" alt="Screenshot 2025-10-12 154117" src="https://github.com/user-attachments/assets/a8a058ba-7fbe-4f0e-8f78-921a7c83985f" />



### 🏠 Shelter List
![Screenshot_12-10-2025_15462_localhost](https://github.com/user-attachments/assets/beb2618a-24f5-4327-bb9e-453d1688539c)


### 👥 User Dashboard
![User Dashboard](assets/screenshots/7_user_dashboard.png)

### 💸 Donation Form
![Screenshot_12-10-2025_154641_localhost](https://github.com/user-attachments/assets/81c3ba38-7229-4004-b0f4-b9d61e8ae5e1)

<img width="1896" height="833" alt="Screenshot 2025-10-12 154730" src="https://github.com/user-attachments/assets/6778c015-92f3-42ca-ad5e-eeb47744069f" />



### 📊 Donations Page
![Screenshot_12-10-2025_15519_localhost](https://github.com/user-attachments/assets/525eba5e-c253-4ea2-820f-f29826469f83)


### 🧾 Final Receipt
![Screenshot_12-10-2025_154753_localhost](https://github.com/user-attachments/assets/d8bbeb1d-5e25-47d8-aca9-96bf4171b25b)


---

## 🎥 Demo Video

🎬 Watch the full VetRelief demo here:  


Or if hosted on YouTube:  
[![Watch Demo on YouTube](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)

---

## 🪙 Database Setup

Run the following in your MySQL terminal:
```sql
CREATE DATABASE vetrelief;

USE vetrelief;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE shelters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  wallet VARCHAR(255),
  image VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE donations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  shelterId INT NOT NULL,
  donor VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  receipt VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
````

---

## 🚀 Commands & Setup

### 1️⃣ Start Ganache Network

```bash
ganache-cli -p 8546 -i 1337
```

### 2️⃣ Deploy Contracts

```bash
cd blockchain
truffle migrate --network development --reset
```

### 3️⃣ Start Backend

```bash
cd backend
npm install
node index.js
```

Backend runs on: **[http://localhost:5000](http://localhost:5000)**

### 4️⃣ Start Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on: **[http://localhost:3000](http://localhost:3000)**

---

## 🧰 Tools Used

* **Node.js / Express** – Backend API
* **MySQL** – Relational database
* **Solidity / Truffle / Ganache** – Blockchain & Smart Contract
* **React.js / Next.js** – Modern responsive frontend
* **MetaMask** – Ethereum wallet integration
* **JWT** – Secure authentication system

---

## 💡 Future Enhancements

* 📊 Add donation analytics dashboard
* 🌍 Deploy smart contracts on Ethereum Testnet
* 🤖 AI-based fraud detection for transactions
* 🧾 Email notifications for receipts

---

## 👨‍💻 Developer

**Siddharth Jagtap**
📧 [your.email@example.com](mailto:your.email@example.com)
💼 [LinkedIn or GitHub Profile]

---

## 📄 License

This project is open-source under the **MIT License**.

````

---

✅ **Next Step:**  
Create this file as `README.md` in your project’s root (`D:\VetRelief\README.md`), then commit and push to GitHub using:

```bash
git add README.md
git commit -m "Added detailed project README"
git push
````

Would you like me to also give you the **`.gitignore`** file (ready to copy–paste) next?
