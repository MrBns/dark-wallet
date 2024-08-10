// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAhCcPp9JynYxSYtEsWzO-0Z1YGsbRUL_4',
	authDomain: 'mrbns-wallet.firebaseapp.com',
	projectId: 'mrbns-wallet',
	storageBucket: 'mrbns-wallet.appspot.com',
	messagingSenderId: '983262431641',
	appId: '1:983262431641:web:c96601d683158a4c192b08'
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
