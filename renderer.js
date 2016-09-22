// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
let angular = require('angular')
let app = angular.module('myApp', [])
let socket = require('socket.io-client')('http://localhost:3000/stream')

app.controller('myController', ($scope) => {
  $scope.name = 'Ronald'
  $scope.message = ''
  socket.on('messages', data => $scope.$apply(() => $scope.posts = data))
  socket.on('messages.update', data => $scope.$apply(() => $scope.posts.push(data.new_val)))
  socket.on('message.success', () => $scope.$apply(() => $scope.message = ''))
  $scope.sendMessage = () => {
    socket.emit('message.send', {
      user: $scope.name,
      message: $scope.message
    })
  }
})

// How to make a factory
// app.factory('getter', $http => ({
//   getAllData: () => $http.get(`http://jsonplaceholder.typicode.com/posts`)
// }))
