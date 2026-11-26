<?php
/**
 * Copy this file to `croix-config.php`:
 *
 * Main domain — one level above public_html:
 *   /home/uXXXXXXXX/domains/croixlighting.com.ph/croix-config.php
 *   /home/uXXXXXXXX/domains/croixlighting.com.ph/public_html/...
 *
 * Subdomain — inside the subdomain docroot (denied by .htaccess):
 *   /home/uXXXXXXXX/domains/project-uat.online/public_html/__croix/croix-config.php
 *   /home/uXXXXXXXX/domains/project-uat.online/public_html/__croix/index.html
 *
 * Do not commit the real key to git.
 */
return [
    'BREVO_API_KEY' => 'xkeysib-REPLACE_WITH_YOUR_BREVO_API_KEY',
    'CONTACT_TO' => 'info@croixlighting.com.ph',
    'CONTACT_FROM' => 'website@croixlighting.com.ph',
    // Set true temporarily to see Brevo's exact rejection in the form response.
    'DEBUG' => false,
];
