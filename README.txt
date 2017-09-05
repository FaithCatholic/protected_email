---SUMMARY---

Module aims to provide a field formatter for email fields which provide a captcha challenge AND honeypot
test to prevent bots from scraping email addresses.

---INSTALLATION---

Install as usual at /admin/extend. Grant the 'Skip protected email captcha' permission to roles that you
do NOT want to complete a captcha challenge to view email addresses. (Trusted roles.)

---USAGE---

1. Enable the module, as well as the captcha and honeypot dependency.

2. Enable email fields to use the protected_email module by setting field formatter displays to use
"Protected Email".

3. You may need to clear the Drupal cache in order to see the field formatter take effect.

---NOTES---

1. Does not work with Varnish caching because captcha breaks Varnish.

2. BigPipe may interfere with the widget hotlink.
