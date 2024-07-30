// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Question from "./components/Question";
import UserForm from "./components/UserForm";
import Results from "./components/Results";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./components/UserContext";

function App() {
	const questions = [
		{
			question: "What's your favorite color?",
			options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
		},
	];

	const keywords = {
		Fire: "fire",
		Water: "water",
		Earth: "earth",
		Air: "air",
	};

	const elements = {
		"Red 🔴": "Fire",
		"Blue 🔵": "Water",
		"Green 🟢": "Earth",
		"Yellow 🟡": "Air",
		// Continue mapping all your possible options to a keyword
	};

	const [answers, setAnswers] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [userName, setUserName] = useState("");
	const [element, setElement] = useState("");
	const [artwork, setArtwork] = useState(null);

	useContext(UserContext);

	function handleAnswer(answer) {
		setAnswers([...answers, answer]);
		console.log(answers);
		setCurrentQuestionIndex(currentQuestionIndex + 1);
	}

	function handleUserFormSubmit(name) {
		setUserName(name);
	}

	function determineElement(answers) {
		const counts = {};
		for (const answer of answers) {
			const element = elements[answer];
			counts[element] = (counts[element] || 0) + 1;
		}
		return Object.keys(counts).reduce((a, b) => {
			return counts[a] > counts[b] ? a : b;
		});
	}

	useEffect(() => {
		if (currentQuestionIndex === questions.length) {
			const selectedElement = determineElement(answers);
			setElement(selectedElement);
			async function fetchArtwork() {
				const response = await fetch(
					`https://collectionapi.metmuseum.org/public/collection/v1/objects/${Math.floor(Math.random(100) * 100)}`,
				);
        const data = await response.json()
        setArtwork(data)
			}

      fetchArtwork()
		}
	}, [currentQuestionIndex]);

	return (
		<>
			<UserContext.Provider value={{ name: userName, setName: setUserName }}>
				<Header />
				<Routes>
					<Route
						path="/"
						element={<UserForm onSubmit={handleUserFormSubmit} />}
					/>
					<Route
						path="/quiz"
						element={
							currentQuestionIndex < questions.length ? (
								<Question
									question={questions[currentQuestionIndex].question}
									options={questions[currentQuestionIndex].options}
									onAnswer={handleAnswer}
								/>
							) : (
								<Results element={element} artwork={artwork} />
							)
						}
					/>
				</Routes>
			</UserContext.Provider>
		</>
	);
}

export default App;
