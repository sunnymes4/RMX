/**
 * Created by Santhosh on 30-Dec-15.
 */

dataManagement.controller('DataManagementController', ['$scope', '$sce', '$window', '$timeout', 'DataManagementService', 'Notification', 'GUIDFactory', 'commonService',
    function ($scope, $sce, $window, $timeout, DataManagementService, Notification, GUIDFactory, commonService) {

        function headerCellRendererFunc(params) {
            // Customizing the header
            return '<span title="{{colDef.headerName}}">{{colDef.headerName}}</span>';

        }

        $scope.relationShipOptions = [
            {text: $sce.trustAsHtml('<span class="glyphicon glyphicon-ok"></span>'), value: true},
            {text: $sce.trustAsHtml('<span class="glyphicon glyphicon-remove"></span>'), value: false}
        ]

        function innerCellRenderer(params) {
            return '<span title="' + params.value + '">' + params.value + '</span>';
        }

        var weatherColumnDefs = [
            {headerName: "Category", field: "category", width: 355, cellClass: 'text-center'},
            {headerName: "Confidence Level", field: "confidenceLevel", width: 355, cellClass: 'text-center'},
            {
                headerName: "Enable", field: "enable", width: 355, cellClass: 'text-center',
                template: '<input type="checkbox" ng-model="data.enable" class="custom-check-box"/><span class="lbl padding-8"></span>'
            }
        ];

        var weatherRowData = [
            {
                category: "FRENCH_FRYS_CHIPS_SALT",
                enable: true,
                confidenceLevel: "90%"
            }
        ];

        var demoGraphicsRowData = [
            {
                category: "FRENCH_FRYS_POTATO",
                enable: true,
                confidenceLevel: "75%"
            }
        ];

        var socialMediaRowData = [
            {
                category: "FRENCH_FRYS_PIZZA",
                enable: false,
                confidenceLevel: "63%"
            }
        ];

        $scope.weatherGridOptions = {
            columnDefs: weatherColumnDefs,
            rowData: weatherRowData,
            angularCompileHeaders: true,
            angularCompileRows: true,
            enableColResize: true,
            headerCellRenderer: headerCellRendererFunc,
        };

        $scope.trafficGridOptions = {
            columnDefs: weatherColumnDefs,
            rowData: demoGraphicsRowData,
            angularCompileHeaders: true,
            angularCompileRows: true,
            enableColResize: true,
            headerCellRenderer: headerCellRendererFunc,
        };

        $scope.socialMediaGridOptions = {
            columnDefs: weatherColumnDefs,
            rowData: socialMediaRowData,
            angularCompileHeaders: true,
            enableColResize: true,
            headerCellRenderer: headerCellRendererFunc,
        };

        /*        Right work flow table code begins        */
        var staticData = [
            {
                hiearchyName: "Cat 01",
                dataStatus: true,
                relationshipRight: true,
                modeling: false
            },
            {
                hiearchyName: "Cat 02",
                dataStatus: false,
                relationshipRight: true,
                modeling: false
            },
            {
                hiearchyName: "Cat 03",
                dataStatus: true,
                relationshipRight: false,
                modeling: false
            },
            {
                hiearchyName: "Cat 04",
                dataStatus: true,
                relationshipRight: true,
                modeling: true,
            }
        ];

        var workflowColumnDefs = [
            {
                headerName: "Department",
                field: "hiearchyName",
                width: 80,
                cellClass: ['text-left', 'description'],
                cellRenderer: {renderer: 'group', innerRenderer: innerCellRenderer}
            },
            {
                headerName: "Data", field: "dataStatus", width: 60, cellClass: 'text-center',
                template: '<span class="{{(data.dataStatus==true || data.dataStatus.text==true) ? \'glyphicon glyphicon-ok\':\'glyphicon glyphicon-remove\'}}"></span></span>'
            },
            {
                headerName: "Relationship", field: "relationShipStatus", width: 60, cellClass: 'text-center',
                template: '<span class="{{data.relationShipStatus ? \'glyphicon glyphicon-ok\' : \'glyphicon glyphicon-remove\'}}"></span></span>'
            },
            {
                headerName: "Modeling", field: "modeling", width: 80, cellClass: 'text-center',
                template: '<span class="{{data.modelingStatus ? \'glyphicon glyphicon-ok\' : \'glyphicon glyphicon-remove\'}}"></span></span>'
            }

        ];

        $scope.recommendationGridOptions = {
            columnDefs: workflowColumnDefs,
            rowData: staticData,
            enableColResize: false,
            angularCompileRows: true,
            angularCompileHeaders: true,
            headerCellRenderer: headerCellRendererFunc,
        };

        $scope.alertGridOptions = {
            columnDefs: workflowColumnDefs,
            rowData: staticData,
            enableColResize: false,
            angularCompileRows: true,
            angularCompileHeaders: true,
            headerCellRenderer: headerCellRendererFunc,
        };

        var gridWidthResize = function (time, callback) {
            $timeout(function () {
                $scope.PRGridOptions.api.sizeColumnsToFit();
                $scope.PRCriteriaGridOptions.api && $scope.PRCriteriaGridOptions.api.sizeColumnsToFit();
                $scope.borrowingLogicOptions.api.sizeColumnsToFit();
                $scope.weatherGridOptions.api.sizeColumnsToFit();
                $scope.trafficGridOptions.api.sizeColumnsToFit();
                $scope.socialMediaGridOptions.api.sizeColumnsToFit();
                $scope.workflowGridOptions.api.sizeColumnsToFit();
                $scope.supportTicketsGridOptions.api.sizeColumnsToFit();
                callback && callback();
            }, time);
        }

        angular.element($window).on('resize', function (e) {
            gridWidthResize(1000);
        });

        $scope.resizeGrid = function (isOpened) {
            gridWidthResize(1000);
        }
        /*        Sidebar accordion code begins       */
        $scope.showSideBar = false;
        $scope.classForMainContent = 'col-lg-12';
        $scope.attributeClass = 'navbar attribute-menu';
        $scope.toggleSideBar = function () {
            if (!$scope.showSideBar) {
                $scope.classForMainContent = 'col-lg-8 col-md-8 col-sm-12';
                $scope.attributeClass = 'navbar attribute-menu attribute-menu-right';
                $timeout(function () {
                    $scope.showSideBar = !$scope.showSideBar;

                    buildWorkFlowGrid(workFlowGridData);
                    gridWidthResize(500);
                }, 1000)
            } else if ($scope.showSideBar) {
                $scope.showSideBar = !$scope.showSideBar;
                $scope.classForMainContent = 'col-lg-12';

                $timeout(function () {
                    gridWidthResize(200);
                    $scope.attributeClass = 'navbar attribute-menu';
                }, 1000);
            }
        }

        var supportTicketsColumnDefs = [
            {headerName: "Ticket#", field: "ticketNo", width: 75, cellClass: 'text-center'},
            {headerName: "Description", field: "description", width: 75, cellClass: 'text-center'},
            {headerName: "Opened By", field: "openedBy", width: 75, cellClass: 'text-center'},
            {headerName: "Status", field: "status", width: 75, cellClass: 'text-center'}
        ];

        var supportTicketsRowData = [
            {
                ticketNo: "254541",
                description: "Optimize Error",
                openedBy: "Robert K",
                status: "Open"
            },
            {
                ticketNo: "345444",
                description: "Missing data",
                openedBy: "John K",
                status: "Closed"
            }
        ];

        $scope.supportTicketsGridOptions = {
            columnDefs: supportTicketsColumnDefs,
            rowData: supportTicketsRowData,
            enableColResize: true,
            angularCompileRows: true,
            headerCellRenderer: headerCellRendererFunc,
            angularCompileHeaders: true,
        };

        var workFlowGridData = [];

        // Get the DM info from service
        var getDMInfo = function () {
            DataManagementService.getDMInfo().then(function (data) {
                $scope.DMInfo = data || {};

                // Build Production Relationship grid
                buildPRGrid($scope.DMInfo.simpleDmData.productRelationShip);
                $scope.activateRelationshipType('lineClass');

                // Build borrowing logic grid
                buildBorrowingLogicGrid($scope.DMInfo.simpleDmData.borrowigLogic);

                //Build WorkFlow grid
                workFlowGridData = $scope.DMInfo.workFlow.simpleWorkFlow;

                // Add new option to dropdown list
                addNewOption($scope.DMInfo.brandMatch);
                addNewOption($scope.DMInfo.lineClass);
                addNewOption($scope.DMInfo.sizeMatch);
                addNewOption($scope.DMInfo.featureMatch);
            }, function (err) {
                Notification.error('Error while getting DM Info');
            })
        }

        var addNewOption = function (source) {
            source.push({id:'addNew', code:'(Add New)'});
        }

        var columnDefs = {
            PR: {
                lineClass: [
                    {
                        headerName: "Active Status", field: "productStatus", width: 120, cellClass: 'text-center',
                        template: '<span class="{{(data.productStatus)  ? \'glyphicon glyphicon-ok\' : \'glyphicon glyphicon-remove\'}}"></span><span class="badge custom-badge" dropdown-menu="relationShipOptions" dropdown-model="data.productStatus" dropdown-onchange="activeStatusChanged(selected, data, \'productStatus\', true)" dropdown-item-label="text"><span style="font-size: 16px;"  class="fa fa-angle-down "></span></span>'
                    },
                    {
                        headerName: "Relationship", field: "relationship", width: 120, cellClass: 'text-center',
                        template: '<span class="{{data.lineClassRelationship.value || data.lineClass  ? \'glyphicon glyphicon-ok\' : \'glyphicon glyphicon-remove\'}}"></span><span class="badge custom-badge" dropdown-menu="relationShipOptions" dropdown-model="data.lineClassRelationship" dropdown-onchange="relationShipChanged(selected, data, \'lineClass\', false)" dropdown-item-label="text"><span style="font-size: 16px;"  class="fa fa-angle-down "></span></span>'
                    },
                    {headerName: "Product ID", field: "productCode", width: 100, cellClass: 'text-center'},
                    {
                        headerName: "Description",
                        field: "productStr",
                        width: 200,
                        cellClass: ['text-left', 'description'],
                        template: '<span title="{{data.productStr}}" ng-bind-template="{{data.productStr}}"></span>'
                    },
                    {
                        headerName: "Size", field: "size", width: 70, cellClass: 'text-center',
                        template: '<span title="{{data.size}}" ng-bind-template=\'{{data.size}}\'></span>'
                    },
                    {headerName: "UOM", field: "unitOfMeasureStr", width: 50, cellClass: 'text-center'},
                    {
                        headerName: "Price", field: "price", width: 100, cellClass: 'text-center',
                        template: '<span title="${{data.price  | limitTo : 4}}" ng-bind-template="${{data.price | limitTo : 4}} "></span>'
                    },
                    {
                        headerName: "Line Match", field: "lineMatchStr", width: 175, cellClass: 'text-center',
                        template: '<select class="form-control01 select-in-grid" ng-model="data.lineClass" ng-class="{\'danger\': data.lineClass == null && data.lineClassRelationship.value}" add-item-popup changed-value="data.lineClass" list-of-items="DMInfo.lineClass" ng-options="lineClass.id as lineClass.code for lineClass in DMInfo.lineClass">' +
                        '<option value="" disabled>Select</option>' +
                        '</select>'
                    }
                ],
                brandMatch: [
                    {
                        headerName: "Active Status", field: "productStatus", width: 100, cellClass: 'text-center',
                        template: '<span class="{{(data.productStatus)  ? \'glyphicon glyphicon-ok\' : \'glyphicon glyphicon-remove\'}}"></span><span class="badge custom-badge" dropdown-menu="relationShipOptions" dropdown-model="data.productStatus" dropdown-onchange="activeStatusChanged(selected, data, \'productStatus\', true)" dropdown-item-label="text"><span style="font-size: 16px;"  class="fa fa-angle-down "></span></span>'
                    },
                    {
                        headerName: "Relationship", field: "relationship", width: 120, cellClass: 'text-center',
                        template: '<span class="{{data.brandMatchRelationship.value || data.brandMatch  ? \'glyphicon glyphicon-ok\' : \'glyphicon glyphicon-remove\'}}"></span><span class="badge custom-badge" dropdown-menu="relationShipOptions" dropdown-model="data.brandMatchRelationship" dropdown-onchange="relationShipChanged(selected, data, \'brandMatch\', false)" dropdown-item-label="text"><span style="font-size: 16px;"  class="fa fa-angle-down "></span></span>'
                    },
                    {headerName: "Product ID", field: "productCode", width: 100, cellClass: 'text-center'},
                    {
                        headerName: "Description",
                        field: "productStr",
                        width: 200,
                        cellClass: ['text-left', 'description'],
                        template: '<span title="{{data.productStr}}" ng-bind-template="{{data.productStr}}"></span>'
                    },
                    {
                        headerName: "Size", field: "size", width: 50, cellClass: 'text-center',
                        template: '<span title="{{data.size}}" ng-bind-template="{{data.size}}"></span>'
                    },
                    {
                        headerName: "UOM", field: "unitOfMeasureStr", width: 70, cellClass: 'text-center',
                        template: '<span title="{{data.unitOfMeasureStr}}" ng-bind-template="{{data.unitOfMeasureStr}}"></span>'
                    },
                    {
                        headerName: "Price",
                        field: "price",
                        width: 80,
                        cellClass: 'text-center',
                        template: '<span title="${{data.price | limitTo : 4}}" ng-bind-template="${{data.price | limitTo : 4}}"></span>'
                    },
                    {
                        headerName: "Brand Match", field: "brandMatch", width: 150, cellClass: 'text-center',
                        template: '<select class="form-control01 select-in-grid" ng-model="data.brandMatch" ng-class="{\'danger\': data.brandMatch == null && data.brandMatchRelationship.value}" add-item-popup changed-value="data.brandMatch" list-of-items="DMInfo.brandMatch" ng-options="brandMatch.id as brandMatch.code for brandMatch in DMInfo.brandMatch">' +
                        '<option value="" disabled>Select</option>' +
                        '</select>'
                    },
                    {
                        headerName: "Brand Type",
                        field: "brandClassStr",
                        width: 150,
                        cellClass: 'text-center',
                        template: '<select class="form-control01 select-in-grid" ng-model="data.brandClass" ng-options="brandClass.id as brandClass.code for brandClass in DMInfo.brandClass">' +
                        '<option value="" disabled>Select</option>' +
                        '</select>'
                    }

                ],
                sizeMatch: [
                    {
                        headerName: "Active Status", field: "productStatus", width: 100, cellClass: 'text-center',
                        template: '<span class="{{(data.productStatus)  ? \'glyphicon glyphicon-ok\' : \'glyphicon glyphicon-remove\'}}"></span><span class="badge custom-badge" dropdown-menu="relationShipOptions" dropdown-model="data.productStatus" dropdown-onchange="activeStatusChanged(selected, data, \'productStatus\', true)" dropdown-item-label="text"><span style="font-size: 16px;"  class="fa fa-angle-down "></span></span>'
                    },
                    {
                        headerName: "Relationship", field: "relationship", width: 120, cellClass: 'text-center',
                        template: '<span class="{{data.sizeMatchRelationship.value || data.sizeMatch  ? \'glyphicon glyphicon-ok\' : \'glyphicon glyphicon-remove\'}}"></span><span class="badge custom-badge" dropdown-menu="relationShipOptions" dropdown-model="data.sizeMatchRelationship" dropdown-onchange="relationShipChanged(selected, data, \'sizeMatch\', false)" dropdown-item-label="text"><span style="font-size: 16px;"  class="fa fa-angle-down "></span></span>'
                    },
                    {headerName: "Product ID", field: "productCode", width: 100, cellClass: 'text-center'},
                    {
                        headerName: "Description",
                        field: "productStr",
                        width: 200,
                        cellClass: ['text-left', 'description'],
                        template: '<span title="{{data.productStr}}" ng-bind-template="{{data.productStr}}"></span>'
                    },
                    {
                        headerName: "Size", field: "size", width: 50, cellClass: 'text-center',
                        template: '<span title="{{data.size}}" ng-bind-template=\'{{data.size}}\'></span>'
                    },
                    {
                        headerName: "UOM", field: "unitOfMeasureStr", width: 70, cellClass: 'text-center',
                        template: '<span title="{{data.unitOfMeasureStr}}" ng-bind-template=\'{{data.unitOfMeasureStr}}\'></span>'
                    },
                    {
                        headerName: "Price",
                        field: "price",
                        width: 100,
                        cellClass: 'text-center',
                        template: '<span title="${{data.price | limitTo : 4}}" ng-bind-template="${{data.price| limitTo : 4}}"></span>'
                    },
                    {
                        headerName: "Size Match", field: "sizeMatchStr", width: 140, cellClass: 'text-center',
                        template: '<select class="form-control01 select-in-grid" ng-model="data.sizeMatch" ng-class="{\'danger\': data.sizeMatch == null && data.sizeMatchRelationship.value}" add-item-popup changed-value="data.sizeMatch" list-of-items="DMInfo.sizeMatch" ng-options="sizeMatch.id as sizeMatch.code for sizeMatch in DMInfo.sizeMatch">' +
                        '<option value="" disabled>Select</option>' +
                        '</select>'
                    },
                    {
                        headerName: "Size Type",
                        field: "sizeClassStr",
                        width: 140,
                        cellClass: 'text-center',
                        template: '<select class="form-control01 select-in-grid" ng-model="data.sizeClass" ng-options="sizeClass.id as sizeClass.code for sizeClass in DMInfo.sizeClass">' +
                        '<option value="" disabled>Select</option>' +
                        '</select>'
                    },

                ],
                featureMatch: [
                    {
                        headerName: "Active Status", field: "productStatus", width: 100, cellClass: 'text-center',
                        template: '<span class="{{(data.productStatus)  ? \'glyphicon glyphicon-ok\' : \'glyphicon glyphicon-remove\'}}"></span><span class="badge custom-badge" dropdown-menu="relationShipOptions" dropdown-model="data.productStatus" dropdown-onchange="activeStatusChanged(selected, data, \'productStatus\', true)" dropdown-item-label="text"><span style="font-size: 16px;"  class="fa fa-angle-down "></span></span>'
                    },
                    {
                        headerName: "Relationship", field: "relationship", width: 120, cellClass: 'text-center',
                        template: '<span class="{{data.featureMatchRelationship.value || data.featureMatch  ? \'glyphicon glyphicon-ok\' : \'glyphicon glyphicon-remove\'}}"></span><span class="badge custom-badge" dropdown-menu="relationShipOptions" dropdown-model="data.featureMatchRelationship" dropdown-onchange="relationShipChanged(selected, data, \'featureMatch\', false)" dropdown-item-label="text"><span style="font-size: 16px;"  class="fa fa-angle-down "></span></span>'
                    },
                    {
                        headerName: "Product ID", field: "productCode", width: 100, cellClass: 'text-center',
                        template: '<span title="{{data.product}}" ng-bind-template=\'{{data.product}}\'></span>'
                    },
                    {
                        headerName: "Description",
                        field: "productStr",
                        width: 150,
                        cellClass: ['text-left', 'description'],
                        template: '<span title="{{data.productStr}}" ng-bind-template=\'{{data.productStr}}\'></span>'
                    },
                    {
                        headerName: "Size", field: "size", width: 50, cellClass: 'text-center',
                        template: '<span title="{{data.size}}" ng-bind-template=\'{{data.size}}\'></span>'
                    },
                    {
                        headerName: "UOM", field: "unitOfMeasureStr", width: 70, cellClass: 'text-center',
                        template: '<span title="{{data.unitOfMeasureStr}}" ng-bind-template=\'{{data.unitOfMeasureStr}}\'></span>'
                    },
                    {
                        headerName: "Price",
                        field: "price",
                        width: 80,
                        cellClass: 'text-center',
                        template: '<span title="${{data.price| limitTo : 4}}" ng-bind-template="${{data.price| limitTo : 4}}"></span>'
                    },
                    {
                        headerName: "Feature Match",
                        field: "featureMatchStr",
                        width: 150,
                        cellClass: 'text-center',
                        template: '<select class="form-control01 select-in-grid" ng-model="data.featureMatch" ng-class="{\'danger\': data.featureMatch == null && data.featureMatchRelationship.value}" add-item-popup changed-value="data.featureMatch" list-of-items="DMInfo.featureMatch" ng-options="featureMatch.id as featureMatch.code for featureMatch in DMInfo.featureMatch">' +
                        '<option value="" disabled>Select</option>' +
                        '</select>'
                    },
                    {
                        headerName: "Feature Type",
                        field: "featureClassStr",
                        width: 140,
                        cellClass: 'text-center',
                        template: '<select class="form-control01 select-in-grid" ng-model="data.featureClass" ng-options="featureClass.id as featureClass.code for featureClass in DMInfo.featureClass">' +
                        '<option value="" disabled>Select</option>' +
                        '</select>'
                    },

                ],
                shoppingCriteria: [

                    {
                        headerName: "Description",
                        field: "merchandisingSetStr",
                        width: 250,
                        cellClass: ['text-left', 'description']
                    },
                    {
                        headerName: "Shopping Criteria 1", field: "criteriaOneStr", width: 200, cellClass: 'text-right',
                        template: '<select class="form-control01 select-in-grid text-center" ng-model="data.criteriaOne">' +
                        '<option ng-disabled="criteria.id == data.criteriaTwo || criteria.id == data.criteriaThree || criteria.id == data.criteriaFour" value="{{criteria.id}}" ng-repeat="criteria in shoppingCriteriaList">{{criteria.code}}</option>' +
                        '</select>'
                    },
                    {
                        headerName: "Shopping Criteria 2",
                        field: "criteriaTwoStr",
                        width: 200,
                        cellClass: 'text-center',
                        template: '<select class="form-control01 select-in-grid" ng-model="data.criteriaTwo">' +
                        '<option ng-selected="data.criteriaTwo == criteria.id" ng-disabled="criteria.id == data.criteriaOne || criteria.id == data.criteriaThree || criteria.id == data.criteriaFour" value="{{criteria.id}}" ng-repeat="criteria in shoppingCriteriaList">{{criteria.code}}</option>' +
                        '</select>'

                    },
                    {
                        headerName: "Shopping Criteria 3",
                        field: "criteriaThreeStr",
                        width: 200,
                        cellClass: 'text-center',
                        template: '<select class="form-control01 select-in-grid" ng-model="data.criteriaThree">' +
                        '<option ng-selected="data.criteriaThree == criteria.id" ng-disabled="criteria.id == data.criteriaOne || criteria.id == data.criteriaTwo || criteria.id == data.criteriaFour" value="{{criteria.id}}" ng-repeat="criteria in shoppingCriteriaList">{{criteria.code}}</option>' +
                        '</select>'
                    },
                    {
                        headerName: "Shopping Criteria 4",
                        field: "criteriaFourStr",
                        width: 200,
                        cellClass: 'text-center',
                        template: '<select class="form-control01 select-in-grid" ng-model="data.criteriaFour">' +
                        '<option ng-selected="data.criteriaFour == criteria.id" ng-disabled="criteria.id == data.criteriaOne || criteria.id == data.criteriaTwo || criteria.id == data.criteriaThree" value="{{criteria.id}}" ng-repeat="criteria in shoppingCriteriaList">{{criteria.code}}</option>' +
                        '</select>'
                    }
                ],
                brandHierarchy: [

                    {
                        headerName: "Merchandising Set",
                        field: "merchandisingSetStr",
                        width: 250,
                        cellClass: ['text-left', 'description'],
                    },
                    {
                        headerName: "Brand 1", field: "criteriaOneStr", width: 200, cellClass: 'text-center',
                        template: '<select class="form-control01 select-in-grid" ng-model="data.brandOne">' +
                        '<option ng-selected="data.brandOne == criteria.id" ng-disabled="criteria.id == data.brandTwo || criteria.id == data.brandThree || criteria.id == data.brandFour" value="{{criteria.id}}" ng-repeat="criteria in brandHierarchyList">{{criteria.code}}</option>' +
                        '</select>'
                    },
                    {
                        headerName: "Brand 2", field: "criteriaTwoStr", width: 200, cellClass: 'text-center',
                        template: '<select class="form-control01 select-in-grid" ng-model="data.brandTwo">' +
                        '<option value="">Select</option>' +
                        '<option ng-selected="data.brandTwo == criteria.id" ng-disabled="criteria.id == data.brandOne || criteria.id == data.brandThree || criteria.id == data.brandFour" value="{{criteria.id}}" ng-repeat="criteria in brandHierarchyList">{{criteria.code}}</option>' +
                        '</select>'

                    },
                    {
                        headerName: "Brand 3", field: "criteriaThreeStr", width: 200, cellClass: 'text-center',
                        template: '<select class="form-control01 select-in-grid" ng-model="data.brandThree">' +
                        '<option ng-selected="data.brandThree == criteria.id" ng-disabled="criteria.id == data.brandTwo || criteria.id == data.brandOne || criteria.id == data.brandFour" value="{{criteria.id}}" ng-repeat="criteria in brandHierarchyList">{{criteria.code}}</option>' +
                        '</select>'
                    },
                    {
                        headerName: "Brand 4", field: "criteriaFourStr", width: 200, cellClass: 'text-center',
                        template: '<select class="form-control01 select-in-grid" ng-model="data.brandFour">' +
                        '<option ng-selected="data.brandFour == criteria.id" ng-disabled="criteria.id == data.brandTwo || criteria.id == data.brandThree || criteria.id == data.brandOne" value="{{criteria.id}}" ng-repeat="criteria in brandHierarchyList">{{criteria.code}}</option>' +
                        '</select>'
                    }
                ]
            }
        }

        $scope.relationShipChanged = function (selected, data, obj) {
            if (selected && selected.value) {
                data[obj] ? false : Notification.warning('Please select Relationship');
            } else {
                data[obj] = null;
            }
        }

        $scope.activeStatusChanged = function (selected, data, obj) {
            if (selected && selected.value) {
                data[obj] = 1;
            } else {
                data[obj] = 0;
            }
        }

        $scope.shoppingCriteriaChanged = function ($e, elem1, elem2, elem3, elem4, data) {
            if (elem1.value == elem2.value) {
                Notification.error('This brand is already selected');
                $e.preventDefault();
            }
            data[elem2.name] = (elem1.value == elem2.value) ? ' ' : elem2.value;
            data[elem3.name] = (elem1.value == elem3.value) ? ' ' : elem3.value;
            data[elem4.name] = (elem1.value == elem4.value) ? ' ' : elem4.value;
        }

        $scope.showRelationshipGrid = true;

        $scope.PRGridOptions = {
            virtualPaging: false, // this is important, if not set, normal paging will be done
            angularCompileRows: true,
            angularCompileHeaders: true,
            enableColResize: false,
            headerCellRenderer: headerCellRendererFunc,
            enableSorting: true

        };

        $scope.PRCriteriaGridOptions = {
            pagination: false,
            angularCompileRows: true,
            angularCompileHeaders: true,
            enableColResize: false,
            headerCellRenderer: headerCellRendererFunc
        };

        $scope.activateRelationshipType = function (relationshipType) {
            $scope.activeAttrType = relationshipType;
            $scope.showRelationshipGrid = true;
            $scope.PRGridOptions.api.setColumnDefs(columnDefs.PR[relationshipType]);
            gridWidthResize(100);
        }

        $scope.activateShoppingCriteria = function () {
            $scope.activeAttrType = 'shoppingCriteria';
            $scope.showRelationshipGrid = false;
            gridWidthResize(100, function () {
                $scope.PRCriteriaGridOptions.api.setColumnDefs(columnDefs.PR['shoppingCriteria']);
                angular.forEach($scope.DMInfo.shoppingCriteria, function (obj) {
                    obj.criteriaOne = obj.criteriaOne.toString();
                    obj.criteriaTwo = obj.criteriaTwo.toString();
                    obj.criteriaThree = obj.criteriaThree.toString();
                    obj.criteriaFour = obj.criteriaFour.toString();
                });
                buildPRCriteriaGrid($scope.DMInfo.shoppingCriteria);
                console.log($scope.DMInfo.shoppingCriteria);
            });
        }

        $scope.activateBrandHierarchy = function () {
            $scope.activeAttrType = 'brandHierarchy';
            $scope.showRelationshipGrid = false;
            gridWidthResize(100, function () {
                $scope.PRCriteriaGridOptions.api.setColumnDefs(columnDefs.PR['brandHierarchy']);
                angular.forEach($scope.DMInfo.brandHierarchy, function (obj) {
                    obj.brandOne = obj.brandOne.toString();
                    obj.brandTwo = obj.brandTwo.toString();
                    obj.brandThree = obj.brandThree.toString();
                    obj.brandFour = obj.brandFour.toString();
                });
                buildPRCriteriaGrid($scope.DMInfo.brandHierarchy);
            });
        }

        var buildPRGrid = function (data) {
            var tickIcon = $sce.trustAsHtml('<span class="glyphicon glyphicon-ok"></span>');
            var crossIcon = $sce.trustAsHtml('<span class="glyphicon glyphicon-remove"></span>');
            var relationshipTypes = ['lineClass', 'brandMatch', 'sizeMatch', 'featureMatch'];
            angular.forEach(data, function (obj) {
                angular.forEach(relationshipTypes, function (relationShipType) {
                    if (obj[relationShipType]) {
                        obj[relationShipType + 'Relationship'] = {
                            text: tickIcon,
                            value: true
                        }
                    } else {
                        obj[relationShipType + 'Relationship'] = {
                            text: crossIcon,
                            value: false
                        }
                    }
                })
            });

            $scope.PRGridOptions.api.setRowData(data);
            $timeout(function () {
                $scope.PRGridOptions.api.sizeColumnsToFit();
            }, 1000);

        }

        var buildPRCriteriaGrid = function (data) {
            $scope.PRCriteriaGridOptions.api.setRowData(data);
            $timeout(function () {
                $scope.PRCriteriaGridOptions.api.sizeColumnsToFit();
            }, 10);

        }

        $scope.shoppingCriteriaList = [];
        $scope.brandHierarchyList = [];

        var getShoppingCriteriaList = function () {
            commonService.getGeneralLookupList(18).then(function (data) {
                angular.forEach(data, function (obj) {
                    obj.id = obj.id.toString();
                });
                $scope.shoppingCriteriaList = data;
                console.log($scope.shoppingCriteriaList);
            }, function () {
                Notification.error('Error while getting Shopping Criteria')
            })
        }

        getShoppingCriteriaList();

        var getbrandHierarchyList = function () {
            commonService.getGeneralLookupList(7).then(function (data) {
                angular.forEach(data, function (obj) {
                    obj.id = obj.id.toString();
                });
                $scope.brandHierarchyList = data;
            }, function () {
                Notification.error('Error while getting Shopping Criteria')
            })
        }

        getbrandHierarchyList();

        getDMInfo();

        var allOption = {
            "id": 0,
            "category": null,
            "categoryStr": null,
            "code": "ALL",
            "description": "ALL"
        }

        var addAllOptionAndMakeDefault = function (array, defaultObj) {
            array.push(allOption);
            $scope[defaultObj] = array[0];
        }

        $scope.departmentList = [];
        $scope.selectedDepartment = {};

        $scope.categoryList = [];
        $scope.selectedCategory = {};

        $scope.subCategoryList = [];
        $scope.selectedSubCategory = {};
        addAllOptionAndMakeDefault($scope.subCategoryList, 'selectedSubCategory');
        $scope.planogramList = [];
        $scope.selectedPlanogram = {};
        addAllOptionAndMakeDefault($scope.planogramList, 'selectedPlanogram');

        var getDepartmentList = function () {
            commonService.getGeneralLookupList(1).then(function (data) {
                $scope.departmentList = data;
                $scope.selectedDepartment = data[0];
                $scope.workFlowSelectedDepartment = data[0];
                getCategoryListByDepartment(1, $scope.selectedDepartment.id)
            }, function () {
                Notification.error('Error while getting Department list')
            })
        }

        getDepartmentList();

        $scope.selectDepartment = function (department) {
            $scope.selectedDepartment = department;
            getCategoryListByDepartment(1, department.id);
            getProductRelationship(1, department.id, 0, 0, 0);
            $scope.subCategoryList = [];
            $scope.selectedSubCategory = {};
            addAllOptionAndMakeDefault($scope.subCategoryList, 'selectedSubCategory');
            $scope.planogramList = [];
            $scope.selectedPlanogram = {};
            addAllOptionAndMakeDefault($scope.planogramList, 'selectedPlanogram');
        }

        var getCategoryListByDepartment = function (typeId, categoryId) {
            commonService.getGeneralLookupListByCategory(typeId, categoryId).then(function (data) {
                $scope.categoryList = data;
                addAllOptionAndMakeDefault($scope.categoryList, 'selectedCategory');
                $scope.selectedCategory = allOption;
            }, function () {
                Notification.error('Error while getting Category list')
            })
        }

        $scope.selectCategory = function (category) {
            $scope.selectedCategory = category;
            if (category.id) {
                getProductRelationship(2, $scope.selectedDepartment.id, category.id, 0, 0);
                getSubCategoryListByCategory(2, category.id);

            } else if (category.id == 0) {
                getProductRelationship(1, $scope.selectedDepartment.id, 0, 0, 0);
                $scope.subCategoryList = [];
                $scope.selectedSubCategory = {};
                addAllOptionAndMakeDefault($scope.subCategoryList, 'selectedSubCategory');
            } else {
                Notification.error('Invalid Category')
            }

            $scope.planogramList = [];
            $scope.selectedPlanogram = {};
            addAllOptionAndMakeDefault($scope.planogramList, 'selectedPlanogram');

        }

        var getSubCategoryListByCategory = function (typeId, categoryId) {
            commonService.getGeneralLookupListByCategory(typeId, categoryId).then(function (data) {
                $scope.subCategoryList = data;
                addAllOptionAndMakeDefault($scope.subCategoryList, 'selectedSubCategory');
                $scope.selectedSubCategory = allOption;
            }, function () {
                Notification.error('Error while getting SubCategory list')
            })
        }

        $scope.selectSubCategory = function (subCategory) {
            $scope.selectedSubCategory = subCategory;
            if (!subCategory.id && !$scope.selectedCategory.id) {
                return false;
            }
            else if (subCategory.id) {
                getProductRelationship(3, $scope.selectedDepartment.id, $scope.selectedCategory.id, subCategory.id, 0);
                getPlanogramListBysubCategory(3, subCategory.id);

            } else if (subCategory.id == 0) {
                getProductRelationship(2, $scope.selectedDepartment.id, $scope.selectedCategory.id, 0, 0);
                $scope.planogramList = [];
                $scope.selectedPlanogram = {};
                addAllOptionAndMakeDefault($scope.planogramList, 'selectedPlanogram');
            } else {
                Notification.error('Invalid Category')
            }

        }

        var getPlanogramListBysubCategory = function (typeId, categoryId) {
            commonService.getGeneralLookupListByCategory(typeId, categoryId).then(function (data) {
                $scope.planogramList = data;
                addAllOptionAndMakeDefault($scope.planogramList, 'selectedPlanogram');
                $scope.selectedPlanogram = allOption;
            }, function () {
                Notification.error('Error while getting Planogram list')
            })
        }

        $scope.selectPlanogram = function (planogram) {
            $scope.selectedPlanogram = planogram;
            if (!planogram.id && !$scope.selectedSubCategory.id) {
                return false;
            }
            else if (planogram.id) {
                getProductRelationship(4, $scope.selectedDepartment.id, $scope.selectedCategory.id, $scope.selectedSubCategory.id, planogram.id);

            } else if (planogram.id == 0) {
                getProductRelationship(3, $scope.selectedDepartment.id, $scope.selectedCategory.id, $scope.selectedSubCategory.id, 0);
            } else {
                Notification.error('Invalid Category')
            }
        }

        var getProductRelationship = function (typeId, depId, catId, subCatId, planogramId) {
            commonService.getProductRelationship(typeId, depId, catId, subCatId, planogramId).then(function (data) {
                $scope.DMInfo.simpleDmData.productRelationShip = data;
                buildPRGrid(data);
            }, function (err) {
                Notification.error('Error while getting list')
            })
        }


        var borrowingLogicColumnDefs = [
            {
                headerName: "Planogram",
                field: "name",
                width: 200,
                color: '#fff',
                cellRenderer: {renderer: 'group', innerRenderer: innerCellRenderer}
            },
            {
                headerName: "SKU",
                field: "sku",
                width: 133,
                cellClass: 'text-center',
                cellRenderer: {renderer: 'group', innerRenderer: innerCellRenderer},
                template: '<input type="checkbox" class="radio-check-box" ng-model="data.sku" ng-value="{{data.sku}}" ng-change="$parent.changeCheckBoxModel(\'sku\', data, [\'merchandisingSet\', \'planogram\', \'subCategory\', \'category\'])" name="select{{data.guid}}"/><span></span>'
            },
            //{
            //    headerName: "Merchandising set", field: "merchandisingSet", width: 133, cellClass: 'text-center',
            //    template: '<input type="checkbox" class="radio-check-box" ng-model="data.merchandisingSet" ng-value="{{data.merchandisingSet}}" ng-change="$parent.changeCheckBoxModel(\'merchandisingSet\', data, [\'sku\', \'planogram\', \'subCategory\', \'category\'])" name="select{{data.guid}}"/>'
            //},
            {
                headerName: "Planogram", field: "planogram", width: 133, cellClass: 'text-center',
                template: '<input type="checkbox" class="radio-check-box" ng-model="data.planogram" ng-value="{{data.planogram}}" ng-change="$parent.changeCheckBoxModel(\'planogram\', data, [\'merchandisingSet\', \'sku\', \'subCategory\', \'category\'])" name="select{{data.guid}}"/><span></span>'
            },
            {
                headerName: "Sub Category", field: "subCategory", width: 133, cellClass: 'text-center',
                template: '<input type="checkbox" class="radio-check-box" ng-model="data.subCategory" ng-value="{{data.subCategory}}" ng-change="$parent.changeCheckBoxModel(\'subCategory\', data, [\'merchandisingSet\', \'planogram\', \'sku\', \'category\'])" name="select{{data.guid}}"/><span></span>'
            },
            {
                headerName: "Category", width: 133, cellClass: 'text-center',
                template: '<input type="checkbox" class="radio-check-box" ng-model="data.category" ng-value="{{data.category}}" ng-change="$parent.changeCheckBoxModel(\'category\', data, [\'merchandisingSet\', \'planogram\', \'subCategory\', \'sku\'])" name="select{{data.guid}}"/><span></span>'
            },
            {
                headerName: "MAPE", field: "mape", width: 100, cellClass: 'text-center',
                template: '<span ng-bind-template="{{data.mape}}%"></span>'
            },
            {
                headerName: "Elasticity", field: "elasticity", width: 80, cellClass: 'text-center',
                template: '<span ng-bind-template="{{data.elasticity}}"></span>'
            }
        ];

        var borrowingLogicGridData = [];

        $scope.changeCheckBoxModel = function (model, data, list) {
            console.log(model, data);
            data[model] = true;
            angular.forEach(list, function (property) {
                data[property] = false;
            })
        }

        var buildBorrowingLogicGrid = function (data) {
            angular.forEach(data, function (obj) {
                var objToBuild = {};
                objToBuild.data = {
                    name: obj.planogramStr,
                    planogram: obj.planogram,
                    id: obj.id
                };
                if (obj.borrowingLogics && obj.borrowingLogics.length) {
                    objToBuild.group = true;
                    objToBuild.children = [];
                    angular.forEach(obj.borrowingLogics, function (itemObj) {
                        var item = {};
                        item.group = false;
                        item.data = {
                            name: itemObj.product,
                            id: itemObj.id,
                            sku: itemObj.preference == 0,
                            planogram: itemObj.preference == 3,
                            subCategory: itemObj.preference == 2,
                            category: itemObj.preference == 1,
                            //merchandisingSet: itemObj.preference == 4,
                            mape: itemObj.mape,
                            elasticity: itemObj.elasticity,
                            product: itemObj.product,
                            productRelationship: itemObj.productRelationship,
                            guid: GUIDFactory.newGUID(),
                        };
                        objToBuild.children.push(item);
                    });
                    borrowingLogicGridData.push(objToBuild);
                }
            });
            $scope.borrowingLogicOptions.api.setRowData(borrowingLogicGridData);
        };

        $scope.borrowingLogicGridHeight = 137;

        $scope.setGridHeight = function () {
            $timeout(function () {
                var rowData = $scope.borrowingLogicOptions.rowData;
                var height = 51.5;
                var heightPerColumn = 35;
                _.forEach(rowData, function (value) {
                    height += heightPerColumn;
                    if (value.expanded && value.children) {
                        height += value.children.length * heightPerColumn;
                    }
                });
                $scope.borrowingLogicGridHeight = height;
            }, 20);
        }

        $scope.borrowingLogicOptions = {
            columnDefs: borrowingLogicColumnDefs,
            groupUseEntireRow: true,
            rowsAlreadyGrouped: true,
            enableColResize: true,
            rowHeight: 20,
            suppressSizeToFit: false,
            groupSuppressAutoColumn: true,
            icons: {
                groupExpanded: '<span class="fa grid-collapse-sympol fa-minus-circle" ng-click="setGridHeight()"></span>&nbsp;',
                groupContracted: '<span class="fa grid-collapse-sympol fa-plus-circle" ng-click="setGridHeight()"></span>&nbsp;'
            },
            angularCompileRows: true,
            angularCompileHeaders: true,
            groupRowInnerRenderer: function (params) {
                $scope.setGridHeight();
                return params.data.name;
            }
        };

        $scope.workflowGridOptions = {
            columnDefs: workflowColumnDefs,
            enableColResize: false,
            angularCompileRows: true,
            angularCompileHeaders: true,
            headerCellRenderer: headerCellRendererFunc,
        };

        var buildWorkFlowGrid = function (data) {
            $scope.workflowGridOptions.api.setRowData(data);
            gridWidthResize(500);
        }

        $scope.workFlowCategoryList = [];

        var getWorkFlowCategoryList = function () {
            commonService.getGeneralLookupList(2).then(function (data) {
                $scope.workFlowCategoryList = data;
                $scope.workFlowSelectedCategory = data[0];
            }, function () {
                Notification.error('Error while getting Category list')
            })
        }
        getWorkFlowCategoryList();

        $scope.workFlowSubCategoryList = [];
        var getWorkFlowSubCategoryList = function () {
            commonService.getGeneralLookupList(3).then(function (data) {
                $scope.workFlowSubCategoryList = data;
                $scope.workFlowSelectedSubCategory = data[0];
            }, function () {
                Notification.error('Error while getting Category list')
            })
        }
        getWorkFlowSubCategoryList();

        $scope.workFlowPlanogramList = [];
        var getWorkFlowPlanogramList = function () {
            commonService.getGeneralLookupList(6).then(function (data) {
                $scope.workFlowPlanogramList = data;
                $scope.workFlowSelectedPlanogram = data[0];
            }, function () {
                Notification.error('Error while getting Category list')
            })
        }
        getWorkFlowPlanogramList();

        $scope.selectWorkFlowDepartment = function (department) {
            $scope.workFlowSelectedDepartment = department;
            DataManagementService.getWorkflowStatus(1, department.id).then(function (data) {
                workFlowGridData = data.simpleWorkFlow;
                buildWorkFlowGrid(workFlowGridData);
            }, function () {
                Notification.error('Error while getting Category list')
            })
        }

        $scope.selectWorkFlowCategory = function (category) {
            $scope.workFlowSelectedCategory = category;
            DataManagementService.getWorkflowStatus(2, category.id).then(function (data) {
                workFlowGridData = data.simpleWorkFlow;
                buildWorkFlowGrid(workFlowGridData);
            }, function () {
                Notification.error('Error while getting Category list')
            })
        }

        $scope.selectWorkFlowSubCategory = function (subCategory) {
            $scope.workFlowSelectedSubCategory = subCategory;
            DataManagementService.getWorkflowStatus(3, subCategory.id).then(function (data) {
                workFlowGridData = data.simpleWorkFlow;
                buildWorkFlowGrid(workFlowGridData);
            }, function () {
                Notification.error('Error while getting Category list')
            })
        }

        $scope.selectWorkFlowPlanogram = function (planogram) {
            $scope.workFlowSelectedPlanogram = planogram;
            DataManagementService.getWorkflowStatus(6, planogram.id).then(function (data) {
                workFlowGridData = data.simpleWorkFlow;
                buildWorkFlowGrid(workFlowGridData);
            }, function () {
                Notification.error('Error while getting Category list')
            })
        }

        var getPreference = function (obj) {
            var preference = null;
            obj.sku ? preference = 0 : false;
            obj.category ? preference = 1 : false;
            obj.subCategory ? preference = 2 : false;
            obj.planogram ? preference = 3 : false;
            return preference;
        }


        $scope.saveDMInfo = function () {
            var dataToPost = {id: null};
            dataToPost.productRelationShip = $scope.DMInfo.simpleDmData.productRelationShip;
            dataToPost.borrowigLogic = [];
            dataToPost.shoppingCriteria = $scope.DMInfo.shoppingCriteria;
            dataToPost.brandHierarchy = $scope.DMInfo.brandHierarchy;
            dataToPost.borrowigLogic = [];
            angular.forEach(borrowingLogicGridData, function (obj) {
                var objToBuild = {};
                objToBuild.name = obj.data.name;
                objToBuild.planogram = obj.data.planogram;
                objToBuild.id = obj.data.id;
                objToBuild.borrowingLogics = [];
                angular.forEach(obj.children, function (child) {
                    var childObjToBuild = {};
                    childObjToBuild.elasticity = child.data.elasticity;
                    childObjToBuild.id = child.data.id;
                    childObjToBuild.mape = child.data.mape;
                    childObjToBuild.product = child.data.product;
                    childObjToBuild.productRelationship = child.data.productRelationship;
                    childObjToBuild.preference = getPreference(child.data);
                    objToBuild.borrowingLogics.push(childObjToBuild);
                });
                dataToPost.borrowigLogic.push(objToBuild);
            });
            DataManagementService.saveDMInfo(dataToPost).then(function (result) {
                Notification.success('Saved successfully');
            }, function () {
                Notification.error('Error while saving DM info');
            })
        }

        $scope.sendEmail = function(){
            Notification.success('Email sent successfully')
        }

        $scope.$on('$OnLevelSelect', function ($event, args) {
            getProductRelationship(4, args.itemSelected['1'], args.itemSelected['2'], args.itemSelected['3'], args.itemSelected['4']);
            $scope.selectedDepartment = {id: args.itemSelected['1'], description: args.itemSelected['1name']};
            $scope.selectedCategory = {id: args.itemSelected['2'], description: args.itemSelected['2name']};
            $scope.selectedSubCategory = {id: args.itemSelected['3'], description: args.itemSelected['3name']};
            $scope.selectedPlanogram = {id: args.itemSelected['4'], description: args.itemSelected['4name']};
        });
    }]);