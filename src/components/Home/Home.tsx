import { FC } from 'react';

import './Home.scss';

const Home: FC = () => {
  return (
    <div className="home">
      <h1>Welcome to HSR-DB!</h1>
      <h2>This application is a project for CS-GY 6083 Principles of Database Systems.</h2>
      <p>
        This UI allows for viewing a database for Characters and Light Cones for the gacha game "Honkai Star Rail", as well as several additional post-authentication features:
        <ul>
          <li>pull tracker</li>
          <li>rate visualizer</li>
          <li>new Character/Light Cone entry (admin only)</li>
          <li>user management (admin only)</li>
        </ul>
      </p>
      <p>
        Due to limited server capacity, new account creation has been disabled. Existing account credentials will be shared with assignment submission.
      </p>
    </div>
  );
};

export default Home;
