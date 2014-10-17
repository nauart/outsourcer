require.config({
	baseUrl: '/javascripts',

	paths: {
		jquery: '../../node_modules/jquery/dist/jquery.min',
		underscore: '../../node_modules/underscore/underscore',
		backbone: '../../node_modules/backbone/backbone'
	}

});

require(['../../node_modules/jquery-ui/sortable', '../../node_modules/jquery-ui/draggable', '../../node_modules/jquery-ui/droppable'], function() {
	require(['app/app']);
});
