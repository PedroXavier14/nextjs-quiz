import styled from "styled-components";
import db from "../db.json";
import Widget from "../src/components/Widget";
import QuizBackground from "../src/components/QuizBackground";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";

const QuizContainer = styled.div`
	width: 100%;
	max-width: 350px;
	padding-top: 45px;
	margin: auto 10%;
	@media screen and (max-width: 500px) {
		margin: auto;
		padding: 15px;
	}
`;

export default function Home() {
	return (
		<QuizBackground backgroundImage={db.bg}>
			<QuizContainer>
				<Widget>
					<Widget.Header>
						<h1>What is Lorem Ipsum?</h1>
					</Widget.Header>
					<Widget.Content>
						<p>
							Lorem Ipsum is simply dummy text of the printing and typesetting
							industry.
						</p>
					</Widget.Content>
				</Widget>
				<Widget>
					<Widget.Header>
						<h1>Why do we use it?</h1>
					</Widget.Header>
					<Widget.Content>
						<p>
							It is a long established fact that a reader will be distracted by
							the readable content of a page when looking at its layout.
						</p>
					</Widget.Content>
				</Widget>
				<Footer />
			</QuizContainer>
			<GitHubCorner projectUrl="https://github.com/PedroXavier14" />
		</QuizBackground>
	);
}
