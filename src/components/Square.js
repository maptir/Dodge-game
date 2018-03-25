import React from 'react';
import styled from 'styled-components'

const Box = styled.div`
  position: absolute
  background-color: ${props => props.color}
  height: ${props => props.size}px
  width: ${props => props.size}px
  top: ${props => props.pos.top}px
  left: ${props => props.pos.left}px
  // transition: all 0.1s ease
`;

class Square extends React.Component {

  render() {
    return(
      <Box
        color={this.props.color}
        size={this.props.size}
        pos={this.props.pos}
      />
    )
  }
}

export default Square;
