import { getAuth, signInWithProvider, GoogleAuthProvider } from "firebase/auth";
import "./App.css";
import initializeAuthentication from "./FIrebase/firebase.initialize";

initializeAuthentication();
const provider = new GoogleAuthProvider();

function App() {
	return (
		<div className="App">
			<button>Google Sign in</button>
		</div>
	);
}

export default App;
