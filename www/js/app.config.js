paperWalletBalance.config(function($stateProvider, $urlRouterProvider){

	$stateProvider
	.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'js/views/app.html'
	})
	.state('app.home', {
		url: '/home',
		views: {
			'content': {
				templateUrl: 'js/views/home/index.html'
			}
		}
	})
	.state('app.wallets', {
		url: '/wallets',
		views: {
			'content': {
				templateUrl: 'js/views/wallets/index.html'
			}
		}
	});

	$urlRouterProvider.otherwise('app/home');

});