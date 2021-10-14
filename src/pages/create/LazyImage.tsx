import React from "react";
import styled, { keyframes } from "styled-components";
import LazyLoad from "react-lazyload";

const loadingAnimation = keyframes`
  0% {
    background-color: #fff;
  }
  50% {
    background-color: #b5cda3;
  }
  100% {
    background-color: #fff;
  }
`;

const Placeholder = styled.div`
  width: 49px;
  height: 49px;
  margin: 0 auto;
  animation: ${loadingAnimation} 1s infinite;
  border-radius: 50%;
`;

const StyledImage = styled.img`
  width: 49px;
  margin: 0 auto;
`;

const LazyImage = ({ src, alt }) => {
  const refPlaceholder = React.useRef();

  const removePlaceholder = () => {
    //@ts-ignore
    refPlaceholder.current.remove();
  };

  return (
    <>
      <Placeholder ref={refPlaceholder} />
      <LazyLoad
        style={{ display: "flex", flexDirection: "column", width: "100%" }}
      >
        <StyledImage
          onLoad={removePlaceholder}
          onError={removePlaceholder}
          src={src}
          alt={alt}
        />
      </LazyLoad>
    </>
  );
};

export default LazyImage;
