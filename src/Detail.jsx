import "./Detail.css";

function Detail({ gif, onClose }) {
	return (
		<dialog open>
			<div className="image">
				<img src={gif.images.original.url} alt={gif.title} />
			</div>
			<div className="info">
				<dl>
					<dt>Title</dt>
					<dd>{gif.title}</dd>
					<dt>Rating</dt>
					<dd>{gif.rating}</dd>
					{gif.user && (
						<>
							<dt>User</dt>
							<dd>
								<img src={gif.user.avatar_url} alt={gif.username} />@{gif.username}
							</dd>
						</>
					)}
					<dt>Giphy URL</dt>
					<dd>{gif.bitly_url}</dd>
				</dl>
			</div>
			<button onClick={() => onClose()}>X</button>
		</dialog>
	);
}

export default Detail;
