import React from 'react';
import styled from 'styled-components';

function EmptyBox({ text }) {
  return <BottomBodyContainer>{text}</BottomBodyContainer>;
}

export default EmptyBox;

const BottomBodyContainer = styled.div`
  box-shadow: 1px 2px 10px var(--color-4);
  padding: 10px 20px;
  border-radius: 5px;
  background-color: white;
  margin: 30px 0;
  flex: 1;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6c6a6a;
`;
