import type { NextPage } from 'next';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components'

const Card = styled.div`
  padding: 1.5rem;
  color: inherit;
  text-decoration: none;
  border: 1px solid black;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 100%;
  &:hover,
  :focus,
  :active {
    color: #0070f3;
    border-color: #0070f3;
  }
`


const Home: NextPage = () => {
    return <Card>Hello World! This is a styled-component</Card>;
};

export default Home;
