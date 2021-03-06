$(function () {

	var svgArrowTemplate = '<svg class="basic-table__arrow-conv" role="img" aria-hidden="true"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite-inline.svg#arrow-right-2"></use> </svg>';

	function setOwnName() {
		if (localStorage.getItem('telegramAuth') == 'true' && localStorage.getItem('telegramFirstName') && localStorage.getItem('telegramLastName')) {
			if (document.querySelector('.message-bar__login'))
				document.querySelector('.message-bar__login').classList.add('hidden');
			if (document.querySelector('.message-bar__login-demo'))
				document.querySelector('.message-bar__login-demo').classList.add('hidden');
			if (localStorage.getItem('telegramPhoto')) {
				if (document.querySelector('.user-portfolio .user-pic__avatar')) {
					document.querySelector('.user-portfolio .user-pic__avatar').setAttribute('src', localStorage.getItem('telegramPhoto'));
					document.querySelector('.message-bar__user-pic .user-pic__avatar').setAttribute('src', localStorage.getItem('telegramPhoto'));
				}
			} else {
				if (document.querySelector('.user-portfolio .user-pic__avatar')) {
					document.querySelector('.user-portfolio .user-pic__avatar').classList.add('hidden');
					document.querySelector('.message-bar__user-pic .user-pic__avatar').classList.add('hidden');
					var avatarAbbr = document.createElement('div');
					avatarAbbr.classList.add('user-pic__avatar');
					avatarAbbr.textContent = localStorage.getItem('telegramFirstName')[0] + localStorage.getItem('telegramLastName')[0];
					avatarAbbr.style.borderRadius = '50%';
					avatarAbbr.style.background = '#0088cc';
					avatarAbbr.style.fontSize = '19px';
					if (!document.querySelector('.user-portfolio .user-pic div')) {
						document.querySelector('.user-portfolio .user-pic').appendChild(avatarAbbr);
						document.querySelector('.message-bar__user-pic').appendChild(avatarAbbr.cloneNode(true));
					}
				}
			}
			if (localStorage.getItem('telegramFirstName') && localStorage.getItem('telegramLastName') && document.querySelector('.user-portfolio .user-portfolio__name'))
				document.querySelector('.user-portfolio .user-portfolio__name').textContent = localStorage.getItem('telegramFirstName') + ' ' + localStorage.getItem('telegramLastName');
		} else {
			localStorage.removeItem('telegramAuth');
			localStorage.removeItem('telegramFirstName');
			localStorage.removeItem('telegramLastName');
		}
	}

	setOwnName();

	/* Cubic slider for Orders */
	var $cubicSlider = $(".js-cubic-slider");

	$cubicSlider.ionRangeSlider({
		type: "single",
		hide_min_max: true,
		grid: true,
		from: 50,
		grid_snap: false
	});

	/*---------------------------------------------------*/
	/* redraw Charts after resize */
	/*---------------------------------------------------*/
	/* 	function redrawOtherCharts() {
			if (circleChartObj) circleChartObj.reflow();
			if (portfolioChartObj) portfolioChartObj.reflow();
			if (liquidityChartObj) liquidityChartObj.reflow();
		} */

	/*---------------------------------------------------*/
	/* js-dropdown */
	/*---------------------------------------------------*/

	$('.js-dropdown-toggle, .menu-dropdown__item').click(function (e) {
		e.stopPropagation();
		var wrap = $(this).closest('.js-dropdown-wrap');
		var drop = wrap.find('.js-dropdown');

		if (drop.hasClass('open')) {
			drop.removeClass('open');
		} else {
			wrap.find('.js-dropdown').removeClass('open')
			drop.addClass('open');
		}
	});

	$('.main-cols__right-top .exch-dropdown .exch-dropdown__border').click(function name() {
		$('.main-cols__right-top .exch-dropdown').removeClass('open');
		$(this).parent().addClass('open');
	});

	$('body, .exch-search .exch-dropdown__hangle').click(function (event) {
		if ($(this).hasClass('exch-dropdown__hangle')) event.stopPropagation();
		$('.main-cols__right-top .exch-dropdown').removeClass('open');

		// $('ul.portfolio-graph-range__list').css('border-bottom', '0px');
		// $('div.portfolio-graph-range').css('border', '0px');
		// $('ul.portfolio-graph-range__list').removeClass('open');
		// $('div.portfolio-graph-range__current').css('border', 'solid 1px');

		$('.exch-dropdown .exch-search').addClass('hidden');
		$('.exch-dropdown .exch-dropdown__current').removeClass('hidden');

	});

	$('.main-cols__right-top .exch-dropdown').click(function (event) {
		event.stopPropagation();
		// $('ul.portfolio-graph-range__list').css('border-bottom', '0px');
		// $('div.portfolio-graph-range').css('border', '0px');
		// $('ul.portfolio-graph-range__list').removeClass('open');
		// $('div.portfolio-graph-range__current').css('border', 'solid 1px');
	});


	$('div.portfolio-graph-range').click(function (event) {
		event.stopPropagation();
		$('.main-cols__right-top .exch-dropdown').removeClass('open');
	});

	$('.main-cols__right-top .exch-dropdown .exch-dropdown__current').click(function () {
		$(this).addClass('hidden');
		$(this).parent().find('.exch-search').removeClass('hidden').find('input').focus();
	});

	$('.exch-search__input').keyup(function name() {
		var searchString = $(this).val().toUpperCase();
		$(this).closest('.exch-dropdown').find('.exch-dropdown__list .exch-dropdown__item').each(function name(index, item) {
			// show all
			$(item).removeClass('hidden');
			// remove old span tags
			$(item).find('.exch-dropdown__title').text($(item).find('.exch-dropdown__title').text().replace(/<[^>]+>/g, ''));
			if (searchString.trim() != '') {
				// if item not contain searchString
				if ($(item).find('.exch-dropdown__title').text().toUpperCase().indexOf(searchString) == -1) {
					$(item).addClass('hidden');
				}
				// if contain			
				else {
					var searchStringGlobal = new RegExp(searchString, "g");
					// add span tags for highlight
					var newTextValue = $(item).find('.exch-dropdown__title').text().toUpperCase().replace(searchStringGlobal, '<span>' + searchString + '</span>')
					$(item).find('.exch-dropdown__title').html(newTextValue);
				}
			}

		});

	});

	/*---------------------------------------------------*/

	$('input[placeholder], textarea[placeholder]').placeholder();

	/*---------------------------------------------------*/
	/* js-select currency*/
	/*---------------------------------------------------*/

	$('.exch-dropdown__list .exch-dropdown__item').click(function () {
		var currencyName = $(this).attr('data-name');
		var telegramGroupName = $(this).attr('data-telegram');
		var currencyAbbr = $(this).attr('data-currency');
		//var realCurrencyName = currencyName.slice(6).toLowerCase();
		//var realCurrencyName = currencyName;
		//if (realCurrencyName == 'us dollar') realCurrencyName = 'dollar';

		var newCurr = $(this).children().clone();
		$(newCurr).eq(1).html('<span>' + currencyAbbr + '</span><br> ' + currencyName);
		var currDropdown = $(this).closest('.exch-dropdown');
		currDropdown.find('.exch-dropdown__item').removeClass('current');
		$(this).addClass('current');
		$(currDropdown).find('.exch-dropdown__current > svg, .exch-dropdown__current > p').remove();
		$(newCurr).insertBefore($(currDropdown).find('.exch-dropdown__hangle').eq(0));
		var firstColor = $('.exch-dropdown__current .exch-dropdown__icon').eq(0).css('fill');
		var secondColor = $('.exch-dropdown__current .exch-dropdown__icon').eq(1).css('fill');
		$(".exch-head").get(0).style.setProperty("--color-one", firstColor);
		$(".exch-head").get(0).style.setProperty("--color-two", secondColor);

		$(this).closest('.exch-dropdown').find('.exch-dropdown__current').removeClass('hidden');
		$(this).closest('.exch-dropdown').find('.exch-search').addClass('hidden');

		// first currency
		if (telegramGroupName) {
			if ($(this).index() == 1 || $(this).index() == 2) {
				$('.chat-talk').addClass('hidden');
				$('.chat-talk').eq($(this).index() - 1).removeClass('hidden');
			}
			$('.chat-head__name').text(telegramGroupName);
			//$('.chat-head__curr').remove();
			//$('.chat-head').prepend('<svg class="chat-head__curr clr-' + realCurrencyName + '" role="img" aria-hidden="true"> <use xmlns: xlink = "http://www.w3.org/1999/xlink"xlink: href = "img/sprite-inline.svg#curr-' + realCurrencyName + '" > < /use> </svg>');
			//$('.exch-form__send .exch-form__coin').remove();
			//$('.exch-form__send').append('<svg class="exch-form__coin clr-' + realCurrencyName + '" role="img" aria-hidden="true"> <use xmlns: xlink = "http://www.w3.org/1999/xlink"xlink: href = "img/sprite-inline.svg#curr-' + realCurrencyName + '" > < /use> </svg>');
			$('.exch-form__send input').attr('data-currency', currencyAbbr);
			$('.exch-form__send .exch-form__curr').html(currencyAbbr);
			$('.graph-info__title').first().text('1 ' + currencyAbbr + ' = ' + numberWithCommas(currenciesPrice[currencyAbbr]) + ' USDT');
			$('.chat-head__name').css('color', firstColor);
		}
		// second currency
		else {
			//$('.exch-form__get .exch-form__coin').remove();
			//$('.exch-form__get').append('<svg class="exch-form__coin clr-' + realCurrencyName + '" role="img" aria-hidden="true"> <use xmlns: xlink = "http://www.w3.org/1999/xlink"xlink: href = "img/sprite-inline.svg#curr-' + realCurrencyName + '" > < /use> </svg>');
			$('.exch-form__get input').attr('data-currency', currencyAbbr);
			$('.exch-form__get .exch-form__curr').html(currencyAbbr);
			if ($('body').hasClass('advanced')) {
				$('.global-order').find('.basic-table__row.head .basic-table__col').eq(1).html('Amount ('+ currencyAbbr +')');
				$('.global-order').find('.basic-table__row.head .basic-table__col').eq(5).html('Amount ('+ currencyAbbr +')');
			}			
		}
		$(this).closest('.exch-dropdown').removeClass('open');
		setTimeout(() => {
			updateMainChartGraph(currencyAbbr);
		}, 10)

	});

	function updateMainChartGraph(dataCurrency) {
		var currentDataId = 1;
		switch (dataCurrency) {
			case 'BTC':
				currentDataId = 4;
				break;
			case 'XMR':
				currentDataId = 3;
				break;
			case 'ETH':
				currentDataId = 2;
				break;
			case 'RPL':
				currentDataId = 5;
				break;
			case 'USD':
				currentDataId = 6;
				break;
			case 'BCH':
				currentDataId = 7;
				break;
			case 'LTC':
				currentDataId = 8;
				break;
			case 'MKR':
				currentDataId = 9;
				break;
			case 'DASH':
				currentDataId = 10;
				break;
			case 'XRP':
				currentDataId = 11;
				break;
		}
		// mainChartObj.series.map(function (item, index) {
		// 	if (item.type == 'column') {
		// 		switch (dataCurrency) {
		// 			case 'BTC':
		// 				if (item.name == 'Series 5') item.setData(columnData[0]);
		// 				if (item.name == 'Series 6') item.setData(columnData[1]);
		// 				currentDataId = 4;
		// 				break;
		// 			case 'XMR':
		// 				if (item.name == 'Series 5') item.setData(columnData[8]);
		// 				if (item.name == 'Series 6') item.setData(columnData[0]);
		// 				currentDataId = 3;
		// 				break;
		// 			case 'ETH':
		// 				if (item.name == 'Series 5') item.setData(columnData[2]);
		// 				if (item.name == 'Series 6') item.setData(columnData[3]);
		// 				currentDataId = 2;
		// 				break;
		// 			case 'RPL':
		// 				if (item.name == 'Series 5') item.setData(columnData[7]);
		// 				if (item.name == 'Series 6') item.setData(columnData[10]);
		// 				currentDataId = 5;
		// 				break;
		// 			case 'USD':
		// 				if (item.name == 'Series 5') item.setData(columnData[4]);
		// 				if (item.name == 'Series 6') item.setData(columnData[5]);
		// 				currentDataId = 6;
		// 				break;
		// 			case 'BCH':
		// 				if (item.name == 'Series 5') item.setData(columnData[6]);
		// 				if (item.name == 'Series 6') item.setData(columnData[7]);
		// 				currentDataId = 7;
		// 				break;
		// 			case 'LTC':
		// 				if (item.name == 'Series 5') item.setData(columnData[8]);
		// 				if (item.name == 'Series 6') item.setData(columnData[9]);
		// 				currentDataId = 8;
		// 				break;
		// 			case 'MKR':
		// 				if (item.name == 'Series 5') item.setData(columnData[10]);
		// 				if (item.name == 'Series 6') item.setData(columnData[11]);
		// 				currentDataId = 9;
		// 				break;
		// 			case 'DASH':
		// 				if (item.name == 'Series 5') item.setData(columnData[12]);
		// 				if (item.name == 'Series 6') item.setData(columnData[13]);
		// 				currentDataId = 10;
		// 				break;
		// 			case 'XRP':
		// 				if (item.name == 'Series 5') item.setData(columnData[14]);
		// 				if (item.name == 'Series 6') item.setData(columnData[15]);
		// 				currentDataId = 11;
		// 				break;
		// 		}
		// 	}
		// });
		updateMainChartSpline(currentDataId);
	}

	/*---------------------------------------------------*/
	/* js-scrollbar-outer */
	/*---------------------------------------------------*/
	var scrollbarLeft = $('.toolbar__scroll.scrollbar-left');

	$('.scrollbar-right').scrollbar();
	$('.left-bar__scroll.scrollbar-left').scrollbar();
	scrollbarLeft.scrollbar({
		"onScroll": function (y, x) {
			if (y.scroll == y.maxScroll) {
				$('.toolbar__scrollup__btn').show();
				$('.toolbar__scrolldown__btn').hide();
				if (y.maxScroll == 0) {
					$('.toolbar__scrollup__btn').hide();
				}
			} else {
				$('.toolbar__scrollup__btn').hide();
				$('.toolbar__scrolldown__btn').show();
			}
		}

	});

	$('.scrollbar-arrows').scrollbar({
		"scrollx": "advanced",
		"scrolly": "advanced",
		"showArrows": true,
		"onScroll": function (y, x) {
			if (y.scroll >= y.maxScroll - 10) {
				$('.graph-prices__scrollup__btn').show();
				$('.graph-prices__scrolldown__btn').hide();
			} else if (y.scroll > 0 && y.scroll < y.maxScroll) {
				$('.graph-prices__scrollup__btn').show();
				$('.graph-prices__scrolldown__btn').show();
			} else {
				$('.graph-prices__scrollup__btn').hide();
				$('.graph-prices__scrolldown__btn').show();
			}
		}
	});

	$('#user-btn').on('click', function () {
		$('body').toggleClass('menubar-in');
	});

	/*---------------------------------------------------*/
	/* Scroll up/down event for left toolbar */
	/*---------------------------------------------------*/
	$(".toolbar__scrollup__btn").on("click", function () {
		scrollbarLeft.animate({
			scrollTop: 0
		}, "slow");
	});

	$(".toolbar__scrolldown__btn").on("click", function () {
		scrollbarLeft.animate({
			scrollTop: scrollbarLeft.prop("scrollHeight") - scrollbarLeft.outerHeight()
		}, "slow");
	});

	/*---------------------------------------------------*/
	/* Scroll up/down event for graph prices */
	/*---------------------------------------------------*/
	var graphPricesScrollbar = $('.graph-prices__scroll.scrollbar-arrows');
	$(".graph-prices__scrollup__btn").on("click", function () {
		graphPricesScrollbar.animate({
			scrollTop: '-=200'
		}, "slow");
	});

	$(".graph-prices__scrolldown__btn").on("click", function () {
		graphPricesScrollbar.animate({
			scrollTop: '+=200'
		}, "slow");
	});

	/*---------------------------------------------------*/
	/* js-graph-prices-toggle */
	/*---------------------------------------------------*/

	$('#js-graph-prices-toggle').click(function () {
		$('.graph-prices').toggleClass('open');
		$(this).toggleClass('open');
		$('.b-graph__controls').toggleClass('shifted');
		redrawMainChart();
	});

	$('.b-graph').mousemove(function (e) {
		var x = e.pageX - $('.b-graph').offset().left;
		if ($('.b-graph').width() - x < 10) {
			if (!$('.graph-prices').hasClass('open')) {
				$('.graph-prices').addClass('open');
				$('.b-graph__controls').addClass('shifted');
				redrawMainChart();
				$('.b-graph__controls .graph-prices__controls__btn__open').removeClass('open');
			}
		} else {
			if ($('.b-graph').width() - x > 300) {
				if ($('.graph-prices').hasClass('open') && !$('.graph-prices').hasClass('noClose')) {
					$('.graph-prices').removeClass('open');
					$('.b-graph__controls').removeClass('shifted');
					redrawMainChart();
					$('.b-graph__controls .graph-prices__controls__btn__open').addClass('open');
				}
			}
		}
	});

	$('.b-graph').mouseleave(function (e) {
		var x = e.pageX - $('.b-graph').offset().left;
		if (x < $('.b-graph').width() - 5) {
			if ($('.graph-prices').hasClass('open') && !$('.graph-prices').hasClass('noClose')) {
				$('.graph-prices').removeClass('open');
				$('.b-graph__controls').removeClass('shifted');
				redrawMainChart();
				$('.b-graph__controls .graph-prices__controls__btn__open').addClass('open');
			}
		} else {
			$('.graph-prices').addClass('open');
			$('.b-graph__controls').addClass('shifted');
			redrawMainChart();
			$('.b-graph__controls .graph-prices__controls__btn__open').removeClass('open');
		}
	});

	/*---------------------------------------------------*/
	/* js-select */
	/*---------------------------------------------------*/

	$('.js-select').click(function () {
		$(this).toggleClass('open');
	});

	/*---------------------------------------------------*/
	/* js-orders-switch */
	/*---------------------------------------------------*/

	$('#orders .c-block-head ul li').click(function () {
		$('#orders .c-block-head ul li').removeClass('current');
		$(this).addClass('current');
		var currentIndex = $(this).index();
		$('#orders .forms-wrap').removeClass('current');
		$('#orders .forms-wrap').eq(currentIndex).addClass('current');
	});

	/*---------------------------------------------------*/
	/* BASIC account-js-menu */
	/*---------------------------------------------------*/


	$('.user-portfolio .user-menu .user-menu__item').on('click', function () {
		// turn off last one
		if ($(this).index() != 3) {
			$('.user-portfolio .user-menu .user-menu__item').removeClass('current');
			$(this).addClass('current');
			$('.js-tabs-panel').removeClass('active');
			$('.js-tabs-panel').eq($(this).index()).addClass('active');
		}

		// Wallet
		if ($(this).index() == 0) {
			liquidityChartObj = Highcharts.chart('liquidityChart', liquidityChartOptions);
			drawCircleChart();
		}

		// Portfolio tab
		if ($(this).index() == 1) {
			if (!portfolioChartObj)
				portfolioChartObj = Highcharts.stockChart('portfolioChartGeneral', portfolioChartOptions);
		}
	});

	/*---------------------------------------------------*/
	/* ADVANCED account-js-menu */
	/*---------------------------------------------------*/

	$('.advanced .accounts-diagram-wrap').click(function () {
		$('.js-tabs-panel').removeClass('active');
		$('#panel-funds-portfolio').addClass('active');
		$('.main-cols__right-bottom .portfolio-menu__item').eq(1).trigger('click');
		$('.advanced .js-account-stats .portfolio-drop').addClass('hidden');
		if (!portfolioChartObj)
			portfolioChartObj = Highcharts.stockChart('portfolioChartGeneral', portfolioChartOptions);

		// basic page menu 
		/* 		$('.user-portfolio .user-menu .user-menu__item').removeClass('current');
				$('.user-portfolio .user-menu .user-menu__item').eq(1).addClass('current'); */
	});

	$('.portfolio-back').click(function () {
		$('.js-tabs-panel').removeClass('active');
		$('#panel-funds-wallet').addClass('active');
		$('.advanced .js-account-stats .portfolio-drop').removeClass('hidden');
		drawCircleChart();
	});

	$('.advanced .js-account-stats .portfolio-drop .menu-dropdown__item').on('click', function () {
		$('.js-account-stats .portfolio-drop .menu-dropdown__item').removeClass('active');
		$(this).addClass('active');

		$('.advanced .js-account-stats .portfolio-drop .c-block-head__title').text($(this).text());
		$('.js-tabs-panel').removeClass('active');
		$('.js-tabs-panel').eq($(this).index()).addClass('active');

		// Global liquidity
		if ($(this).index() == 0) {
			liquidityChartObj = Highcharts.chart('liquidityChart', liquidityChartOptions);
		}

		// Wallet tab
		if ($(this).index() == 2) {
			drawCircleChart();
		}
	});


	/*---------------------------------------------------*/
	/* functions for zoomin, zoomout of liquid graph */
	/*---------------------------------------------------*/
	$('.js-tabs-panel .liquidityText .centerPart svg').click(function () {
		var current_Xmin = liquidityChartObj.xAxis[0].min;
		var current_Xmax = liquidityChartObj.xAxis[0].max;
		var current_Xrange = current_Xmax - current_Xmin;

		var current_center = (current_Xmin + current_Xmax) / 2;
		if ($(this).index() == 2) {
			if (current_Xrange <= 24 * 3600 * 1000 * 3) return false;
			var new_Xmin = current_center - current_Xrange / 3;
			var new_Xmax = current_center + current_Xrange / 3;
			liquidityChartOptions.xAxis.min = new_Xmin;
			liquidityChartOptions.xAxis.max = new_Xmax;
			liquidityChartObj = Highcharts.chart('liquidityChart', liquidityChartOptions);
		} else if ($(this).index() == 0) {
			if (current_Xrange >= 24 * 3600 * 1000 * 90) return false;
			var new_Xmin = current_center - current_Xrange * 2 / 3;
			var new_Xmax = current_center + current_Xrange * 2 / 3;
			liquidityChartOptions.xAxis.min = new_Xmin;
			liquidityChartOptions.xAxis.max = new_Xmax;
			liquidityChartObj = Highcharts.chart('liquidityChart', liquidityChartOptions);
		}
	});

	/*---------------------------------------------------*/
	/* functions for change theme */
	/*---------------------------------------------------*/

	$('#switch-theme').change(function () {
		var darkTheme = $('#switch-theme:checked').length;
		if (darkTheme) {
			$('body').addClass('dark-theme');
		} else {
			$('body').removeClass('dark-theme');
		}
		changeTheme();
	});

	function changeTheme() {
		if ($('body').hasClass('dark-theme')) {
			var backColor = '#18202d';
			var gridColor = '#24425b';
			var labelColor = '#9BA6B2';
			//var lineColor = '#4F6C82';
			var lineColor = '#344756';
		} else {
			var backColor = '#ffffff';
			var gridColor = '#ccd6eb';
			var labelColor = '#666666';
			var lineColor = '#BFC0C0';
		}
		changeChartsColors(backColor, gridColor, labelColor, lineColor);
	}

	/*---------------------------------------------------*/
	/* change colors in all charts */
	/*---------------------------------------------------*/
	function changeChartsColors(backColor, gridColor, labelColor, lineColor) {

		// portfolioChart
		var stylesForPortfolioChart = {
			chart: {
				backgroundColor: backColor
			},
			xAxis: [{
				gridLineColor: gridColor,
				lineColor: gridColor,
				/* 				crosshair: {
				 					label: {
										backgroundColor: backColor,
										style: {
											color: fontColor
										}
									} 
								}, */
				labels: {
					style: {
						color: labelColor
					}
				}
			}],
			yAxis: {
				gridLineColor: gridColor
			}
		};
		changeChartStylesOptions(stylesForPortfolioChart, portfolioChartOptions);
		/* 		changeChartStylesOptions(stylesForPortfolioChart, portfolioChartBTCOptions);
				changeChartStylesOptions(stylesForPortfolioChart, portfolioChartETHOptions); */

		if (portfolioChartObj) portfolioChartObj.update(stylesForPortfolioChart);
		/* 		if (portfolioChartBTCObj) portfolioChartBTCObj.update(stylesForPortfolioChart);
				if (portfolioChartETHObj) portfolioChartETHObj.update(stylesForPortfolioChart); */

		// liquidityChart
		var stylesForLiquidityChart = {
			chart: {
				backgroundColor: backColor
			},
			xAxis: {
				gridLineColor: gridColor,
				lineColor: gridColor,
				/* 				crosshair: {
									label: {
										backgroundColor: backColor,
										style: {
											color: fontColor
										}
									}
								}, */
				labels: {
					style: {
						color: labelColor
					}
				}
			},
			yAxis: [{
					gridLineColor: gridColor,
					labels: {
						style: {
							color: labelColor
						}
					}
				},
				{
					gridLineColor: gridColor,
					labels: {
						style: {
							color: labelColor
						}
					}
				}
			]
		};

		changeChartStylesOptions(stylesForLiquidityChart, liquidityChartOptions);

		if (liquidityChartObj)
			liquidityChartObj.update(stylesForLiquidityChart);

		// MainChart
		var stylesForMainChart = {
			chart: {
				backgroundColor: backColor
			},
			xAxis: {
				gridLineColor: gridColor,
				lineColor: gridColor,
				labels: {
					style: {
						color: labelColor
					}
				}
			},
			yAxis: {
				gridLineColor: gridColor,
				labels: {
					style: {
						color: labelColor
					}
				}
			},
			plotOptions: {
				/* 				areaspline: {
									color: lineColor
								} */
			}
		};

		if (mainChartObj) {
			mainChartObj.series.map(function (item, index) {
				if (item.type == 'areaspline') {
					// add fill color on theme change 
					if (index == mainGraphHighlighted - 1) {
						item.setOptions({
							fillColor: {
								linearGradient: [0, 0, 0, $('#mainChart').height() - 50],
								stops: gradientColor
							},
							id: item.options.id,
							lineWidth: item.options.lineWidth,
							color: item.options.color,
							enableMouseTracking: item.options.enableMouseTracking
						});
					} else {
						var inactiveLinecolor = index < 4 ? lineColor : 'rgba(0, 0, 0, 0)';
						item.setOptions({
							color: inactiveLinecolor,
							lineWidth: item.options.lineWidth,
							id: item.options.id,
							enableMouseTracking: item.options.enableMouseTracking
						});
					}
				}

			});
			mainChartObj.update(stylesForMainChart);
		}
	}

	/*---------------------------------------------------*/
	/* show Orders form */
	/*---------------------------------------------------*/
	var isSelectedPrevConversion = false;

	$('.basic-table').on('click', '.basic-table__row:not(.head)', function () {
		$(this).parent().find('.basic-table__row').removeClass('active');
		$(this).addClass('active');

		var price = $(this)[0].children[0].innerText;
		price = price.replace(/,/g, '');
		var amount = $(this)[0].children[1].innerText;

		// show order form
		if ($(this).parents('#orderBook').length) {
			$('#orders').css('display', 'flex');
			$('.btn-table-toggle').addClass('open');
			calculateHeightOfFirstTable();
			$('#orders .forms-wrap .order-form__input.amount').val(amount);
			$('#orders .forms-wrap .order-form__input.price').val(price);
		}

		// select value in exch-dropdown
		if ($(this).parents('#panel-funds-wallet').length) {
			var icon = $(this).find('svg').eq(0)[0].childNodes[1].getAttribute('xlink:href');
			$('.exch-head__send .exch-dropdown__list .exch-dropdown__item').each(function () {
				if (icon == $(this).find('svg').eq(0)[0].childNodes[1].getAttribute('xlink:href')) {
					$(this).trigger('click');
					$('.exch-dropdown').removeClass('open');
					return false;
				}
			});
			// select USD in GET dropdown
			$('.exch-head__get .exch-dropdown__list .exch-dropdown__item').eq(2).trigger('click');
		}

		if ($(this).parents('#panel-funds-history').length) {
			$('.graph-prices').addClass('open');
			$('.b-graph__controls').addClass('shifted');
			redrawMainChart();
			$('.b-graph__controls .graph-prices__controls__btn__open').removeClass('open');
			var convertedText = $(this).find('.basic-table__col').eq(1).html();
			convertedText = convertedText.replace(/\s\s+/g, ' ');
			var convertedArr = convertedText.split(svgArrowTemplate);
			var firstCurrency = convertedArr[0].trim().slice(-3);
			var secondCurrency = convertedArr[1].trim().slice(-3);
			$('.exch-head__send .exch-dropdown__list .exch-dropdown__item[data-currency="' + firstCurrency + '"]').trigger('click');
			$('.exch-head__get .exch-dropdown__list .exch-dropdown__item[data-currency="' + secondCurrency + '"]').trigger('click');
			$('.exch-form__send input').val(numberWithCommas(convertedArr[0].trim().slice(0, -4)));
			$('.exch-form__get input').val(numberWithCommas(convertedArr[1].trim().slice(0, -4)));
			isSelectedPrevConversion = true;

			// show exchanges of previous conversion
			var remain_total_value = convertedArr[0].trim().slice(0, -4).replace(',', '');
			$('.icon-trader').addClass('hidden');
			$('.graph-prices__item .progress-label').css({
				'visibility': 'visible',
				'width': '102%'
			});
			$('.progressbar').removeClass('hidden');
			for (var i = 0; i < progressbar_array.length; i++) {
				var progressbar = progressbar_array[i];
				progressbar.progressbar("value", 100);
				var rand = 0;
				if (i == progressbar_array.length - 1) {
					rand = Math.floor(remain_total_value * 100) / 100;
				} else {
					var conversion_part = remain_total_value / (progressbar_array.length - i);
					rand = Math.floor(Math.random() * 2 * conversion_part * 100) / 100;
					if (rand == 0) rand = 0.01;
					remain_total_value -= rand;
				}
				progressbar_labels[i].text(rand + ' ' + firstCurrency);
			}
			// end show exnchanges
		}

	});

	/*---------------------------------------------------*/
	/* chat events */
	/*---------------------------------------------------*/	

	$('.chat-head__back').click(function () {
		$('.main-cols__left-top .d-flex .c-block__col').toggleClass('hidden');
	});

	$('.chats-list__item').click(function () {
		//var chatName = $(this).find('.chats-list__name').html().replace(/<a\b[^>]*>(.*?)<\/a>/i, '')
		var chatName = $(this).find('.chats-list__name').text();
		$('.chat-head__name').text(chatName);
		$('.main-cols__left-top .d-flex .c-block__col, .chat-talk').toggleClass('hidden');
	});

	/** send bitcoin button event in the chat list */
	$('.chats-list__send').click(function(e) {
		event.preventDefault();
		e.stopPropagation();		
		var fancies_length = $('.b-graph .c-block .fancybox-container').length;
		if (fancies_length < 1) {
			$.fancybox.open({
				src: '#send-btc-popup',
				opts: {
					afterShow: function (instance, current) {
						var fancybox_body = $('.fancybox-container')[0];
						$('.b-graph .c-block')[0].append(fancybox_body);
						$('.b-graph .c-block .fancybox-container')
							.css({
								"width": "100%",
								"height": "100%",
								"display": "block",
								"position": "absolute"
							})
							.css("display", "block");
					},
					beforeShow: function () {
						$('.fancybox-container').css("display", "none");
					},
					beforeClose: function () {
						//$('.exch-form').removeClass('progress');
						// $('.exch-head').toggleClass('open');						
					}
				}
			});
		}
	});

	/* 	
	// show wallet of another user
	$('.chats-list__item .chats-list__name a').click(function (event) {
		event.preventDefault();
		event.stopPropagation();
		$('.user-portfolio-close').removeClass('hidden');
		var newWallet = $(this).attr('href');
		currentWallet = wallets[newWallet];
		updateWalletData();
		drawCircleChart();
		var userPortfolioName = $(this).closest('.chats-list__item').find('.chats-list__name').html().replace(/<a\b[^>]*>(.*?)<\/a>/i, '')
		var userPortfolioImage = $(this).closest('.chats-list__item').find('.chats-list__avatar-wrap img').attr('src');
		$('.user-portfolio__name').text(userPortfolioName);
		$('.user-portfolio .user-pic__avatar').attr('src', userPortfolioImage).removeClass('hidden');
		$('div.user-pic__avatar').remove();
	}); */

	$('.user-portfolio-close').click(function () {
		$(this).addClass('hidden');
		setOwnName();
		currentWallet = ownWallet;
		updateWalletData();
		drawCircleChart();
	});

	/*---------------------------------------------------*/
	/* change range on Portfolio Chart */
	/*---------------------------------------------------*/

	/* 	$('.portfolio-period .portfolio-period__item').click(function () {
			$('.portfolio-period .portfolio-period__item').removeClass('current');
			$(this).addClass('current');
			portfolioChartCurrentRange = $(this).index();
			portfolioChartObj.rangeSelector.clickButton(portfolioChartCurrentRange, {}, true);

			portfolioChartBTCCurrentRange = $(this).index();
			portfolioChartBTCObj.rangeSelector.clickButton(portfolioChartBTCCurrentRange, {}, true);

			portfolioChartETHCurrentRange = $(this).index();
			portfolioChartETHObj.rangeSelector.clickButton(portfolioChartETHCurrentRange, {}, true);

			updatePortfolioStats();
		});

		function updatePortfolioStats(currencyChange) {
			var currentSlide = $('.portfolioChartParent').slick('slickCurrentSlide');
			var currentPeriod = $('.portfolio-period .portfolio-period__item.current').index();
			if (currencyChange) {
				if (currentSlide == 0) {
					$('.portfolio-stats__amount-tip').text('Portfolio value');
					circleChartSmallObj = Highcharts.chart('circleChartSmall', circleChartSmallOptions);
				} else if (currentSlide == 1) {
					$('.portfolio-stats__amount-tip').text('Bitcoin');
					$('.portfolio-stats__currency').html('').append('<svg class="chat-head__curr clr-bitcoin" style="display: block;" role="img" aria-hidden="true"> <use xmlns: xlink = "http://www.w3.org/1999/xlink"xlink: href = "img/sprite-inline.svg#curr-bitcoin" > < /use> </svg>');
				} else if (currentSlide == 2) {
					$('.portfolio-stats__amount-tip').text('Ethereum');
					$('.portfolio-stats__currency').html('').append('<svg class="chat-head__curr clr-ethereum" style="display: block;" role="img" aria-hidden="true"> <use xmlns: xlink = "http://www.w3.org/1999/xlink"xlink: href = "img/sprite-inline.svg#curr-ethereum" > < /use> </svg>');
				}
			}
			$('.portfolio-stats__dinamic').text(portfolioChartArrChanges[currentSlide][currentPeriod][0]);
			$('.portfolio-stats__amount-value').text(portfolioChartArrChanges[currentSlide][currentPeriod][1]);
			$('.portfolio-stats__amount-cent').text(portfolioChartArrChanges[currentSlide][currentPeriod][2]);
		} */

	/*---------------------------------------------------*/
	/* Graph prices list */
	/*---------------------------------------------------*/

	var mainChartFirstColor = lineColor;
	var mainChartSecondColor = '#dbdbdb';
	var mainChartColorForHidden = 'rgba(0, 0, 0, 0)';

	if ($('body').hasClass('dark-theme')) {
		mainChartSecondColor = '#344756';
	}

	$('.graph-prices .graph-prices__list .graph-prices__item').click(function () {
		$('.graph-prices__list .graph-prices__item').removeClass('active');
		$(this).addClass('active');
		var currentDataId = parseInt($(this).attr('data-id'));
		updateMainChartSpline(currentDataId);
	});

	function updateMainChartSpline(currentDataId) {
		// mainChartObj.series.map(function (item, index) {
		// 	if (item.type == 'areaspline') {
		// 		var inactiveLinecolor = index < 4 ? mainChartSecondColor : mainChartColorForHidden;
		// 		item.update({
		// 			color: inactiveLinecolor,
		// 			fillColor: {
		// 				linearGradient: [0, 0, 0, $('#mainChart').height() - 50],
		// 				stops: [
		// 					[0, Highcharts.Color(mainChartFirstColor).setOpacity(0).get('rgba')],
		// 					[1, Highcharts.Color(mainChartFirstColor).setOpacity(0).get('rgba')]
		// 				]
		// 			},
		// 			lineWidth: 0.5,
		// 			enableMouseTracking: false,
		// 			zIndex: 1
		// 		});
		// 	}
		// });
		var inactiveLinecolor = mainGraphHighlighted <= 4 ? mainChartSecondColor : mainChartColorForHidden;
		mainChartObj.series[mainGraphHighlighted - 1].update({
			color: inactiveLinecolor,
			fillColor: {
				linearGradient: [0, 0, 0, $('#mainChart').height() - 50],
				stops: [
					[0, Highcharts.Color(mainChartFirstColor).setOpacity(0).get('rgba')],
					[1, Highcharts.Color(mainChartFirstColor).setOpacity(0).get('rgba')]
				]
			},
			lineWidth: 0.5,
			enableMouseTracking: false,
			zIndex: 1
		});
		if (mainChartObj.series[currentDataId - 1] == undefined) {
			mainGraphHighlighted = currentDataId;
			return false;
		}

		mainChartObj.series[currentDataId - 1].update({
			fillColor: {
				linearGradient: [0, 0, 0, $('#mainChart').height() - 50],
				stops: gradientColor
			},
			color: mainChartFirstColor,
			lineWidth: 3,
			enableMouseTracking: true,
			trackByArea: true,
			zIndex: 10
		});

		mainGraphHighlighted = currentDataId;
	}

	/* 	$('.graph-prices .graph-prices__list .graph-prices__item').hover(function () {
			var currentDataId = $(this).attr('data-id');
			mainChartObj.series.map(function (item, index) {
				if (item.type == 'areaspline') {
					if (item.options.lineWidth > 1) {
						item.update({
							lineWidth: 1,
							color: mainChartSecondColor
						});
					}
					if (item.options.id == currentDataId) {
						item.update({
							lineWidth: 3,
							color: mainChartFirstColor
						});
					}
				}
			});
		}); */

	/* 	$('.graph-prices__list').mouseleave(function () {
			mainChartObj.series.map(function (item, index) {
				if (item.type == 'areaspline') {
					item.update({
						lineWidth: 1,
						color: mainChartSecondColor,
						enableMouseTracking: false,
						zIndex: 1
					});
					if (item.options.id == mainGraphHighlighted) {
						item.update({
							lineWidth: 3,
							color: mainChartFirstColor,
							enableMouseTracking: true,
							trackByArea: true,
							zIndex: 10
						});
					}
				}
			});
		}); */


	/*---------------------------------------------------*/
	/* Graph prices select */
	/*---------------------------------------------------*/
	$('.graph-prices .labeled-dropdown__list .labeled-dropdown__item').click(function () {
		$('.graph-prices .labeled-dropdown__list .labeled-dropdown__item').removeClass('active');
		$(this).addClass('active');
		$('.graph-prices .labeled-dropdown__selected').text($(this).text());
	});

	/*---------------------------------------------------*/
	/* Graph prices list show/hidden */
	/*---------------------------------------------------*/
	$('.graph-prices .graph-prices__controls__btn').click(function () {
		if ($('.graph-prices').hasClass('open') && !$('.graph-prices').hasClass('noClose')) {
			$('.graph-prices').removeClass('open');
			$('.b-graph__controls').removeClass('shifted');
			redrawMainChart();
			$('.b-graph__controls .graph-prices__controls__btn__open').addClass('open');
		}
	});

	/*---------------------------------------------------*/
	/* Graph prices list show/hidden */
	/*---------------------------------------------------*/
	$('.b-graph__controls .graph-prices__controls__btn__open').click(function () {
		if (!$('.graph-prices').hasClass('open')) {
			$(this).removeClass('open');
			$('.graph-prices').addClass('open');
			$('.b-graph__controls').addClass('shifted');
			redrawMainChart();
		}
	});

	/*---------------------------------------------------*/
	/* Main graph size change */
	/*---------------------------------------------------*/

	$('#js-graph-size-toggle').click(function () {
		if ($('.b-graph.fullScreen').length) {
			$('.b-graph').removeClass('fullScreen');
			$('.exch-head').css("z-index", "100000");
		} else {
			$('.exch-head').css("z-index", "5");
			$('.b-graph').addClass('fullScreen');
		}
		redrawMainChart();
	});

	/*---------------------------------------------------*/
	/* exchange progressbar */
	/*---------------------------------------------------*/
	var progressbar_list = $(".progressbar");
	var progressbar_array = new Array();
	var progressbar_labels = new Array();
	for (var i = 0; i < progressbar_list.length; i++) {
		var progressbar = $(".graph-prices__list .progressbar:eq(" + i + ")");
		var progressbar_label = $(".graph-prices__list .progressbar .progress-label:eq(" + i + ")");
		progressbar.progressbar({
			value: false,
			change: function () {
				//progressLabel.text( progressbar.progressbar( "value" ) + "%" );
			},
			complete: function () {
				//progressLabel.text( "Complete!" );
			}
		});
		progressbar_array.push(progressbar);
		progressbar_labels.push(progressbar_label);
	}

	function progress(i) {
		var val = progressbar_array[i].progressbar("value") || 0;
		if (val == 10) {
			progressbar_labels[i].css('visibility', 'visible');
		}
		progressbar_array[i].progressbar("value", val + 2);
		progressbar_labels[i].css("width", (val + 2) + '%');
		if (val < 99) {
			setTimeout(progress, 80, i);
		} else if (i > 2) {
			graphPricesScrollbar.animate({
				scrollTop: '+=80'
			}, "slow");
		}
	}

	/*---------------------------------------------------*/
	/* Currency switch */
	/*---------------------------------------------------*/

	$('.exch-head__switch').click(function () {
		$(this).toggleClass('switched');
		var firstCurr = $('.exch-form__send input').attr('data-currency');
		var secondCurr = $('.exch-form__get input').attr('data-currency');
		$('.exch-head__send .exch-dropdown__list .exch-dropdown__item[data-currency="' + secondCurr + '"]').trigger('click');
		$('.exch-head__get .exch-dropdown__list .exch-dropdown__item[data-currency="' + firstCurr + '"]').trigger('click');
		$('.exch-dropdown').removeClass('open');
	});

	/*---------------------------------------------------*/
	/* Table column sorted */
	/*---------------------------------------------------*/

	$('.basic-table__row.head > div').click(function () {
		if ($(this).hasClass('sorted-down')) {
			$(this).closest('.basic-table__row.head').find(' > div').removeClass('sorted-down');
			$(this).addClass('sorted-up');
		} else {
			$(this).closest('.basic-table__row.head').find(' > div').removeClass('sorted-up sorted-down');
			$(this).addClass('sorted-down');
		}
	});

	/*---------------------------------------------------*/
	/* Fancybox popup */
	/*---------------------------------------------------*/

	$('[transaction-fancybox]').click(function (e) {
		e.preventDefault();
		var fancies_length = $('.b-graph .c-block .fancybox-container').length;
		if (fancies_length < 1) {
			$.fancybox.open({
				src: '#transaction-popup',
				opts: {
					afterShow: function (instance, current) {
						var fancybox_body = $('.fancybox-container')[0];
						$('.b-graph .c-block')[0].append(fancybox_body);
						$('.b-graph .c-block .fancybox-container')
							.css({
								"width": "100%",
								"height": "100%",
								"display": "block",
								"position": "absolute"
							})
							.css("display", "block");
					},
					beforeShow: function () {
						$('.fancybox-container').css("display", "none");
					},
					beforeClose: function () {
						//$('.exch-form').removeClass('progress');
						// $('.exch-head').toggleClass('open');
						$('button[transaction-fancybox]').removeClass('active');
					}
				}
			});
		}
	});

	/*---------------------------------------------------*/
	/* Chat Search toggle */
	/*---------------------------------------------------*/

	$('.js-chat-search-toggle').click(function () {
		$(this).closest('.chat-head').find('.chat-head__search').toggleClass('open');
	});

	/*---------------------------------------------------*/
	/* Open orders click */
	/*---------------------------------------------------*/

	$('.js-open-orders input').change(function () {
		if ($('#switch-trading-real:checked').length) {
			$('.main-cols__right-bottom .js-tabs-panel').removeClass('active');
			$('#panel-funds-orders').addClass('active');
		} else {
			$('.main-cols__right-bottom .js-tabs-panel').removeClass('active');
			$('#panel-funds-history').addClass('active');
		}
	});

	/*---------------------------------------------------*/
	/* first popUp layer close */
	/*---------------------------------------------------*/

	$('.exch-head__btn').click(function () {
		// basic
		if (!$('body').hasClass('advanced')) {
			$('.js-tabs-panel').removeClass('active');
			$('#panel-funds-history').addClass('active');
			//$('.user-portfolio .user-menu .user-menu__item').eq(2).trigger('click');
		}
		//advanced
		else {
			$('#tab-funds-history').trigger('click');
			$('.menu-dropdown').removeClass('open');
		}
	});

	// On before slide change
	$('.portfolioChartParent').on('afterChange', function (event, slick, currentSlide, nextSlide) {
		updatePortfolioStats(true);
	});

	var dynamicGetValue;

	// convert/go buttons
	$('.exch-head__btn, .exch-form__submit').click(function (e) {
		e.preventDefault();
		var sendCurrency = $('.exch-form__send input').attr('data-currency');
		var getCurrency = $('.exch-form__get input').attr('data-currency');
		if ($(this).hasClass('exch-form__submit')) {
			$('.exch-form__close').addClass('hidden');
			$('.icon-trader').addClass('hidden');
			$('.graph-prices__item').removeClass('active');
			$('.graph-prices__item .progress-label').css('visibility', 'hidden');
			$('.progressbar').removeClass('hidden');

			clearInterval(dynamicGetValue);

			var firstValue = $('.exch-form__send input').val().trim().replace(',', '');
			var secondValue = $('.exch-form__get input').val().trim().replace(',', '')
			var firstValuePart = firstValue / progressbar_array.length;
			var secondValuePart = secondValue / progressbar_array.length;
			var firstValueResult = 0;
			var secondValueResult = 0;
			var exchanges = 0;

			// update wallet and table
			ownWallet[sendCurrency] -= firstValue;
			ownWallet[getCurrency] += (+secondValue);
			updateWalletData();
			drawCircleChart();
			// end update wallet and table

			graphPricesScrollbar.animate({
				scrollTop: 0
			}, "slow");

			var remain_total_value = firstValue;
			for (var i = 0; i < progressbar_array.length; i++) {
				var progressbar = progressbar_array[i];
				progressbar.progressbar("value", 0);
				setTimeout(progress, 1000 + 1200 * i, i);

				var rand = 0;
				if (i == progressbar_array.length - 1) {
					rand = Math.floor(remain_total_value * 100) / 100;
				} else {
					var conversion_part = remain_total_value / (progressbar_array.length - i);
					rand = Math.floor(Math.random() * 2 * conversion_part * 100) / 100;
					if (rand == 0) rand = 0.01;
					remain_total_value -= rand;
				}
				progressbar_labels[i].text(rand + ' ' + sendCurrency);

				if (!$('body').hasClass('advanced')) {
					setTimeout(function () {
						firstValueResult += firstValuePart;
						secondValueResult += secondValuePart;
						$('#panel-funds-history .basic-table__body .basic-table__row').eq(0).find('.basic-table__col').eq(1).html(firstValueResult.toFixed(2) + ' ' + sendCurrency + svgArrowTemplate + secondValueResult.toFixed(2) + ' ' + getCurrency)
					}, 4000 + 1000 + 1200 * i, i);

					// increase exchanges numbers
					setTimeout(function () {
						exchanges++;
						$('#panel-funds-history .basic-table__body .basic-table__row').eq(0).find('.basic-table__col').eq(3).html(exchanges + " Exchanges");
					}, 4000 + 1000 + 1200 * i, i)
				}

				if (i == progressbar_array.length - 1) {
					setTimeout(function () {
						$('.exch-form').addClass('completed');
						$('.exch-form__submit > span').html('DONE');
						$('#panel-funds-history .basic-table__body .basic-table__row').eq(0).find('.basic-table__col').eq(0).html('Just now');
						$('.exch-form__submit').attr("disabled", true);

						$(window).click(function () {
							if ($('.exch-form').hasClass('completed')) {
								$('.exch-form').removeClass('progress');
								$('.exch-head').removeClass('open');
								$('.graph-prices').removeClass('noClose');
								$('.exch-form__submit').attr("disabled", false);
								$('.exch-form').removeClass('completed');
								$('.exch-form__close').removeClass('hidden');
								$('.exch-form__submit > span').html('CONFIRM');

								if (!isSelectedPrevConversion) {
									$('.icon-trader').removeClass('hidden');
									$('.graph-prices__item .progress-label').css('visibility', 'visible');
									$('.progressbar').addClass('hidden');
									for (var j = 0; j < progressbar_array.length; j++) {
										progressbar_array[j].progressbar("value", 0);
									}
								}
							}
						});
					}, 4000 + 1000 + 1200 * i, i);
				}
			}

			$('.exch-form').addClass('progress');
			$('#panel-funds-history .basic-table__body .basic-table__row').removeClass('active');
			$('#panel-funds-history .basic-table__body .basic-table__row').eq(0).removeClass('hidden').addClass('active');
			if (!$('body').hasClass('advanced')) {
				$('#panel-funds-history .basic-table__body .basic-table__row').eq(0).find('.basic-table__col').eq(0).html('<img src="https://late-exairu.github.io/BCT/img/spin-blue.svg">');
				$('#panel-funds-history .basic-table__body .basic-table__row').eq(0).find('.basic-table__col').eq(1).html('0.00 ' + sendCurrency + svgArrowTemplate + ' 0.00 ' + getCurrency);
				var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
				var differenceMax = (currenciesPrice[sendCurrency] / currenciesPrice[getCurrency]) / 1250;
				var differenceMin = differenceMax / 500;
				var difference = (Math.random() * (differenceMax - differenceMin) + differenceMin) * plusOrMinus;
				var result = (currenciesPrice[sendCurrency] / currenciesPrice[getCurrency]) + difference;
				if (result > 1) {
					result = result.toFixed(2);
				} else {
					result = result.toFixed(5);
				}
				$('#panel-funds-history .basic-table__body .basic-table__row').eq(0).find('.basic-table__col').eq(2).html(result + ' ' + getCurrency);
			}
			$('.graph-prices').addClass('open noClose');
			$('.b-graph__controls').addClass('shifted');
			redrawMainChart();
			$('.b-graph__controls .graph-prices__controls__btn__open').removeClass('open');

			/*			var fancies_length = $('.b-graph .c-block .fancybox-container').length;
			 			if (fancies_length < 1) {
							$.fancybox.open({
								src: '#exchange-step_2',
								opts: {
									afterShow: function (instance, current) {
										var fancybox_body = $('.fancybox-container')[0];
										$('.b-graph .c-block')[0].append(fancybox_body);
										$('.b-graph .c-block .fancybox-container')
											.css({
												"width": "100%",
												"height": "100%",
												"display": "block",
												"position": "absolute"
											})
											.css("display", "block");
									},
									beforeShow: function () {
										$('.fancybox-container').css("display", "none");
									},
									beforeClose: function () {
										$('.exch-form').removeClass('progress');
										$('.exch-head').toggleClass('open');
									}
								}
							});
						} */
		} else {
			$(this).closest('.exch-head').toggleClass('open');
			var firstValue, secondValue;
			// if selected previous conversion
			if (isSelectedPrevConversion) {
				firstValue = $('.exch-form__send input').val();
				secondValue = $('.exch-form__get input').val();
			} else {
				firstValue = ownWallet[sendCurrency].toFixed(2);
				secondValue = ((ownWallet[sendCurrency] * currenciesPrice[sendCurrency]) / currenciesPrice[getCurrency]).toFixed(2);
			}
			$('.exch-form__send input').val(numberWithCommas(firstValue));
			$('.exch-form__get input').val(numberWithCommas(secondValue));
			isSelectedPrevConversion = false;

			dynamicGetValue = setInterval(function () {
				secondValue *= (Math.random() * (101 - 99) + 99) / 100;
				$('.exch-form__get input').val(numberWithCommas(secondValue.toFixed(2)));
			}, 1000);

			setOwnName();
			currentWallet = ownWallet;
			updateWalletData();
			drawCircleChart();
			$('.user-portfolio-close').addClass('hidden');
		}
	});

	$('.exch-form__close').click(function (e) {
		e.preventDefault();
		$(this).closest('.exch-head').toggleClass('open');
	});

	$('.exch-form input').focus(function () {
		var newValue = $(this).val().replace(/[^\d.-]/g, '');
		$(this).val(newValue);
	});

	$('.exch-form input').blur(function () {
		var newValue = numberWithCommas($(this).val())
		$(this).val(newValue);
	});

	$('.exch-form input').keydown(function (e) {
		var key = e.charCode || e.keyCode || 0;
		// allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
		// home, end, period, and numpad decimal
		return (
			key == 8 ||
			key == 9 ||
			key == 13 ||
			key == 46 ||
			key == 110 ||
			key == 190 ||
			(key >= 35 && key <= 40) ||
			(key >= 48 && key <= 57) ||
			(key >= 96 && key <= 105));
	});

	$('.exch-form input').keyup(function () {
		var sendCurrency = $('.exch-form__send input').attr('data-currency');
		var getCurrency = $('.exch-form__get input').attr('data-currency');

		if ($(this).parent().hasClass('exch-form__send')) {
			var firstValue = $(this).val();
			var secondValue = ((firstValue * currenciesPrice[sendCurrency]) / currenciesPrice[getCurrency]).toFixed(2);
			$('.exch-form__get input').val(numberWithCommas(secondValue));

			clearInterval(dynamicGetValue);
			dynamicGetValue = setInterval(function () {
				secondValue *= (Math.random() * (101 - 99) + 99) / 100;
				$('.exch-form__get input').val(numberWithCommas(secondValue.toFixed(2)));
			}, 1000);

		} else {
			var secondValue = $(this).val();
			var firstValue = ((secondValue * currenciesPrice[getCurrency]) / currenciesPrice[sendCurrency]).toFixed(2);
			$('.exch-form__send input').val(numberWithCommas(firstValue));
		}
	});

	$('.transaction-form__to-clipdoard').click(function () {
		var copyText = document.querySelector(".transaction-form__input.with-copy");
		copyText.select();
		document.execCommand("copy");
		$(".transaction-form__input.with-copy").trigger('blur');
		$(this).addClass('copied');
	});

	/*---------------------------------------------------*/
	/* JS for ADVANCED page */
	/*---------------------------------------------------*/

	if ($('body').hasClass('advanced')) {
		changeTheme();
		liquidityChartObj = Highcharts.chart('liquidityChart', liquidityChartOptions);

		var rowForMove = null;
		var min = 500,
			max = 1000;

		function updateTable1() {
			rowForMove = $('.advanced .main-cols__left-top .c-block__col .basic-table').eq(0).find('.basic-table__body .basic-table__row').first().remove();
			$('.advanced .main-cols__left-top .c-block__col .basic-table').eq(0).find('.basic-table__body').append(rowForMove);
			var rand = Math.floor(Math.random() * (max - min + 1) + min);
			setTimeout(updateTable1, rand);
		}

		function updateTable2() {
			rowForMove = $('.advanced .main-cols__left-top .c-block__col .basic-table').eq(1).find('.basic-table__row').last().remove();
			$('.advanced .main-cols__left-top .c-block__col .basic-table').eq(1).prepend(rowForMove);
			var rand = Math.floor(Math.random() * (max - min + 1) + min);
			setTimeout(updateTable2, rand);
		}

		function updateTable3() {
			rowForMove = $('.advanced .main-cols__left-top .c-block__col .basic-table').eq(2).find('.basic-table__body .basic-table__body .basic-table__row').last().remove();
			$('.advanced .main-cols__left-top .c-block__col .basic-table').eq(2).find('.basic-table__body .basic-table__body').prepend(rowForMove);
			var rand = Math.floor(Math.random() * (max - min + 1) + min);
			setTimeout(updateTable3, rand);
		}

		updateTable1();
		updateTable2();
		updateTable3();

		$('.btn-table-toggle').click(function () {
			$(this).toggleClass('open');
			if ($(this).hasClass('open')) {
				$('#orders').css('display', 'flex');
			} else {
				$('#orders').css('display', 'none');

			}
			calculateHeightOfFirstTable();
		});
	}

	function calculateHeightOfFirstTable() {
		var tableBodyHeight = $('.calculated-height-js').parent().height();
		var calculatedHeight = (Math.floor((tableBodyHeight - 23) / 2 / 22) - 1) * 22;
		// add table head height
		if ($('.calculated-height-js .basic-table__row.head')[0])
			calculatedHeight += $('.calculated-height-js .basic-table__row.head')[0].getBoundingClientRect().height;
		$('.calculated-height-js').css('min-height', calculatedHeight);
		$('.calculated-height-js').css('max-height', calculatedHeight);
	}
	calculateHeightOfFirstTable();
	$(window).resize(calculateHeightOfFirstTable);

	/*---------------------------------------------------*/
	/* transaction popup */
	/*---------------------------------------------------*/

	$('button[transaction-fancybox]').click(function () {
		$('#transaction-popup > .c-block > .d-flex-col ').css('display', 'none');
		var currencyName = $(this).closest('.basic-table__row').attr('data-currency');
		var currencyFullName = $('.exch-dropdown__list').eq(0).find('.exch-dropdown__item[data-currency="'+currencyName+'"]').attr('data-name');
		$('#transaction-popup .popup-tabs__item').removeClass('active');
		$('#transaction-popup .popup-tabs__item').eq(0).addClass('active').text('Receive ' + currencyName);
		$('#transaction-popup .popup-tabs__item').eq(1).text('Send ' + currencyName);
		$('#transaction-popup .transaction-form__input').eq(1).val('1000.000 ' + currencyName);
		$('#transaction-popup .transaction-form__btn').text('Send ' + currencyName);
		$('#transaction-popup .transaction-form__qr-code-title').text('Your ' + currencyName + ' Address');
		$('#transaction-popup .transaction-form__label').text('To ' + currencyFullName + ' Address:');
		$('#transaction-popup > .c-block > .d-flex-col ').eq(0).css('display', 'flex');
		$('button[transaction-fancybox]').removeClass('active');
		$(this).addClass('active');
		$('.transaction-form__to-clipdoard').removeClass('copied');
	});

	$('#transaction-popup .popup-tabs__item').click(function () {
		$('#transaction-popup .popup-tabs__item').removeClass('active');
		$(this).addClass('active');
		$('#transaction-popup > .c-block > .d-flex-col ').css('display', 'none');
		$('#transaction-popup > .c-block > .d-flex-col ').eq($(this).index()).css('display', 'flex');
	});

	$('.js-fancybox-close').click(function () {
		$.fancybox.close();
	});

	/*---------------------------------------------------*/
	/* autentificator fancybox */
	/*---------------------------------------------------*/
	$('[autentificator-fancybox]').click(function (e) {
		e.preventDefault();
		// Open this fancybox force
		$.fancybox.open({
			src: '#autentificator-popup',
			opts: {
				afterShow: function (instance, current) {
					var fancybox_body = $('.fancybox-container')[0];
					$('.b-graph .c-block')[0].append(fancybox_body);
					$('.b-graph .c-block .fancybox-container')
						.css({
							"width": "100%",
							"height": "100%",
							"display": "block",
							"position": "absolute"
						})
						.css("display", "block");
				},
				beforeShow: function () {
					$('.fancybox-container').css("display", "none");
				},
				beforeClose: function () {
					//$('.exch-form').removeClass('progress');
					//$('.exch-head').toggleClass('open');
				}
			}
		});
	});


	/*---------------------------------------------------*/
	/* Tippy Tooltip */
	/*---------------------------------------------------*/

	tippy('.tippy-convert', {
		html: '#ttpConvert', // DIRECT ELEMENT option
		arrow: true,
		animation: 'fade',
		theme: 'bct'
	})

	// tippy('.tippy-done', {
	// 	html: '#ttpDone', // DIRECT ELEMENT option
	// 	arrow: true,
	// 	animation: 'fade',
	// 	theme: 'bct'
	// })

	tippy('.tippy-convert-advanced', {
		html: '#ttpConvert', // DIRECT ELEMENT option
		arrow: true,
		animation: 'fade',
		theme: 'bct'
	})

	tippy('.tippy-done-advanced', {
		html: '#ttpDone', // DIRECT ELEMENT option
		arrow: true,
		animation: 'fade',
		theme: 'bct'
	})

	tippy('.tippy-adv-mode', {
		html: '#ttpAdvMode', // DIRECT ELEMENT option
		arrow: true,
		animation: 'fade',
		placement: 'bottom',
		theme: 'bct'
	})

	tippy('.tippy-basic-mode', {
		html: '#ttpBasicMode', // DIRECT ELEMENT option
		arrow: true,
		animation: 'fade',
		placement: 'bottom',
		theme: 'bct'
	})

	tippy('[data="tippy"]', {
		arrow: true,
		animation: 'fade',
		placement: 'right',
		theme: 'bct',
		allowTitleHTML: true,
		popperOptions: {
			modifiers: {
				preventOverflow: {
					enabled: false
				}
			}
		}
	})

	const exchangers = [
		"BITFINEX",
		"ETORO",
		"24 OPTION",
		"COINBULL",
		"LUNO",
		"PAXFOREX",
		"BINANCE",
		"COINBACE",
		"LOCALBITCOINS",
		"CEX IO",
		"CHANGELLY",
		"COINMAMA",
		"XTRADE",
		"CAPITAL.COM",
		"PAXFUL",
		"KRAKEN",
		"POLONIEX",
		"GEMINI",
		"BITHUMB",
		"XCOINS",
		"COBINHOOD",
		"COINCHECK",
		"COINEXCHANGE",
		"SHAPESHIFT",
		"BITSO",
		"INDACOIN",
		"CITYINDEX",
		"BITBAY",
		"BITSTAMP",
		"CRYPTOPIA",
		"GDAX",
		"CUCOIN"
	]

	tippy('[data="tippy-exchangers"]', {
		html: '#ttpExchagers',
		arrow: true,
		animation: 'fade',
		placement: 'right',
		theme: 'bct',
		popperOptions: {
			modifiers: {
				preventOverflow: {
					enabled: false
				}
			}
		},
		onShow: function (instance) {
			// get length and expect exchanger
			var length = instance.reference.innerText.substr(1);
			var expectExchanger = instance.reference.previousElementSibling.innerText;

			// init textContent
			instance.popper.querySelector('.tippy-content').textContent = "";
			// generate exchangers as listed
			for (let index = 0; index < exchangers.length; index++) {
				if (exchangers[index] != expectExchanger) {
					instance.popper.querySelector('.tippy-content').textContent += exchangers[index] + '\n';
					length--;

					if (length <= 0) break;
				}
			}
			// text align to left
			instance.popper.querySelector('.tippy-content').style.textAlign = "left";
			instance.popper.querySelector('.tippy-content').style['white-space'] = "pre-line";
		}
	})

	/*---------------------------------------------------*/
	/* Graph range select */
	/*---------------------------------------------------*/
	var allOptions = $("ul.graph-range__list").children('li.graph-range__item');
	var minDate = Date.UTC(2018, 5, 17);
	var maxDate = Date.UTC(2018, 7, 05);
	$("ul.graph-range__list").on("click", "li.graph-range__item", function () {
		allOptions.removeClass('active');
		$(this).addClass('active');
		$(".graph-range__current").html($(this).html());

		switch ($(".graph-range__current").html()) {
			case "1H":
				if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(0, {}, true);
				var HOUR = 1000 * 3600 * 24 * 7; //1000 * 3600;
				mainChartObj.xAxis[0].setExtremes(maxDate - HOUR, maxDate - (1000 * 3600 * 24));
				break;
			case "1D":
				if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(1, {}, true);
				var DAY = 1000 * 3600 * 24 * 7; //1000 * 3600 * 24;
				mainChartObj.xAxis[0].setExtremes(maxDate - DAY, maxDate - (1000 * 3600 * 24));
				break;
			case "1W":
				if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(2, {}, true);
				var WEEK = 1000 * 3600 * 24 * 7;
				mainChartObj.xAxis[0].setExtremes(maxDate - WEEK, maxDate - (1000 * 3600 * 24));
				break;
			case "1M":
				if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(3, {}, true);
				var d = new Date(maxDate);
				d.setMonth(d.getMonth() - 1);
				mainChartObj.xAxis[0].setExtremes(d.getTime(), maxDate);
				break;
			case "ALL":
				if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(4, {}, true);
				mainChartObj.xAxis[0].setExtremes(minDate, maxDate);
				break;
		}
		redrawMainChart();
	});


	// var allPortfolioOptions = $("ul.portfolio-graph-range__list").children('li.portfolio-graph-range__item');
	// $("div.portfolio-graph-range__current").on("click", function () {
	// 	if ($('ul.portfolio-graph-range__list').hasClass('open')) {
	// 		$('ul.portfolio-graph-range__list').css('border-bottom', '0px');
	// 		$('div.portfolio-graph-range').css('border', '0px');
	// 		$('ul.portfolio-graph-range__list').removeClass('open');
	// 		$('div.portfolio-graph-range__current').css('border', 'solid 1px');
	// 	} else {
	// 		$('ul.portfolio-graph-range__list').addClass('open');
	// 		$('div.portfolio-graph-range__current').css('border', '0px');
	// 		$('ul.portfolio-graph-range__list').css('border-bottom', 'solid 1px');
	// 		$('div.portfolio-graph-range').css('border', 'solid 1px');
	// 	}
	// });
	// $("ul.portfolio-graph-range__list").on("click", "li.portfolio-graph-range__item", function () {
	// 	allPortfolioOptions.removeClass('active');
	// 	$(this).addClass('active');
	// 	$(".portfolio-graph-range__current").html($(this).html());
	// 	console.log()

	// 	switch ($(".portfolio-graph-range__current").html()) {
	// 		case "HOUR":
	// 			if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(0, {}, true);
	// 			break;
	// 		case "DAY":
	// 			if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(1, {}, true);
	// 			break;
	// 		case "WEEK":
	// 			if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(2, {}, true);
	// 			break;
	// 		case "MONTH":
	// 			if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(3, {}, true);
	// 			break;
	// 		case "YEAR":
	// 			if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(4, {}, true);
	// 			break;
	// 	}

	// 	$('ul.portfolio-graph-range__list').css('border-bottom', '0px');
	// 	$('div.portfolio-graph-range').css('border', '0px');
	// 	$('ul.portfolio-graph-range__list').removeClass('open');
	// 	$('div.portfolio-graph-range__current').css('border', 'solid 1px');
	// });

	/* Portfolio graph range slider for Orders */
	var $portfolioGraphRange = $(".portfolio-graph-range__control");
	$portfolioGraphRange.on('input', function () {
		if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(this.value, {}, true);
		switch (parseInt(this.value)) {
			case 0:
				$('.portfolio-graph-range__current').html("1h");
				break;
			case 1:
				$('.portfolio-graph-range__current').html("1d");
				break;
			case 2:
				$('.portfolio-graph-range__current').html("1w");
				break;
			case 3:
				$('.portfolio-graph-range__current').html("1m");
				break;
			case 4:
				$('.portfolio-graph-range__current').html("All");
				break;
		}
		redrawMainChart();
	});
	// $portfolioGraphRange.ionRangeSlider({
	// 	type: "single",
	// 	hide_min_max: true,
	// 	hide_from_to: true,
	// 	grid: false,
	// 	from: 4,
	// 	values: ["1h", "1d", "1w", "1m", "All"],
	// 	onChange: function (e) {
	// 		// update current range text			
	// 		$('.portfolio-graph-range__current').html(e.from_value);
	// 	},
	// 	onFinish: function (e) {
	// 		// update chart			
	// 		if (portfolioChartObj) portfolioChartObj.rangeSelector.clickButton(e.from, {}, true);
	// 	}
	// });

	/* main graph range slider for Orders */
	var $mainGraphRange = $(".graph-range-slider__control");
	$mainGraphRange.on('input', function () {
		// $( this ).css( 'background', 'linear-gradient(to right, var(--clr-time-bar) 0%, var(--clr-time-bar) '+this.value*25 +'%, var(--clr-time-line) ' + this.value*25 + '%, var(--clr-time-line) 100%)' );
		switch (parseInt(this.value)) {
			case 0:
				$('.graph-range-slider__current').html("1h");
				var HOUR = 1000 * 3600 * 24 * 7; //1000 * 3600;
				mainChartObj.xAxis[0].setExtremes(maxDate - HOUR, maxDate - (1000 * 3600 * 24));
				break;
			case 1:
				$('.graph-range-slider__current').html("1d");
				var DAY = 1000 * 3600 * 24 * 7; //1000 * 3600 * 24;
				mainChartObj.xAxis[0].setExtremes(maxDate - DAY, maxDate - (1000 * 3600 * 24));
				break;
			case 2:
				$('.graph-range-slider__current').html("1w");
				var WEEK = 1000 * 3600 * 24 * 7;
				mainChartObj.xAxis[0].setExtremes(maxDate - WEEK, maxDate - (1000 * 3600 * 24));
				break;
			case 3:
				$('.graph-range-slider__current').html("1m");
				var d = new Date(maxDate);
				d.setMonth(d.getMonth() - 1);
				mainChartObj.xAxis[0].setExtremes(d.getTime(), maxDate);
				break;
			case 4:
				$('.graph-range-slider__current').html("All");
				mainChartObj.xAxis[0].setExtremes(minDate, maxDate);
				break;
		}
		redrawMainChart();
	});	

	/* .coin-dropdown handler */
	$('.transaction-form .coin-dropdown .coin-dropdown__border').click(function () {
		$('.transaction-form .coin-dropdown').removeClass('open');
		$(this).parent().addClass('open');
	});

	$('.transaction-form .coin-dropdown .coin-dropdown__hangle').click(function () {
		if ($(this).hasClass('coin-dropdown__hangle')) event.stopPropagation();
		$('.transaction-form .coin-dropdown').toggleClass('open');
		$('.coin-dropdown .coin-dropdown__current').removeClass('hidden');
	});

	$('.coin-dropdown__list .coin-dropdown__item').click(function () {
		var currencyName = $(this).data('name');
		var newCurr = $(this).children().clone();
		$(newCurr).eq(1).html(currencyName);
		var currDropdown = $(this).closest('.coin-dropdown');
		currDropdown.find('.coin-dropdown__item').removeClass('current');
		$(this).addClass('current');
		$(currDropdown).find('.coin-dropdown__current > svg, .coin-dropdown__current > p').remove();
		$(newCurr).insertBefore($(currDropdown).find('.coin-dropdown__hangle').eq(0));

		// close dropdown
		$(currDropdown).removeClass('open');
	});
});