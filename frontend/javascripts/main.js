require.config({
	baseUrl: '/javascripts',

	paths: {
		jquery: './libs/jquery',
		underscore: './libs/underscore',
		backbone: './libs/backbone'
	}

});

require(['app/app']);
