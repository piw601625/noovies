import React from 'react';
import styled from 'styled-components/native';

interface VotesProps {
  votes: number;
}

const Text = styled.Text`
  color: ${(props) => props.theme.textColor};
  opacity: 0.6;
  font-size: 10px;
`;

const Votes: React.FC<VotesProps> = ({ votes }) => (
  <Text>{votes > 0 ? `⭐️ ${votes}/10` : `Coming soon`}</Text>
);
export default Votes;
