import React from 'react';
import ReactDOM from 'react-dom/client';
import { MainView } from './components/main-view/main-view';


// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return <MainView/>;
  }
}


const container = ReactDOM.createRoot(document.getElementsByClassName("app-container")[0]);
container.render(
    <MyFlixApplication />
);
