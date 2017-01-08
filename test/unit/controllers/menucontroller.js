describe('Controller: MenuController', function () {

    // load the controller's module
    beforeEach(module('confusionApp'));

    var MenuController, scope, $httpBackend;

    //workaround for Karma/ui-router conflict
    beforeEach(module(function($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
    }));

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, _$httpBackend_, $rootScope, menuFactory) {

        // place here mocked dependencies
        $httpBackend = _$httpBackend_;

        $httpBackend.expectGET("http://localhost:3000/dishes").respond([
        {
            "id": 0,
            "name": "Uthapizza",
            "image": "images/uthapizza.png",
            "category": "mains",
            "label": "Hot",
            "price": "4.99",
            "description": "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.",
            "comments": [
            {
              "rating": 5,
              "comment": "Imagine all the eatables, living in conFusion!",
              "author": "John Lemon",
              "date": "2012-10-16T17:57:28.556094Z"
            },
            {
              "rating": 4,
              "comment": "Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
              "author": "Paul McVites",
              "date": "2014-09-05T17:57:28.556094Z"
            },
            {
              "rating": 3,
              "comment": "Eat it, just eat it!",
              "author": "Michael Jaikishan",
              "date": "2015-02-13T17:57:28.556094Z"
            },
            {
              "rating": 4,
              "comment": "Ultimate, Reaching for the stars!",
              "author": "Ringo Starry",
              "date": "2013-12-02T17:57:28.556094Z"
            },
            {
              "rating": 2,
              "comment": "It's your birthday, we're gonna party!",
              "author": "25 Cent",
              "date": "2011-12-02T17:57:28.556094Z"
            }
            ]
        },
        {
            "id": 1,
            "name": "Zucchipakoda",
            "image": "images/zucchipakoda.png",
            "category": "mains",
            "label": "New",
            "price": "4.99",
            "description": "A",
            "comments":[{}]
        }
        ]);

        scope = $rootScope.$new();
        MenuController = $controller('MenuController', {
            $scope: scope, menuFactory: menuFactory
        });
        $httpBackend.flush();

    }));

    it('should have showDetails as false', function () {
        expect(scope.showDetails).toBeFalsy();
    });

    it('should create "dishes" with 2 dishes fetched from xhr', function(){
        expect(scope.showMenu).toBeTruthy();
        expect(scope.dishes).toBeDefined();
        expect(scope.dishes.length).toBe(2);
    });

    it('should have the correct data order in the dishes', function() {
        expect(scope.dishes[0].name).toBe("Uthapizza");
        expect(scope.dishes[1].label).toBe("New");
    });

    it('should change the tab selected based on tab clicked', function(){
        expect(scope.tab).toEqual(1);

        scope.select(3);

        expect(scope.tab).toEqual(3);
        expect(scope.filtText).toEqual('mains');
    });

});