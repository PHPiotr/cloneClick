(function($) {

        $.cloneClick = function(options) {

                var settings = $.extend({}, $.cloneClick.defaults, options);

                function init()
                {
                        $(document).on('mouseover', settings.element, function() {

                                var that = $(this);

                                var clone_class = settings.clone_class;

                                if (that.is('.' + clone_class)) {
                                        // We ere already hovering on clone
                                        return;
                                }

                                // Make CSS rules/styles persisted
                                var clone = $(that.clone()).insertAfter(that);

                                // Differentiate clone from initial element
                                clone.addClass(clone_class);

                                // Don't click on real element
                                that.hide();

                                // Now we are hovering on the cloned element, so...
                                clone.mouseout(function() {

                                        clone.remove();
                                        that.show();

                                }).click(canEventBeTriggered);

                                function canEventBeTriggered() {
                                        // Can we trigger click events registered on the initial element?
                                        if (settings.canTriggerEvent.call(this)) {
                                                that.click();
                                        } else {
                                            alert('Return "true" from settings.canTriggerEvent() in order to click...');
                                        }                       
                                }
                        });
                }
                init();
        };

        $.cloneClick.defaults = {
                // Elements whose click events will be intercepted
                element: ':button',
                // Differentiate clone from its prototype
                clone_class: 'clone',
                // Check if click events of the initial element can be triggered
                canTriggerEvent: function() {}
        };

}(jQuery));

$(document).ready(function() {
	$.cloneClick();
    $('button').click(function() {
        alert('Click event triggered by cloned button!!!');
    });
});