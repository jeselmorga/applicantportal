(function( $ ) {
 
    $.fn.nmodal = function( options ) {

        const settings = $.extend( {
            title           : '',
            theme	        : 'light',
            width 	        : 500, // full or exact value
            cornerRadius    : 0,
            overlaybg       : '#000000', // none, hexadecimal or color name
            overlayopacity  : .75,
            beforeOpen      : () => { return },
            afterOpen       : () => { return },
            beforeClose     : () => { return },
            afterClose      : () => { return },
            closeIcon       : '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" x="0" y="0" viewBox="0 0 492 492" style="enable-background:new 0 0 512 512" xml:space="preserve"><path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872 c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872 c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052 L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116 c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952 c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116 c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z" fill="#464646" data-original="#000000" style=""></path></svg>'
        }, options );

        const _this = $(this);
        const target = $('#'+options.target);
        const title = settings.title ? '<h4>'+settings.title+'</h4>' : '';
        target.hide();
        
        let overlay_visibility = false;

        target.find('.modal-wrapper').click(function(event) {
            event.stopPropagation();
        });
        
        const modalshow = (target, title, size, theme, elem) => {

            settings.beforeOpen(elem);
            
            const modaloverlay 	= '<div class="modal-overlay" style="--overlaycolor:'+settings.overlaybg+'; --overlayopacity:'+settings.overlayopacity+'"></div>';
            $('body').addClass('modal-'+settings.target+'-visible');

            if ( overlay_visibility == false ) {
                $('body').append(modaloverlay);
            }

            const width = settings.width == 'full' ? '100vw' : settings.width+'px';

            target
                .show()
                .find('.modal-wrapper')
                .addClass('modal-'+theme)
                .css({
                    'max-width' : width,
                    'border-radius' : settings.cornerRadius+'px'
                });

            setTimeout(function() {
                target.addClass('active');
                $('.modal-overlay').addClass('active');
            }, 150);

            settings.afterOpen(elem);

            overlay_visibility = true;

        }

        const modalclose = (target) => {
            $('body').removeClass('modal-'+settings.target+'-visible');
            settings.beforeClose();
            target.removeClass('active');
            $('.modal-overlay').removeClass('active').removeAttr("style");
            setTimeout(function() {
                target.hide();
                $('.modal-overlay').remove();
            }, 250);
            settings.afterClose();
            overlay_visibility = false;
        }

        const modalheader = '<div class="modal-header">'+title+'<i class="modal-close icon-close">'+settings.closeIcon+'</i></div>';
        target.find('.modal-wrapper').prepend(modalheader);

        _this.click(function() {
            const disabled = $(this).attr('disabled');
            if (!disabled) {
                overlay_visibility = false;
                modalshow(target, settings.title, settings.size, settings.theme, $(this));
            }
        });

        target.find('.modal-close').click(function() {
            modalclose(target);
        });

        target.click(function() {
            modalclose($(this));
        });

        $(document).keydown(function(event) {
    
            if(event.keyCode == 27){
                modalclose(target);
            }

        });
 
    };
 
}( jQuery ));