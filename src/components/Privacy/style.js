import { css } from 'emotion';

const detailContainer = css`
  padding: 15px;
  color: #3f3f3f;
  font-size: 1.1em;
  margin: 0 auto;
  max-width:600px;
  padding:30px;
`;

const detailImportant = css`
  font-weight:bold;
  text-transform:uppercase;
  color:#444444;
`;

const infoLink = css`
  color: #3f3f3f;
  text-decoration:none;
`;

export default {
    detailContainer,
    detailImportant,
    infoLink
}