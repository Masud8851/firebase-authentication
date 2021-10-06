import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import "./App.css";
import initializeAuthentication from "./FIrebase/firebase.initialize";

initializeAuthentication();
const provider = new GoogleAuthProvider();

function App() {
	const [user, setUser] = useState({});

	const handleGoogleSignIn = () => {
		const auth = getAuth();
		signInWithPopup(auth, provider).then((result) => {
			// const loginUser = result.user;
			const { displayName, email, photoURL } = result.user;
			const logedInUser = {
				name: displayName,
				email: email,
				photo: photoURL,
			};
			setUser(logedInUser);
		});
	};
	return (
		<div className="App">
			<button onClick={handleGoogleSignIn}>Google Sign in</button>
		</div>
	);
}

export default App;
