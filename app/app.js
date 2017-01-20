angular.module('MusicHistory', ['ngRoute'])
	.config(($routeProvider, $locationProvider) => {
		$locationProvider.hashPrefix('')

		$routeProvider
			.when('/song-list', {
				templateUrl: '../partials/song-list.html'
			})
			.when('/details', {
				templateUrl: '../partials/song-details.html'
			})
			.when('/add-song', {
				templateUrl: '../partials/add-song.html'
			})
			.otherwise('/song-list')
	})
	////////////////////////////
	// Controllers
	////////////////////////////
	.controller('SongViewCtrl', function(Fetch) {

		// Take song data from firebase and assign it to this controller's scope
		Fetch.getSongs()
			.then((data) => {
				this.songData = data
			})

	})
	////////////////////////////
	// Factories
	////////////////////////////
	.factory('Fetch', function($http) {
		getSongs = function() {
			return $http({
				method: "GET",
				url: 'https://music-history-93ce3.firebaseio.com/.json'
			})
			.then((responseObj) => {
				var dataArray = restructureData(responseObj.data)
				console.dir(dataArray)
				return dataArray
			})
		}

		// Private
		restructureData = function(dataObj) {
			// Takes dataObj and turns songs into an array
			let songArray = []
			for(key in dataObj) {
				songArray.push(dataObj[key])
			}
			return songArray
		}

		// Public
		return {
			getSongs: getSongs
		}
	})










