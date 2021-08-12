import "./App.css";

import axios from "axios";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import Detail from "./Detail";

function App() {
	//
	const [list, setList] = useState([]);
	const [filterText, setFilterText] = useState("");
	const [modal, setModal] = useState();

	useEffect(() => {
		axios.get("https://api.giphy.com/v1/gifs/trending?api_key=5Muqe6HOngq40S9xI6ZQJ7jDfvZUoS5f").then((res) => {
			setList(res.data.data);
		});
	}, []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedSearch = useCallback(
		_.debounce((filterText) => searchGif(filterText), 200),
		[]
	);

	useEffect(() => {
		if (filterText) {
			debouncedSearch(filterText);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterText]);

	function searchGif(text) {
		axios.get(`https://api.giphy.com/v1/gifs/search?api_key=5Muqe6HOngq40S9xI6ZQJ7jDfvZUoS5f&q=${text}`).then((res) => {
			setList(res.data.data);
		});
	}

	function handleClick(i) {
		setModal(<Detail gif={i} onClose={() => setModal(null)} />);
	}

	return (
		<div className="app-container">
			{modal}
			<header className="gif-header">
				<input type="text" placeholder="Search all GIFs" value={filterText} onChange={(e) => setFilterText(e.target.value)} />
			</header>
			<div className="gif-container">
				{list.map((i) => (
					<div key={i.id} className="gif-box" onClick={() => handleClick(i)}>
						<img src={i.images.fixed_height.url} alt="" />
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
