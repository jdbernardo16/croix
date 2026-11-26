<?php
/**
 * Copy this file to ONE LEVEL ABOVE public_html as `croix-config.php`.
 *
 * Hostinger layout:
 *   /home/uXXXXXXXX/domains/croixlighting.com.ph/croix-config.php
 *   /home/uXXXXXXXX/domains/croixlighting.com.ph/public_html/...
 *
 * The site reads it from dirname(public_html/api, 2), so it is never
 * web-accessible. Do not commit the real key to git.
 */
return [
    'BREVO_API_KEY' => 'xkeysib-REPLACE_WITH_YOUR_BREVO_API_KEY',
    'CONTACT_TO' => 'info@croixlighting.com.ph',
    'CONTACT_FROM' => 'website@croixlighting.com.ph',
];
