import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Inject, Input, NgZone, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, } from '@angular/core';
import Swiper from 'swiper/core';
import { of, Subject } from 'rxjs';
import { getParams } from './utils/get-params';
import { SwiperSlideDirective } from './swiper-slide.directive';
import { extend, isObject, setProperty, ignoreNgOnChanges } from './utils/utils';
import { isPlatformBrowser } from '@angular/common';
export class SwiperComponent {
    constructor(_ngZone, elementRef, _changeDetectorRef, _platformId) {
        this._ngZone = _ngZone;
        this.elementRef = elementRef;
        this._changeDetectorRef = _changeDetectorRef;
        this._platformId = _platformId;
        this.slideClass = 'swiper-slide';
        this.wrapperClass = 'swiper-wrapper';
        this.showNavigation = true;
        this.showPagination = true;
        this.showScrollbar = true;
        // prettier-ignore
        this.s__beforeBreakpoint = new EventEmitter();
        // prettier-ignore
        this.s__containerClasses = new EventEmitter();
        // prettier-ignore
        this.s__slideClass = new EventEmitter();
        // prettier-ignore
        this.s__swiper = new EventEmitter();
        // prettier-ignore
        this.s_activeIndexChange = new EventEmitter();
        // prettier-ignore
        this.s_afterInit = new EventEmitter();
        // prettier-ignore
        this.s_autoplay = new EventEmitter();
        // prettier-ignore
        this.s_autoplayStart = new EventEmitter();
        // prettier-ignore
        this.s_autoplayStop = new EventEmitter();
        // prettier-ignore
        this.s_beforeDestroy = new EventEmitter();
        // prettier-ignore
        this.s_beforeInit = new EventEmitter();
        // prettier-ignore
        this.s_beforeLoopFix = new EventEmitter();
        // prettier-ignore
        this.s_beforeResize = new EventEmitter();
        // prettier-ignore
        this.s_beforeSlideChangeStart = new EventEmitter();
        // prettier-ignore
        this.s_beforeTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_breakpoint = new EventEmitter();
        // prettier-ignore
        this.s_changeDirection = new EventEmitter();
        // prettier-ignore
        this.s_click = new EventEmitter();
        // prettier-ignore
        this.s_doubleTap = new EventEmitter();
        // prettier-ignore
        this.s_doubleClick = new EventEmitter();
        // prettier-ignore
        this.s_destroy = new EventEmitter();
        // prettier-ignore
        this.s_fromEdge = new EventEmitter();
        // prettier-ignore
        this.s_hashChange = new EventEmitter();
        // prettier-ignore
        this.s_hashSet = new EventEmitter();
        // prettier-ignore
        this.s_imagesReady = new EventEmitter();
        // prettier-ignore
        this.s_init = new EventEmitter();
        // prettier-ignore
        this.s_keyPress = new EventEmitter();
        // prettier-ignore
        this.s_lazyImageLoad = new EventEmitter();
        // prettier-ignore
        this.s_lazyImageReady = new EventEmitter();
        // prettier-ignore
        this.s_loopFix = new EventEmitter();
        // prettier-ignore
        this.s_momentumBounce = new EventEmitter();
        // prettier-ignore
        this.s_navigationHide = new EventEmitter();
        // prettier-ignore
        this.s_navigationShow = new EventEmitter();
        // prettier-ignore
        this.s_observerUpdate = new EventEmitter();
        // prettier-ignore
        this.s_orientationchange = new EventEmitter();
        // prettier-ignore
        this.s_paginationHide = new EventEmitter();
        // prettier-ignore
        this.s_paginationRender = new EventEmitter();
        // prettier-ignore
        this.s_paginationShow = new EventEmitter();
        // prettier-ignore
        this.s_paginationUpdate = new EventEmitter();
        // prettier-ignore
        this.s_progress = new EventEmitter();
        // prettier-ignore
        this.s_reachBeginning = new EventEmitter();
        // prettier-ignore
        this.s_reachEnd = new EventEmitter();
        // prettier-ignore
        this.s_realIndexChange = new EventEmitter();
        // prettier-ignore
        this.s_resize = new EventEmitter();
        // prettier-ignore
        this.s_scroll = new EventEmitter();
        // prettier-ignore
        this.s_scrollbarDragEnd = new EventEmitter();
        // prettier-ignore
        this.s_scrollbarDragMove = new EventEmitter();
        // prettier-ignore
        this.s_scrollbarDragStart = new EventEmitter();
        // prettier-ignore
        this.s_setTransition = new EventEmitter();
        // prettier-ignore
        this.s_setTranslate = new EventEmitter();
        // prettier-ignore
        this.s_slideChange = new EventEmitter();
        // prettier-ignore
        this.s_slideChangeTransitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_slideChangeTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_slideNextTransitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_slideNextTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_slidePrevTransitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_slidePrevTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_slideResetTransitionStart = new EventEmitter();
        // prettier-ignore
        this.s_slideResetTransitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_sliderMove = new EventEmitter();
        // prettier-ignore
        this.s_sliderFirstMove = new EventEmitter();
        // prettier-ignore
        this.s_slidesLengthChange = new EventEmitter();
        // prettier-ignore
        this.s_slidesGridLengthChange = new EventEmitter();
        // prettier-ignore
        this.s_snapGridLengthChange = new EventEmitter();
        // prettier-ignore
        this.s_snapIndexChange = new EventEmitter();
        // prettier-ignore
        this.s_tap = new EventEmitter();
        // prettier-ignore
        this.s_toEdge = new EventEmitter();
        // prettier-ignore
        this.s_touchEnd = new EventEmitter();
        // prettier-ignore
        this.s_touchMove = new EventEmitter();
        // prettier-ignore
        this.s_touchMoveOpposite = new EventEmitter();
        // prettier-ignore
        this.s_touchStart = new EventEmitter();
        // prettier-ignore
        this.s_transitionEnd = new EventEmitter();
        // prettier-ignore
        this.s_transitionStart = new EventEmitter();
        // prettier-ignore
        this.s_update = new EventEmitter();
        // prettier-ignore
        this.s_zoomChange = new EventEmitter();
        // prettier-ignore
        this.s_swiper = new EventEmitter();
        this.indexChange = new EventEmitter();
        this._activeSlides = new Subject();
        this.containerClasses = 'swiper-container';
        this.slidesChanges = (val) => {
            this.slides = val.map((slide, index) => {
                slide.slideIndex = index;
                slide.classNames = this.slideClass;
                return slide;
            });
            if (this.loop && !this.loopedSlides) {
                this.calcLoopedSlides();
            }
            if (!this.virtual) {
                this.prependSlides = of(this.slides.slice(this.slides.length - this.loopedSlides));
                this.appendSlides = of(this.slides.slice(0, this.loopedSlides));
            }
            else if (this.swiperRef && this.swiperRef.virtual) {
                this._ngZone.runOutsideAngular(() => {
                    this.swiperRef.virtual.slides = this.slides;
                    this.swiperRef.virtual.update(true);
                });
            }
            this._changeDetectorRef.detectChanges();
        };
        this.style = null;
        this.updateVirtualSlides = (virtualData) => {
            // TODO: type virtualData
            if (!this.swiperRef ||
                (this.currentVirtualData &&
                    this.currentVirtualData.from === virtualData.from &&
                    this.currentVirtualData.to === virtualData.to &&
                    this.currentVirtualData.offset === virtualData.offset)) {
                return;
            }
            this.style = this.swiperRef.isHorizontal()
                ? {
                    [this.swiperRef.rtlTranslate ? 'right' : 'left']: `${virtualData.offset}px`,
                }
                : {
                    top: `${virtualData.offset}px`,
                };
            this.currentVirtualData = virtualData;
            this._activeSlides.next(virtualData.slides);
            this._changeDetectorRef.detectChanges();
            this._ngZone.runOutsideAngular(() => {
                this.swiperRef.updateSlides();
                this.swiperRef.updateProgress();
                this.swiperRef.updateSlidesClasses();
                if (this.swiperRef.lazy && this.swiperRef.params.lazy['enabled']) {
                    this.swiperRef.lazy.load();
                }
                this.swiperRef.virtual.update(true);
            });
            return;
        };
    }
    set navigation(val) {
        var _a, _b, _c, _d, _e, _f;
        const currentNext = typeof this._navigation !== 'boolean' ? (_a = this._navigation) === null || _a === void 0 ? void 0 : _a.nextEl : null;
        const currentPrev = typeof this._navigation !== 'boolean' ? (_b = this._navigation) === null || _b === void 0 ? void 0 : _b.prevEl : null;
        this._navigation = setProperty(val, {
            nextEl: currentNext || null,
            prevEl: currentPrev || null,
        });
        if (typeof this._navigation !== 'boolean' &&
            (typeof ((_c = this._navigation) === null || _c === void 0 ? void 0 : _c.nextEl) === 'string' ||
                typeof ((_d = this._navigation) === null || _d === void 0 ? void 0 : _d.prevEl) === 'string' ||
                typeof ((_e = this._navigation) === null || _e === void 0 ? void 0 : _e.nextEl) === 'object' ||
                typeof ((_f = this._navigation) === null || _f === void 0 ? void 0 : _f.prevEl) === 'object')) {
            this.showNavigation = false;
        }
    }
    get navigation() {
        return this._navigation;
    }
    set pagination(val) {
        var _a, _b, _c;
        const current = typeof this._pagination !== 'boolean' ? (_a = this._pagination) === null || _a === void 0 ? void 0 : _a.el : null;
        this._pagination = setProperty(val, {
            el: current || null,
        });
        if (typeof this._pagination !== 'boolean' &&
            (typeof ((_b = this._pagination) === null || _b === void 0 ? void 0 : _b.el) === 'string' || typeof ((_c = this._pagination) === null || _c === void 0 ? void 0 : _c.el) === 'object')) {
            this.showPagination = false;
        }
    }
    get pagination() {
        return this._pagination;
    }
    set scrollbar(val) {
        var _a, _b, _c;
        const current = typeof this._scrollbar !== 'boolean' ? (_a = this._scrollbar) === null || _a === void 0 ? void 0 : _a.el : null;
        this._scrollbar = setProperty(val, {
            el: current || null,
        });
        if (typeof this._scrollbar !== 'boolean' &&
            (typeof ((_b = this._scrollbar) === null || _b === void 0 ? void 0 : _b.el) === 'string' || typeof ((_c = this._scrollbar) === null || _c === void 0 ? void 0 : _c.el) === 'object')) {
            this.showScrollbar = false;
        }
    }
    get scrollbar() {
        return this._scrollbar;
    }
    set virtual(val) {
        this._virtual = setProperty(val);
    }
    get virtual() {
        return this._virtual;
    }
    set index(index) {
        this.setIndex(index);
    }
    set config(val) {
        this.updateSwiper(val);
        const { params } = getParams(val);
        Object.assign(this, params);
    }
    set prevElRef(el) {
        this._setElement(el, this.navigation, 'navigation', 'prevEl');
    }
    set nextElRef(el) {
        this._setElement(el, this.navigation, 'navigation', 'nextEl');
    }
    set scrollbarElRef(el) {
        this._setElement(el, this.scrollbar, 'scrollbar');
    }
    set paginationElRef(el) {
        this._setElement(el, this.pagination, 'pagination');
    }
    get activeSlides() {
        if (this.virtual) {
            return this._activeSlides;
        }
        return of(this.slides);
    }
    get zoomContainerClass() {
        return typeof this.zoom !== 'boolean' ? this.zoom.containerClass : 'swiper-zoom-container';
    }
    _setElement(el, ref, update, key = 'el') {
        if (!el || !ref) {
            return;
        }
        if (ref && el.nativeElement) {
            if (ref[key] === el.nativeElement) {
                return;
            }
            ref[key] = el.nativeElement;
        }
        const updateObj = {};
        updateObj[update] = true;
        this.updateInitSwiper(updateObj);
    }
    ngOnInit() {
        const { params } = getParams(this);
        Object.assign(this, params);
    }
    ngAfterViewInit() {
        this.childrenSlidesInit();
        this.initSwiper();
        this._changeDetectorRef.detectChanges();
        setTimeout(() => {
            this.s_swiper.emit(this.swiperRef);
        });
    }
    childrenSlidesInit() {
        this.slidesChanges(this.slidesEl);
        this.slidesEl.changes.subscribe(this.slidesChanges);
    }
    get isSwiperActive() {
        return this.swiperRef && !this.swiperRef.destroyed;
    }
    initSwiper() {
        const { params: swiperParams, passedParams } = getParams(this);
        Object.assign(this, swiperParams);
        this._ngZone.runOutsideAngular(() => {
            swiperParams.init = false;
            if (!swiperParams.virtual) {
                swiperParams.observer = true;
            }
            swiperParams.onAny = (event, ...args) => {
                const emitter = this[`s_${event}`];
                if (emitter) {
                    emitter.emit(...args);
                }
            };
            Object.assign(swiperParams.on, {
                _containerClasses(swiper, classes) {
                    this.containerClasses = classes;
                },
                _slideClasses: (_, updated) => {
                    updated.forEach(({ slideEl, classNames }, index) => {
                        const slideIndex = parseInt(slideEl.getAttribute('data-swiper-slide-index')) || index;
                        if (this.virtual) {
                            const virtualSlide = this.slides.find((item) => {
                                return item.virtualIndex && item.virtualIndex === slideIndex;
                            });
                            if (virtualSlide) {
                                virtualSlide.classNames = classNames;
                                return;
                            }
                        }
                        if (this.slides[slideIndex]) {
                            this.slides[slideIndex].classNames = classNames;
                        }
                    });
                    this._changeDetectorRef.detectChanges();
                },
            });
            const swiperRef = new Swiper(swiperParams);
            swiperRef.loopCreate = () => { };
            swiperRef.loopDestroy = () => { };
            if (swiperParams.loop) {
                swiperRef.loopedSlides = this.loopedSlides;
            }
            if (swiperRef.virtual && swiperRef.params.virtual.enabled) {
                swiperRef.virtual.slides = this.slides;
                const extendWith = {
                    cache: false,
                    renderExternal: this.updateVirtualSlides,
                    renderExternalUpdate: false,
                };
                extend(swiperRef.params.virtual, extendWith);
                extend(swiperRef.originalParams.virtual, extendWith);
            }
            if (isPlatformBrowser(this._platformId)) {
                this.swiperRef = swiperRef.init(this.elementRef.nativeElement);
                if (this.swiperRef.virtual && this.swiperRef.params.virtual.enabled) {
                    this.swiperRef.virtual.update(true);
                }
                this._changeDetectorRef.detectChanges();
                swiperRef.on('slideChange', () => {
                    this.indexChange.emit(this.swiperRef.realIndex);
                });
            }
        });
    }
    ngOnChanges(changedParams) {
        this.updateSwiper(changedParams);
        this._changeDetectorRef.detectChanges();
    }
    updateInitSwiper(changedParams) {
        if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
            return;
        }
        this._ngZone.runOutsideAngular(() => {
            const { params: currentParams, pagination, navigation, scrollbar, virtual, thumbs, } = this.swiperRef;
            if (changedParams.pagination) {
                if (this.pagination &&
                    typeof this.pagination !== 'boolean' &&
                    this.pagination.el &&
                    pagination &&
                    !pagination.el) {
                    this.updateParameter('pagination', this.pagination);
                    pagination.init();
                    pagination.render();
                    pagination.update();
                }
                else {
                    pagination.destroy();
                    pagination.el = null;
                }
            }
            if (changedParams.scrollbar) {
                if (this.scrollbar &&
                    typeof this.scrollbar !== 'boolean' &&
                    this.scrollbar.el &&
                    scrollbar &&
                    !scrollbar.el) {
                    this.updateParameter('scrollbar', this.scrollbar);
                    scrollbar.init();
                    scrollbar.updateSize();
                    scrollbar.setTranslate();
                }
                else {
                    scrollbar.destroy();
                    scrollbar.el = null;
                }
            }
            if (changedParams.navigation) {
                if (this.navigation &&
                    typeof this.navigation !== 'boolean' &&
                    this.navigation.prevEl &&
                    this.navigation.nextEl &&
                    navigation &&
                    !navigation.prevEl &&
                    !navigation.nextEl) {
                    this.updateParameter('navigation', this.navigation);
                    navigation.init();
                    navigation.update();
                }
                else if (navigation.prevEl && navigation.nextEl) {
                    navigation.destroy();
                    navigation.nextEl = null;
                    navigation.prevEl = null;
                }
            }
            if (changedParams.thumbs && this.thumbs && this.thumbs.swiper) {
                this.updateParameter('thumbs', this.thumbs);
                const initialized = thumbs.init();
                if (initialized)
                    thumbs.update(true);
            }
            if (changedParams.controller && this.controller && this.controller.control) {
                this.swiperRef.controller.control = this.controller.control;
            }
            this.swiperRef.update();
        });
    }
    updateSwiper(changedParams) {
        this._ngZone.runOutsideAngular(() => {
            var _a, _b;
            if (changedParams.config) {
                return;
            }
            if (!(changedParams && this.swiperRef && !this.swiperRef.destroyed)) {
                return;
            }
            for (const key in changedParams) {
                if (ignoreNgOnChanges.indexOf(key) >= 0) {
                    continue;
                }
                const newValue = (_b = (_a = changedParams[key]) === null || _a === void 0 ? void 0 : _a.currentValue) !== null && _b !== void 0 ? _b : changedParams[key];
                this.updateParameter(key, newValue);
            }
            if (changedParams.allowSlideNext) {
                this.swiperRef.allowSlideNext = this.allowSlideNext;
            }
            if (changedParams.allowSlidePrev) {
                this.swiperRef.allowSlidePrev = this.allowSlidePrev;
            }
            if (changedParams.direction) {
                this.swiperRef.changeDirection(this.direction, false);
            }
            if (changedParams.breakpoints) {
                if (this.loop && !this.loopedSlides) {
                    this.calcLoopedSlides();
                }
                this.swiperRef.currentBreakpoint = null;
                this.swiperRef.setBreakpoint();
            }
            if (changedParams.thumbs || changedParams.controller) {
                this.updateInitSwiper(changedParams);
            }
            this.swiperRef.update();
        });
    }
    calcLoopedSlides() {
        if (!this.loop) {
            return;
        }
        let slidesPerViewParams = this.slidesPerView;
        if (this.breakpoints) {
            const breakpoint = Swiper.prototype.getBreakpoint(this.breakpoints);
            const breakpointOnlyParams = breakpoint in this.breakpoints ? this.breakpoints[breakpoint] : undefined;
            if (breakpointOnlyParams && breakpointOnlyParams.slidesPerView) {
                slidesPerViewParams = breakpointOnlyParams.slidesPerView;
            }
        }
        if (slidesPerViewParams === 'auto') {
            this.loopedSlides = this.slides.length;
            return this.slides.length;
        }
        let loopedSlides = this.loopedSlides || slidesPerViewParams;
        loopedSlides += this.loopAdditionalSlides;
        if (loopedSlides > this.slides.length) {
            loopedSlides = this.slides.length;
        }
        this.loopedSlides = loopedSlides;
        return loopedSlides;
    }
    updateParameter(key, value) {
        if (!(this.swiperRef && !this.swiperRef.destroyed)) {
            return;
        }
        const _key = key.replace(/^_/, '');
        if (Object.keys(this.swiperRef.modules).indexOf(_key) >= 0) {
            extend(value, this.swiperRef.modules[_key].params[_key]);
        }
        if (isObject(this.swiperRef.params[_key]) && isObject(value)) {
            extend(this.swiperRef.params[_key], value);
        }
        else {
            this.swiperRef.params[_key] = value;
        }
    }
    setIndex(index, speed, silent) {
        if (!this.isSwiperActive) {
            this.initialSlide = index;
            return;
        }
        if (index === this.swiperRef.activeIndex) {
            return;
        }
        this._ngZone.runOutsideAngular(() => {
            if (this.loop) {
                this.swiperRef.slideToLoop(index, speed, !silent);
            }
            else {
                this.swiperRef.slideTo(index, speed, !silent);
            }
        });
    }
    ngOnDestroy() {
        this._ngZone.runOutsideAngular(() => {
            var _a;
            (_a = this.swiperRef) === null || _a === void 0 ? void 0 : _a.destroy();
        });
    }
}
SwiperComponent.decorators = [
    { type: Component, args: [{
                selector: 'swiper, [swiper]',
                template: "<ng-content select=\"[slot=container-start]\"></ng-content>\n<ng-container *ngIf=\"navigation && showNavigation\">\n  <div class=\"swiper-button-prev\" #prevElRef></div>\n  <div class=\"swiper-button-next\" #nextElRef></div>\n</ng-container>\n<div *ngIf=\"scrollbar && showScrollbar\" class=\"swiper-scrollbar\" #scrollbarElRef></div>\n<div *ngIf=\"pagination && showPagination\" class=\"swiper-pagination\" #paginationElRef></div>\n<div [ngClass]=\"wrapperClass\">\n  <ng-content select=\"[slot=wrapper-start]\"></ng-content>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: prependSlides,\n        key: 'prepend'\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: activeSlides,\n        key: ''\n      }\n    \"\n  ></ng-template>\n  <ng-template\n    *ngTemplateOutlet=\"\n      slidesTemplate;\n      context: {\n        loopSlides: appendSlides,\n        key: 'append'\n      }\n    \"\n  ></ng-template>\n  <ng-content select=\"[slot=wrapper-end]\"></ng-content>\n</div>\n<ng-content select=\"[slot=container-end]\"></ng-content>\n\n<ng-template #slidesTemplate let-loopSlides=\"loopSlides\" let-slideKey=\"key\">\n  <div\n    *ngFor=\"let slide of loopSlides | async\"\n    [ngClass]=\"\n      (slide.class ? slide.class + ' ' : '') +\n      slideClass +\n      (slideKey !== '' ? ' ' + slideDuplicateClass : '')\n    \"\n    [attr.data-swiper-slide-index]=\"slide.virtualIndex ? slide.virtualIndex : slide.slideIndex\"\n    [style]=\"style\"\n    [ngSwitch]=\"slide.zoom\"\n  >\n    <div *ngSwitchCase=\"true\" [ngClass]=\"zoomContainerClass\">\n      <ng-template\n        [ngTemplateOutlet]=\"slide.template\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: slide.slideData\n        }\"\n      ></ng-template>\n    </div>\n    <ng-container *ngSwitchDefault>\n      <ng-template\n        [ngTemplateOutlet]=\"slide.template\"\n        [ngTemplateOutletContext]=\"{\n          $implicit: slide.slideData\n        }\"\n      ></ng-template>\n    </ng-container>\n  </div>\n</ng-template>\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [`
      swiper {
        display: block;
      }
    `]
            },] }
];
SwiperComponent.ctorParameters = () => [
    { type: NgZone },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
SwiperComponent.propDecorators = {
    direction: [{ type: Input }],
    touchEventsTarget: [{ type: Input }],
    initialSlide: [{ type: Input }],
    speed: [{ type: Input }],
    cssMode: [{ type: Input }],
    updateOnWindowResize: [{ type: Input }],
    resizeObserver: [{ type: Input }],
    nested: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    preventInteractionOnTransition: [{ type: Input }],
    userAgent: [{ type: Input }],
    url: [{ type: Input }],
    edgeSwipeDetection: [{ type: Input }],
    edgeSwipeThreshold: [{ type: Input }],
    freeMode: [{ type: Input }],
    freeModeMomentum: [{ type: Input }],
    freeModeMomentumRatio: [{ type: Input }],
    freeModeMomentumBounce: [{ type: Input }],
    freeModeMomentumBounceRatio: [{ type: Input }],
    freeModeMomentumVelocityRatio: [{ type: Input }],
    freeModeSticky: [{ type: Input }],
    freeModeMinimumVelocity: [{ type: Input }],
    autoHeight: [{ type: Input }],
    setWrapperSize: [{ type: Input }],
    virtualTranslate: [{ type: Input }],
    effect: [{ type: Input }],
    breakpoints: [{ type: Input }],
    spaceBetween: [{ type: Input }],
    slidesPerView: [{ type: Input }],
    slidesPerColumn: [{ type: Input }],
    slidesPerColumnFill: [{ type: Input }],
    slidesPerGroup: [{ type: Input }],
    slidesPerGroupSkip: [{ type: Input }],
    centeredSlides: [{ type: Input }],
    centeredSlidesBounds: [{ type: Input }],
    slidesOffsetBefore: [{ type: Input }],
    slidesOffsetAfter: [{ type: Input }],
    normalizeSlideIndex: [{ type: Input }],
    centerInsufficientSlides: [{ type: Input }],
    watchOverflow: [{ type: Input }],
    roundLengths: [{ type: Input }],
    touchRatio: [{ type: Input }],
    touchAngle: [{ type: Input }],
    simulateTouch: [{ type: Input }],
    shortSwipes: [{ type: Input }],
    longSwipes: [{ type: Input }],
    longSwipesRatio: [{ type: Input }],
    longSwipesMs: [{ type: Input }],
    followFinger: [{ type: Input }],
    allowTouchMove: [{ type: Input }],
    threshold: [{ type: Input }],
    touchMoveStopPropagation: [{ type: Input }],
    touchStartPreventDefault: [{ type: Input }],
    touchStartForcePreventDefault: [{ type: Input }],
    touchReleaseOnEdges: [{ type: Input }],
    uniqueNavElements: [{ type: Input }],
    resistance: [{ type: Input }],
    resistanceRatio: [{ type: Input }],
    watchSlidesProgress: [{ type: Input }],
    watchSlidesVisibility: [{ type: Input }],
    grabCursor: [{ type: Input }],
    preventClicks: [{ type: Input }],
    preventClicksPropagation: [{ type: Input }],
    slideToClickedSlide: [{ type: Input }],
    preloadImages: [{ type: Input }],
    updateOnImagesReady: [{ type: Input }],
    loop: [{ type: Input }],
    loopAdditionalSlides: [{ type: Input }],
    loopedSlides: [{ type: Input }],
    loopFillGroupWithBlank: [{ type: Input }],
    loopPreventsSlide: [{ type: Input }],
    allowSlidePrev: [{ type: Input }],
    allowSlideNext: [{ type: Input }],
    swipeHandler: [{ type: Input }],
    noSwiping: [{ type: Input }],
    noSwipingClass: [{ type: Input }],
    noSwipingSelector: [{ type: Input }],
    passiveListeners: [{ type: Input }],
    containerModifierClass: [{ type: Input }],
    slideClass: [{ type: Input }],
    slideBlankClass: [{ type: Input }],
    slideActiveClass: [{ type: Input }],
    slideDuplicateActiveClass: [{ type: Input }],
    slideVisibleClass: [{ type: Input }],
    slideDuplicateClass: [{ type: Input }],
    slideNextClass: [{ type: Input }],
    slideDuplicateNextClass: [{ type: Input }],
    slidePrevClass: [{ type: Input }],
    slideDuplicatePrevClass: [{ type: Input }],
    wrapperClass: [{ type: Input }],
    runCallbacksOnInit: [{ type: Input }],
    observeParents: [{ type: Input }],
    observeSlideChildren: [{ type: Input }],
    a11y: [{ type: Input }],
    autoplay: [{ type: Input }],
    controller: [{ type: Input }],
    coverflowEffect: [{ type: Input }],
    cubeEffect: [{ type: Input }],
    fadeEffect: [{ type: Input }],
    flipEffect: [{ type: Input }],
    hashNavigation: [{ type: Input }],
    history: [{ type: Input }],
    keyboard: [{ type: Input }],
    lazy: [{ type: Input }],
    mousewheel: [{ type: Input }],
    parallax: [{ type: Input }],
    thumbs: [{ type: Input }],
    zoom: [{ type: Input }],
    navigation: [{ type: Input }],
    pagination: [{ type: Input }],
    scrollbar: [{ type: Input }],
    virtual: [{ type: Input }],
    index: [{ type: Input }],
    config: [{ type: Input }],
    s__beforeBreakpoint: [{ type: Output, args: ['_beforeBreakpoint',] }],
    s__containerClasses: [{ type: Output, args: ['_containerClasses',] }],
    s__slideClass: [{ type: Output, args: ['_slideClass',] }],
    s__swiper: [{ type: Output, args: ['_swiper',] }],
    s_activeIndexChange: [{ type: Output, args: ['activeIndexChange',] }],
    s_afterInit: [{ type: Output, args: ['afterInit',] }],
    s_autoplay: [{ type: Output, args: ['autoplay',] }],
    s_autoplayStart: [{ type: Output, args: ['autoplayStart',] }],
    s_autoplayStop: [{ type: Output, args: ['autoplayStop',] }],
    s_beforeDestroy: [{ type: Output, args: ['beforeDestroy',] }],
    s_beforeInit: [{ type: Output, args: ['beforeInit',] }],
    s_beforeLoopFix: [{ type: Output, args: ['beforeLoopFix',] }],
    s_beforeResize: [{ type: Output, args: ['beforeResize',] }],
    s_beforeSlideChangeStart: [{ type: Output, args: ['beforeSlideChangeStart',] }],
    s_beforeTransitionStart: [{ type: Output, args: ['beforeTransitionStart',] }],
    s_breakpoint: [{ type: Output, args: ['breakpoint',] }],
    s_changeDirection: [{ type: Output, args: ['changeDirection',] }],
    s_click: [{ type: Output, args: ['click',] }],
    s_doubleTap: [{ type: Output, args: ['doubleTap',] }],
    s_doubleClick: [{ type: Output, args: ['doubleClick',] }],
    s_destroy: [{ type: Output, args: ['destroy',] }],
    s_fromEdge: [{ type: Output, args: ['fromEdge',] }],
    s_hashChange: [{ type: Output, args: ['hashChange',] }],
    s_hashSet: [{ type: Output, args: ['hashSet',] }],
    s_imagesReady: [{ type: Output, args: ['imagesReady',] }],
    s_init: [{ type: Output, args: ['init',] }],
    s_keyPress: [{ type: Output, args: ['keyPress',] }],
    s_lazyImageLoad: [{ type: Output, args: ['lazyImageLoad',] }],
    s_lazyImageReady: [{ type: Output, args: ['lazyImageReady',] }],
    s_loopFix: [{ type: Output, args: ['loopFix',] }],
    s_momentumBounce: [{ type: Output, args: ['momentumBounce',] }],
    s_navigationHide: [{ type: Output, args: ['navigationHide',] }],
    s_navigationShow: [{ type: Output, args: ['navigationShow',] }],
    s_observerUpdate: [{ type: Output, args: ['observerUpdate',] }],
    s_orientationchange: [{ type: Output, args: ['orientationchange',] }],
    s_paginationHide: [{ type: Output, args: ['paginationHide',] }],
    s_paginationRender: [{ type: Output, args: ['paginationRender',] }],
    s_paginationShow: [{ type: Output, args: ['paginationShow',] }],
    s_paginationUpdate: [{ type: Output, args: ['paginationUpdate',] }],
    s_progress: [{ type: Output, args: ['progress',] }],
    s_reachBeginning: [{ type: Output, args: ['reachBeginning',] }],
    s_reachEnd: [{ type: Output, args: ['reachEnd',] }],
    s_realIndexChange: [{ type: Output, args: ['realIndexChange',] }],
    s_resize: [{ type: Output, args: ['resize',] }],
    s_scroll: [{ type: Output, args: ['scroll',] }],
    s_scrollbarDragEnd: [{ type: Output, args: ['scrollbarDragEnd',] }],
    s_scrollbarDragMove: [{ type: Output, args: ['scrollbarDragMove',] }],
    s_scrollbarDragStart: [{ type: Output, args: ['scrollbarDragStart',] }],
    s_setTransition: [{ type: Output, args: ['setTransition',] }],
    s_setTranslate: [{ type: Output, args: ['setTranslate',] }],
    s_slideChange: [{ type: Output, args: ['slideChange',] }],
    s_slideChangeTransitionEnd: [{ type: Output, args: ['slideChangeTransitionEnd',] }],
    s_slideChangeTransitionStart: [{ type: Output, args: ['slideChangeTransitionStart',] }],
    s_slideNextTransitionEnd: [{ type: Output, args: ['slideNextTransitionEnd',] }],
    s_slideNextTransitionStart: [{ type: Output, args: ['slideNextTransitionStart',] }],
    s_slidePrevTransitionEnd: [{ type: Output, args: ['slidePrevTransitionEnd',] }],
    s_slidePrevTransitionStart: [{ type: Output, args: ['slidePrevTransitionStart',] }],
    s_slideResetTransitionStart: [{ type: Output, args: ['slideResetTransitionStart',] }],
    s_slideResetTransitionEnd: [{ type: Output, args: ['slideResetTransitionEnd',] }],
    s_sliderMove: [{ type: Output, args: ['sliderMove',] }],
    s_sliderFirstMove: [{ type: Output, args: ['sliderFirstMove',] }],
    s_slidesLengthChange: [{ type: Output, args: ['slidesLengthChange',] }],
    s_slidesGridLengthChange: [{ type: Output, args: ['slidesGridLengthChange',] }],
    s_snapGridLengthChange: [{ type: Output, args: ['snapGridLengthChange',] }],
    s_snapIndexChange: [{ type: Output, args: ['snapIndexChange',] }],
    s_tap: [{ type: Output, args: ['tap',] }],
    s_toEdge: [{ type: Output, args: ['toEdge',] }],
    s_touchEnd: [{ type: Output, args: ['touchEnd',] }],
    s_touchMove: [{ type: Output, args: ['touchMove',] }],
    s_touchMoveOpposite: [{ type: Output, args: ['touchMoveOpposite',] }],
    s_touchStart: [{ type: Output, args: ['touchStart',] }],
    s_transitionEnd: [{ type: Output, args: ['transitionEnd',] }],
    s_transitionStart: [{ type: Output, args: ['transitionStart',] }],
    s_update: [{ type: Output, args: ['update',] }],
    s_zoomChange: [{ type: Output, args: ['zoomChange',] }],
    s_swiper: [{ type: Output, args: ['swiper',] }],
    indexChange: [{ type: Output }],
    prevElRef: [{ type: ViewChild, args: ['prevElRef', { static: false },] }],
    nextElRef: [{ type: ViewChild, args: ['nextElRef', { static: false },] }],
    scrollbarElRef: [{ type: ViewChild, args: ['scrollbarElRef', { static: false },] }],
    paginationElRef: [{ type: ViewChild, args: ['paginationElRef', { static: false },] }],
    slidesEl: [{ type: ContentChildren, args: [SwiperSlideDirective, { descendants: true, emitDistinctChangesOnly: true },] }],
    containerClasses: [{ type: HostBinding, args: ['class',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpcGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hbmd1bGFyL3NyYy9zd2lwZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixXQUFXLEVBQ1gsTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBRU4sTUFBTSxFQUNOLFdBQVcsRUFHWCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sTUFBTSxNQUFNLGFBQWEsQ0FBQztBQUNqQyxPQUFPLEVBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBU2pGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBY3BELE1BQU0sT0FBTyxlQUFlO0lBZ1kxQixZQUNVLE9BQWUsRUFDZixVQUFzQixFQUN0QixrQkFBcUMsRUFDaEIsV0FBVztRQUhoQyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ2hCLGdCQUFXLEdBQVgsV0FBVyxDQUFBO1FBblRqQyxlQUFVLEdBQWdDLGNBQWMsQ0FBQztRQVV6RCxpQkFBWSxHQUFrQyxnQkFBZ0IsQ0FBQztRQXlDeEUsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFtQi9CLG1CQUFjLEdBQVks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OzBDQUVqQyxNQUFNLFNBQUMsMkJBQTJCO3dDQUVsQyxNQUFNLFNBQUMseUJBQXlCOzJCQUVoQyxNQUFNLFNBQUMsWUFBWTtnQ0FFbkIsTUFBTSxTQUFDLGlCQUFpQjttQ0FFeEIsTUFBTSxTQUFDLG9CQUFvQjt1Q0FFM0IsTUFBTSxTQUFDLHdCQUF3QjtxQ0FFL0IsTUFBTSxTQUFDLHNCQUFzQjtnQ0FFN0IsTUFBTSxTQUFDLGlCQUFpQjtvQkFFeEIsTUFBTSxTQUFDLEtBQUs7dUJBRVosTUFBTSxTQUFDLFFBQVE7eUJBRWYsTUFBTSxTQUFDLFVBQVU7MEJBRWpCLE1BQU0sU0FBQyxXQUFXO2tDQUVsQixNQUFNLFNBQUMsbUJBQW1COzJCQUUxQixNQUFNLFNBQUMsWUFBWTs4QkFFbkIsTUFBTSxTQUFDLGVBQWU7Z0NBRXRCLE1BQU0sU0FBQyxpQkFBaUI7dUJBRXhCLE1BQU0sU0FBQyxRQUFROzJCQUVmLE1BQU0sU0FBQyxZQUFZO3VCQUVuQixNQUFNLFNBQUMsUUFBUTswQkFFZixNQUFNO3dCQUVOLFNBQVMsU0FBQyxXQUFXLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO3dCQUl4QyxTQUFTLFNBQUMsV0FBVyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs2QkFJeEMsU0FBUyxTQUFDLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs4QkFJN0MsU0FBUyxTQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTt1QkFJOUMsZUFBZSxTQUFDLG9CQUFvQixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSx1QkFBdUIsRUFBRSxJQUFJLEVBQUU7K0JBcUIxRixXQUFXLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG4gIFBMQVRGT1JNX0lELFxuICBRdWVyeUxpc3QsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IFN3aXBlciBmcm9tICdzd2lwZXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZ2V0UGFyYW1zIH0gZnJvbSAnLi91dGlscy9nZXQtcGFyYW1zJztcbmltcG9ydCB7IFN3aXBlclNsaWRlRGlyZWN0aXZlIH0gZnJvbSAnLi9zd2lwZXItc2xpZGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IGV4dGVuZCwgaXNPYmplY3QsIHNldFByb3BlcnR5LCBpZ25vcmVOZ09uQ2hhbmdlcyB9IGZyb20gJy4vdXRpbHMvdXRpbHMnO1xuaW1wb3J0IHtcbiAgU3dpcGVyT3B0aW9ucyxcbiAgU3dpcGVyRXZlbnRzLFxuICBOYXZpZ2F0aW9uT3B0aW9ucyxcbiAgUGFnaW5hdGlvbk9wdGlvbnMsXG4gIFNjcm9sbGJhck9wdGlvbnMsXG4gIFZpcnR1YWxPcHRpb25zLFxufSBmcm9tICdzd2lwZXIvdHlwZXMnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc3dpcGVyLCBbc3dpcGVyXScsXG4gIHRlbXBsYXRlVXJsOiAnLi9zd2lwZXIuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgc3dpcGVyIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB9XG4gICAgYCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgU3dpcGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgZGlyZWN0aW9uOiBTd2lwZXJPcHRpb25zWydkaXJlY3Rpb24nXTtcbiAgQElucHV0KCkgdG91Y2hFdmVudHNUYXJnZXQ6IFN3aXBlck9wdGlvbnNbJ3RvdWNoRXZlbnRzVGFyZ2V0J107XG4gIEBJbnB1dCgpIGluaXRpYWxTbGlkZTogU3dpcGVyT3B0aW9uc1snaW5pdGlhbFNsaWRlJ107XG4gIEBJbnB1dCgpIHNwZWVkOiBTd2lwZXJPcHRpb25zWydzcGVlZCddO1xuICBASW5wdXQoKSBjc3NNb2RlOiBTd2lwZXJPcHRpb25zWydjc3NNb2RlJ107XG4gIEBJbnB1dCgpIHVwZGF0ZU9uV2luZG93UmVzaXplOiBTd2lwZXJPcHRpb25zWyd1cGRhdGVPbldpbmRvd1Jlc2l6ZSddO1xuICBASW5wdXQoKSByZXNpemVPYnNlcnZlcjogU3dpcGVyT3B0aW9uc1sncmVzaXplT2JzZXJ2ZXInXTtcbiAgQElucHV0KCkgbmVzdGVkOiBTd2lwZXJPcHRpb25zWyduZXN0ZWQnXTtcbiAgQElucHV0KCkgd2lkdGg6IFN3aXBlck9wdGlvbnNbJ3dpZHRoJ107XG4gIEBJbnB1dCgpIGhlaWdodDogU3dpcGVyT3B0aW9uc1snaGVpZ2h0J107XG4gIEBJbnB1dCgpIHByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbjogU3dpcGVyT3B0aW9uc1sncHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uJ107XG4gIEBJbnB1dCgpIHVzZXJBZ2VudDogU3dpcGVyT3B0aW9uc1sndXNlckFnZW50J107XG4gIEBJbnB1dCgpIHVybDogU3dpcGVyT3B0aW9uc1sndXJsJ107XG4gIEBJbnB1dCgpIGVkZ2VTd2lwZURldGVjdGlvbjogYm9vbGVhbiB8IHN0cmluZztcbiAgQElucHV0KCkgZWRnZVN3aXBlVGhyZXNob2xkOiBudW1iZXI7XG4gIEBJbnB1dCgpIGZyZWVNb2RlOiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZSddO1xuICBASW5wdXQoKSBmcmVlTW9kZU1vbWVudHVtOiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZU1vbWVudHVtJ107XG4gIEBJbnB1dCgpIGZyZWVNb2RlTW9tZW50dW1SYXRpbzogU3dpcGVyT3B0aW9uc1snZnJlZU1vZGVNb21lbnR1bVJhdGlvJ107XG4gIEBJbnB1dCgpIGZyZWVNb2RlTW9tZW50dW1Cb3VuY2U6IFN3aXBlck9wdGlvbnNbJ2ZyZWVNb2RlTW9tZW50dW1Cb3VuY2UnXTtcbiAgQElucHV0KCkgZnJlZU1vZGVNb21lbnR1bUJvdW5jZVJhdGlvOiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZU1vbWVudHVtQm91bmNlUmF0aW8nXTtcbiAgQElucHV0KCkgZnJlZU1vZGVNb21lbnR1bVZlbG9jaXR5UmF0aW86IFN3aXBlck9wdGlvbnNbJ2ZyZWVNb2RlTW9tZW50dW1WZWxvY2l0eVJhdGlvJ107XG4gIEBJbnB1dCgpIGZyZWVNb2RlU3RpY2t5OiBTd2lwZXJPcHRpb25zWydmcmVlTW9kZVN0aWNreSddO1xuICBASW5wdXQoKSBmcmVlTW9kZU1pbmltdW1WZWxvY2l0eTogU3dpcGVyT3B0aW9uc1snZnJlZU1vZGVNaW5pbXVtVmVsb2NpdHknXTtcbiAgQElucHV0KCkgYXV0b0hlaWdodDogU3dpcGVyT3B0aW9uc1snYXV0b0hlaWdodCddO1xuICBASW5wdXQoKSBzZXRXcmFwcGVyU2l6ZTogU3dpcGVyT3B0aW9uc1snc2V0V3JhcHBlclNpemUnXTtcbiAgQElucHV0KCkgdmlydHVhbFRyYW5zbGF0ZTogU3dpcGVyT3B0aW9uc1sndmlydHVhbFRyYW5zbGF0ZSddO1xuICBASW5wdXQoKSBlZmZlY3Q6IFN3aXBlck9wdGlvbnNbJ2VmZmVjdCddO1xuICBASW5wdXQoKSBicmVha3BvaW50czogU3dpcGVyT3B0aW9uc1snYnJlYWtwb2ludHMnXTtcbiAgQElucHV0KCkgc3BhY2VCZXR3ZWVuOiBTd2lwZXJPcHRpb25zWydzcGFjZUJldHdlZW4nXTtcbiAgQElucHV0KCkgc2xpZGVzUGVyVmlldzogU3dpcGVyT3B0aW9uc1snc2xpZGVzUGVyVmlldyddO1xuICBASW5wdXQoKSBzbGlkZXNQZXJDb2x1bW46IFN3aXBlck9wdGlvbnNbJ3NsaWRlc1BlckNvbHVtbiddO1xuICBASW5wdXQoKSBzbGlkZXNQZXJDb2x1bW5GaWxsOiBTd2lwZXJPcHRpb25zWydzbGlkZXNQZXJDb2x1bW5GaWxsJ107XG4gIEBJbnB1dCgpIHNsaWRlc1Blckdyb3VwOiBTd2lwZXJPcHRpb25zWydzbGlkZXNQZXJHcm91cCddO1xuICBASW5wdXQoKSBzbGlkZXNQZXJHcm91cFNraXA6IFN3aXBlck9wdGlvbnNbJ3NsaWRlc1Blckdyb3VwU2tpcCddO1xuICBASW5wdXQoKSBjZW50ZXJlZFNsaWRlczogU3dpcGVyT3B0aW9uc1snY2VudGVyZWRTbGlkZXMnXTtcbiAgQElucHV0KCkgY2VudGVyZWRTbGlkZXNCb3VuZHM6IFN3aXBlck9wdGlvbnNbJ2NlbnRlcmVkU2xpZGVzQm91bmRzJ107XG4gIEBJbnB1dCgpIHNsaWRlc09mZnNldEJlZm9yZTogU3dpcGVyT3B0aW9uc1snc2xpZGVzT2Zmc2V0QmVmb3JlJ107XG4gIEBJbnB1dCgpIHNsaWRlc09mZnNldEFmdGVyOiBTd2lwZXJPcHRpb25zWydzbGlkZXNPZmZzZXRBZnRlciddO1xuICBASW5wdXQoKSBub3JtYWxpemVTbGlkZUluZGV4OiBTd2lwZXJPcHRpb25zWydub3JtYWxpemVTbGlkZUluZGV4J107XG4gIEBJbnB1dCgpIGNlbnRlckluc3VmZmljaWVudFNsaWRlczogU3dpcGVyT3B0aW9uc1snY2VudGVySW5zdWZmaWNpZW50U2xpZGVzJ107XG4gIEBJbnB1dCgpIHdhdGNoT3ZlcmZsb3c6IFN3aXBlck9wdGlvbnNbJ3dhdGNoT3ZlcmZsb3cnXTtcbiAgQElucHV0KCkgcm91bmRMZW5ndGhzOiBTd2lwZXJPcHRpb25zWydyb3VuZExlbmd0aHMnXTtcbiAgQElucHV0KCkgdG91Y2hSYXRpbzogU3dpcGVyT3B0aW9uc1sndG91Y2hSYXRpbyddO1xuICBASW5wdXQoKSB0b3VjaEFuZ2xlOiBTd2lwZXJPcHRpb25zWyd0b3VjaEFuZ2xlJ107XG4gIEBJbnB1dCgpIHNpbXVsYXRlVG91Y2g6IFN3aXBlck9wdGlvbnNbJ3NpbXVsYXRlVG91Y2gnXTtcbiAgQElucHV0KCkgc2hvcnRTd2lwZXM6IFN3aXBlck9wdGlvbnNbJ3Nob3J0U3dpcGVzJ107XG4gIEBJbnB1dCgpIGxvbmdTd2lwZXM6IFN3aXBlck9wdGlvbnNbJ2xvbmdTd2lwZXMnXTtcbiAgQElucHV0KCkgbG9uZ1N3aXBlc1JhdGlvOiBTd2lwZXJPcHRpb25zWydsb25nU3dpcGVzUmF0aW8nXTtcbiAgQElucHV0KCkgbG9uZ1N3aXBlc01zOiBTd2lwZXJPcHRpb25zWydsb25nU3dpcGVzTXMnXTtcbiAgQElucHV0KCkgZm9sbG93RmluZ2VyOiBTd2lwZXJPcHRpb25zWydmb2xsb3dGaW5nZXInXTtcbiAgQElucHV0KCkgYWxsb3dUb3VjaE1vdmU6IFN3aXBlck9wdGlvbnNbJ2FsbG93VG91Y2hNb3ZlJ107XG4gIEBJbnB1dCgpIHRocmVzaG9sZDogU3dpcGVyT3B0aW9uc1sndGhyZXNob2xkJ107XG4gIEBJbnB1dCgpIHRvdWNoTW92ZVN0b3BQcm9wYWdhdGlvbjogU3dpcGVyT3B0aW9uc1sndG91Y2hNb3ZlU3RvcFByb3BhZ2F0aW9uJ107XG4gIEBJbnB1dCgpIHRvdWNoU3RhcnRQcmV2ZW50RGVmYXVsdDogU3dpcGVyT3B0aW9uc1sndG91Y2hTdGFydFByZXZlbnREZWZhdWx0J107XG4gIEBJbnB1dCgpIHRvdWNoU3RhcnRGb3JjZVByZXZlbnREZWZhdWx0OiBTd2lwZXJPcHRpb25zWyd0b3VjaFN0YXJ0Rm9yY2VQcmV2ZW50RGVmYXVsdCddO1xuICBASW5wdXQoKSB0b3VjaFJlbGVhc2VPbkVkZ2VzOiBTd2lwZXJPcHRpb25zWyd0b3VjaFJlbGVhc2VPbkVkZ2VzJ107XG4gIEBJbnB1dCgpIHVuaXF1ZU5hdkVsZW1lbnRzOiBTd2lwZXJPcHRpb25zWyd1bmlxdWVOYXZFbGVtZW50cyddO1xuICBASW5wdXQoKSByZXNpc3RhbmNlOiBTd2lwZXJPcHRpb25zWydyZXNpc3RhbmNlJ107XG4gIEBJbnB1dCgpIHJlc2lzdGFuY2VSYXRpbzogU3dpcGVyT3B0aW9uc1sncmVzaXN0YW5jZVJhdGlvJ107XG4gIEBJbnB1dCgpIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IFN3aXBlck9wdGlvbnNbJ3dhdGNoU2xpZGVzUHJvZ3Jlc3MnXTtcbiAgQElucHV0KCkgd2F0Y2hTbGlkZXNWaXNpYmlsaXR5OiBTd2lwZXJPcHRpb25zWyd3YXRjaFNsaWRlc1Zpc2liaWxpdHknXTtcbiAgQElucHV0KCkgZ3JhYkN1cnNvcjogU3dpcGVyT3B0aW9uc1snZ3JhYkN1cnNvciddO1xuICBASW5wdXQoKSBwcmV2ZW50Q2xpY2tzOiBTd2lwZXJPcHRpb25zWydwcmV2ZW50Q2xpY2tzJ107XG4gIEBJbnB1dCgpIHByZXZlbnRDbGlja3NQcm9wYWdhdGlvbjogU3dpcGVyT3B0aW9uc1sncHJldmVudENsaWNrc1Byb3BhZ2F0aW9uJ107XG4gIEBJbnB1dCgpIHNsaWRlVG9DbGlja2VkU2xpZGU6IFN3aXBlck9wdGlvbnNbJ3NsaWRlVG9DbGlja2VkU2xpZGUnXTtcbiAgQElucHV0KCkgcHJlbG9hZEltYWdlczogU3dpcGVyT3B0aW9uc1sncHJlbG9hZEltYWdlcyddO1xuICBASW5wdXQoKSB1cGRhdGVPbkltYWdlc1JlYWR5OiBTd2lwZXJPcHRpb25zWyd1cGRhdGVPbkltYWdlc1JlYWR5J107XG4gIEBJbnB1dCgpIGxvb3A6IFN3aXBlck9wdGlvbnNbJ2xvb3AnXTtcbiAgQElucHV0KCkgbG9vcEFkZGl0aW9uYWxTbGlkZXM6IFN3aXBlck9wdGlvbnNbJ2xvb3BBZGRpdGlvbmFsU2xpZGVzJ107XG4gIEBJbnB1dCgpIGxvb3BlZFNsaWRlczogU3dpcGVyT3B0aW9uc1snbG9vcGVkU2xpZGVzJ107XG4gIEBJbnB1dCgpIGxvb3BGaWxsR3JvdXBXaXRoQmxhbms6IFN3aXBlck9wdGlvbnNbJ2xvb3BGaWxsR3JvdXBXaXRoQmxhbmsnXTtcbiAgQElucHV0KCkgbG9vcFByZXZlbnRzU2xpZGU6IFN3aXBlck9wdGlvbnNbJ2xvb3BQcmV2ZW50c1NsaWRlJ107XG4gIEBJbnB1dCgpIGFsbG93U2xpZGVQcmV2OiBTd2lwZXJPcHRpb25zWydhbGxvd1NsaWRlUHJldiddO1xuICBASW5wdXQoKSBhbGxvd1NsaWRlTmV4dDogU3dpcGVyT3B0aW9uc1snYWxsb3dTbGlkZU5leHQnXTtcbiAgQElucHV0KCkgc3dpcGVIYW5kbGVyOiBTd2lwZXJPcHRpb25zWydzd2lwZUhhbmRsZXInXTtcbiAgQElucHV0KCkgbm9Td2lwaW5nOiBTd2lwZXJPcHRpb25zWydub1N3aXBpbmcnXTtcbiAgQElucHV0KCkgbm9Td2lwaW5nQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ25vU3dpcGluZ0NsYXNzJ107XG4gIEBJbnB1dCgpIG5vU3dpcGluZ1NlbGVjdG9yOiBTd2lwZXJPcHRpb25zWydub1N3aXBpbmdTZWxlY3RvciddO1xuICBASW5wdXQoKSBwYXNzaXZlTGlzdGVuZXJzOiBTd2lwZXJPcHRpb25zWydwYXNzaXZlTGlzdGVuZXJzJ107XG4gIEBJbnB1dCgpIGNvbnRhaW5lck1vZGlmaWVyQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ2NvbnRhaW5lck1vZGlmaWVyQ2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVDbGFzcyddID0gJ3N3aXBlci1zbGlkZSc7XG4gIEBJbnB1dCgpIHNsaWRlQmxhbmtDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVCbGFua0NsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlQWN0aXZlQ2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlQWN0aXZlQ2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVEdXBsaWNhdGVBY3RpdmVDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVEdXBsaWNhdGVBY3RpdmVDbGFzcyddO1xuICBASW5wdXQoKSBzbGlkZVZpc2libGVDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVWaXNpYmxlQ2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVEdXBsaWNhdGVDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVEdXBsaWNhdGVDbGFzcyddO1xuICBASW5wdXQoKSBzbGlkZU5leHRDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVOZXh0Q2xhc3MnXTtcbiAgQElucHV0KCkgc2xpZGVEdXBsaWNhdGVOZXh0Q2xhc3M6IFN3aXBlck9wdGlvbnNbJ3NsaWRlRHVwbGljYXRlTmV4dENsYXNzJ107XG4gIEBJbnB1dCgpIHNsaWRlUHJldkNsYXNzOiBTd2lwZXJPcHRpb25zWydzbGlkZVByZXZDbGFzcyddO1xuICBASW5wdXQoKSBzbGlkZUR1cGxpY2F0ZVByZXZDbGFzczogU3dpcGVyT3B0aW9uc1snc2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3MnXTtcbiAgQElucHV0KCkgd3JhcHBlckNsYXNzOiBTd2lwZXJPcHRpb25zWyd3cmFwcGVyQ2xhc3MnXSA9ICdzd2lwZXItd3JhcHBlcic7XG4gIEBJbnB1dCgpIHJ1bkNhbGxiYWNrc09uSW5pdDogU3dpcGVyT3B0aW9uc1sncnVuQ2FsbGJhY2tzT25Jbml0J107XG4gIEBJbnB1dCgpIG9ic2VydmVQYXJlbnRzOiBTd2lwZXJPcHRpb25zWydvYnNlcnZlUGFyZW50cyddO1xuICBASW5wdXQoKSBvYnNlcnZlU2xpZGVDaGlsZHJlbjogU3dpcGVyT3B0aW9uc1snb2JzZXJ2ZVNsaWRlQ2hpbGRyZW4nXTtcbiAgQElucHV0KCkgYTExeTogU3dpcGVyT3B0aW9uc1snYTExeSddO1xuICBASW5wdXQoKSBhdXRvcGxheTogU3dpcGVyT3B0aW9uc1snYXV0b3BsYXknXTtcbiAgQElucHV0KCkgY29udHJvbGxlcjogU3dpcGVyT3B0aW9uc1snY29udHJvbGxlciddO1xuICBASW5wdXQoKSBjb3ZlcmZsb3dFZmZlY3Q6IFN3aXBlck9wdGlvbnNbJ2NvdmVyZmxvd0VmZmVjdCddO1xuICBASW5wdXQoKSBjdWJlRWZmZWN0OiBTd2lwZXJPcHRpb25zWydjdWJlRWZmZWN0J107XG4gIEBJbnB1dCgpIGZhZGVFZmZlY3Q6IFN3aXBlck9wdGlvbnNbJ2ZhZGVFZmZlY3QnXTtcbiAgQElucHV0KCkgZmxpcEVmZmVjdDogU3dpcGVyT3B0aW9uc1snZmxpcEVmZmVjdCddO1xuICBASW5wdXQoKSBoYXNoTmF2aWdhdGlvbjogU3dpcGVyT3B0aW9uc1snaGFzaE5hdmlnYXRpb24nXTtcbiAgQElucHV0KCkgaGlzdG9yeTogU3dpcGVyT3B0aW9uc1snaGlzdG9yeSddO1xuICBASW5wdXQoKSBrZXlib2FyZDogU3dpcGVyT3B0aW9uc1sna2V5Ym9hcmQnXTtcbiAgQElucHV0KCkgbGF6eTogU3dpcGVyT3B0aW9uc1snbGF6eSddO1xuICBASW5wdXQoKSBtb3VzZXdoZWVsOiBTd2lwZXJPcHRpb25zWydtb3VzZXdoZWVsJ107XG4gIEBJbnB1dCgpIHBhcmFsbGF4OiBTd2lwZXJPcHRpb25zWydwYXJhbGxheCddO1xuICBASW5wdXQoKSB0aHVtYnM6IFN3aXBlck9wdGlvbnNbJ3RodW1icyddO1xuICBASW5wdXQoKSB6b29tOiBTd2lwZXJPcHRpb25zWyd6b29tJ107XG4gIEBJbnB1dCgpXG4gIHNldCBuYXZpZ2F0aW9uKHZhbCkge1xuICAgIGNvbnN0IGN1cnJlbnROZXh0ID0gdHlwZW9mIHRoaXMuX25hdmlnYXRpb24gIT09ICdib29sZWFuJyA/IHRoaXMuX25hdmlnYXRpb24/Lm5leHRFbCA6IG51bGw7XG4gICAgY29uc3QgY3VycmVudFByZXYgPSB0eXBlb2YgdGhpcy5fbmF2aWdhdGlvbiAhPT0gJ2Jvb2xlYW4nID8gdGhpcy5fbmF2aWdhdGlvbj8ucHJldkVsIDogbnVsbDtcbiAgICB0aGlzLl9uYXZpZ2F0aW9uID0gc2V0UHJvcGVydHkodmFsLCB7XG4gICAgICBuZXh0RWw6IGN1cnJlbnROZXh0IHx8IG51bGwsXG4gICAgICBwcmV2RWw6IGN1cnJlbnRQcmV2IHx8IG51bGwsXG4gICAgfSk7XG4gICAgaWYgKFxuICAgICAgdHlwZW9mIHRoaXMuX25hdmlnYXRpb24gIT09ICdib29sZWFuJyAmJlxuICAgICAgKHR5cGVvZiB0aGlzLl9uYXZpZ2F0aW9uPy5uZXh0RWwgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgIHR5cGVvZiB0aGlzLl9uYXZpZ2F0aW9uPy5wcmV2RWwgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgIHR5cGVvZiB0aGlzLl9uYXZpZ2F0aW9uPy5uZXh0RWwgPT09ICdvYmplY3QnIHx8XG4gICAgICAgIHR5cGVvZiB0aGlzLl9uYXZpZ2F0aW9uPy5wcmV2RWwgPT09ICdvYmplY3QnKVxuICAgICkge1xuICAgICAgdGhpcy5zaG93TmF2aWdhdGlvbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBnZXQgbmF2aWdhdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fbmF2aWdhdGlvbjtcbiAgfVxuICBwcml2YXRlIF9uYXZpZ2F0aW9uOiBOYXZpZ2F0aW9uT3B0aW9ucyB8IGJvb2xlYW47XG4gIHNob3dOYXZpZ2F0aW9uOiBib29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzZXQgcGFnaW5hdGlvbih2YWwpIHtcbiAgICBjb25zdCBjdXJyZW50ID0gdHlwZW9mIHRoaXMuX3BhZ2luYXRpb24gIT09ICdib29sZWFuJyA/IHRoaXMuX3BhZ2luYXRpb24/LmVsIDogbnVsbDtcbiAgICB0aGlzLl9wYWdpbmF0aW9uID0gc2V0UHJvcGVydHkodmFsLCB7XG4gICAgICBlbDogY3VycmVudCB8fCBudWxsLFxuICAgIH0pO1xuICAgIGlmIChcbiAgICAgIHR5cGVvZiB0aGlzLl9wYWdpbmF0aW9uICE9PSAnYm9vbGVhbicgJiZcbiAgICAgICh0eXBlb2YgdGhpcy5fcGFnaW5hdGlvbj8uZWwgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0aGlzLl9wYWdpbmF0aW9uPy5lbCA9PT0gJ29iamVjdCcpXG4gICAgKSB7XG4gICAgICB0aGlzLnNob3dQYWdpbmF0aW9uID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGdldCBwYWdpbmF0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9wYWdpbmF0aW9uO1xuICB9XG4gIHByaXZhdGUgX3BhZ2luYXRpb246IFBhZ2luYXRpb25PcHRpb25zIHwgYm9vbGVhbjtcbiAgc2hvd1BhZ2luYXRpb246IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBzY3JvbGxiYXIodmFsKSB7XG4gICAgY29uc3QgY3VycmVudCA9IHR5cGVvZiB0aGlzLl9zY3JvbGxiYXIgIT09ICdib29sZWFuJyA/IHRoaXMuX3Njcm9sbGJhcj8uZWwgOiBudWxsO1xuICAgIHRoaXMuX3Njcm9sbGJhciA9IHNldFByb3BlcnR5KHZhbCwge1xuICAgICAgZWw6IGN1cnJlbnQgfHwgbnVsbCxcbiAgICB9KTtcbiAgICBpZiAoXG4gICAgICB0eXBlb2YgdGhpcy5fc2Nyb2xsYmFyICE9PSAnYm9vbGVhbicgJiZcbiAgICAgICh0eXBlb2YgdGhpcy5fc2Nyb2xsYmFyPy5lbCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHRoaXMuX3Njcm9sbGJhcj8uZWwgPT09ICdvYmplY3QnKVxuICAgICkge1xuICAgICAgdGhpcy5zaG93U2Nyb2xsYmFyID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGdldCBzY3JvbGxiYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbGJhcjtcbiAgfVxuICBwcml2YXRlIF9zY3JvbGxiYXI6IFNjcm9sbGJhck9wdGlvbnMgfCBib29sZWFuO1xuICBzaG93U2Nyb2xsYmFyOiBib29sZWFuID0gdHJ1ZTtcblxuICBASW5wdXQoKVxuICBzZXQgdmlydHVhbCh2YWwpIHtcbiAgICB0aGlzLl92aXJ0dWFsID0gc2V0UHJvcGVydHkodmFsKTtcbiAgfVxuICBnZXQgdmlydHVhbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdmlydHVhbDtcbiAgfVxuICBwcml2YXRlIF92aXJ0dWFsOiBWaXJ0dWFsT3B0aW9ucyB8IGJvb2xlYW47XG5cbiAgQElucHV0KClcbiAgc2V0IGluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnNldEluZGV4KGluZGV4KTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgY29uZmlnKHZhbDogU3dpcGVyT3B0aW9ucykge1xuICAgIHRoaXMudXBkYXRlU3dpcGVyKHZhbCk7XG4gICAgY29uc3QgeyBwYXJhbXMgfSA9IGdldFBhcmFtcyh2YWwpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcGFyYW1zKTtcbiAgfVxuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnX2JlZm9yZUJyZWFrcG9pbnQnKSBzX19iZWZvcmVCcmVha3BvaW50OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydfYmVmb3JlQnJlYWtwb2ludCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnX2NvbnRhaW5lckNsYXNzZXMnKSBzX19jb250YWluZXJDbGFzc2VzOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydfY29udGFpbmVyQ2xhc3NlcyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnX3NsaWRlQ2xhc3MnKSBzX19zbGlkZUNsYXNzOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydfc2xpZGVDbGFzcyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnX3N3aXBlcicpIHNfX3N3aXBlcjogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snX3N3aXBlciddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYWN0aXZlSW5kZXhDaGFuZ2UnKSBzX2FjdGl2ZUluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydhY3RpdmVJbmRleENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYWZ0ZXJJbml0Jykgc19hZnRlckluaXQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2FmdGVySW5pdCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYXV0b3BsYXknKSBzX2F1dG9wbGF5OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydhdXRvcGxheSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYXV0b3BsYXlTdGFydCcpIHNfYXV0b3BsYXlTdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYXV0b3BsYXlTdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYXV0b3BsYXlTdG9wJykgc19hdXRvcGxheVN0b3A6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2F1dG9wbGF5U3RvcCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlRGVzdHJveScpIHNfYmVmb3JlRGVzdHJveTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlRGVzdHJveSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlSW5pdCcpIHNfYmVmb3JlSW5pdDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlSW5pdCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlTG9vcEZpeCcpIHNfYmVmb3JlTG9vcEZpeDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlTG9vcEZpeCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlUmVzaXplJykgc19iZWZvcmVSZXNpemU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2JlZm9yZVJlc2l6ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlU2xpZGVDaGFuZ2VTdGFydCcpIHNfYmVmb3JlU2xpZGVDaGFuZ2VTdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYmVmb3JlU2xpZGVDaGFuZ2VTdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYmVmb3JlVHJhbnNpdGlvblN0YXJ0Jykgc19iZWZvcmVUcmFuc2l0aW9uU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2JlZm9yZVRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnYnJlYWtwb2ludCcpIHNfYnJlYWtwb2ludDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snYnJlYWtwb2ludCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnY2hhbmdlRGlyZWN0aW9uJykgc19jaGFuZ2VEaXJlY3Rpb246IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2NoYW5nZURpcmVjdGlvbiddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnY2xpY2snKSBzX2NsaWNrOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydjbGljayddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnZG91YmxlVGFwJykgc19kb3VibGVUYXA6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ2RvdWJsZVRhcCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnZG91YmxlQ2xpY2snKSBzX2RvdWJsZUNsaWNrOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydkb3VibGVDbGljayddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnZGVzdHJveScpIHNfZGVzdHJveTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snZGVzdHJveSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnZnJvbUVkZ2UnKSBzX2Zyb21FZGdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydmcm9tRWRnZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnaGFzaENoYW5nZScpIHNfaGFzaENoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snaGFzaENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnaGFzaFNldCcpIHNfaGFzaFNldDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snaGFzaFNldCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnaW1hZ2VzUmVhZHknKSBzX2ltYWdlc1JlYWR5OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydpbWFnZXNSZWFkeSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnaW5pdCcpIHNfaW5pdDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snaW5pdCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgna2V5UHJlc3MnKSBzX2tleVByZXNzOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydrZXlQcmVzcyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbGF6eUltYWdlTG9hZCcpIHNfbGF6eUltYWdlTG9hZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snbGF6eUltYWdlTG9hZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbGF6eUltYWdlUmVhZHknKSBzX2xhenlJbWFnZVJlYWR5OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydsYXp5SW1hZ2VSZWFkeSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbG9vcEZpeCcpIHNfbG9vcEZpeDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snbG9vcEZpeCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbW9tZW50dW1Cb3VuY2UnKSBzX21vbWVudHVtQm91bmNlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydtb21lbnR1bUJvdW5jZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbmF2aWdhdGlvbkhpZGUnKSBzX25hdmlnYXRpb25IaWRlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyduYXZpZ2F0aW9uSGlkZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnbmF2aWdhdGlvblNob3cnKSBzX25hdmlnYXRpb25TaG93OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyduYXZpZ2F0aW9uU2hvdyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnb2JzZXJ2ZXJVcGRhdGUnKSBzX29ic2VydmVyVXBkYXRlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydvYnNlcnZlclVwZGF0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnb3JpZW50YXRpb25jaGFuZ2UnKSBzX29yaWVudGF0aW9uY2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydvcmllbnRhdGlvbmNoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncGFnaW5hdGlvbkhpZGUnKSBzX3BhZ2luYXRpb25IaWRlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydwYWdpbmF0aW9uSGlkZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncGFnaW5hdGlvblJlbmRlcicpIHNfcGFnaW5hdGlvblJlbmRlcjogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sncGFnaW5hdGlvblJlbmRlciddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncGFnaW5hdGlvblNob3cnKSBzX3BhZ2luYXRpb25TaG93OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydwYWdpbmF0aW9uU2hvdyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncGFnaW5hdGlvblVwZGF0ZScpIHNfcGFnaW5hdGlvblVwZGF0ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sncGFnaW5hdGlvblVwZGF0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncHJvZ3Jlc3MnKSBzX3Byb2dyZXNzOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydwcm9ncmVzcyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncmVhY2hCZWdpbm5pbmcnKSBzX3JlYWNoQmVnaW5uaW5nOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydyZWFjaEJlZ2lubmluZyddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncmVhY2hFbmQnKSBzX3JlYWNoRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydyZWFjaEVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncmVhbEluZGV4Q2hhbmdlJykgc19yZWFsSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3JlYWxJbmRleENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgncmVzaXplJykgc19yZXNpemU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3Jlc2l6ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2Nyb2xsJykgc19zY3JvbGw6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3Njcm9sbCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2Nyb2xsYmFyRHJhZ0VuZCcpIHNfc2Nyb2xsYmFyRHJhZ0VuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2Nyb2xsYmFyRHJhZ0VuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2Nyb2xsYmFyRHJhZ01vdmUnKSBzX3Njcm9sbGJhckRyYWdNb3ZlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzY3JvbGxiYXJEcmFnTW92ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2Nyb2xsYmFyRHJhZ1N0YXJ0Jykgc19zY3JvbGxiYXJEcmFnU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3Njcm9sbGJhckRyYWdTdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2V0VHJhbnNpdGlvbicpIHNfc2V0VHJhbnNpdGlvbjogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2V0VHJhbnNpdGlvbiddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2V0VHJhbnNsYXRlJykgc19zZXRUcmFuc2xhdGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NldFRyYW5zbGF0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVDaGFuZ2UnKSBzX3NsaWRlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZUNoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVDaGFuZ2VUcmFuc2l0aW9uRW5kJykgc19zbGlkZUNoYW5nZVRyYW5zaXRpb25FbmQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlQ2hhbmdlVHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVDaGFuZ2VUcmFuc2l0aW9uU3RhcnQnKSBzX3NsaWRlQ2hhbmdlVHJhbnNpdGlvblN0YXJ0OiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZUNoYW5nZVRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVOZXh0VHJhbnNpdGlvbkVuZCcpIHNfc2xpZGVOZXh0VHJhbnNpdGlvbkVuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVOZXh0VHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVOZXh0VHJhbnNpdGlvblN0YXJ0Jykgc19zbGlkZU5leHRUcmFuc2l0aW9uU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlTmV4dFRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVQcmV2VHJhbnNpdGlvbkVuZCcpIHNfc2xpZGVQcmV2VHJhbnNpdGlvbkVuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVQcmV2VHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVQcmV2VHJhbnNpdGlvblN0YXJ0Jykgc19zbGlkZVByZXZUcmFuc2l0aW9uU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlUHJldlRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVSZXNldFRyYW5zaXRpb25TdGFydCcpIHNfc2xpZGVSZXNldFRyYW5zaXRpb25TdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVSZXNldFRyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVSZXNldFRyYW5zaXRpb25FbmQnKSBzX3NsaWRlUmVzZXRUcmFuc2l0aW9uRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbGlkZVJlc2V0VHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVyTW92ZScpIHNfc2xpZGVyTW92ZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVyTW92ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVyRmlyc3RNb3ZlJykgc19zbGlkZXJGaXJzdE1vdmU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlckZpcnN0TW92ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVzTGVuZ3RoQ2hhbmdlJykgc19zbGlkZXNMZW5ndGhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NsaWRlc0xlbmd0aENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc2xpZGVzR3JpZExlbmd0aENoYW5nZScpIHNfc2xpZGVzR3JpZExlbmd0aENoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snc2xpZGVzR3JpZExlbmd0aENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc25hcEdyaWRMZW5ndGhDaGFuZ2UnKSBzX3NuYXBHcmlkTGVuZ3RoQ2hhbmdlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWydzbmFwR3JpZExlbmd0aENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc25hcEluZGV4Q2hhbmdlJykgc19zbmFwSW5kZXhDaGFuZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3NuYXBJbmRleENoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndGFwJykgc190YXA6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RhcCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndG9FZGdlJykgc190b0VkZ2U6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RvRWRnZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndG91Y2hFbmQnKSBzX3RvdWNoRW5kOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyd0b3VjaEVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndG91Y2hNb3ZlJykgc190b3VjaE1vdmU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RvdWNoTW92ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndG91Y2hNb3ZlT3Bwb3NpdGUnKSBzX3RvdWNoTW92ZU9wcG9zaXRlOiBFdmVudEVtaXR0ZXI8U3dpcGVyRXZlbnRzWyd0b3VjaE1vdmVPcHBvc2l0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndG91Y2hTdGFydCcpIHNfdG91Y2hTdGFydDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndG91Y2hTdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndHJhbnNpdGlvbkVuZCcpIHNfdHJhbnNpdGlvbkVuZDogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1sndHJhbnNpdGlvbkVuZCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndHJhbnNpdGlvblN0YXJ0Jykgc190cmFuc2l0aW9uU3RhcnQ6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3RyYW5zaXRpb25TdGFydCddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgndXBkYXRlJykgc191cGRhdGU6IEV2ZW50RW1pdHRlcjxTd2lwZXJFdmVudHNbJ3VwZGF0ZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnem9vbUNoYW5nZScpIHNfem9vbUNoYW5nZTogRXZlbnRFbWl0dGVyPFN3aXBlckV2ZW50c1snem9vbUNoYW5nZSddPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgQE91dHB1dCgnc3dpcGVyJykgc19zd2lwZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgpIGluZGV4Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgQFZpZXdDaGlsZCgncHJldkVsUmVmJywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHNldCBwcmV2RWxSZWYoZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9zZXRFbGVtZW50KGVsLCB0aGlzLm5hdmlnYXRpb24sICduYXZpZ2F0aW9uJywgJ3ByZXZFbCcpO1xuICB9XG4gIEBWaWV3Q2hpbGQoJ25leHRFbFJlZicsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBzZXQgbmV4dEVsUmVmKGVsOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5fc2V0RWxlbWVudChlbCwgdGhpcy5uYXZpZ2F0aW9uLCAnbmF2aWdhdGlvbicsICduZXh0RWwnKTtcbiAgfVxuICBAVmlld0NoaWxkKCdzY3JvbGxiYXJFbFJlZicsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBzZXQgc2Nyb2xsYmFyRWxSZWYoZWw6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLl9zZXRFbGVtZW50KGVsLCB0aGlzLnNjcm9sbGJhciwgJ3Njcm9sbGJhcicpO1xuICB9XG4gIEBWaWV3Q2hpbGQoJ3BhZ2luYXRpb25FbFJlZicsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBzZXQgcGFnaW5hdGlvbkVsUmVmKGVsOiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5fc2V0RWxlbWVudChlbCwgdGhpcy5wYWdpbmF0aW9uLCAncGFnaW5hdGlvbicpO1xuICB9XG4gIEBDb250ZW50Q2hpbGRyZW4oU3dpcGVyU2xpZGVEaXJlY3RpdmUsIHsgZGVzY2VuZGFudHM6IHRydWUsIGVtaXREaXN0aW5jdENoYW5nZXNPbmx5OiB0cnVlIH0pXG4gIHNsaWRlc0VsOiBRdWVyeUxpc3Q8U3dpcGVyU2xpZGVEaXJlY3RpdmU+O1xuICBwcml2YXRlIHNsaWRlczogU3dpcGVyU2xpZGVEaXJlY3RpdmVbXTtcblxuICBwcmVwZW5kU2xpZGVzOiBPYnNlcnZhYmxlPFN3aXBlclNsaWRlRGlyZWN0aXZlW10+O1xuICBhcHBlbmRTbGlkZXM6IE9ic2VydmFibGU8U3dpcGVyU2xpZGVEaXJlY3RpdmVbXT47XG5cbiAgc3dpcGVyUmVmOiBTd2lwZXI7XG4gIHJlYWRvbmx5IF9hY3RpdmVTbGlkZXMgPSBuZXcgU3ViamVjdDxTd2lwZXJTbGlkZURpcmVjdGl2ZVtdPigpO1xuXG4gIGdldCBhY3RpdmVTbGlkZXMoKSB7XG4gICAgaWYgKHRoaXMudmlydHVhbCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVNsaWRlcztcbiAgICB9XG4gICAgcmV0dXJuIG9mKHRoaXMuc2xpZGVzKTtcbiAgfVxuXG4gIGdldCB6b29tQ29udGFpbmVyQ2xhc3MoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLnpvb20gIT09ICdib29sZWFuJyA/IHRoaXMuem9vbS5jb250YWluZXJDbGFzcyA6ICdzd2lwZXItem9vbS1jb250YWluZXInO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIGNvbnRhaW5lckNsYXNzZXMgPSAnc3dpcGVyLWNvbnRhaW5lcic7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBfcGxhdGZvcm1JZCxcbiAgKSB7fVxuXG4gIHByaXZhdGUgX3NldEVsZW1lbnQoZWw6IEVsZW1lbnRSZWYsIHJlZjogYW55LCB1cGRhdGU6IHN0cmluZywga2V5ID0gJ2VsJykge1xuICAgIGlmICghZWwgfHwgIXJlZikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocmVmICYmIGVsLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgIGlmIChyZWZba2V5XSA9PT0gZWwubmF0aXZlRWxlbWVudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICByZWZba2V5XSA9IGVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICAgIGNvbnN0IHVwZGF0ZU9iaiA9IHt9O1xuICAgIHVwZGF0ZU9ialt1cGRhdGVdID0gdHJ1ZTtcbiAgICB0aGlzLnVwZGF0ZUluaXRTd2lwZXIodXBkYXRlT2JqKTtcbiAgfVxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCB7IHBhcmFtcyB9ID0gZ2V0UGFyYW1zKHRoaXMpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgcGFyYW1zKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmNoaWxkcmVuU2xpZGVzSW5pdCgpO1xuICAgIHRoaXMuaW5pdFN3aXBlcigpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc19zd2lwZXIuZW1pdCh0aGlzLnN3aXBlclJlZik7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGNoaWxkcmVuU2xpZGVzSW5pdCgpIHtcbiAgICB0aGlzLnNsaWRlc0NoYW5nZXModGhpcy5zbGlkZXNFbCk7XG4gICAgdGhpcy5zbGlkZXNFbC5jaGFuZ2VzLnN1YnNjcmliZSh0aGlzLnNsaWRlc0NoYW5nZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBzbGlkZXNDaGFuZ2VzID0gKHZhbDogUXVlcnlMaXN0PFN3aXBlclNsaWRlRGlyZWN0aXZlPikgPT4ge1xuICAgIHRoaXMuc2xpZGVzID0gdmFsLm1hcCgoc2xpZGU6IFN3aXBlclNsaWRlRGlyZWN0aXZlLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICBzbGlkZS5zbGlkZUluZGV4ID0gaW5kZXg7XG4gICAgICBzbGlkZS5jbGFzc05hbWVzID0gdGhpcy5zbGlkZUNsYXNzO1xuICAgICAgcmV0dXJuIHNsaWRlO1xuICAgIH0pO1xuICAgIGlmICh0aGlzLmxvb3AgJiYgIXRoaXMubG9vcGVkU2xpZGVzKSB7XG4gICAgICB0aGlzLmNhbGNMb29wZWRTbGlkZXMoKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnZpcnR1YWwpIHtcbiAgICAgIHRoaXMucHJlcGVuZFNsaWRlcyA9IG9mKHRoaXMuc2xpZGVzLnNsaWNlKHRoaXMuc2xpZGVzLmxlbmd0aCAtIHRoaXMubG9vcGVkU2xpZGVzKSk7XG4gICAgICB0aGlzLmFwcGVuZFNsaWRlcyA9IG9mKHRoaXMuc2xpZGVzLnNsaWNlKDAsIHRoaXMubG9vcGVkU2xpZGVzKSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnN3aXBlclJlZiAmJiB0aGlzLnN3aXBlclJlZi52aXJ0dWFsKSB7XG4gICAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICB0aGlzLnN3aXBlclJlZi52aXJ0dWFsLnNsaWRlcyA9IHRoaXMuc2xpZGVzO1xuICAgICAgICB0aGlzLnN3aXBlclJlZi52aXJ0dWFsLnVwZGF0ZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH07XG5cbiAgZ2V0IGlzU3dpcGVyQWN0aXZlKCkge1xuICAgIHJldHVybiB0aGlzLnN3aXBlclJlZiAmJiAhdGhpcy5zd2lwZXJSZWYuZGVzdHJveWVkO1xuICB9XG5cbiAgaW5pdFN3aXBlcigpIHtcbiAgICBjb25zdCB7IHBhcmFtczogc3dpcGVyUGFyYW1zLCBwYXNzZWRQYXJhbXMgfSA9IGdldFBhcmFtcyh0aGlzKTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHN3aXBlclBhcmFtcyk7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHN3aXBlclBhcmFtcy5pbml0ID0gZmFsc2U7XG4gICAgICBpZiAoIXN3aXBlclBhcmFtcy52aXJ0dWFsKSB7XG4gICAgICAgIHN3aXBlclBhcmFtcy5vYnNlcnZlciA9IHRydWU7XG4gICAgICB9XG4gICAgICBzd2lwZXJQYXJhbXMub25BbnkgPSAoZXZlbnQsIC4uLmFyZ3MpID0+IHtcbiAgICAgICAgY29uc3QgZW1pdHRlciA9IHRoaXNbYHNfJHtldmVudH1gXSBhcyBFdmVudEVtaXR0ZXI8YW55PjtcbiAgICAgICAgaWYgKGVtaXR0ZXIpIHtcbiAgICAgICAgICBlbWl0dGVyLmVtaXQoLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBPYmplY3QuYXNzaWduKHN3aXBlclBhcmFtcy5vbiwge1xuICAgICAgICBfY29udGFpbmVyQ2xhc3Nlcyhzd2lwZXIsIGNsYXNzZXMpIHtcbiAgICAgICAgICB0aGlzLmNvbnRhaW5lckNsYXNzZXMgPSBjbGFzc2VzO1xuICAgICAgICB9LFxuICAgICAgICBfc2xpZGVDbGFzc2VzOiAoXywgdXBkYXRlZCkgPT4ge1xuICAgICAgICAgIHVwZGF0ZWQuZm9yRWFjaCgoeyBzbGlkZUVsLCBjbGFzc05hbWVzIH0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzbGlkZUluZGV4ID0gcGFyc2VJbnQoc2xpZGVFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JykpIHx8IGluZGV4O1xuICAgICAgICAgICAgaWYgKHRoaXMudmlydHVhbCkge1xuICAgICAgICAgICAgICBjb25zdCB2aXJ0dWFsU2xpZGUgPSB0aGlzLnNsaWRlcy5maW5kKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udmlydHVhbEluZGV4ICYmIGl0ZW0udmlydHVhbEluZGV4ID09PSBzbGlkZUluZGV4O1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgaWYgKHZpcnR1YWxTbGlkZSkge1xuICAgICAgICAgICAgICAgIHZpcnR1YWxTbGlkZS5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2xpZGVzW3NsaWRlSW5kZXhdKSB7XG4gICAgICAgICAgICAgIHRoaXMuc2xpZGVzW3NsaWRlSW5kZXhdLmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgY29uc3Qgc3dpcGVyUmVmID0gbmV3IFN3aXBlcihzd2lwZXJQYXJhbXMpO1xuICAgICAgc3dpcGVyUmVmLmxvb3BDcmVhdGUgPSAoKSA9PiB7fTtcbiAgICAgIHN3aXBlclJlZi5sb29wRGVzdHJveSA9ICgpID0+IHt9O1xuICAgICAgaWYgKHN3aXBlclBhcmFtcy5sb29wKSB7XG4gICAgICAgIHN3aXBlclJlZi5sb29wZWRTbGlkZXMgPSB0aGlzLmxvb3BlZFNsaWRlcztcbiAgICAgIH1cbiAgICAgIGlmIChzd2lwZXJSZWYudmlydHVhbCAmJiBzd2lwZXJSZWYucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkge1xuICAgICAgICBzd2lwZXJSZWYudmlydHVhbC5zbGlkZXMgPSB0aGlzLnNsaWRlcztcbiAgICAgICAgY29uc3QgZXh0ZW5kV2l0aCA9IHtcbiAgICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgICAgcmVuZGVyRXh0ZXJuYWw6IHRoaXMudXBkYXRlVmlydHVhbFNsaWRlcyxcbiAgICAgICAgICByZW5kZXJFeHRlcm5hbFVwZGF0ZTogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIGV4dGVuZChzd2lwZXJSZWYucGFyYW1zLnZpcnR1YWwsIGV4dGVuZFdpdGgpO1xuICAgICAgICBleHRlbmQoc3dpcGVyUmVmLm9yaWdpbmFsUGFyYW1zLnZpcnR1YWwsIGV4dGVuZFdpdGgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5fcGxhdGZvcm1JZCkpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYgPSBzd2lwZXJSZWYuaW5pdCh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIGlmICh0aGlzLnN3aXBlclJlZi52aXJ0dWFsICYmIHRoaXMuc3dpcGVyUmVmLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHtcbiAgICAgICAgICB0aGlzLnN3aXBlclJlZi52aXJ0dWFsLnVwZGF0ZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIHN3aXBlclJlZi5vbignc2xpZGVDaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5pbmRleENoYW5nZS5lbWl0KHRoaXMuc3dpcGVyUmVmLnJlYWxJbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3R5bGU6IGFueSA9IG51bGw7XG4gIGN1cnJlbnRWaXJ0dWFsRGF0YTogYW55OyAvLyBUT0RPOiB0eXBlIHZpcnR1YWxEYXRhO1xuICBwcml2YXRlIHVwZGF0ZVZpcnR1YWxTbGlkZXMgPSAodmlydHVhbERhdGE6IGFueSkgPT4ge1xuICAgIC8vIFRPRE86IHR5cGUgdmlydHVhbERhdGFcbiAgICBpZiAoXG4gICAgICAhdGhpcy5zd2lwZXJSZWYgfHxcbiAgICAgICh0aGlzLmN1cnJlbnRWaXJ0dWFsRGF0YSAmJlxuICAgICAgICB0aGlzLmN1cnJlbnRWaXJ0dWFsRGF0YS5mcm9tID09PSB2aXJ0dWFsRGF0YS5mcm9tICYmXG4gICAgICAgIHRoaXMuY3VycmVudFZpcnR1YWxEYXRhLnRvID09PSB2aXJ0dWFsRGF0YS50byAmJlxuICAgICAgICB0aGlzLmN1cnJlbnRWaXJ0dWFsRGF0YS5vZmZzZXQgPT09IHZpcnR1YWxEYXRhLm9mZnNldClcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zdHlsZSA9IHRoaXMuc3dpcGVyUmVmLmlzSG9yaXpvbnRhbCgpXG4gICAgICA/IHtcbiAgICAgICAgICBbdGhpcy5zd2lwZXJSZWYucnRsVHJhbnNsYXRlID8gJ3JpZ2h0JyA6ICdsZWZ0J106IGAke3ZpcnR1YWxEYXRhLm9mZnNldH1weGAsXG4gICAgICAgIH1cbiAgICAgIDoge1xuICAgICAgICAgIHRvcDogYCR7dmlydHVhbERhdGEub2Zmc2V0fXB4YCxcbiAgICAgICAgfTtcbiAgICB0aGlzLmN1cnJlbnRWaXJ0dWFsRGF0YSA9IHZpcnR1YWxEYXRhO1xuICAgIHRoaXMuX2FjdGl2ZVNsaWRlcy5uZXh0KHZpcnR1YWxEYXRhLnNsaWRlcyk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICB0aGlzLnN3aXBlclJlZi51cGRhdGVTbGlkZXMoKTtcbiAgICAgIHRoaXMuc3dpcGVyUmVmLnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgICB0aGlzLnN3aXBlclJlZi51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgICBpZiAodGhpcy5zd2lwZXJSZWYubGF6eSAmJiB0aGlzLnN3aXBlclJlZi5wYXJhbXMubGF6eVsnZW5hYmxlZCddKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLmxhenkubG9hZCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5zd2lwZXJSZWYudmlydHVhbC51cGRhdGUodHJ1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuO1xuICB9O1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZWRQYXJhbXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLnVwZGF0ZVN3aXBlcihjaGFuZ2VkUGFyYW1zKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICB1cGRhdGVJbml0U3dpcGVyKGNoYW5nZWRQYXJhbXMpIHtcbiAgICBpZiAoIShjaGFuZ2VkUGFyYW1zICYmIHRoaXMuc3dpcGVyUmVmICYmICF0aGlzLnN3aXBlclJlZi5kZXN0cm95ZWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgcGFyYW1zOiBjdXJyZW50UGFyYW1zLFxuICAgICAgICBwYWdpbmF0aW9uLFxuICAgICAgICBuYXZpZ2F0aW9uLFxuICAgICAgICBzY3JvbGxiYXIsXG4gICAgICAgIHZpcnR1YWwsXG4gICAgICAgIHRodW1icyxcbiAgICAgIH0gPSB0aGlzLnN3aXBlclJlZjtcblxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMucGFnaW5hdGlvbikge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5wYWdpbmF0aW9uICYmXG4gICAgICAgICAgdHlwZW9mIHRoaXMucGFnaW5hdGlvbiAhPT0gJ2Jvb2xlYW4nICYmXG4gICAgICAgICAgdGhpcy5wYWdpbmF0aW9uLmVsICYmXG4gICAgICAgICAgcGFnaW5hdGlvbiAmJlxuICAgICAgICAgICFwYWdpbmF0aW9uLmVsXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVyKCdwYWdpbmF0aW9uJywgdGhpcy5wYWdpbmF0aW9uKTtcbiAgICAgICAgICBwYWdpbmF0aW9uLmluaXQoKTtcbiAgICAgICAgICBwYWdpbmF0aW9uLnJlbmRlcigpO1xuICAgICAgICAgIHBhZ2luYXRpb24udXBkYXRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcGFnaW5hdGlvbi5kZXN0cm95KCk7XG4gICAgICAgICAgcGFnaW5hdGlvbi5lbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMuc2Nyb2xsYmFyKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLnNjcm9sbGJhciAmJlxuICAgICAgICAgIHR5cGVvZiB0aGlzLnNjcm9sbGJhciAhPT0gJ2Jvb2xlYW4nICYmXG4gICAgICAgICAgdGhpcy5zY3JvbGxiYXIuZWwgJiZcbiAgICAgICAgICBzY3JvbGxiYXIgJiZcbiAgICAgICAgICAhc2Nyb2xsYmFyLmVsXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVyKCdzY3JvbGxiYXInLCB0aGlzLnNjcm9sbGJhcik7XG4gICAgICAgICAgc2Nyb2xsYmFyLmluaXQoKTtcbiAgICAgICAgICBzY3JvbGxiYXIudXBkYXRlU2l6ZSgpO1xuICAgICAgICAgIHNjcm9sbGJhci5zZXRUcmFuc2xhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzY3JvbGxiYXIuZGVzdHJveSgpO1xuICAgICAgICAgIHNjcm9sbGJhci5lbCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMubmF2aWdhdGlvbikge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uICYmXG4gICAgICAgICAgdHlwZW9mIHRoaXMubmF2aWdhdGlvbiAhPT0gJ2Jvb2xlYW4nICYmXG4gICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uLnByZXZFbCAmJlxuICAgICAgICAgIHRoaXMubmF2aWdhdGlvbi5uZXh0RWwgJiZcbiAgICAgICAgICBuYXZpZ2F0aW9uICYmXG4gICAgICAgICAgIW5hdmlnYXRpb24ucHJldkVsICYmXG4gICAgICAgICAgIW5hdmlnYXRpb24ubmV4dEVsXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVyKCduYXZpZ2F0aW9uJywgdGhpcy5uYXZpZ2F0aW9uKTtcbiAgICAgICAgICBuYXZpZ2F0aW9uLmluaXQoKTtcbiAgICAgICAgICBuYXZpZ2F0aW9uLnVwZGF0ZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKG5hdmlnYXRpb24ucHJldkVsICYmIG5hdmlnYXRpb24ubmV4dEVsKSB7XG4gICAgICAgICAgbmF2aWdhdGlvbi5kZXN0cm95KCk7XG4gICAgICAgICAgbmF2aWdhdGlvbi5uZXh0RWwgPSBudWxsO1xuICAgICAgICAgIG5hdmlnYXRpb24ucHJldkVsID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMudGh1bWJzICYmIHRoaXMudGh1bWJzICYmIHRoaXMudGh1bWJzLnN3aXBlcikge1xuICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtZXRlcigndGh1bWJzJywgdGhpcy50aHVtYnMpO1xuICAgICAgICBjb25zdCBpbml0aWFsaXplZCA9IHRodW1icy5pbml0KCk7XG4gICAgICAgIGlmIChpbml0aWFsaXplZCkgdGh1bWJzLnVwZGF0ZSh0cnVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMuY29udHJvbGxlciAmJiB0aGlzLmNvbnRyb2xsZXIgJiYgdGhpcy5jb250cm9sbGVyLmNvbnRyb2wpIHtcbiAgICAgICAgdGhpcy5zd2lwZXJSZWYuY29udHJvbGxlci5jb250cm9sID0gdGhpcy5jb250cm9sbGVyLmNvbnRyb2w7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc3dpcGVyUmVmLnVwZGF0ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlU3dpcGVyKGNoYW5nZWRQYXJhbXM6IFNpbXBsZUNoYW5nZXMgfCBhbnkpIHtcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgaWYgKGNoYW5nZWRQYXJhbXMuY29uZmlnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghKGNoYW5nZWRQYXJhbXMgJiYgdGhpcy5zd2lwZXJSZWYgJiYgIXRoaXMuc3dpcGVyUmVmLmRlc3Ryb3llZCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gY2hhbmdlZFBhcmFtcykge1xuICAgICAgICBpZiAoaWdub3JlTmdPbkNoYW5nZXMuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IGNoYW5nZWRQYXJhbXNba2V5XT8uY3VycmVudFZhbHVlID8/IGNoYW5nZWRQYXJhbXNba2V5XTtcbiAgICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXIoa2V5LCBuZXdWYWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFuZ2VkUGFyYW1zLmFsbG93U2xpZGVOZXh0KSB7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLmFsbG93U2xpZGVOZXh0ID0gdGhpcy5hbGxvd1NsaWRlTmV4dDtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFuZ2VkUGFyYW1zLmFsbG93U2xpZGVQcmV2KSB7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLmFsbG93U2xpZGVQcmV2ID0gdGhpcy5hbGxvd1NsaWRlUHJldjtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFuZ2VkUGFyYW1zLmRpcmVjdGlvbikge1xuICAgICAgICB0aGlzLnN3aXBlclJlZi5jaGFuZ2VEaXJlY3Rpb24odGhpcy5kaXJlY3Rpb24sIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGFuZ2VkUGFyYW1zLmJyZWFrcG9pbnRzKSB7XG4gICAgICAgIGlmICh0aGlzLmxvb3AgJiYgIXRoaXMubG9vcGVkU2xpZGVzKSB7XG4gICAgICAgICAgdGhpcy5jYWxjTG9vcGVkU2xpZGVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zd2lwZXJSZWYuY3VycmVudEJyZWFrcG9pbnQgPSBudWxsO1xuICAgICAgICB0aGlzLnN3aXBlclJlZi5zZXRCcmVha3BvaW50KCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGFuZ2VkUGFyYW1zLnRodW1icyB8fCBjaGFuZ2VkUGFyYW1zLmNvbnRyb2xsZXIpIHtcbiAgICAgICAgdGhpcy51cGRhdGVJbml0U3dpcGVyKGNoYW5nZWRQYXJhbXMpO1xuICAgICAgfVxuICAgICAgdGhpcy5zd2lwZXJSZWYudXBkYXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBjYWxjTG9vcGVkU2xpZGVzKCkge1xuICAgIGlmICghdGhpcy5sb29wKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBzbGlkZXNQZXJWaWV3UGFyYW1zID0gdGhpcy5zbGlkZXNQZXJWaWV3O1xuICAgIGlmICh0aGlzLmJyZWFrcG9pbnRzKSB7XG4gICAgICBjb25zdCBicmVha3BvaW50ID0gU3dpcGVyLnByb3RvdHlwZS5nZXRCcmVha3BvaW50KHRoaXMuYnJlYWtwb2ludHMpO1xuICAgICAgY29uc3QgYnJlYWtwb2ludE9ubHlQYXJhbXMgPVxuICAgICAgICBicmVha3BvaW50IGluIHRoaXMuYnJlYWtwb2ludHMgPyB0aGlzLmJyZWFrcG9pbnRzW2JyZWFrcG9pbnRdIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGJyZWFrcG9pbnRPbmx5UGFyYW1zICYmIGJyZWFrcG9pbnRPbmx5UGFyYW1zLnNsaWRlc1BlclZpZXcpIHtcbiAgICAgICAgc2xpZGVzUGVyVmlld1BhcmFtcyA9IGJyZWFrcG9pbnRPbmx5UGFyYW1zLnNsaWRlc1BlclZpZXc7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzbGlkZXNQZXJWaWV3UGFyYW1zID09PSAnYXV0bycpIHtcbiAgICAgIHRoaXMubG9vcGVkU2xpZGVzID0gdGhpcy5zbGlkZXMubGVuZ3RoO1xuICAgICAgcmV0dXJuIHRoaXMuc2xpZGVzLmxlbmd0aDtcbiAgICB9XG4gICAgbGV0IGxvb3BlZFNsaWRlcyA9IHRoaXMubG9vcGVkU2xpZGVzIHx8IHNsaWRlc1BlclZpZXdQYXJhbXM7XG5cbiAgICBsb29wZWRTbGlkZXMgKz0gdGhpcy5sb29wQWRkaXRpb25hbFNsaWRlcztcblxuICAgIGlmIChsb29wZWRTbGlkZXMgPiB0aGlzLnNsaWRlcy5sZW5ndGgpIHtcbiAgICAgIGxvb3BlZFNsaWRlcyA9IHRoaXMuc2xpZGVzLmxlbmd0aDtcbiAgICB9XG4gICAgdGhpcy5sb29wZWRTbGlkZXMgPSBsb29wZWRTbGlkZXM7XG4gICAgcmV0dXJuIGxvb3BlZFNsaWRlcztcbiAgfVxuXG4gIHVwZGF0ZVBhcmFtZXRlcihrZXksIHZhbHVlKSB7XG4gICAgaWYgKCEodGhpcy5zd2lwZXJSZWYgJiYgIXRoaXMuc3dpcGVyUmVmLmRlc3Ryb3llZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgX2tleSA9IGtleS5yZXBsYWNlKC9eXy8sICcnKTtcbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5zd2lwZXJSZWYubW9kdWxlcykuaW5kZXhPZihfa2V5KSA+PSAwKSB7XG4gICAgICBleHRlbmQodmFsdWUsIHRoaXMuc3dpcGVyUmVmLm1vZHVsZXNbX2tleV0ucGFyYW1zW19rZXldKTtcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0KHRoaXMuc3dpcGVyUmVmLnBhcmFtc1tfa2V5XSkgJiYgaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICBleHRlbmQodGhpcy5zd2lwZXJSZWYucGFyYW1zW19rZXldLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3dpcGVyUmVmLnBhcmFtc1tfa2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHNldEluZGV4KGluZGV4OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyLCBzaWxlbnQ/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzU3dpcGVyQWN0aXZlKSB7XG4gICAgICB0aGlzLmluaXRpYWxTbGlkZSA9IGluZGV4O1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaW5kZXggPT09IHRoaXMuc3dpcGVyUmVmLmFjdGl2ZUluZGV4KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX25nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBpZiAodGhpcy5sb29wKSB7XG4gICAgICAgIHRoaXMuc3dpcGVyUmVmLnNsaWRlVG9Mb29wKGluZGV4LCBzcGVlZCwgIXNpbGVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN3aXBlclJlZi5zbGlkZVRvKGluZGV4LCBzcGVlZCwgIXNpbGVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5zd2lwZXJSZWY/LmRlc3Ryb3koKTtcbiAgICB9KTtcbiAgfVxufVxuIl19