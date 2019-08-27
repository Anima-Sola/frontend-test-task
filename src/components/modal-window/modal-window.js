import React from 'react';
import styled from 'styled-components';

//The position in the middle of screen vertically and horizontally
const ModalWindow = ({ width, height, measureType, content, onWindowHide }) => {

  const getCenterWindowStyles = (width, height, measureType) => {

      const clientWidth = document.documentElement.clientWidth;
      const clientHeight = document.documentElement.clientHeight;
      let widthInPx, heightInPx;

      if( measureType === '%' ) {

          if( width > 100 ) width = 100;
          if( height > 100) height = 100;
        
          widthInPx = clientWidth * width / 100;
          heightInPx = clientHeight * height / 100;

      } else {

          widthInPx = width;
          heightInPx = height;

          if ( width > clientWidth ) widthInPx = clientWidth;
          if ( height > clientHeight  ) heightInPx = clientHeight;

      }

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const top = scrollTop + clientHeight/2 - heightInPx/2;
      const left = clientWidth/2 - widthInPx/2;

      const styles = {
        top: `${top}px`,
        left: `${left}px`,
        width: `${widthInPx}px`,
        height: `${heightInPx}px`
      }

      return styles;
    
  }

  const getCrossStyles = (width, height, measureType) => {

      const clientWidth = document.documentElement.clientWidth;
      const clientHeight = document.documentElement.clientHeight;
      let widthInPx, heightInPx;

      if( measureType === '%' ) {

          if( width > 100 ) width = 100;
          if( height > 100) height = 100;
        
          widthInPx = clientWidth * width / 100;
          heightInPx = clientHeight * height / 100;

      } else {

          widthInPx = width;
          heightInPx = height;

          if ( width > clientWidth ) widthInPx = clientWidth;
          if ( height > clientHeight  ) heightInPx = clientHeight;

      }

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const top = scrollTop + clientHeight/2 - heightInPx/2 - 14;
      const left = clientWidth/2 + widthInPx/2 - 14;

      const styles = {
        top: `${top}px`,
        left: `${left}px`
      }

      return styles;
    
  }

  const windowCenterStyles = getCenterWindowStyles(width, height, measureType);
  const crossStyles = getCrossStyles(width, height, measureType);

  return (
    <ModalWindowContainer id="modalWindow">
      <ModalWindowOverlay onClick={onWindowHide} />
      <ModalWindowContent style={windowCenterStyles}>
        {content}
      </ModalWindowContent>
      <ModalWindowCross style={crossStyles} onClick={onWindowHide}><p>X</p></ModalWindowCross>
    </ModalWindowContainer>
  )
}

const ModalWindowContainer = styled.div`
  z-index: 9999;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ModalWindowOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: 0.4;
`;

const ModalWindowContent = styled.div`
  position: absolute;
  display: block;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  background-color: #242527;
  color: #fff;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 25px;
  border: 1px solid #fff;
  overflow: auto;
  text-align: center;
  padding: 70px 0;
`;

const ModalWindowCross = styled.div`
  font: 16px "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  position: absolute;
  color: #fff;
  background: #000;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  text-align: center;
  border: 3px solid #E3E3E3;
  padding-right: 1px;

  p {
    position: absolute;
    left: 6px;
    top: 3px; 
  }

  :hover {
    background: grey;
    color: #fff;
    border: 3px solid #fff;
  }
`;

export default ModalWindow;