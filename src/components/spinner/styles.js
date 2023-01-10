import styled from "styled-components/macro";

export const StyledSpinner = styled.div`
  position: relative;
  /* create the paw prints */
  .pad {
    width: 25px;
    height: 27px;
    background-color: #654321;
    -webkit-border-radius: 63px 63px 63px 63px / 108px 108px 72px 72px;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    display: block;
    position: absolute;
  }
  .large {
    width: 50px;
    height: 50px;
    transform: rotate(80deg);
    left: 100px;
    top: 50px;
  }
  .small-1 {
    transform: rotate(50deg);
    left: 145px;
    top: 28px;
  }
  .small-2 {
    transform: rotate(65deg);
    left: 174px;
    top: 50px;
  }
  .small-3 {
    transform: rotate(98deg);
    position: absolute;
    left: 178px;
    top: 87px;
  }
  .small-4 {
    transform: rotate(140deg);
    position: absolute;
    left: 158px;
    top: 117px;
  }

  /* position and animate */

  .paw-print-1 {
    opacity: 0;
    position: absolute;
    left: 75px;
    top: 300px;
    transform: rotate(-40deg);
    -webkit-animation: walk 3s linear infinite;
    animation: /*keyframe*/ walk /*duration*/ 3s /*transition*/ linear
      /*repeat*/ infinite;
  }
  .paw-print-2 {
    opacity: 0;
    position: absolute;
    left: 275px;
    top: 280px;
    transform: rotate(-5deg);
    -webkit-animation: walk 3s linear infinite 0.25s;
    animation: walk 3s linear infinite /*delay*/ 0.25s;
  }
  .paw-print-3 {
    opacity: 0;
    position: absolute;
    left: 375px;
    top: 130px;
    transform: rotate(-10deg);
    -webkit-animation: walk 3s linear infinite 0.5s;
    animation: walk 3s linear infinite 0.5s;
  }
  .paw-print-4 {
    opacity: 0;
    position: absolute;
    left: 575px;
    top: 280px;
    transform: rotate(-20deg);
    -webkit-animation: walk 3s linear infinite 0.75s;
    animation: walk 3s linear infinite 0.75s;
  }
  .paw-print-5 {
    opacity: 0;
    position: absolute;
    left: 725px;
    top: 50px;
    transform: rotate(10deg);
    -webkit-animation: walk 3s linear infinite 1s;
    animation: walk 3s linear infinite 1s;
  }
  .paw-print-6 {
    opacity: 0;
    position: absolute;
    left: 875px;
    top: 200px;
    transform: rotate(10deg);
    -webkit-animation: walk 3s linear infinite 1.25s;
    animation: walk 3s linear infinite 1.25s;
  }
  .paw-print-7 {
    opacity: 0;
    position: absolute;
    left: 1075px;
    top: 50px;
    transform: rotate(20deg);
    -webkit-animation: walk 3s linear infinite 1.5s;
    animation: walk 3s linear infinite 1.5s;
  }
  .paw-print-8 {
    opacity: 0;
    position: absolute;
    left: 1150px;
    top: 250px;
    transform: rotate(10deg);
    -webkit-animation: walk 3s linear infinite 1.75s;
    animation: walk 3s linear infinite 1.75s;
  }

  /* walking effect animation keyframes */

  @-webkit-keyframes walk {
    25% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes walk {
    /* appear */
    25% {
      opacity: 1;
    }
    /* disappear */
    100% {
      opacity: 0;
    }
  }
`;
