angular.module('MusicHistory', ['ngRoute'])
	.config(($routeProvider, $locationProvider) => {
		console.log('config executing')
		$locationProvider.hashPrefix('')

	  // Initialize Firebase
	  firebase.initializeApp({
	    apiKey: "AIzaSyDvXJ8x46HpBYI6iX-cxkQfJx0TYBwtQNY",
	    authDomain: "music-history-93ce3.firebaseapp.com",
	    databaseURL: "https://music-history-93ce3.firebaseio.com",
	    storageBucket: "music-history-93ce3.appspot.com",
	    messagingSenderId: "177915665886"
	  });

		$routeProvider
			.when('/', {
				controller: 'LoginCtrl',
				templateUrl: '/app/login/login.html'
			})
			.when('/song-list', {
				controller: 'SongListCtrl',
				templateUrl: '/app/song-list/song-list.html'
			})
			.when('/song-details/:song_id', {
				controller: 'SongDetailsCtrl',
				templateUrl: '/app/song-details/song-details.html'
			})
			.when('/add-song', {
				controller: 'AddSongCtrl',
				templateUrl: '/app/add-song/add-song.html'
			})
	})
	.controller('LoginCtrl', function() {
		console.log('Login ctrl instantiated')
	})
	.controller('SongListCtrl', function() {
		console.log('SongListCtrl instantiated')
	})
	.controller('SongDetailsCtrl', function() {
		console.log('SongDetailsCtrl instantiated')
	})
	.controller('AddSongCtrl', function() {
		console.log('AddSongCtrl instantiated')
	})
	.controller('NavbarCtrl', function($scope, $location) {
		console.log('NavbarCtrl instantiated')

		$scope.notOnLoginPage = function() {
			return $location.path() !== '/'
		}
	})








