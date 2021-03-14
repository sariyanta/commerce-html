// On DOMContentLoaded
$(document).on('DOMContentLoaded', function () {


    // Listen for resize
    $(window).resize(function () {

        // Return true iff small device (on which aside will be above main)
        const mobile = function () {
            return $('aside').position().top < $('main').position().top;
        };

        // Get headings
        const headings = $([
            'main h1:not(.next)',
            'main h2:not(.next)',
            'main h3:not(.next)',
            'main h4:not(.next)',
            'main h5:not(.next)',
            'main h6:not(.next)'].join(','));

        // Ensure last heading, if any, can be anchored atop page
        if (headings.last().offset()) {
            var top = headings.last().offset().top;
        }
        else {
            var top = 0;
        }

        // On small devices
        if (mobile()) {
            var margin = $(window).height() - ($('main').outerHeight() + $('aside').outerHeight() - top);
        }

        // On large devices
        else {
            var margin = $(window).height() - ($('main').outerHeight() - top);
        }

        // Update margin
        $('main').css('margin-bottom', Math.max(0, Math.ceil(margin)) + 'px');

        // Resize search UI
        if (mobile()) {

            // Shrink
            $('#search .form-control').removeClass('form-control-lg');
            $('#search .btn').removeClass('btn-lg');
        }
        else {

            // Grow
            $('#search .form-control').addClass('form-control-lg');
            $('#search .btn').addClass('btn-lg');
        }

        // Calculate height of alert, if any
        const height = $('#alert').outerHeight(true) || 0;

        // Position aside
        if (mobile()) {
            $('aside').css('height', '');
            $('aside').css('margin-top', height + 'px');
            $('aside').css('top', '');
            $('main').css('margin-top', '');
        }
        else {
            $('aside').css('height', ($(window).height() - height) + 'px');
            $('aside').css('margin-top', '');
            $('aside').css('top', height + 'px');
            $('main').css('margin-top', height + 'px');
        }

        // Position headings' anchors below alert
        // https://stackoverflow.com/a/13184714
        $('a[data-id][id]').css('top', '-' + height + 'px');
    });
    $(window).trigger('resize');

    // Listen for highlights
    // https://chromestatus.com/feature/4733392803332096
    $(document).on('click keyup', function (e) {
        const s = window.getSelection().toString().trim();
        if (s) {
            history.replaceState(null, null, '#:~:text=' + s);
        }
        else {
            if (window.location.hash.startsWith('#:~:text=') || !window.location.hash) {
                history.replaceState(null, null, '');
            }
        }
    });

    // Reveal page
    $('body').removeClass('invisible');
});