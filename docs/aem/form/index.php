<form method="post" action="https://www.vt.edu/mailer/generic-recaptcha-mailer.php" id="d98f1a95-ef89-4f4d-be68-a05930a3d8ad">
<!-- required: secure post method to this fully qualified domain name and path -->

<input type="hidden" name="email" value="assist@vt.edu">
<!-- required field: @vt.edu email that the form fields should be emailed to -->
<!-- can use multiple @vt.edu addresses separated by commas -->

<input type="hidden" name="from" value="assist@vt.edu">
<!-- optional field: @vt.edu email that the form fields should be emailed from -->

<input type="hidden" name="replyto" value="assist@vt.edu">
<!-- optional field: set the @vt.edu replyto if different than "from" -->

<input type="hidden" name="subject" value="Contact Us">
<!-- optional field: set the subject on the email -->

<input type="hidden" name="redirect" value="https://assist.stage.cms.vt.edu/content/assist_vt_edu/en/contact-us/contact-success.html"> 
<!-- optional field: path to a page the user will be sent to after form submission -->

<!-- <input type="hidden" name="format" value="table">
optional field: value="text" is default -->

<!-- <input type="hidden" name="Form URL" value="https://ensemble.cms.vt.edu/help/how-to/how_to_forms.html">
user defined hidden field -->

<div class="form-group">
<label for="name">Name:</label>
<input id="name" name="Full Name" class="form-control" type="text">
</div>

<div class="form-group">
<label for="contact">Email:</label>
<input id="contact" name="contact" class="form-control" type="email" autocapitalize="off" autocorrect="off" autocomplete="email">
<!-- collect email from the person filling out the form -->
</div>

<div class="form-group">
<label for="phone">Phone:</label>
<input id="phone" name="phone" class="form-control" type="tel" autocorrect="off" autocomplete="tel">
<!-- collect email from the person filling out the form -->
</div>
<fieldset class="form-group">
    <legend>I would like help with:</legend>
    <div class="form-check">
  <input class="form-check-input" type="radio" name="needs" id="atneeds1" value="option1" checked>
  <label class="form-check-label" for="atneeds1">
    Web Accessibility
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="needs" id="atneeds2" value="option2">
  <label class="form-check-label" for="atneeds2">
    Inclusive Media (e.g. braille, captions)
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="needs" id="atneeds3" value="option3">
  <label class="form-check-label" for="atneeds3">
    Assistive Technology
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="needs" id="atneeds4" value="option4">
  <label class="form-check-label" for="atneeds4">
    Other
  </label>
</div>
</fieldset>

<div class="form-group">
<label for="comments">Question or comment</label>
<textarea id="comments" name="Comments" class="form-control" rows="4"></textarea>
</div> 

<!-- recaptcha2 -->
<script src='https://www.google.com/recaptcha/api.js'></script>
<div class="g-recaptcha" data-size="compact" data-sitekey="6LfKYUYUAAAAANgUdsBTPnLdP306MeDVpz1SytS1"></div>
<noscript>Completing this form requires javascript.<br><br></noscript>
<!-- /recaptcha2 -->

<div class="form-group">
<input type="submit" value="Submit">
<input type="reset" value="Reset">
</div>
</form>