import "./Back.css"
import { useNavigate } from 'react-router-dom';
export function BackToFront() {
	const navigate = useNavigate();
	return (
		<div className="back-to-front">
			<button onClick={() => navigate(-1)}>
				BACK
			</button>
		</div>
	)
}