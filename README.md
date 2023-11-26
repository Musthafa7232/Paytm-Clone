# Paytm Wallet Clone

Welcome to the Paytm Wallet Clone project! This application is a self-made clone of the Paytm wallet, providing users with a secure and feature-rich digital wallet experience. It allows users to add funds, make peer-to-peer transactions, request payments, view account statements, and ensures robust two-factor authentication for enhanced security.

## Technologies Used

- **Frontend:**
  - Built with [Vite](https://vitejs.dev/) for a fast and efficient development experience.
  - Utilizes React.js for building the user interface.

- **Backend:**
  - Powered by [Node.js](https://nodejs.org/) and [Express.js](https://expressjs.com/) to handle server-side operations.

- **Database:**
  - Data is stored in [MongoDB](https://www.mongodb.com/) for user information, transactions, and other relevant data.

- **Authentication:**
  - Implements Two-Factor Authentication (2FA) using [speakeasy](https://github.com/speakeasyjs/speakeasy) for email and authenticator app verification.

- **Email Services:**
  - Sends verification emails using [Nodemailer](https://nodemailer.com/) to enhance account security.

## Environmental Variables

To run the application, you need to set up environmental variables in a `.env` file in the root of the project. Create a `.env` file and add the following variables:

```env
PORT=Your_PORT_NUMBER
MONGOURL='YOUR_MONGO_URL'
SECRET_KEY_USER="SECRETE_KEY_FOR_JWT"
USER_EMAIL="EMAIL_FOR_NODEMAILER"
EMAIL_PASS="PASSWORD_FOR_NODEMAILER"
BASE_URL="http://localhost:5173"  // Vite localhost
Make sure to replace the placeholder values with your specific configuration details.
```
Features
User Authentication:

Secure registration and login with email and password.
Two-Factor Authentication (2FA) for additional account security.
Wallet Operations:

Add funds to the wallet for seamless transactions.
Peer-to-Peer Transactions:

Transfer funds easily between users.
Payment Requests:

Send and receive payment requests, simplifying fund collection.
Account Statements:

View detailed transaction history with incoming and outgoing transactions.
Getting Started
Prerequisites
Ensure you have Node.js installed.
Set up a MongoDB database and obtain the connection string.
Installation
Clone the repository:


git clone https://github.com/your-username/paytm-wallet-clone.git
cd paytm-wallet-clone
Install dependencies:

For frontend (inside the client directory):


cd client
npm install
For backend:


cd ..
npm install
Configure environment variables:

Create a .env file in the root of the project and add the necessary environmental variables.

Start the application:

For frontend (inside the client directory):


npm run dev
For backend:


npm run start
Access the application at http://localhost:Your_PORT_NUMBER.

Contributing
If you would like to contribute to this project, feel free to open an issue or create a pull request. We welcome contributions from the community!

License
This project is licensed under the MIT License.



Make sure to replace the placeholder values with your actual configuration details, and this README file should guide users on setting up the necessary environmental variables for your Paytm Wallet Clone project.
