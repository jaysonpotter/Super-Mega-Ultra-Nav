var nav = {},
	$nav = $('#nav'),
	$navControl = $nav.find('.nav_control'),
	$navMenu = $nav.find('.nav_menu'),
	$navList = $navMenu.find('ul'),
	$navAnchors = $navList.find('.tab'),
	$megaMenus = $('#menus');
nav.currentType = '';
nav.findItemName = function($item) {
	return $item.attr('id').replace('nav_', '');
}; /* full ----------------------------------------------- //// */
nav.full = function() {
	nav.small.deactivate();
	nav.full.activate();
};
nav.full.activate = function() {
	// set full menu
	nav.currentType = 'full';
	$nav.addClass('full');
	// tab
	$navAnchors.bind('click', function() {
		var $thisNav = $(this).parent('li'),
			thisItem = nav.findItemName($thisNav),
			isThisNavOpen = $thisNav.hasClass('open');
		if ($megaMenus.find('#menu_' + thisItem).length > 0) {
			if ($navList.find('li.open').length > 0) {
				nav.full.close(nav.findItemName($navList.find('li.open')));
			}
			if (!isThisNavOpen) {
				nav.full.open(thisItem);
			}
			return false;
		}
	});
};
nav.full.close = function(item) {
	if (nav.enhancedMenu) {
		$megaMenus.find('.container').css('height', '0').removeAttr('style');
	}
	$navList.find('#nav_' + item).removeClass('open');
	$megaMenus.find('#menu_' + item).removeClass('open');
	$(document).off('click.megaMenu.full');
	$nav.trigger('megaMenu.full.close');
};
nav.full.deactivate = function() {
	if (nav.currentType === 'full') {
		$nav.removeClass('full');
		$navAnchors.unbind('click');
		if ($navList.find('li.open').length > 0) {
			nav.full.close(nav.findItemName($navList.find('li.open')));
		}
	}
};
nav.full.open = function(item) {
	$navList.find('#nav_' + item).addClass('open');
	$megaMenus.find('#menu_' + item).addClass('open');
	if (nav.enhancedMenu) {
		var thisMenuHeight = $megaMenus.find('#menu_' + item).css('height');
		$megaMenus.find('.container').attr('data-height', thisMenuHeight).css('height', thisMenuHeight);
	}
	$(document).on('click.megaMenu.full', function(e) {
		if ($(e.target).parents().filter($megaMenus).length !== 1) {
			nav.full.close(nav.findItemName($navList.find('li.open')));
		}
	});
	$nav.trigger('megaMenu.full.open');
}; /* small ----------------------------------------------- //// */
nav.small = function() {
	nav.full.deactivate();
	nav.small.activate();
};
nav.small.activate = function() {
	// set small menu
	nav.currentType = 'small';
	$nav.addClass('small');
	// menu control
	$navControl.bind('click', function() {
		if ($nav.hasClass('open')) {
			nav.small.close();
		} else {
			nav.small.open();
		}
		$('li.utility_dropdown.open').removeClass('open');
		return false;
	});
};
nav.small.close = function() {
	if (nav.enhancedMenu) {
		$navMenu.css('height', '0').removeAttr('style');
	}
	$nav.removeClass('open');
};
nav.small.deactivate = function() {
	if (nav.currentType === 'small') {
		$nav.removeClass('small');
		$navControl.unbind('click');
		nav.small.close();
	}
};
nav.small.open = function() {
	$nav.addClass('open');
	if (nav.enhancedMenu) {
		$navMenu.css('height', $navList.outerHeight() + 'px');
	}
	$(document).on('click.megaMenu.small', function(e) {
		if ($(e.target).parents().filter($('div.nav_menu')).length !== 1) {
			nav.small.close();
		}
	});
};
nav.init = function() {
	if ($(window).width() > 600) {
		if (nav.currentType !== 'full') {
			nav.full();
		}
	} else {
		if (nav.currentType !== 'small') {
			nav.small();
		}
	}
};
window.onresize = function(event) {
	if ($(window).width() > 600) {
		if (nav.currentType !== 'full') {
			nav.full();
		}
	} else {
		if (nav.currentType !== 'small') {
			nav.small();
		}
	}
}
$(function() {
	nav.init();
});