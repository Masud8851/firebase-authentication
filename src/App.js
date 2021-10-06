import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRef, useState } from "react";
import "./App.css";
import initializeAuthentication from "./FIrebase/firebase.initialize";

initializeAuthentication();
const provider = new GoogleAuthProvider();

function App() {
	const [user, setUser] = useState({});

	const handleGoogleSignIn = () => {
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((result) => {
				// const loginUser = result.user;
				const { displayName, email, photoURL } = result.user;
				const logedInUser = {
					name: displayName,
					email: email,
					photo: photoURL,
				};
				setUser(logedInUser);
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	};
	return (
		<div className="App">
			<button onClick={handleGoogleSignIn}>Google Sign in</button>
			<br />
			{user.email && (
				<div>
					<h2>Welcome {user.name}</h2>
					<p>I know your email address : {user.email}</p>
					<img src={user.photo} alt="" />
				</div>
			)}
		</div>
	);
}

export default App;
