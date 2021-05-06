import React, { useState, useEffect } from "react";

const Home = () => {
	const [todoList, setTodoList] = useState([]);
	const [showError, setShowError] = useState(false);

	useEffect(() => {
		getData();
	}, []);

	const handleKeyPress = e => {
		if (e.target.value !== "" && e.charCode === 13) {
			let newToDo = {
				label: e.target.value,
				done: false
			};
			let newToDoList = [...todoList, newToDo];
			setTodoList(newToDoList);
			updateData(newToDoList);
			e.target.value = "";
		}
	};

	const getData = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alejo")
			.then(resp => resp.json())
			.then(data => setTodoList(data))
			.catch(error => setShowError(true));
	};

	const updateData = updatedList => {
		let updatedListToSend = JSON.stringify(updatedList);
		let options = {
			method: "PUT",
			body: updatedListToSend,
			headers: {
				"Content-Type": "application/json"
			}
		};

		console.log(updatedListToSend);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alejo", options)
			.then(resp => resp.json())
			.then(data => console.log(data))
			.catch(error => console.log(error));
	};

	return (
		<div className="container-fluid">
			<div className="row d-flex justify-content-center">
				<div className="col-12 col-md-6 col-xl-4">
					<div className="card mt-5" style={{ width: "100%" }}>
						<input
							onKeyPress={handleKeyPress}
							placeholder="Agregar ToDo"
						/>
						<ul className="list-group list-group-flush">
							{todoList.length === 0 ? (
								<li className="list-group-item">Cargando...</li>
							) : (
								todoList.map((todo, index) => (
									<li key={index} className="list-group-item">
										{todo.label}
									</li>
								))
							)}
						</ul>
						{showError ? <h1>Ups! Algo malio sal!</h1> : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
