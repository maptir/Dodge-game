import React from 'react';
import Square from './Square'

class Player extends React.Component {
  componentDidMount() {
    window.onkeydown = (event) => {
      var newPos
      switch(event.keyCode) {
      case 37:
          newPos = { top: 0, left: -1 , dir: "LEFT" };
          break;
      case 38:
          newPos = { top: -1, left: 0 , dir: "UP" };
          break;
      case 39:
          newPos = { top: 0, left: 1, dir: "RIGHT" };
          break;
      case 40:
          newPos = { top: 1, left: 0, dir: "DOWN" };
          break;
      default:
          return;
      }
      this.props.playerMove(newPos)
    }
  }

  render() {
    return (
      <Square
        color={this.props.color}
        size={this.props.playerSize}
        pos={this.props.playerPos}
      />
    )
  }
}

export default Player;
