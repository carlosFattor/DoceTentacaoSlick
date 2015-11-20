/**
 * Overlay for images (gallery)
 *
 * @param {string} theme
 */
var openGallery = function (theme) {
    $(this).magnificPopup
    ({
        mainClass: theme + ' mfp-with-zoom', // no zoom, just for bg fadeIn
        overflowY: 'hidden',
        delegate: '> li > a',
        type: 'image',
        gallery: {
            enabled: true
        },
        callbacks: {
            /**
             * Adds custom parameters to markup
             * For example data-description on <a> can be used as mfp-description in markup html
             *
             * @param template
             * @param values
             * @param item
             */
            markupParse: function (template, values, item) {
                values.description = item.el.data('description'); // or item.img.data('description');
            }
        },
        image: {
            headerFit: true,
            captionFit: true,
            preserveHeaderAndCaptionWidth: false,
            markup: '<div class="mfp-figure">' +
            '<figure>' +
            '<header class="mfp-header">' +
            '<div class="mfp-top-bar">' +
            '<div class="mfp-title"></div>' +
            '<div class="mfp-close"></div>' +
            '<div class="mfp-decoration"></div>' +
            '</div>' +
            '</header>' +
            '<section class="mfp-content-container">' +
            '<div class="mfp-img"></div>' +
            '</section>' +
            '<footer class="mfp-footer">' +
            '<figcaption class="mfp-figcaption">' +
            '<div class="mfp-bottom-bar-container">' +
            '<div class="mfp-bottom-bar">' +
            '<div class="mfp-counter"></div>' +
            '<div class="mfp-description"></div>' +
            '<div class="mfp-decoration"></div>' +
            '</div>' +
            '</div>' +
            '</figcaption>' +
            '</footer>' +
            '</figure>' +
            '</div>',
            titleSrc: function (item) {
                return item.el.attr('title');
            }
        }
    });
};

// Galleries
$(document).ready(function () {
    $('ul.magnific-gallery').each(function () {
        console.log( "ready!" );
        openGallery.call(this, 'mfp-example');
    });
});

$('ul.magnific-gallery').each(function () {
    openGallery.call(this, 'mfp-example');
});

