/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  Drupal.behaviors.nodePreviewDestroyLinks = {
    attach: function attach(context) {
      function clickPreviewModal(event) {
        if (event.button === 0 && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
          event.preventDefault();
          var $previewDialog = $("<div>".concat(Drupal.theme('nodePreviewModal'), "</div>")).appendTo('body');
          Drupal.dialog($previewDialog, {
            title: Drupal.t('Leave preview?'),
            buttons: [{
              text: Drupal.t('Cancel'),
              click: function click() {
                $(this).dialog('close');
              }
            }, {
              text: Drupal.t('Leave preview'),
              click: function click() {
                window.top.location.href = event.target.href;
              }
            }]
          }).showModal();
        }
      }

      if (!context.querySelector('.node-preview-container')) {
        return;
      }

      if (once('node-preview', 'html').length) {
        $(document).on('click.preview', 'a:not([href^="#"], .node-preview-container a)', clickPreviewModal);
      }
    },
    detach: function detach(context, settings, trigger) {
      if (trigger === 'unload') {
        if (context.querySelector('.node-preview-container') && once.remove('node-preview', 'html').length) {
          $(document).off('click.preview');
        }
      }
    }
  };
  Drupal.behaviors.nodePreviewSwitchViewMode = {
    attach: function attach(context) {
      var autosubmit = once('autosubmit', '[data-drupal-autosubmit]', context);

      if (autosubmit.length) {
        $(autosubmit).on('formUpdated.preview', function () {
          $(this.form).trigger('submit');
        });
      }
    }
  };

  Drupal.theme.nodePreviewModal = function () {
    return "<p>".concat(Drupal.t('Leaving the preview will cause unsaved changes to be lost. Are you sure you want to leave the preview?'), "</p><small class=\"description\">").concat(Drupal.t('CTRL+Left click will prevent this dialog from showing and proceed to the clicked link.'), "</small>");
  };
})(jQuery, Drupal);