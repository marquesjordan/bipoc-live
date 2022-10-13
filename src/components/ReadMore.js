import React, { useState } from 'react';
import '../App.css';
import styled from 'styled-components';

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p style={{ fontSize: 14 }} className="text">
      {isReadMore ? (
        text.slice(0, 150)
      ) : (
        <span style={{ whiteSpace: 'pre-wrap' }}>{text}</span>
      )}
      <MoreOrLess onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? '...read more' : ' show less'}
      </MoreOrLess>
    </p>
  );
};

export default ReadMore;

const MoreOrLess = styled.span`
  color: var(--color-1);
  cursor: pointer;
  font-weight: bold;
`;
