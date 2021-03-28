import React from 'react';
import styled from 'styled-components';
import game from './public/game.jpg';
import Socket from './components/Chat/Socket';


const Game = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${game});
`;
const StyledSocket = styled(Socket)`
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

function App() {


  return (
    <Game>
      <StyledSocket />
    </Game>
  );
}

export default App;
