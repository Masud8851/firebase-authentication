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
			<br />
			{user.email && (
				<div>
					<h2>Welcome {user.name}</h2>
					<p>I know your email address : {user.email}</p>
				</div>
			)}
		</div>
	);
}

export default App;
