import React from 'react';
import Login from '../components/loginform';
import Alert from 'react-s-alert';

const Home = () => {
	return (
		<section>
			<Alert effect="slide" position="top-right" timeout={5000} stack={{ limit: 3 }} />
			<Login />
		</section>
	);
};

export default Home;
