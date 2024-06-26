import { FC } from 'react';

const Home: FC = () => {
  return (
    <div className="main-content home">
      <h1>Welcome to HSR-DB!</h1>
      <h2>This application is a project for CS-GY 6083 Principles of Database Systems.</h2>
      <p>
        This UI allows for viewing a database for Characters and Light Cones for the gacha game "Honkai Star Rail", as well as several additional post-authentication features:
      </p>
      <ul>
        <li>pull tracker</li>
        <li>rate visualizer</li>
        <li>new Character/Light Cone entry (admin only)</li>
        <li>user management (admin only)</li>
      </ul>
      <p>
        Due to limited server capacity, new account creation is centrally managed. Existing account credentials will be shared with assignment submission.
      </p>
    </div>
  );
};

export default Home;
