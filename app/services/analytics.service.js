System.register(['angular2/core', './logger.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, logger_service_1;
    var AnalyticsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            }],
        execute: function() {
            AnalyticsService = (function () {
                function AnalyticsService(logger) {
                    this.logger = logger;
                    this.enabled = this.gaObjectExists();
                    this.debug = false;
                    this.bindings = [];
                }
                AnalyticsService.prototype.ngAfterViewInit = function () {
                    if (!this.enabled)
                        this.enabled = this.gaObjectExists();
                };
                AnalyticsService.prototype.sendEvent = function (props) {
                    this.enabled = this.gaObjectExists();
                    props = this.fillBindings(props);
                    if (this.propsAreEmpty(props)) {
                        this.logger.error("Analytics: ignored a " + props.eventType + " event because all of it's properties are empty!");
                        return;
                    }
                    if (this.debug) {
                        this.logger.log("Analytics: got a " + props.eventType + " event, c:" + props.category + ", a:" + props.action + ", l:" + props.label);
                    }
                    else {
                        if (this.enabled) {
                            ga('send', 'event', props.category ? props.category : '', props.action ? props.action : '', props.label ? props.label : '');
                        }
                        else {
                            this.logger.error("Analytics: ignored a " + props.eventType + " event with the name " + props.action + " because ga hasn't loaded yet!");
                        }
                    }
                };
                AnalyticsService.prototype.bind = function (keyword, fn) {
                    if (typeof fn !== 'function')
                        return;
                    this.bindings.push({ 'keyword': keyword, 'function': fn });
                };
                AnalyticsService.prototype.debugMode = function (val) {
                    if (val)
                        this.logger.log("Analytics: now in debug mode");
                    this.debug = val;
                };
                AnalyticsService.prototype.propsAreEmpty = function (props) {
                    if (Object.keys(props).length == 1)
                        return true;
                    for (var i in props) {
                        if (i == 'eventType')
                            continue;
                        if (typeof props[i] === 'string' && props[i].length)
                            return false;
                    }
                    return true;
                };
                AnalyticsService.prototype.gaObjectExists = function () {
                    return 'ga' in window && typeof window.ga !== 'undefined' && window.ga;
                };
                AnalyticsService.prototype.fillBindings = function (arr) {
                    for (var i in arr) {
                        arr[i] = this.fillBinding(arr[i]);
                    }
                    return arr;
                };
                AnalyticsService.prototype.fillBinding = function (str) {
                    if (!str || typeof str === 'undefined' || !str.length)
                        return false;
                    for (var i in this.bindings) {
                        if (str.indexOf("@" + this.bindings[i].keyword) > -1) {
                            //matched keyword
                            var replace = this.bindings[i]['function'].call(this, str);
                            str = str.replace("@" + this.bindings[i].keyword, replace);
                            if (!replace)
                                this.logger.log("Analytics: " + this.bindings[i].keyword + " bind callback returned an empty string");
                        }
                    }
                    if (str.indexOf('@') > -1) {
                        this.logger.error("Analytics: unrecognized binding in " + str + ", ignoring");
                        return false;
                    }
                    return str;
                };
                AnalyticsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [logger_service_1.LoggerService])
                ], AnalyticsService);
                return AnalyticsService;
            }());
            exports_1("AnalyticsService", AnalyticsService);
        }
    }
});
//# sourceMappingURL=analytics.service.js.map