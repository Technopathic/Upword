import { css, keyframes } from 'emotion';

const loaderContainer = css`
  margin-top:5px;
  margin-bottom:5px;
`;

const loaderSlide = keyframes`
    0% {
        transform: scale(1);
    }
    50% {
        opacity: 0.3;
        transform: scale(2);
    }
    100% {
        transform: scale(1);
    }
`;

const dotBlock = css`
    width: 24px;
    height: 24px;
    background: #3ac;
    border-radius: 100%;
    display: inline-block;
    animation-name:  ${loaderSlide};
    animation-duration:  1s;
    animation-iteration-count:  infinite;

    &:nth-child(1) {
        animation-delay: 0.1s;
        background: #32aacc;
    }

    &:nth-child(2) {
        animation-delay: 0.2s;
        background: #64aacc;
    }

    &:nth-child(3) {
        animation-delay: 0.3s;
        background: #96aacc;
    }

    &:nth-child(4) {
        animation-delay: 0.4s;
        background: #c8aacc;
    }

    &:nth-child(5) {
        animation-delay: 0.5s;
        background: #faaacc;
    }
`;

export default {
    loaderContainer,
    loaderSlide,
    dotBlock
}