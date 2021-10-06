import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	GithubAuthProvider,
	signOut,
} from "firebase/auth";
import { useRef, useState } from "react";
import "./App.css";
import initializeAuthentication from "./FIrebase/firebase.initialize";

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

function App() {
	const [user, setUser] = useState({});
	const auth = getAuth();
	const handleGoogleSignIn = () => {
		signInWithPopup(auth, googleProvider)
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

	const handleGitHubSignIn = () => {
		signInWithPopup(auth, gitHubProvider).then((result) => {
			// const user = result.user;
			// console.log(user);
			const { displayName, email, photoURL } = result.user;
			const logedInUser = {
				name: displayName,
				email: email,
				photo: photoURL,
			};
			setUser(logedInUser);
		});
	};

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				setUser({});
				console.log("Sign-out successful.");
			})
			.catch((error) => {
				console.log("An error happened.");
			});
	};
	return (
		<div className="App">
			<button onClick={handleGoogleSignIn}>Google Sign in</button>
			<button onClick={handleGitHubSignIn}>Github Sign in</button>
			<br />
			<button onClick={handleSignOut}>Sign out</button>
			{user.name && (
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
