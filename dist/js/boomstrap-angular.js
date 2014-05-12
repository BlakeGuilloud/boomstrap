(function () {
  'use strict';
  angular.module('boomstrap', [
    'ui.bootstrap',
    'ui.select',
    'angular-chosen'
  ]).value('AUTO_START_TOUR', { value: false }).config([
    'uiSelectConfig',
    function (uiSelectConfig) {
      uiSelectConfig.theme = 'bootstrap';
    }
  ]);
  angular.module('ui.bootstrap').config([
    '$provide',
    function ($provide) {
      $provide.decorator('pagerDirective', function ($delegate) {
        var defaultUrl = $delegate[0].templateUrl;
        $delegate[0].templateUrl = function (tElement, tAttrs) {
          return tAttrs.templateUrl || defaultUrl;
        };
        return $delegate;
      });
    }
  ]);
}());
angular.module('ui.bootstrap').run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/pager/bt-pager.tpl.html', '<div class="btn-group minimal-pager">\n    <button\n        type="button"\n        class="btn btn-default btn-icon"\n        ng-repeat="page in pages"\n        ng-class="{ \'disabled\': page.disabled, \'active\': page.active }"\n        ng-click="selectPage(page.number)"><i\n            class="ficon"\n            ng-class="{ \'ficon-chevron-left\': page.previous, \'ficon-chevron-right\': page.next }"></i></button>\n</div>');
  }
]);
angular.module('boomstrap').run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('template/nav.html', '<nav class="navbar navbar-default navbar-fixed-top" role="navigation">\n  <div class="container-fluid">\n    <div class="navbar-header">\n      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#pl-nav">\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n      <a class="navbar-brand" href="#">PL</a>\n    </div>\n    <div class="collapse navbar-collapse" id="pl-nav">\n      <ul class="nav navbar-nav">\n        <li class="active"><a href="#pl-colors">Colors</a></li>\n        <li class="dropdown">\n          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Buttons <b class="caret"></b></a>\n          <ul class="dropdown-menu">\n            <li><a href="#pl-button-options">Options</a></li>\n            <li><a href="#pl-button-sizes">Sizes</a></li>\n            <li><a href="#pl-button-active">Active State</a></li>\n            <li><a href="#pl-button-disabled">Disabled State</a></li>\n            <li><a href="#pl-button-tags">Button Tags</a></li>\n          </ul>\n        </li>\n        <li><a href="#pl-labels">Labels</a></li>\n        <li><a href="#pl-typography">Typography</a></li>\n      </ul>\n    </div>\n  </div>\n</nav>\n<div class="container">');
    $templateCache.put('template/btPager/bt-pager.tpl.html', '<pager\n\ttemplate-url="template/pager/bt-pager.tpl.html"\n\ttotal-items="totalItems"\n\titems-per-page="itemsPerPage"\n\tpage="currentPage">\n</pager>');
    $templateCache.put('template/carousel/carousel.html', '<div ng-mouseenter="pause()" ng-mouseleave="play()" class="carousel">\n    <ol class="carousel-indicators" ng-show="slides().length > 1">\n        <li ng-repeat="slide in slides()" ng-class="{active: isActive(slide)}" ng-click="select(slide)"></li>\n    </ol>\n    <div class="carousel-inner" ng-transclude></div>\n    <a class="left carousel-control" ng-click="prev()" ng-show="slides().length > 1"><span class="ficon ficon-chevron-left"></span></a>\n    <a class="right carousel-control" ng-click="next()" ng-show="slides().length > 1"><span class="ficon ficon-chevron-right"></span></a>\n</div>');
    $templateCache.put('template/popover/popover-bootstrap-tour.html', '<div class="popover tour-best-fit-leads">\n    <div class="arrow"></div>\n    <div class="popover-close">\n        <i data-role=\'end\' class="ficon ficon-cross property-close"></i>\n    </div>\n    <h3 class="popover-title">New Best-Fit Leads Tour</h3>\n    <div class="tour-popover popover-content"></div>\n    <div class="popover-navigation">\n        <button class="btn btn-default" data-role="prev">Prev</button>\n        <button class="btn btn-default" data-role="next"><span>Next</span></button>\n    </div>\n</div>');
    $templateCache.put('template/property-card/bt-property-card-sm.tpl.html', '<div class="card card-sm">\n  <!-- ///////////////////////////////////////////////// -->\n  <!-- Optional: replace "card-photo" div with carousel -->\n  <!-- ///////////////////////////////////////////////// -->\n  <div class="card-photo">\n    <div class="card-photo-inner">\n      <div ng-if="property.newProperty" class="sash sash-new">New <span class="sash-time">{{ property.newProperty }}</span></div>\n      <div ng-if="property.offMarket" class="sash sash-off">Off Market <span class="sash-time">{{ property.offMarket }}</span></div>\n      <div ng-if="property.reduced" class="sash sash-reduced"><i class="ficon ficon-arrow-down"></i> {{ property.reduced.change }} ({{ property.reduced.changePercent }}) <span class="sash-time">{{ property.reduced.when }}</span></div>\n      <div ng-if="property.backOnMarket" class="sash sash-back">Back <span class="sash-time">{{ property.backOnMarket }}</span></div>\n      <img ng-if="property.imageSrc.length <= 1" bt-error-img="http://boomtownroi.github.io/boomstrap//images/fpo-he-man-400-300.jpg" class="card-img" src="{{ property.imageSrc[0] }}" alt="{{ property.fullAddress }}">\n      <carousel ng-if="property.imageSrc.length > 1">\n        <slide ng-repeat="slide in property.imageSrc">\n          <img ng-src="{{ slide }}" style="margin: auto">\n        </slide>\n      </carousel>\n    </div>\n  </div>\n  <!-- ///////////////////////////////////////////////// -->\n  <div class="card-sm-container">\n     <div class="row row-xcondensed">\n      <div class="col-xs-8">\n        <p class="card-sm-priority card-sm-street">\n          <a target="_blank" href="{{ property.listingUrl }}">{{ property.address.street }}</a>\n        </p>\n        <p class="xsmall">{{ property.address.city }}, {{ property.address.state }}</p>\n        <p class="xsmall">{{ property.address.neighborhood }}</p>\n      </div>\n      <div class="col-xs-4 text-right">\n        <p class="card-sm-priority card-sm-price">{{ property.listPrice }}</p>\n        <p class="xsmall">{{ property.pricePerSqft }}/SQFT</p>\n      </div>\n     </div>\n  </div>\n  <div class="card-sm-stats">\n    <span class="card-sm-stat">{{ property.beds }} BEDS</span>\n    <span class="card-sm-stat">{{ property.baths }} BATHS</span>\n    <span class="card-sm-stat">{{ property.sqft }} SQFT</span>\n    <span class="card-sm-stat">{{ property.acres }} ACRES</span>\n  </div>\n  <div class="card-sm-container">\n    <div class="row row-xcondensed">\n      <div class="col-sm-6">\n        <button class="btn btn-default btn-block btn-sm"><i class="ficon ficon-star"></i> {{ property.bestFits }} Best-Fit</button>\n      </div>\n      <div class="col-sm-6">\n        <button class="btn btn-default btn-block btn-sm"><i class="ficon ficon-heart"></i> {{ property.favs }} Favs</button>\n      </div>\n    </div>\n  </div> <!-- /card-container -->\n</div>');
    $templateCache.put('template/property-card/bt-property-card.tpl.html', '<div class="card" ng-class="{ \'card-sm\': size === \'sm\' }">\n  <div ng-if="property.newProperty" class="sash sash-new">New <span class="sash-time">{{ property.newProperty }}</span></div>\n  <div ng-if="property.offMarket" class="sash sash-off">Off Market <span class="sash-time">{{ property.offMarket }}</span></div>\n  <div ng-if="property.reduced" class="sash sash-reduced"><i class="ficon ficon-arrow-down"></i> {{ property.reduced.change }} ({{ property.reduced.changePercent }}) <span class="sash-time">{{ property.reduced.when }}</span></div>\n  <div ng-if="property.backOnMarket" class="sash sash-back">Back <span class="sash-time">{{ property.backOnMarket }}</span></div>\n  <!-- ///////////////////////////////////////////////// -->\n  <!-- Optional: replace "card-photo" div with carousel -->\n  <!-- ///////////////////////////////////////////////// -->\n  <div class="card-photo">\n    <div class="card-photo-inner">\n      <img ng-if="property.imageSrc.length <= 1" bt-error-img="http://boomtownroi.github.io/boomstrap//images/fpo-he-man-400-300.jpg" class="card-img" src="{{ property.imageSrc[0] }}" alt="{{ property.fullAddress }}">\n      <carousel ng-if="property.imageSrc.length > 1">\n        <slide ng-repeat="slide in property.imageSrc">\n          <img ng-src="{{ slide }}" style="margin: auto">\n        </slide>\n      </carousel>\n    </div>\n  </div>\n  <!-- ///////////////////////////////////////////////// -->\n  <div class="card-container">\n     <div class="row row-xcondensed">\n      <div class="col-xs-7">\n        <p class="card-priority card-street">\n          <a target="_blank" href="{{ property.listingUrl }}">{{ property.address.street }}</a>\n        </p>\n        <p class="small">{{ property.address.city }}, {{ property.address.state }}</p>\n        <p class="small">{{ property.address.neighborhood }}</p>\n      </div>\n      <div class="col-xs-5 text-right">\n        <p class="card-priority card-price">{{ property.listPrice }}</p>\n        <p class="small">{{ property.pricePerSqft }}/SQFT</p>\n      </div>\n     </div>\n  </div>\n  <div class="card-stats">\n    <span class="card-stat">{{ property.beds }} BEDS</span>\n    <span class="card-stat">{{ property.baths }} BATHS</span>\n    <span class="card-stat">{{ property.sqft }} SQFT</span>\n    <span class="card-stat">{{ property.acres }} ACRES</span>\n  </div>\n  <div class="card-container">\n    <div class="row row-xcondensed">\n      <div class="col-sm-6">\n        <button class="btn btn-default btn-block btn-sm"><i class="ficon ficon-star"></i> {{ property.bestFits }} Best-Fit</button>\n      </div>\n      <div class="col-sm-6">\n        <button class="btn btn-default btn-block btn-sm"><i class="ficon ficon-heart"></i> {{ property.favs }} Favs</button>\n      </div>\n    </div>\n  </div> <!-- /card-container -->\n  <div ng-if="!isSmall">\n    <div class="card-toggle">\n        <span ng-click="isExpanded = !isExpanded" ng-show="!isExpanded"><i class="ficon ficon-chevron-down"></i> More Detail</span>\n        <span ng-click="isExpanded = !isExpanded" ng-show="isExpanded"><i class="ficon ficon-chevron-up"></i> Less Detail</span>\n    </div>\n    <div collapse="!isExpanded" class="card-detail">\n      <div class="card-container">\n        <div class="row row-xcondensed">\n          <div class="col-xs-6">\n            <p class="small"><strong>MLS#:</strong> <a target="_blank" href="">{{ property.mls }}</a></p>\n          </div>\n          <div class="col-xs-6 text-right">\n            <p class="small"><strong>LISTED:</strong> {{ property.listed }}</p>\n          </div>\n        </div>\n        <p class="small"><strong>TYPE:</strong> {{ property.type }}</p>\n      </div> <!-- /card-container -->\n      <p class="card-title">Price History</p>\n      <div class="card-container card-price-history">\n        <div ng-repeat="history in property.history" class="row row-xcondensed">\n          <div class="col-xs-3">\n            <p class="small">{{ history.when }}</p>\n          </div>\n          <div class="col-xs-6">\n            <p class="small card-price-history-change"><i class="ficon ficon-arrow-down"></i> {{ history.change }} ({{ history.changePercent }})</p>\n          </div>\n          <div class="col-xs-3 text-right">\n            <p class="small">{{ history.price }}</p>\n          </div>\n        </div>\n      </div> <!-- /card-price-history -->\n      <div class="card-container">\n        <div class="row row-xcondensed">\n          <div class="col-sm-6">\n            <button class="btn btn-default btn-sm btn-block"><i class="ficon ficon-location"></i> Map View</button>\n          </div>\n          <div class="col-sm-6">\n            <button class="btn btn-default btn-sm btn-block">Full Details <i class="ficon ficon-arrow-bend-right"></i> </button>\n          </div>\n        </div>\n      </div> <!-- /card-container -->\n    </div> <!-- /card-detail -->\n  </div>\n</div>');
    $templateCache.put('template/dropdown/bt-dropdown.tpl.html', '<div class="dropdown">\n    <button class="btn btn-default dropdown-toggle" type="button">\n        <span class="pull-left" ng-bind="selectedValue"></span>\n        <span class="caret"></span>\n        <!-- <i class="ficon ficon-chevron-down pull-right"></i> -->\n    </button>\n    <ul class="dropdown-menu" role="menu" ng-style="{ \'min-width\': dropdownWidth + \'px\'}">\n        <li ng-repeat="value in arrayValues" ng-if="keysAreNumbers">\n            <a ng-click="assignValue(value.key)">{{ value.value }}</a>\n        </li>\n        <li ng-repeat="(choiceValue, choiceName) in values" ng-if="!keysAreNumbers">\n            <a ng-click="assignValue(choiceValue)">{{choiceName}}</a>\n        </li>\n    </ul>\n</div>');
    $templateCache.put('template/select-range/range.tpl.html', '<div class="ui-select-range clearfix">\n  <ui-select ng-model="minimum.value">\n    <match placeholder="{{ minPlaceholder }}">{{ translateValue($select.selected, \'No min\') }}</match>\n    <choices repeat="value in getValues($select.search) | filter: $select.search">\n      <div>{{ translateValue(value, \'No min\') }}</div>\n    </choices>\n  </ui-select>\n  <i class="ficon ficon-minus"></i>\n  <ui-select ng-model="maximum.value">\n    <match placeholder="{{ maxPlaceholder }}">{{ translateValue($select.selected, \'No max\') }}</match>\n    <choices repeat="value in getValues($select.search) | filter: $select.search">\n      <div>{{ translateValue(value, \'No max\') }}</div>\n    </choices>\n  </ui-select>\n</div>');
    $templateCache.put('template/bootstrap/pager/bt-pager.tpl.html', '<div class="btn-group minimal-pager">\n    <button\n        type="button"\n        class="btn btn-default btn-icon"\n        ng-repeat="page in pages"\n        ng-class="{ \'disabled\': page.disabled, \'active\': page.active }"\n        ng-click="selectPage(page.number)"><i\n            class="ficon"\n            ng-class="{ \'ficon-chevron-left\': page.previous, \'ficon-chevron-right\': page.next }"></i></button>\n</div>');
  }
]);
(function (boomstrap) {
  'use strict';
  boomstrap.controller('CarouselDemoCtrl', [
    '$scope',
    function ($scope) {
      $scope.myInterval = 5000;
      var slides = $scope.slides = [];
      $scope.addSlide = function () {
        var newWidth = 600 + slides.length;
        slides.push({
          image: 'http://placekitten.com/' + newWidth + '/300',
          text: [
            'More',
            'Extra',
            'Lots of',
            'Surplus'
          ][slides.length % 4] + ' ' + [
            'Cats',
            'Kittys',
            'Felines',
            'Cutes'
          ][slides.length % 4]
        });
      };
      for (var i = 0; i < 4; i++) {
        $scope.addSlide();
      }
      slides.push({
        image: 'images/fpo-he-man.jpg',
        text: 'Skeletor!?'
      });
    }
  ]);
}(angular.module('boomstrap')));
//fromNow.js
(function (Boomstrap, Tour) {
  'use strict';
  Boomstrap.service('bootstrapTourService', function ($templateCache, $rootScope, $http, AUTO_START_TOUR) {
    var tourRef;
    var tour = {
        init: function (steps, onStart, onNextStep, onDismiss, onComplete) {
          var tourSteps = [];
          angular.forEach(steps, function (step) {
            if (step.template) {
              step.template = $templateCache.get(step.template);
            }
            if (!step.content && !step.title) {
              // Giving content a default value due to an issue
              // with bootstrap tour where a popover will not show
              // if both the content and the title is empty
              step.content = '.';
            }
            tourSteps.push(step);
          });
          tour.steps = tourSteps;
          tour.onStart = onStart;
          tour.onNextStep = onNextStep;
          tour.onDismiss = onDismiss;
          tour.onComplete = onComplete;
        },
        steps: [],
        startTour: function (startingStep) {
          startingStep = startingStep || 0;
          var tourTemplate = $templateCache.get('template/popover/popover-bootstrap-tour.html');
          var wasHidden = tour.isHidden;
          tour.isHidden = false;
          // End existing tours
          if (tourRef && tourRef.ended && !tourRef.ended()) {
            tourRef.end();
          }
          var ngApply = function (fn) {
            return function () {
              // This could be called in a programmatic context so
              // Make sure we're not currently in an angular context first
              if (!$rootScope.$$phase) {
                $rootScope.$apply(fn);
              } else {
                fn();
              }
            };
          };
          tourRef = new Tour({
            steps: tour.steps.slice(startingStep),
            template: tourTemplate,
            container: 'body',
            storage: false,
            onNext: ngApply(function () {
              tour.currentStep += 1;
              if (tour.onNextStep) {
                tour.onNextStep();
              }
            }),
            onPrev: ngApply(function () {
              tour.currentStep -= 1;
            }),
            onEnd: ngApply(function () {
              if (!tour.isHidden) {
                if (tour.currentStep === tour.steps.length - 1) {
                  // Tour is complete
                  if (tour.onComplete) {
                    tour.onComplete();
                  }
                } else {
                  // Tour is dismissed
                  if (tour.onDismiss) {
                    tour.onDismiss();
                  }
                }
              }
              tour.currentStep = -1;
            })
          });
          tourRef.init();
          tourRef.start(true);
          tour.currentStep = startingStep;
          if (!wasHidden && tour.onStart) {
            tour.onStart();
          }
          $rootScope.$on('$stateChangeStart', function () {
            if (tourRef && tourRef.ended && !tourRef.ended()) {
              // End the tour at the current step, but do not dismiss
              tour.endTour(true);
              AUTO_START_TOUR.value = false;
            }
          });
        },
        currentStep: -1,
        isHidden: false,
        shouldResume: function (val) {
          if (angular.isDefined(val)) {
            tour.isHidden = val;
            /*
           * shouldResume is assuming that the tour will start again
           * Because we are starting the tour in an intermediate state
           * the next step function will not be registered
           * Call the next step function here because of this
           */
            if (tour.onNextStep) {
              tour.onNextStep();
            }
          }
          return tour.isHidden;
        },
        goToNextStep: function () {
          tourRef.next();
        },
        endTour: function (skipDismiss) {
          tourRef.end();
        }
      };
    return tour;
  });
}(angular.module('boomstrap'), window.Tour));
(function (Boomstrap) {
  'use strict';
  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btAddClassOnLoad
   * @restrict A
   * 
   * @param {string} btAddClassOnLoad The string representation of the class to add to the image
   *
   * @description
   * The `btAddClassOnLoad` directive adds a class to an img tag
   * when the image fires the load event.  This is useful for
   * css transitions.
   *
   * @element img
   *
   * @example
      <doc:example module="boomstrap">
        <doc:source>
          <script>
          </script>
          <style type="text/css">
            .my-img {
              opacity: 0;
              transition: opacity 5.0s linear;
            }
            .loaded {
              opacity: 1;
            }
          </style>
          <img src="images/fpo-he-man.jpg" bt-add-class-on-load="loaded" class="my-img"/>
        </doc:source>
      </doc:example>
   * 
   */
  Boomstrap.directive('btAddClassOnLoad', function () {
    return {
      link: function (scope, element, attrs) {
        attrs.$observe('btAddClassOnLoad', function (attrClass) {
          element.bind('load', function () {
            element.addClass(attrClass);
          });
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btAffix
   * @requires  $window
   * @restrict A
   *
   * @description The `btAffix` element allows a user to affix an element at a given scroll point.
   * Another element with the same height and width will take the place of the element to ensure
   * that the page layout does not break upon affixing.
   *
   * @param {Number} offset Number of pixels to add to scroll before element is affixed
   * @param {bool} scroll Indicates if the affixed element is allowed to scroll
   * @param {bool} fullHeight Indicates that the affixed element spans the entire height of the page
   * @param {bool} pinnedHeader Indicates that the affixed element spans the entire width of the page and is affixed to the top left
   *
   * @example
     <doc:example module="boomstrap">
        <doc:source>
          <div bt-affix offset="500">
            <img src="images/fpo-he-man.jpg"/>
          </div>
            <img src="images/fpo-he-man.jpg"/>
            <img src="images/fpo-he-man.jpg"/>
            <img src="images/fpo-he-man.jpg"/>
            <img src="images/fpo-he-man.jpg"/>
        </doc:source>
      </doc:example>
   */
  Boomstrap.directive('btAffix', function ($window) {
    return {
      template: '<div class="bt-affix" ng-transclude></div>',
      transclude: true,
      restrict: 'A',
      link: function (scope, element, attrs) {
        var windowEl = angular.element($window), $element = angular.element(element), $realElement = angular.element($element.children()[0]), defaults = {
            'position': $element.css('position'),
            'top': $element.css('top'),
            'overflow-y': $element.css('overflow-y')
          };
        scope.isAffixed = false;
        defaults.width = 'auto';
        scope.offset = 0;
        var affixThis = function () {
          var myWidth = $realElement.css('width');
          var myHeight = $realElement.height();
          $realElement.css({
            'position': 'fixed',
            'top': '' + scope.offset + 'px',
            'width': myWidth,
            'max-height': '100%'
          });
          if (scope.scroll) {
            $realElement.css({ 'overflow-y': 'scroll' });
          }
          if (scope.fullHeight) {
            $realElement.css({ 'height': '100%' });
          }
          if (scope.pinnedHeader) {
            $realElement.css({
              'top': 0,
              'width': '100%',
              'left': 0
            }).addClass('pinned-header');
          }
          $element.addClass('is-bt-affixed').css({ 'height': myHeight });
          scope.isAffixed = true;
        };
        var unAffixThis = function () {
          $realElement.scrollTop(0);
          $realElement.css(defaults);
          $realElement.css({ 'height': 'auto' });
          $element.removeClass('is-bt-affixed').css({ 'height': 'auto' });
          $realElement.removeClass('pinned-header');
          scope.isAffixed = false;
        };
        var scroller = function () {
          if (windowEl.scrollTop() > $element.offset().top - scope.offset) {
            if (!scope.isAffixed) {
              affixThis();
            }
          } else {
            if (scope.isAffixed) {
              unAffixThis();
            }
          }
        };
        var resizer = function () {
          // The width of the sidebar will be off
          if (scope.isAffixed) {
            unAffixThis();
            affixThis();
          }
        };
        attrs.$observe('offset', function (val) {
          if (angular.isDefined(val)) {
            scope.offset = parseInt(val, 10);
          }
        });
        windowEl.on('scroll.affix', scroller);
        windowEl.on('resize.affix', resizer);
        attrs.$observe('scroll', function (val) {
          scope.scroll = !!val;
        });
        attrs.$observe('fullHeight', function (val) {
          scope.fullHeight = !!val;
        });
        attrs.$observe('pinnedHeader', function (val) {
          scope.pinnedHeader = !!val;
        });
        scope.$on('destroy', function () {
          windowEl.off('scroll.affix', scroller);
          windowEl.off('resize.affix', resizer);
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btArrowScroll
   * @requires  $window
   * @restrict A
   *
   * @description The `btArrowScroll` attribute directive will direct all arrow key events to a specific element.
   * This is useful for modals in certain browsers.  Be careful using this as it will always be activated
   * so long as the element exists on the page.  Combine with ng-if to programmatically kill this functionality.
   *
   */
  Boomstrap.directive('btArrowScroll', function ($window) {
    return {
      restrict: 'A',
      link: function (scope, element) {
        var $windowEl = angular.element($window);
        var scrollDistance = 50;
        $windowEl.on('keydown.arrowscroll', function (e) {
          var scroll;
          // Handle down key
          if (e.keyCode === 40) {
            scroll = element.scrollTop();
            if (scroll + scrollDistance < element[0].scrollHeight) {
              element.scrollTop(scroll + scrollDistance);
              e.preventDefault();
            } else if (scroll !== element[0].scrollHeight) {
              // Scroll to the bottom if we're less than the scroll distance
              element.scrollTop(element[0].scrollHeight);
            }
          } else if (e.keyCode === 38) {
            // Handle up key
            scroll = element.scrollTop();
            if (scroll - scrollDistance >= 0) {
              element.scrollTop(scroll - scrollDistance);
              e.preventDefault();
            } else if (scroll !== 0) {
              // Scroll to the top if we're less than the scroll distance
              element.scrollTop(0);
            }
          }
        });
        element.bind('$destroy', function () {
          $windowEl.off('keydown.arrowscroll');
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  /**
   * @ngdoc directive
   * @name boomstrap.directive:btAutoSubmit
   * @restrict A
   *
   * @description `btAutoSubmit` allows you to auto submit a form whenever the model of a form-field changes.
   * This directive requires the `ngForm` directive to also be present on the element.
   * 
   *
   * @requires $timeout
   * @requires ngForm
   * @param {expression} ngSubmit Fires upon timeout completion
   * @param {expression} btAutoSubmit If the `expression` is truthy then the `ngSubmit` expression will fire upon timeout
   * @param {Number} submitTimeout Number of milliseconds to wait after a model change before firing the `ngSubmit`
   * @param {expression} willLoad This directive will set the value supplied here to true when it has scheduled the timeout, but not fired it
   *
   * @example
     <doc:example module="boomstrap">
        <doc:source>
          <script>
            angular.module('boomstrap')
              .controller('subTest', function($scope) {
                $scope.willLoad = {
                  value: false
                };
                $scope.inputValue = 'Type here!';
                $scope.submit = function() {
                  $scope.delayedValue = $scope.inputValue;
                }
              });
          </script>
          <div ng-app="autoSubmitTest">
            <div ng-controller="subTest">
              <ng-form ng-submit="submit()" bt-auto-submit="true" submit-timeout="3000" will-load="willLoad">
                <input name="myName" ng-model="inputValue">
              </ng-form>
              <label ng-show="willLoad.value">I'm thinking...</label>
              <label ng-bind="delayedValue"></label>
            </div>
          </div>
        </doc:source>
      </doc:example> 
   */
  Boomstrap.directive('btAutoSubmit', function ($timeout) {
    return {
      require: 'form',
      restrict: 'A',
      scope: {
        'ngSubmit': '&',
        'shouldAutoSubmit': '=btAutoSubmit',
        'submitTimeout': '@',
        'willLoad': '='
      },
      link: function (scope, iElement, iAttrs, iCtrl) {
        var autoSubmit = parseInt(scope.submitTimeout, 10);
        var submitTimeout = $timeout(function () {
          }, 0);
        var triggerTimeout = function () {
          iCtrl.$setPristine();
          $timeout.cancel(submitTimeout);
          scope.willLoad.value = true;
          submitTimeout = $timeout(function () {
            scope.willLoad.value = false;
            if (iCtrl.$valid) {
              scope.ngSubmit({});
              iCtrl.$setPristine();
            }
          }, autoSubmit);
        };
        scope.$watch(function () {
          return iCtrl.$valid && iCtrl.$dirty;
        }, function (val, oldVal) {
          // We can programmatically determine when the form should auto submit
          if (scope.shouldAutoSubmit) {
            // If the form is both dirty and valid
            // Start the clock for submission
            if (val !== oldVal && val) {
              triggerTimeout();
            }
          } else {
            iCtrl.$setPristine();
          }
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btCenterOnPage
   * @requires  $window
   * @requires  $timeout
   * @restrict A
   *
   * @description The `btCenterOnPage` attribute directive will add a top and left to an element
   * such that it is absolutely centered on the page.  This is mostly used for Modals.
   */
  Boomstrap.directive('btCenterOnPage', function ($window, $timeout) {
    return {
      restrict: 'A',
      link: function (scope, element) {
        var $element = angular.element(element), windowEl = angular.element($window);
        var centerElement = function () {
          var windowWidth = windowEl.width(), windowHeight = windowEl.height(), elementWidth = $element.width(), elementHeight = $element.height();
          $element.css({
            top: Math.floor((windowHeight - elementHeight) / 2).toString() + 'px',
            left: Math.floor((windowWidth - elementWidth) / 2).toString() + 'px'
          });
        };
        $timeout(centerElement, 0);
        windowEl.on('resize.modal', centerElement);
        scope.$on('$destroy', function () {
          windowEl.off('resize.modal');
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  /**
   * @ngdoc directive
   * @name boomstrap.directive:btDropdown
   * @restrict A
   *
   * @description `btDropdown` allows you to create a dropdown based on an object. The keys of the object
   * are what is stored in the ngModel and the values are the visual representations in the dropdown.
   * In most cases, prefer the ui-select directive over this.
   * 
   *
   * @requires ngModel
   * @param {Object} values Object containing the values for the dropdown.
   * @param {Boolean} keysAreNumbers Indicates that the keys of the `values` object are `Number`s.
   * This is used for sorting because by default iterating over an object will sort based on the string representation.
   * Thus, 10 will come before 2, etc...
   * @param {expression} onAssign Expression to call when a value is chosen from the dropdown.
   *
   * @example
     <doc:example module="boomstrap">
        <doc:source>
          <style>
            .dropdown-test .btn.dropdown-toggle {
              width: 140px;
            }

            .dropdown-test > div {
              margin-bottom: 30px;
            }

            .doc-example-live {
              background-color: #FFFFFF;
              margin-bottom: 100px;
            }
          </style>
          <script>
            angular.module('boomstrap')
              .controller('dropTest', function($scope) {
                $scope.stringValues = {
                  'A': 'Aardvark',
                  'B': 'Bear',
                  'C': 'Cat'
                };

                $scope.numValues = {
                  '-1': 'Sean',
                  '0': 'Mark',
                  '1': 'Christian',
                  '10': 'Craig',
                  '2': 'David'
                }

                $scope.numValue = '1';
                $scope.stringValue = 'A';


                $scope.assigned = function(value, translation) {
                  alert('The value is ' + value + ' and the translation is ' + translation);
                } 
              });
          </script>
          <div ng-controller="dropTest" class="dropdown-test">
            <div bt-dropdown values="stringValues" ng-model="stringValue"></div>
            <div bt-dropdown values="numValues" ng-model="numValue" keys-are-numbers="true"></div>
            <p>The next dropdown will throw an alert on save</p>
            <div bt-dropdown values="stringValues"
                ng-model="stringValue" on-assign="assigned(ddValue, ddTranslation)" ></div>
          </div>
        </doc:source>
      </doc:example> 
   */
  Boomstrap.directive('btDropdown', function ($window) {
    return {
      restrict: 'A',
      require: 'ngModel',
      templateUrl: 'template/dropdown/bt-dropdown.tpl.html',
      replace: true,
      scope: {
        values: '=',
        keysAreNumbers: '=',
        onAssign: '&'
      },
      link: function (scope, iElement, iAttrs, ngModel) {
        var windowEl = angular.element($window);
        /* Because angular will only sort objects by their key and our key is
         * always a string representation, if we want to sort by numbers as a key
         * we need to transform the object into an array of objects in which the item we are sorting on
         * is the parseInt value of the key
         */
        var sortNumberKeys = function (objectValues) {
          var sortedArray = [];
          Object.keys(objectValues).forEach(function (key) {
            sortedArray.push({
              'key': key,
              'value': objectValues[key]
            });
          });
          sortedArray.sort(function (a, b) {
            return parseInt(a.key, 10) > parseInt(b.key, 10);
          });
          return sortedArray;
        };
        if (scope.keysAreNumbers) {
          scope.arrayValues = sortNumberKeys(scope.values);
          scope.$watch('values', function (newValues, oldValues) {
            if (newValues && oldValues && newValues.length !== oldValues.length) {
              scope.arrayValues = sortNumberKeys(scope.values);
            }
          });
        }
        scope.assignValue = function (value) {
          scope.selectedValue = scope.values[value];
          // Trigger $dirty for ngModel
          ngModel.$setViewValue(value);
          // If the user has provided an `onAssign` expression
          // call it with the value, and the view representation
          if (scope.onAssign) {
            scope.onAssign({
              ddValue: value,
              ddTranslation: scope.selectedValue
            });
          }
        };
        scope.valuesLength = function () {
          return scope.values && Object.keys(scope.values).length || 0;
        };
        // Handle setting the width of the dropdown based on the width
        // of the overall box
        var setDropdownWidth = function () {
          // Woo jQuery dependency because of border-box, yeah!
          scope.dropdownWidth = angular.element(iElement[0].children[0]).outerWidth();
        };
        setDropdownWidth();
        windowEl.on('resize.dropdown', function () {
          scope.$apply(setDropdownWidth);
        });
        scope.$watch(function () {
          return ngModel.$modelValue;
        }, function (newVal, oldVal) {
          if (newVal !== oldVal || angular.isUndefined(scope.selectedValue)) {
            scope.selectedValue = scope.values[newVal] || '';
          }
        });
        // Deconstruction
        scope.$on('$destroy', function () {
          windowEl.off('resize.dropdown');
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btErrorImg
   * @restrict A
   * 
   * @param {string} btErrorImg URL to a backup image to be used if the src of an img tag fails to load.
   *
   * @description
   * The `btErrorImg` directive will replace the src of an img tag if the original src fails to load.
   * This is useful for images of properties.
   *
   * @element img
   *
   * @example
      <doc:example module="boomstrap">
        <doc:source>
          <img src="images/i-do-not-exist.jpg" bt-error-img="images/fpo-he-man.jpg"/>
        </doc:source>
      </doc:example>
   * 
   */
  Boomstrap.directive('btErrorImg', function () {
    return {
      link: function (scope, element, attrs) {
        element.bind('error', function () {
          element.attr('src', attrs.btErrorImg);
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btFocusOn
   * @requires  $timeout
   * @restrict A
   *
   * @param {expression} btFocusOn Expression that will be evaluated to truthy or falsey.
   * If this expression goes from falsey to truthy, focus will be placed on the element
   *
   * @description The `btFocusOn` attribute directive will focus on an input when the expression provided
   * goes from false to true.  This is helpful when guiding the user through a page.
   */
  Boomstrap.directive('btFocusOn', function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var currentValue = { value: false };
        attrs.$observe('btFocusOn', function (newValue) {
          if (angular.isDefined(newValue)) {
            var newValBool = scope.$eval(newValue);
            // We are going from false to true
            if (!currentValue.value && newValBool) {
              // Defer to next digest loop
              // For cases of ng-show on an element
              // So that ng-show happens first
              $timeout(function () {
                element[0].focus();
              });
            }
            currentValue.value = newValBool;
          }
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btFormatMoney
   * @requires  $window
   * @requires  ngModel
   * @restrict A
   *
   * @description The `btFormatMoney` attribute directive will format the ngModel of the element it
   * is placed on.  The view will be in currency format $XXX,XXX with no decimal, and the model will
   * be stored as a Number.
   */
  Boomstrap.directive('btFormatMoney', function ($filter) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, ele, attrs, ctrl) {
        var formatCurrency = function (input) {
          var currency = $filter('currency')(input);
          return currency.split('.')[0];
        };
        ctrl.$parsers.push(function (data) {
          //convert data from view format to model format
          var parsed;
          if (data) {
            parsed = parseInt(data.replace(/[^0-9]+/g, ''));
            if (isNaN(parsed)) {
              parsed = null;
            }
          } else {
            parsed = null;
          }
          //Force an update of the view value because angular is too smart to trigger $parsers a second time
          var newViewValue;
          if (parsed) {
            newViewValue = formatCurrency(parsed);
          } else {
            newViewValue = null;
          }
          if (newViewValue != data)
            ctrl.$setViewValue(newViewValue);
          //Only update the view (which triggers $parsers) if the new view value is actually different
          ctrl.$render();
          return parsed;  //converted value goes to the model
        });
        ctrl.$formatters.push(function (data) {
          //convert data from model format to view format
          if (data === null) {
            return null;
          }
          return formatCurrency(data);  //converted value goes to the view
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  Boomstrap.directive('btFromNow', function () {
    return {
      restrict: 'E',
      scope: { date: '=' },
      replace: true,
      template: '<span class="bt-from-now">{{ fromNow }}</span>',
      link: function (scope, element, attrs) {
        scope.fromNow = moment(scope.date).fromNow();
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btIFrame
   * @requires  $window
   * @restrict A
   *
   * @param {string} width Number value representing the width of the iFrame
   * @param {string} height Number value representing the height of the iFrame
   * @param {string} src The uri to the iFrame
   * @param {expression} closeFrame Expression to call when the iFrame has been closed internally.
   *
   * @description The `btIFrame` attribute directive allows the user to embed an iFrame with the ability
   * to communicate the iFrame closing back to Angular.  The iFrame must be on the same domain as
   * the calling code, and must implement a global function called registerClose, which takes a function
   * as an argument and sets a function internally to that function.  It is intended that that function
   * will be called when the iFrame wishes to close.
   *
   */
  Boomstrap.directive('btIFrame', function ($window) {
    $window.iFrameCloseRegister = function () {
    };
    return {
      template: '<iframe ng-src="{{src}}" width="{{width}}" height="{{height}}" seamless onload="window.iFrameCloseRegister()"></iframe>',
      restrict: 'A',
      scope: {
        width: '@',
        height: '@',
        src: '=',
        closeFrame: '&'
      },
      link: function (scope, element) {
        $window.iFrameCloseRegister = function () {
          if (element.children()[0] && element.children()[0].contentWindow && element.children()[0].contentWindow.registerClose) {
            element.children()[0].contentWindow.registerClose(function () {
              scope.closeFrame();
            });
          }
        };
        scope.$on('$destroy', function () {
          $window.iFrameCloseRegister = function () {
          };
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btInfiniteScrollElement
   * @requires  $rootScope
   * @requires  $timeout
   * @restrict A
   *
   * @param {expression} btInfiniteScrollElement Expression to evaluate when the bottom of the element
   * has been scrolled to.
   * @param {string} infiniteScrollDistance Number value representing how far from the bottom of the element
   * should the btInfiniteScrollElement expression be triggered.
   *
   * @description The `btInfiniteScrollElement` attribute directive allows the user to trigger an expression
   * when the user has scrolled to the bottom or close to the bottom of an element.  This causes the illusion
   * of infinite scroll.
   */
  Boomstrap.directive('btInfiniteScrollElement', function ($rootScope, $timeout) {
    return {
      link: function (scope, elem, attrs) {
        var checkWhenEnabled, handler, scrollEnabled, scrollDistance;
        scrollEnabled = true;
        checkWhenEnabled = false;
        scrollDistance = 30;
        // 30 is the default scroll distance
        attrs.$observe('infiniteScrollDistance', function (newVal, oldVal) {
          if (newVal !== oldVal && newVal) {
            scrollDistance = parseInt(newVal, 10);
            if (isNaN(scrollDistance)) {
              scrollDistance = 30;
            }
          }
        });
        handler = function () {
          var elementTotalHeight, elementScrollPosition, elementVisibleHeight, shouldScroll;
          // scrollHeight, scrollTop works for elements
          // overflow-y scroll too
          elementTotalHeight = elem[0].scrollHeight;
          elementScrollPosition = elem.scrollTop();
          elementVisibleHeight = elem.height();
          shouldScroll = elementTotalHeight - (elementVisibleHeight + elementScrollPosition) <= scrollDistance;
          if (shouldScroll && scrollEnabled) {
            if ($rootScope.$$phase) {
              return scope.$eval(attrs.btInfiniteScrollElement);
            } else {
              return scope.$apply(attrs.btInfiniteScrollElement);
            }
          } else if (shouldScroll) {
            checkWhenEnabled = true;
            return checkWhenEnabled;
          }
        };
        elem.on('scroll', handler);
        scope.$on('$destroy', function () {
          return elem.off('scroll', handler);
        });
        $timeout(function () {
          if (attrs.infiniteScrollImmediateCheck) {
            if (scope.$eval(attrs.infiniteScrollImmediateCheck)) {
              return handler();
            }
          } else {
            return handler();
          }
        }, 0);
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  /*
   * btLockBody will add overflow: hidden to the body when this element exists.
   * It will also remove it when the element is destroyed.
   */
  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btLockBody
   * @requires $document
   * @requires $window
   * @restrict A
   *
   * @description The `btLockBody` attribute directive will prevent the body from scrolling whenever
   * the element this directive is attached to exists.  This is used for an older version of Angular
   * Bootstrap in which invoking a modal would not lock the body from scrolling.  Use ng-if with this
   * directive to make sure the body is not locked all of the time.
   *
   */
  Boomstrap.directive('btLockBody', function ($document, $window) {
    return {
      link: function (scope, element) {
        var $body = angular.element(document.getElementsByTagName('body')[0]);
        var $html = angular.element(document.getElementsByTagName('html')[0]);
        var $documentEl = angular.element($document);
        var $windowEl = angular.element($window);
        var htmlDefault = {
            position: $html.css('position'),
            'overflow-y': $html.css('overflow-y'),
            'width': $html.css('width'),
            isScrolled: false
          };
        var scrollTop;
        if ($document.height() > $windowEl.height()) {
          // http://stackoverflow.com/questions/8701754/just-disable-scroll-not-hide-it
          // Works for Chrome, Firefox, IE...
          scrollTop = $html.scrollTop() || $body.scrollTop();
          $html.css('top', -scrollTop);
          htmlDefault.isScrolled = true;
        }
        $html.css('position', 'fixed');
        $html.css('overflow-y', 'scroll');
        $html.css('width', '100%');
        element.bind('$destroy', function () {
          $html.css('position', htmlDefault.position);
          $html.css('overflow-y', htmlDefault['overflow-y']);
          $html.css('width', htmlDefault.width);
          if (htmlDefault.isScrolled) {
            $html.scrollTop(scrollTop);
            $body.scrollTop(scrollTop);
          }
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btNgModelOnBlur
   * @requires ngModel
   * @restrict A
   *
   * @description The `btNgModelOnBlur` attribute directive when used with an input will only update the
   * ngModel when the user has left focus of the input or pressed the enter key. This directive will be
   * made redundant with the ngModelOptions directive in Angular 1.3
   *
   */
  Boomstrap.directive('btNgModelOnblur', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      priority: 1,
      link: function (scope, element, attrs, ngModel) {
        var analyticsName = '';
        var update = function (alwaysUpdate) {
          scope.$apply(function () {
            var elementValue = element.val().trim();
            if (!alwaysUpdate) {
              var modelEmpty = angular.isUndefined(ngModel.$modelValue) || ngModel.$modelValue === null;
              // We don't care about blank values not changing
              if (modelEmpty) {
                if (elementValue === '') {
                  return;
                }
              } else {
                var normalizedValue = elementValue.replace(/[^.0-9]+/g, '');
                if (normalizedValue !== '') {
                  normalizedValue = /\./.test(normalizedValue) ? parseFloat(normalizedValue, 10) : parseInt(normalizedValue, 10);
                  // Check the numbers and if they're equal, abort!
                  if (normalizedValue === ngModel.$modelValue) {
                    return;
                  }
                }
              }
            }
            ngModel.$setViewValue(elementValue);
            ngModel.$render();
          });
        };
        element.off('input').off('keydown').off('change').on('blur', function () {
          update(false);
        }).on('keydown', function (e) {
          if (e.keyCode === 13) {
            update(true);
          }
        });
        // Remove bindings when the scope is destroyed
        scope.$on('$destroy', function () {
          element.unbind();
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btNumber
   * @requires ngModel
   * @restrict A
   *
   * @description The `btNumber` attribute directive formats the ngModel's data to only
   * allow numbers.  This is good for inputs where you don't want the user to type anything but a number.
   *
   */
  Boomstrap.directive('btNumber', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, iElement, iAttrs, modelCtrl) {
        modelCtrl.$parsers.push(function (data) {
          if (data) {
            // Basically, don't allow the user to type in anything other than a number or decimal
            var parsed = data.toString().replace(/[^0-9.]+/g, '');
            if (parsed) {
              parsed = /\./.test(data) ? parseFloat(data) : parseInt(data);
            }
            if (parsed != data) {
              //Only update the view if the new view value is actually different
              modelCtrl.$setViewValue(parsed);
              modelCtrl.$render();
            }
            return parsed;
          }
          return data;
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btPager
   * @restrict E
   * 
   * @param {Number} totalItems The number of items to paginate through.
   * @param {Number} currentPage The number of the current page we are on.
   * @param {Number} itemsPerPage How many items are allowed on each page.
   *
   * @description
   * The `btPager` directive is a wrapper of the ui-bootstrap pagination directive that keeps
   * track of what page we are on and programmatically disable or enable pagination based on such.
   * It is wrapping the directive so that we can provide our own template.
   *
   */
  Boomstrap.directive('btPager', function () {
    return {
      restrict: 'E',
      templateUrl: 'template/btPager/bt-pager.tpl.html',
      scope: {
        currentPage: '=',
        totalItems: '=',
        itemsPerPage: '='
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  Boomstrap.directive('btPropertyCard', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        property: '=',
        size: '@'
      },
      templateUrl: function (el, attrs) {
        var template = '';
        if (attrs.size === 'sm') {
          template = 'template/property-card/bt-property-card-sm.tpl.html';
        } else {
          template = 'template/property-card/bt-property-card.tpl.html';
        }
        return template;
      },
      link: function (scope, element, attrs) {
        if (scope.size === 'sm') {
          scope.isSmall = true;
        }
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btScore
   * @restrict E
   * @replace
   * 
   * @param {Number} score The score to present in the component.  Classes will be added to the element to
   * color a score element based on how high or low the score is.  Excellent score (99-76); Good score (75-56);
   * Average score (50-26); Default score (25-0)
   * @param {string} [size=''] The size of the score. Valid sizes include: `xs` (extrasmall), `sm` (small), and `lg` (large).
   * If no size is specified, the score will be of medium size.
   *
   * @description
   * The `btScore` directive represents a score component from Boomstrap.  It will keep the color
   * and size up to date based on what is specified.
   */
  Boomstrap.directive('btScore', function () {
    return {
      restrict: 'E',
      replace: true,
      template: '<span class="score" ng-class="getScoreClasses()">{{ score }}</span>',
      scope: {
        score: '=',
        size: '@'
      },
      link: function (scope, iElement, iAttrs) {
        var translateScore = function (score) {
          var scoreType, scoreTranslation;
          // Translate string value into a Number
          scoreTranslation = parseInt(score, 10);
          if (!isNaN(scoreTranslation)) {
            if (scoreTranslation >= 76) {
              scoreType = 'score-excellent';
            } else if (scoreTranslation >= 56) {
              scoreType = 'score-good';
            } else if (scoreTranslation >= 26) {
              scoreType = 'score-average';
            }
          }
          scope.scoreType = scoreType || '';
        };
        scope.scoreSize = scope.size && 'score-' + scope.size || '';
        scope.scoreType = translateScore(scope.score);
        scope.getScoreClasses = function () {
          return [
            scope.scoreSize,
            scope.scoreType
          ];
        };
        scope.$watch('score', function (newScore, oldScore) {
          translateScore(newScore);
        });
        scope.$watch('size', function (newSize, oldSize) {
          scope.scoreSize = newSize && 'score-' + newSize || '';
        });
      }
    };
  });
}(angular.module('boomstrap')));
(function (Boomstrap) {
  'use strict';
  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btSelectRange
   * @requires $filter
   * @restrict E
   *
   * @param {Array} values Array of values to display in the select dropdowns.
   * @param {string} minPlaceholder String to show when the user is selecting an item from the minimum dropdown
   * @param {string} maxPlaceholder String to show when the user is selecting an item from the maximum dropdown
   * @param {string} rangeType If the range type is 'money', format the Number values as currency.
   *
   * @description The `btSelectRange` element directive wraps the AngularUI's uiSelect directive.
   * It allows the user to change the placeholder text for the range, and ensures that the minimum will always
   * be less than the maximum.  It also provides a way for the user to select 'No minimum' or 'No maximum' if
   * the array provided has a non-number value in it.  This directive will add the users input to the current
   * list of items shown as the user types, and if the user enters a non-provided value, that value will be added
   * to the values Array provided.
   *
   */
  Boomstrap.directive('btSelectRange', function ($filter) {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: 'template/select-range/range.tpl.html',
      replace: true,
      scope: {
        values: '=',
        minPlaceholder: '@',
        maxPlaceholder: '@'
      },
      link: function (scope, iElement, iAttrs, ngModel) {
        /*
         * Set default values for minimum, maximum, and placeholders.
         */
        scope.minimum = { value: ngModel.$modelValue.minimum };
        scope.maximum = { value: ngModel.$modelValue.maximum };
        scope.minPlaceholder = scope.minPlaceholder || 'Select a minimum value';
        scope.maxPlaceholder = scope.maxPLaceholder || 'Select a maximum value';
        var validateMinMax = function (flippingFn) {
          // Normalize values first
          if (!angular.isNumber(scope.minimum.value)) {
            scope.minimum.value = null;
          }
          if (!angular.isNumber(scope.maximum.value)) {
            scope.maximum.value = null;
          }
          if (scope.maximum.value !== null && scope.minimum.value !== null && scope.maximum.value < scope.minimum.value && flippingFn) {
            flippingFn();
          }
        };
        var addValueToValues = function (value, collection) {
          if (value && collection) {
            // First, remove all non-number or decimal characters from string
            var parsedValue = value.toString().replace(/[^0-9\.]+/, '');
            // If the string is not completely empty, we likely have a number
            if (parsedValue) {
              parsedValue = parseFloat(parseFloat(parsedValue).toFixed(2));
              if (!isNaN(parsedValue) && collection.indexOf(parsedValue) === -1) {
                collection.unshift(parsedValue);
              }
            }
          }
        };
        var translateValidValue;
        if (iAttrs.rangeType === 'money') {
          translateValidValue = function (value) {
            return $filter('currency')(value);
          };
        } else {
          translateValidValue = angular.identity;
        }
        scope.translateValue = function (value, defaultText) {
          return angular.isNumber(value) ? translateValidValue(value) : defaultText;
        };
        (function () {
          /*
           * getValues uses modifiedValues and previousValue
           * to avoid modifying the collection and value
           * each digest loop.  If the user has provided
           * new input, then we transform the value and return
           * a modified collection.
           */
          var modifiedValues, previousValue;
          scope.getValues = function (value) {
            if (value !== previousValue) {
              previousValue = value;
              modifiedValues = scope.values.slice();
              addValueToValues(value, modifiedValues);
            }
            return modifiedValues;
          };
        }());
        scope.$watch(function () {
          return ngModel.$modelValue.minimum;
        }, function (newVal, oldVal) {
          if (scope.minimum.value !== ngModel.$modelValue.minimum) {
            scope.minimum.value = ngModel.$modelValue.minimum;
          }
        });
        scope.$watch(function () {
          return ngModel.$modelValue.maximum;
        }, function (newVal, oldVal) {
          if (scope.maximum.value !== ngModel.$modelValue.maximum) {
            scope.maximum.value = ngModel.$modelValue.maximum;
          }
        });
        scope.$watch('minimum.value', function (newMin, oldMin) {
          if (newMin !== oldMin) {
            validateMinMax(function () {
              // Pass in the flipping function if the min/max order is invalid.
              scope.maximum.value = scope.minimum.value;
            });
            // Add the value to the list of potential values
            addValueToValues(scope.minimum.value, scope.values);
            // Update the ngModel
            ngModel.$modelValue.minimum = scope.minimum.value;
            ngModel.$setViewValue(ngModel.$viewValue);
          }
        });
        scope.$watch('maximum.value', function (newMax, oldMax) {
          if (newMax !== oldMax) {
            validateMinMax(function () {
              // Pass in the flipping function if the min/max order is invalid.
              scope.minimum.value = scope.maximum.value;
            });
            // Add the value to the list of potential values
            addValueToValues(scope.maximum.value, scope.values);
            // Update the ngModel
            ngModel.$modelValue.maximum = scope.maximum.value;
            ngModel.$setViewValue(ngModel.$viewValue);
          }
        });
      }
    };
  });
}(angular.module('boomstrap')));