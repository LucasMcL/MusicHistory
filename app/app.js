app = angular.module('MusicHistory', ['ngRoute'])
app.config(($routeProvider, $locationProvider) => {
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
				controller: 'SongListCtrl',
				templateUrl: '/app/song-list/song-list.html',
				resolve: {
					// Listens for firebase auth state change
					// When it changes and a user is logged in it loads the controller
					// When it changes and a user is not logged in, it redirects
					user: (AuthFactory, $location) => {
						return AuthFactory.getUser().catch(() => $location.path('/login'))
					},
					songs: (SongsFactory) => {
						return SongsFactory.getSongs().catch((error) => {alert(error)})
					}
				}
			})
			.when('/login', {
				controller: 'LoginCtrl',
				templateUrl: '/app/login/login.html'
			})
			.when('/register', {
				controller: 'RegisterCtrl',
				templateUrl: '/app/login/register.html'
			})
			.when('/song-details/:song_id', {
				controller: 'SongDetailsCtrl',
				templateUrl: '/app/song-details/song-details.html'
			})
	})
	.controller('SongListCtrl', function(user, songs, $scope) {
		console.log('SongListCtrl instantiated')
		$scope.songs = songs

	  $(document).ready(function(){
	    $('.modal').modal();
	  });
	})
	.controller('LoginCtrl', function($scope, $window, $location) {
		console.log('LoginCtrl instantiated')
		$scope.onFormSubmit = function() {
			console.log('logging in user')
			firebase.auth().signInWithEmailAndPassword($scope.user_email, $scope.user_password)
			.then(() =>  {
				console.log('succesful login')
				$location.path('/')
				$scope.$apply() // This shouldn't be necessary.  But it is.
			})
			.catch((error) => {
				console.log('unsuccessful login')
				alert(error.message)
			})
		}
	})
	.controller('RegisterCtrl', function() {
		console.log('RegisterCtrl instantiated')
	})
	.controller('SongDetailsCtrl', function() {
		console.log('SongDetailsCtrl instantiated')
	})
	.controller('AddSongCtrl', function() {
		console.log('AddSongCtrl instantiated')
	})
	.factory('AuthFactory', function($q) {
		return {
			// Method that tries to resolve before controllers are loaded
			getUser: () => {
				return $q((resolve, reject) => {
					let unsubscribe = firebase.auth().onAuthStateChanged(user => {
						unsubscribe() // Removes event listener on 2nd state change
						if(user) {
							resolve(user)
						}
						else {
							reject()
						}
					})
				}) // end promise
			} // end getUser function
		} // end return obj
	}) // end AuthFactory
	.factory('SongsFactory', function($http) {
		return {
			// Fetches songs.  Ng Route attempts to resolve before instantiating controller
			getSongs: () => {
				return $http
					.get('https://music-history-93ce3.firebaseio.com/songs/.json')
					.then((response) => {return response.data})
			}
		}
	})








