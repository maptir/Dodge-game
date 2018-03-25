import React, { Component } from 'react';
import styled from 'styled-components'

import Player from './Player'
import Enemy from './Enemy'

const Board = styled.div`
  border: 1px solid black
  height: ${props => props.boardSize}px
  width: ${props => props.boardSize}px
  margin: 30px auto
  position: relative
`;

const getState = ( boardSize, playerSize ) => {
  const mid = Math.floor(boardSize / 2) * playerSize;
  return {
    player: {
      top: mid,
      left: mid
    },
    enemies: [],
    size: {
      boardSize,
      playerSize,
      dimension: boardSize * playerSize
    },
    enemySpeed: 10,
    time: 0,
    scorePerSec: 10,
    score: 0
  }
}

class Game extends Component {
  constructor(props) {
    super(props)

    this.state = getState(this.props.boardSize, this.props.playerSize)
  }

  componentDidMount() {
    this.startGame()
  }

  render() {
    const { player, size: { playerSize, dimension }} = this.state
    const enemies = this.state.enemies.map((enemy, i) => {
      return (
        <Enemy
            key={i}
            color="black"
            enemySize={playerSize}
            enemyPos={enemy}
            playerPos={player}
            isCollision={this.isCollision}
          />
        )
      })

    return (
      <div className="container text-center mt-5">
        <h1>Dodge Game</h1>
        <h2>
          <span className="mr-5">Time: {this.state.time}</span>
          <span className="ml-5">Score: {this.state.score}</span>
        </h2>
        <Board boardSize={dimension}>
          <Player
            color="#dc3545"
            playerSize={playerSize}
            playerPos={player}
            playerMove={this.playerMove}
          />
          {enemies}
        </Board>
      </div>
    );
  }

  startGame = () => {
    this.timeInterval = setInterval(this.timer, 1000)
    this.enemyInterval = setInterval(this.enemyMove, 100)
    this.gameInterval = setInterval(this.generateEnemy, 3000)
  }

  restartGame = () => {
    clearInterval(this.timeInterval);
    clearInterval(this.enemyInterval);
    clearInterval(this.gameInterval);

    this.setState({
      ...getState(this.props.boardSize, this.props.playerSize)
    })
    this.startGame()
  }

  isCollision = () => {
    this.restartGame()
  }

  timer = () => {
    this.setState({
      time: this.state.time + 1,
      score: this.state.score + this.state.scorePerSec
    })
  }

  playerMove = (newPos) => {
    const { top, left } = this.state.player;
    const { playerSize, dimension } = this.state.size

    switch (newPos.dir) {
      case "LEFT":
        if(left === 0) return;
        break;
      case "UP":
        if(top === 0) return;
        break;
      case "RIGHT":
        if(left === dimension - playerSize) return;
        break;
      case "DOWN":
        if(top === dimension - playerSize) return;
        break;
      default:
        break;
    }

    this.setState({
        player: {
          top: top + (newPos.top * playerSize),
          left: left + (newPos.left * playerSize)
        }
    });
  }

  generateEnemy = () => {
    const player = this.state.player
    const { dimension, playerSize } = this.state.size

    var direction = ["LEFT", "UP", "RIGHT", "DOWN"]
    var rand = Math.floor((Math.random() * 4))
    var enemyPos
    switch (direction[rand]) {
      case "LEFT":
        enemyPos = { top:player.top, left: 0, dir: direction[rand] }
        break;
      case "UP":
        enemyPos = { top:0, left:player.left, dir: direction[rand] }
        break;
      case "RIGHT":
        enemyPos = { top:player.top, left:dimension - playerSize, dir: direction[rand] }
        break;
      case "DOWN":
        enemyPos = { top:dimension - playerSize, left:player.left, dir: direction[rand] }
        break;
      default:
        break;
    }
    this.state.enemies.push(enemyPos)
    this.setState({
      enemies: [...this.state.enemies],
    })
  }

  enemyMove = () => {
    const enemySpeed = this.state.enemySpeed
    const { dimension, playerSize } = this.state.size
    this.setState({
      enemies: this.state.enemies.filter(enemy => !enemy.remove).map(enemy => {
        if( enemy.top < 0 || enemy.left < 0 ||
            enemy.top > dimension - playerSize || enemy.left > dimension - playerSize )
            enemy.remove = true
        switch(enemy.dir) {
          case "UP":
            enemy.top += enemySpeed;
            break;
          case "DOWN":
            enemy.top -= enemySpeed;
            break;
          case "LEFT":
            enemy.left += enemySpeed;
            break;
          case "RIGHT":
            enemy.left -= enemySpeed;
            break;
          default:
            break;
        }
        return enemy;
      })
    })
  }
}

export default Game;
