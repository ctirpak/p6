/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
	/* This is our first test suite - a test suite just contains
	 * a related set of tests. This suite is all about the RSS
	 * feeds definitions, the allFeeds variable in our application.
	 */
	describe('RSS Feeds', function () {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function () {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});


		/* Write a test that loops through each feed
		 * in the allFeeds object and ensures it has a URL defined
		 * and that the URL is not empty.
		 */
		it('have URLs', function () {
			$.each(allFeeds, function (index, value) {
				//check that it's defined
				expect(value.url).toBeDefined();
				//check that it's not empty
				expect(value.url.length).not.toBe(0);
			});
		});


		/* Write a test that loops through each feed
		 * in the allFeeds object and ensures it has a name defined
		 * and that the name is not empty.
		 */
		it('have names', function () {
			$.each(allFeeds, function (index, value) {
				//check that it's defined
				expect(value.name).toBeDefined();
				//check that it's not empty
				expect(value.name.length).not.toBe(0);
			});
		});
	});


	/* Write a new test suite named "The menu" 
	 * This test suite makes sure that the menu is
	 * functioning properly. It check to see that it
	 * is hidden by default and that it changes visibility
	 */
	describe('The menu', function () {


		/* Write a test that ensures the menu element is
		 * hidden by default. You'll have to analyze the HTML and
		 * the CSS to determine how we're performing the
		 * hiding/showing of the menu element.
		 * 
		 * clicking on the menu icon toggles the class .menu-hidden on the 
		 * <body> element. the CSS for this class affects the .menu class only,
		 * and performs a translate3d action on the x axis to hide the menu. 
		 */
		describe('is hidden by default', function () {
			it('has class "menu-hidden"', function () {
				//loop through each element
				$('body').each(function (index, element) {
					//check to see that the 'menu-hidden' class is applied
					expect($(element).attr('class')).toBe('menu-hidden');
				});
			});
			it('has left x axis that is less than zero', function () {
				//check to see that the left side of the menu is not visible i.e. < 0
				expect($('.menu')[0].getBoundingClientRect().left < 0).toBeTruthy();
			});
		});

		/* Write a test that ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * should have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */
		describe('changes visibility when clicked', function() {
			var leftMenuVisible;
			
			/* since the menu should be hidden initially, one click on the menu
			 * icon will show the menu
			 * 
			 * there is a transition delay with the display of the menu. testing
			 * requires the use of a setTimeout function to add a delay before
			 * checking the position of the menu. without this delay, the testing
			 * functions return a false failure.
			 * 
			 * there is no afterEach() function, so the state of the menu
			 * remains until the next expectation
			 */
			
			beforeEach(function(done) {
				//click the menu icon
				$('.menu-icon-link').trigger('click');
				//need to pause to allow transition to complete before checking
				//its position
				setTimeout(function() {
					//check if left of bounding rectangle is 0
					leftMenuVisible = $('#menu')[0].getBoundingClientRect().left === 0;
					done();
				},300);
			});

			it('shows when clicked', function () {
				//check to see if the left edge of the menu is visible i.e. = 0
				expect(leftMenuVisible).toBeTruthy();
			});
	
			it('hides when clicked again', function () {
				//check to see if the left edge of the menu is not visible i.e. < 0
				expect(leftMenuVisible).toBeFalsy();
			});
		});
	});
	
	/* Write a new test suite named "Initial Entries" */
	describe('Initial Entries', function () {

		/* Write a test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * Remember, loadFeed() is asynchronous so this test wil require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		 */
		beforeEach(function(done) {
			//pass the done function as a callback to the loadFeed function so
			//that it is run after the feed has been loaded
			loadFeed(0,done);
		});

		it('has at least one entry in the feed container', function() {
			//check the length of the array for the .entry children of .feed
			expect($('.feed .entry').length > 0).toBeTruthy();
		});

	});

	/* Write a new test suite named "New Feed Selection" */
	describe('New Feed Selection', function () {
		/* Write a test that ensures when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 * Remember, loadFeed() is asynchronous.
		 */
		var oldContent;

		//get the old content
		beforeEach(function(done) {
			//pass the done function as a callback to the loadFeed function so
			//that it is run after the feed has been loaded
			//start with the last feed first
			loadFeed(1,done);
			oldContent = $('.feed').html();
			//console.log($('.feed').html());
		});
		it('content should change when feed 0 is loaded', function(done) {
			loadFeed(0,done);
			expect($('.feed').html() != oldContent).toBeTruthy();
			//console.log($('.feed').html());
			//console.log(oldContent);
		});
		it('content should change when feed 2 is loaded', function(done) {
			loadFeed(2,done);
			expect($('.feed').html() != oldContent).toBeTruthy();
			//console.log($('.feed').html());
			//console.log(oldContent);
		});
		it('content should change when feed 3 is loaded', function(done) {
			loadFeed(3,done);
			expect($('.feed').html() != oldContent).toBeTruthy();
			//console.log($('.feed').html());
			//console.log(oldContent);
		});
	});

}());
