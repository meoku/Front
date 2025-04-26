import { css } from '@emotion/react';
import './App.css';
import { BrowserView, MobileView } from 'react-device-detect';
import MobileApp from './components/mobile/MobileApp';
import MainPage from './pages/Main/MainPage';

function App() {
  return (
    <div>
      <BrowserView>
        <MainPage />
      </BrowserView>
      <MobileView>
        <div
          css={css`
            width: 100vw;
            overflow-x: clip;
          `}
        >
          <MobileApp />
        </div>
      </MobileView>
    </div>
  );
}

export default App;