$(function () {
    /**
     * Adds header & caption functionality
     * @author Marcin Gil <mg@ovos.at>
     */
    $.extend(true, $.magnificPopup.defaults,
        {
            /**
             * Resizes the overlay to fit the screen together with header & caption
             */
            resize: function () {
                // clear resize timeout
                clearTimeout(this.st.resizeTimeout);

                // resize event may be invoked before the overlay was opened or by other type of overlay
                if (!this.isOpen || this.currItem.type !== 'image') return;

                // remove class which enables table layout
                this.wrap.removeClass('mfp-table');
                // clear width on image container
                if (this.st.image.preserveHeaderAndCaptionWidth) {
                    this.currItem.img.parent().css('width', '');
                }

                // ensure that DOM elements are rendered before we ask for sizes, otherwise we get random heights
                $.fn.redraw = function () {
                    return this.hide(0, function () {
                        $(this).show();
                    });
                };
                this.content.redraw();

                // read max-height set by updateSize() at the end of open()
                var originalMaxHeight = parseInt(this.currItem.img.css('max-height'), 10);
                var maxHeight = originalMaxHeight * 4;

                // find header & caption elements
                var figureHeader = this.content.find('.mfp-header');
                var figureCaption = this.content.find('.mfp-figcaption').children().first(); // first child is "table-caption"
                var originalFigureHeaderHeight, originalFigureCaptionHeight;

                // if headerFit is enabled and header exists, subtract it's height from max-height
                if (this.st.image.headerFit && figureHeader) {
                    originalFigureHeaderHeight = figureHeader.outerHeight(true);
                    maxHeight -= originalFigureHeaderHeight;
                }
                // if captionFit is enabled and caption exists, subtract it's height from max-height
                if (this.st.image.captionFit && figureCaption) {
                    originalFigureCaptionHeight = figureCaption.outerHeight(true);
                    maxHeight -= originalFigureCaptionHeight;
                }
                // set new max-height if it has changed
                if (maxHeight != originalMaxHeight) {
                    this.currItem.img.css('max-height', maxHeight);
                    originalMaxHeight = maxHeight;
                }

                // function changing layout from block to table when image is smaller than visible area
                // this prevents from header & caption from expanding the overlay
                var setWrapSize = function (currItem) {
                    var imageWidth = currItem.img.outerWidth();
                    var bodyWidth = $('body').width() - parseInt(this.container.css('padding-left'), 10) - parseInt(this.container.css('padding-right'), 10);
                    if (imageWidth < bodyWidth) {
                        this.wrap.addClass('mfp-table');
                    }

                    // apply necessary corrections if header or caption got higher
                    var figureHeaderHeight, figureCaptionHeight;

                    // if headerFit is enabled and header exists, subtract it's height from max-height
                    if (this.st.image.headerFit && figureHeader) {
                        figureHeaderHeight = figureHeader.outerHeight(true);
                        if (figureHeaderHeight > originalFigureHeaderHeight) {
                            maxHeight -= figureHeaderHeight - originalFigureHeaderHeight;
                        }
                    }
                    // if captionFit is enabled and caption exists, subtract it's height from max-height
                    if (this.st.image.captionFit && figureCaption) {
                        figureCaptionHeight = figureCaption.outerHeight(true);
                        if (figureCaptionHeight > originalFigureCaptionHeight) {
                            maxHeight -= figureCaptionHeight - originalFigureCaptionHeight;
                        }
                    }

                    // set new max-height if it has changed
                    if (maxHeight != originalMaxHeight) {
                        currItem.img.css('max-height', maxHeight);

                        // when we change image's max-height, header and caption will get narrower
                        // this creates a risk that text will fold into more lines
                        // and header/caption won't fit on the screen anymore
                        if (this.st.image.preserveHeaderAndCaptionWidth) {
                            currItem.img.parent().css('width', imageWidth);
                        }
                    }

                    delete this.st.callbacks.imageHasSize;
                };

                // if image is already loaded, call setWrapSize
                if (this.currItem.hasSize) {
                    setWrapSize.call(this, this.currItem);
                }
                // if image is still loading, attach is to imageHasSize event
                else {
                    this.st.callbacks.imageHasSize = setWrapSize;
                }
            },
            callbacks: {
                /**
                 * Open event
                 */
                open: function () {
                    this.st.resize.call(this);
                },
                /**
                 * Resize event
                 */
                resize: function () {
                    // buffered call
                    var self = this;
                    clearTimeout(this.st.resizeTimeout);
                    this.st.resizeTimeout = setTimeout(function () {
                        self.st.resize.call(self);
                    }, 100);
                },
                /**
                 * After change event
                 */
                afterChange: function () {
                    this.st.resize.call(this);
                }
            },
            image: {
                headerFit: true,
                captionFit: true,
                preserveHeaderAndCaptionWidth: false,
                markup: '<div class="mfp-figure">' +
                '<figure>' +
                '<header class="mfp-header">' +
                '<div class="mfp-top-bar">' +
                '<div class="mfp-title"></div>' +
                '<div class="mfp-close"></div>' +
                '</div>' +
                '</header>' +
                '<section class="mfp-content-container">' +
                '<div class="mfp-img"></div>' +
                '</section>' +
                '<footer class="mfp-footer">' +
                '<figcaption class="mfp-figcaption">' +
                '<div class="mfp-bottom-bar-container">' +
                '<div class="mfp-bottom-bar">' +
                '<div class="mfp-counter"></div>' +
                '<div class="mfp-description"></div>' +
                '</div>' +
                '</div>' +
                '</figcaption>' +
                '</footer>' +
                '</figure>' +
                '</div>'
            }
        });
});