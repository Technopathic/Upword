import { css, keyframes } from 'emotion';

const container = css`
  display:flex;
  flex-direction:column;
  min-height:100vh;
  font-family:sans-serif;
  align-items:center;
  width:100%;

  @media only screen and (max-width : 425px) {
    align-items:stretch;
  }
`;

const wrapperContainer = css`
  background:#444041;
  padding:30px;
  display:flex;
  flex-direction:column;
  width:100%;
  max-width:600px;
  box-shadow:0 20px 30px 4px rgba(0, 0, 0, 0.5);
  border-radius:5px;
  border-bottom:25px solid #333132;
  border-right:1px solid #565354;
  border-left:1px solid #565354;
  margin-top:30px;

  @media only screen and (max-width : 425px) {
    width:auto;
    padding:15px 5px;
    border-right:none;
    border-left:none;
    border-radius:0px;
  }
`;

const containerSlant = css`
  width:100%;
  min-height:90vh;
  background:#f7c1c1;
  position:fixed;
  top:0;
  align-self:center;
  z-index:-1;
  clip-path: polygon(
    0 0, 
    100% 30%,
    100% 100%, 
    0 70%
  );
`;

const headerContainer = css`
  width:100%;
  border-bottom: 1px solid #fffdfe;

`;

const logoContainer = css`
  text-align: center;
  font-size: 4em;
  margin: 0;
  padding-top: 30px;
  text-transform: uppercase;
  color:#fffdfe;
  Arial Narrow, sans-serif;
  letter-spacing:7px;
  text-shadow:0 5px 20px #999999;
`;

const headerContent = css`
  display:flex;
  flex-direction:row;

  @media only screen and (max-width : 425px) {
    flex-direction: column-reverse;
  }
`;

const headerColumn = css`
  width:48%;
  margin: 1%;
  display:flex;
  flex-direction:column;

  @media only screen and (max-width : 425px) {
    width:100%;
  }
`;

const headerNotice = css`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  flex-grow:1;
`;

const headerNoticeSub = css`
  color:#cccacb;
  font-size:1.5em;
`;

const headerNoticeTitle = css`
  margin-top:5px;
  margin-bottom:5px;
  color:#fffdfe;
  font-size:2em;
  text-transform:uppercase;
`;

const headerNoticeSm = css`
  color:#cccacb;
  font-size:0.9em !important;
`;

const headerNoticeWoD = css`
  margin-top:5px;
  margin-bottom:5px;
  color:#fffdfe;
  font-size:1.5em;
  text-transform:uppercase;
`;

const statContainer = css`
  display:flex;
  flex-direction:row;
`;

const statBlock = css`
  background: #333132;
  border-radius: 5px;
  color: #EEEEEE;
  padding-top:15px;
  padding-bottom:15px;
  width:29%;
  margin:2%;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-weight: bold;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`;

const statContent = css`
  color: #fffff9;
  font-size: 1.4em;
`;

const optionContainer = css`
  display:flex;
  flex-direction:row;
`;

const optionBlock = css`
  padding-top: 10px;
  padding-bottom: 10px;
  width: 50%;
  background: #232122;
  border-radius: 5px;
  margin: 5px;
  text-align: center;
  font-size: 1.2em;
  color: #fff4da;
  font-weight: bold;
  cursor:pointer;
  user-select:none;
`;

const inactiveButton = css`
  background: #4e4d4e !important;
  border: 1px solid #383738 !important;
  user-select:none;
`;

const newGameKey = keyframes`
  0%   {background-color: #232122;}
  50%  {background-color: #383738;}
  100% {background-color: #232122;}
`;

const newGameFlash = css`
  animation-name:  ${newGameKey};
  animation-duration:  3s;
  animation-iteration-count:  infinite;
`;

const dangerKey = keyframes`
  0%   {background-color: #b35d5b;}
  50%  {background-color: #e07572;}
  100% {background-color: #b35d5b;}
`;

const dangerFlash = css`
  animation-name:  ${dangerKey};
  animation-duration:  2s;
  animation-iteration-count:  infinite;
`;

const danger = css`
  background: #b35d5b !important;
`;

const mainContainer = css`
  display:flex;
  flex-direction:column;
  width:100%;
`;

const wordContainer = css`
  margin-top:20px;
  margin-bottom:20px;
  height:50px;
  border-radius: 5px;
  border: 1px solid #232122;
  background: #333132;
  color: #fff4da;
  font-weight: bold;
  font-size: 1.2em;
  display:flex;
  flex-direction:row;
  align-items:center;
  padding-left:10px;
  padding-right:10px;
  user-select:none;
`;

const challengeButton = css`
  margin-top:15px;
  text-align: center;
  border: 1px solid #232122;
  color: #fff4da;
  font-weight: bold;
  font-size: 1.5em;
  background: #333132;
  border-radius: 5px;
  display: block;
  cursor: pointer;
  padding-top:10px;
  padding-bottom:10px;
  text-transform:uppercase;

  &:hover {
    background: #232122;
  }
`;

const challengeButtonActive = css`
    background: #b35d5b !important;
`;

const lettersContainer = css`
  display:flex;
  flex-direction:row;
  justify-content:center;
`;

const lettersBlock = css`
  width:9%;
  margin:0.5%;
  padding-top:15px;
  padding-bottom:15px;
  box-sizing:  border-box;
  text-align: center;
  border: 1px solid #232122;
  background: #333132;
  color: #fff4da;
  font-weight: bold;
  font-size: 1.3em;
  border-radius: 5px;
  cursor: pointer;
  user-select:none;

  &:hover {
    background: #232122;
  }
`;

const infoBlock = css`
  padding-top: 30px;
  color: #3f3f3f;
  font-size: 1.1em;
  margin: 0 auto;
  text-align: center;
`;

const infoLink = css`
  color: #3f3f3f;
  text-decoration:none;
`;

const infoContainer = css`
  color:#fff4da;
  font-size:1.1em;
  line-height:25px;
`;

const infoImportant = css`
  font-weight:bold;
  text-transform:uppercase;
  color:#fff4da;
`;

const extraContent = css`
  display:flex;
  flex-direction:row;
  width:100%;
  justify-content:center;
  margin-top:10px;
  margin-bottom:15px;
  @media only screen and (max-width : 425px) {
    flex-direction: column;
  }
`;

const extraButton = css`
  text-transform:uppercase;
  font-size:0.9em;
  font-weight:bold;
  background: #42363b;
  color: #fff4da;
  padding:15px 30px;
  margin:1%;
  border-radius:5px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  text-decoration:none;
`;

export default {
    container,
    wrapperContainer,
    containerSlant,
    headerContainer,
    logoContainer,
    headerContent,
    headerColumn,
    headerNotice,
    headerNoticeSub,
    headerNoticeTitle,
    headerNoticeSm,
    headerNoticeWoD,
    statContainer,
    statBlock,
    statContent,
    optionContainer,
    optionBlock,
    inactiveButton,
    newGameFlash,
    dangerFlash,
    danger,
    mainContainer,
    wordContainer,
    challengeButton,
    challengeButtonActive,
    lettersContainer,
    lettersBlock,
    infoContainer,
    infoImportant,
    infoBlock,
    infoLink,
    extraContent,
    extraButton
}