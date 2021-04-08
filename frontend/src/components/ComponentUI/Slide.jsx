import React from 'react';
import styled from 'styled-components';

const IMG = styled.img`
  width: 300px;
  height: auto;
`;

function Slide({ img }) {
  return (
    <div>
      <IMG src={img} />
    </div>
  );
}

export default Slide;
