import React from 'react';
import Square from './Square'

class Enemy extends React.Component {
  componentDidUpdate() {
    const { playerPos, enemySize, enemyPos } = this.props
    if( playerPos.left < (+enemyPos.left + +enemySize) &&
        playerPos.top  < (+enemyPos.top + +enemySize)  &&
        (+playerPos.left + +enemySize) > enemyPos.left &&
        (+playerPos.top  + +enemySize) > enemyPos.top)
        this.props.isCollision()
  }

  render() {
    return (
      <Square
        color={this.props.color}
        size={this.props.enemySize}
        pos={this.props.enemyPos}
      />
    )
  }
}

export default Enemy;
