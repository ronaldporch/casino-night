// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
let angular = require('angular')
let app = angular.module('myApp', [])
let socket = require('socket.io-client')('http://localhost:3000')

app.controller('myController', ($scope) => {
  socket.emit('user.get', {
    id: '2215155d-ee54-417c-8d2d-e8010f4e3626'
  })
  socket.emit('game.latest.get')
  socket.on('user.send', user => $scope.$apply(() => $scope.user = user))
  socket.on('game.latest.send', game => $scope.$apply(() => {
    $scope.game = game
    $scope.bet.player = game.players[0]
  }))
  socket.on('game.update', data => $scope.$apply(() => $scope.game = data.new_val))
  socket.on('game.latest.bets.update', data => $scope.$apply(() => $scope.game.bets = data.new_val.bets))
  socket.on('user.update', user => $scope.$apply(() => $scope.user = user.new_val))
  $scope.submitBet = function () {
    socket.emit('game.latest.bet.send', {
      gameId: $scope.game.id,
      bet: {
        userId: $scope.user.id,
        player: $scope.bet.player,
        amount: $scope.bet.amount
      }
    })
  }

  socket.on('bet.success', () => $scope.$apply(() => $scope.bet = {
    player: $scope.game.players[0],
    amount: 10
  }))

  $scope.bet = {
    player: undefined,
    amount: 10
  }
})

// How to make a factory
// app.factory('getter', $http => ({
//   getAllData: () => $http.get(`http://jsonplaceholder.typicode.com/posts`)
// }))
