angular.module('MusicHistory', ['ngRoute'])
	.config(($routeProvider) => {
		console.log('config executing')

		$routeProvider
			.when('/', {
				controller: MainCtrl,

			})
	})
