(function($) {

  'use strict';

  // Select all protected email forms.
  $('form.protected-email-captcha-form').each(function() {

    // There are four basic blocks.
    var form = $(this);
    var label = form.siblings('.protected-email-captcha-label');
    var cancel = form.siblings('.protected-email-captcha-cancel');
    var value = form.siblings('.protected-email-captcha-value');

    // Label trigger.
    label.click(function() {
      form.toggleClass('hide');
      label.toggleClass('hide');
      cancel.toggleClass('hide');
    });

    // Cancel trigger.
    cancel.click(function() {
      form.toggleClass('hide');
      label.toggleClass('hide');
      cancel.toggleClass('hide');
    });

    form.submit(function (e) {
      // Submits the form as if manually clicked, and loads a fully parsed Drupal
      // html response in plain text.
      $.ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        data: form.serialize(),
        success: function (data) {
          var validEmail = isValidEmailAddress(data);
          var error = false;

          if (!validEmail) {
            // Convert plain text response into an array of DOM elements.
            var elements = $(data);

            // Loop through html elements and check to see if a form with the
            // same id as the one just submitted is present.
            for (var i = 0, len = elements.length; i < len; i++) {
              // Check response html for a form with the same id as the submitted form.
              var newForm = $(elements[i]).find('form#' + form.attr('id'));

              // In the event of an error the user will want to try again. At this point
              // captcha will have generated a new image code, and we need to update the
              // old form field image src with the new form field image src.
              //
              // Note: We only swaw the image source instead of all the form html in order
              // to preserve the pre-existing ajax event bindings.
              if (newForm.length) {
                // If there is a new form set an error and swap the image src to the old form.
                error = true;
                // Copy the new image src.
                // var newImgSrc = newForm.find('img').attr('src');
                var newMathProb = newForm.find('.form-item-captcha-response .field-prefix').text();
                // Swap the old form image src with response new image src.
                // form.find('img').attr('src', newImgSrc);
                form.find('.form-item-captcha-response .field-prefix').text(newMathProb);
                // Add error classes.
                form.find('.form-text, img').addClass('error');
                // Reset text box data.
                form.find('.form-text').val('');
              }
            }
          }

          // If no form was detected in the output then we expect a
          // much shorter and simpler piece of output as the value.
          if (error == false) {
            // Show the protected value.
            var link = '<a href="mailto:' + data + '">' + data + '</a>';
            value.html(link);
            // Hide the form and cancel link.
            form.remove();
            cancel.remove();
          }
        }
      });

      // Disable default submit behavior.
      e.preventDefault();
    });

  });

  // Test for valid email.
  function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
  };

})(jQuery);
