(function($) {

	// private variables
	var $inputElement;
	var $tagContainerElement;
	var selectedTagValues = [];
	var options = {};

	// init bubble filter
	$.fn.bubbleFilter = function(initOptions) {

		options = $.extend( {}, $.fn.bubbleFilter.defaults, initOptions );
		
		$inputElement = $(document.createElement('div'));
		$inputElement.addClass('bubble-filter-input')
					 .text(options.placeholderText)
					 .click(handle_input_click);
		$tagContainerElement = $(document.createElement('div'));
		$tagContainerElement.addClass('bubble-filter-tag-container clearfix');
		
		for(var tagParent in options.tags) {
			var $tagColumnElement = $(document.createElement('ul'));
			$tagColumnElement.addClass('bubble-filter-tag-container-column')
							 .css('width', (100 / Object.keys(options.tags).length)+"%");

			$tagColumnElement.append($(document.createElement('li')).append($(document.createElement('h3')).text(tagParent)));

			for(var tag in options.tags[tagParent]) {
				var $tagElement = $(document.createElement('li')).addClass('bubble-filter-tag')
																 .attr('id', 'filter-tag-'+slugify(options.tags[tagParent][tag]))
																 .data('value', options.tags[tagParent][tag])
																 .text(tag);
				$tagElement.click(handle_tag_click);
				$tagColumnElement.append($tagElement);
			}

			$tagContainerElement.append($tagColumnElement);
		}

		// add the input element to the bubbleFilter
		this.append($inputElement);
		// and add the tag container to the end of the body
		$tagContainerElement.appendTo(document.body);

		// if we click outside of the element then we will close the tag container
		$('html').click(function(event) {
			$tagContainerElement.css({
				display: 'none',
			});
		});

		// if the window is resized then hide the tag container
		$(window).resize(function() {
			$tagContainerElement.css({
				display: 'none',
			});
		});

		return this;
	}

	// Default options
	$.fn.bubbleFilter.defaults = {
		placeholderText:     'Click here to select attributes to filter by',
		selectedTagCallback: undefined,
		closeButtonClass:    'fa fa-close',
		scrollToInput:       true,
		scrollOffset:        90,
	};

	function handle_tag_click(event)
	{
		var $eventTarget = $(event.target);

		if($('#tag-'+slugify($eventTarget.data('value'))).length == 0) {

			// add the selected value to the selected tag values array
			selectedTagValues.push($eventTarget.data('value'));
			// and mark the current value as selected
			$eventTarget.addClass('selected');

			var $newSelectedTag = $(document.createElement('div')).addClass('tag').attr('id', 'tag-'+slugify($eventTarget.data('value'))).text($eventTarget.text());
			var $closeTag = $(document.createElement('i')).addClass(options.closeButtonClass).data('value', $eventTarget.data('value'));

			$newSelectedTag.append($closeTag);
			// if the input element still has the placeholder text then clear it
			if($inputElement.text() == options.placeholderText) {
				$inputElement.empty();
			}
			// and append the new element to it
			$inputElement.append($newSelectedTag);

			if(options.scrollToInput) {
				$('html, body').animate({'scrollTop': ($inputElement.offset().top - options.scrollOffset)});;
			}

			// call back to the caller and let them know that the values have been updated if they defined a callback function
			if('selectedTagCallback' in options) {
				options.selectedTagCallback(selectedTagValues);
			}
		}
	}

	function handle_input_click(event)
	{
		event.stopPropagation();

		var $eventTarget = $(event.target);

		// if the event target has the class options.closeButtonClass then we are removing a tag
		if($eventTarget.hasClass(options.closeButtonClass)) {
			var tagValue = $eventTarget.data('value');
			var tagIndex = selectedTagValues.indexOf(tagValue);

			selectedTagValues.splice(tagIndex, 1);

			$eventTarget.parents('.tag').remove();
			$('#filter-tag-'+slugify(tagValue)).removeClass('selected');

			if(selectedTagValues.length == 0) {
				$inputElement.text(options.placeholderText);
			}
			
			// call back to the caller and let them know that the values have been updated if they defined a callback function
			if('selectedTagCallback' in options) {
				options.selectedTagCallback(selectedTagValues);
			}
		}
		else {
			if(!$eventTarget.hasClass('bubble-filter-input')) {
				$eventTarget = $eventTarget.parents('.bubble-filter-input');
			}

			$tagContainerElement.css({
				top: $eventTarget.offset().top + $eventTarget.height(),
				width: $eventTarget.outerWidth(),
				left: $eventTarget.offset().left,
				display: 'block',
			});
		}
	}

	function slugify(text)
	{
		return text.toString().toLowerCase()
			.replace(/\s+/g, '-')           // Replace spaces with -
			.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
			.replace(/\-\-+/g, '-')         // Replace multiple - with single -
			.replace(/^-+/, '')             // Trim - from start of text
			.replace(/-+$/, '');            // Trim - from end of text
	}
}(jQuery));

