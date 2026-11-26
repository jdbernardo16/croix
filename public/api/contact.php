<?php
declare(strict_types=1);

/**
 * CROIX contact endpoint for Hostinger shared hosting.
 *
 * The form posts JSON to /api/contact; .htaccess rewrites that to this file.
 * Sends through Brevo's HTTP API, so no Composer, SMTP extension, or Node
 * runtime is required.
 *
 * Configuration lives one level above public_html, in croix-config.php:
 *
 *   return [
 *     'BREVO_API_KEY' => 'xkeysib-...',
 *     'CONTACT_TO'    => 'info@croixlighting.com.ph',
 *     'CONTACT_FROM'  => 'website@croixlighting.com.ph',
 *   ];
 *
 * Environment variables with the same names are used as a fallback.
 */

ini_set('display_errors', '0');

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

const CROIX_MAX = [
    'name' => 120,
    'firm' => 160,
    'role' => 120,
    'email' => 200,
    'phone' => 60,
    'location' => 160,
    'sector' => 80,
    'package' => 80,
    'schedule' => 120,
    'message' => 6000,
];

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function clean(mixed $value, int $limit): string
{
    if (!is_string($value)) {
        return '';
    }

    $value = trim($value);

    return function_exists('mb_substr') ? mb_substr($value, 0, $limit, 'UTF-8') : substr($value, 0, $limit);
}

function e(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/**
 * POST a JSON body and return [status, responseBody, transportError].
 */
function postJson(string $url, string $apiKey, string $body): array
{
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_HTTPHEADER => [
            'api-key: ' . $apiKey,
            'content-type: application/json',
            'accept: application/json',
        ],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_TIMEOUT => 20,
    ]);

    $response = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $error = curl_error($ch);

    return [$status, is_string($response) ? $response : '', $error];
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}

$config = [];
$configPath = dirname(__DIR__, 2) . '/croix-config.php';

if (is_file($configPath)) {
    $loaded = require $configPath;
    if (is_array($loaded)) {
        $config = $loaded;
    }
}

$apiKey = (string) ($config['BREVO_API_KEY'] ?? (getenv('BREVO_API_KEY') ?: ''));
$contactTo = (string) ($config['CONTACT_TO'] ?? (getenv('CONTACT_TO') ?: 'info@croixlighting.com.ph'));
$contactFrom = (string) ($config['CONTACT_FROM'] ?? (getenv('CONTACT_FROM') ?: 'website@croixlighting.com.ph'));

$raw = file_get_contents('php://input');
$data = json_decode(is_string($raw) ? $raw : '', true);

if (!is_array($data)) {
    respond(400, ['ok' => false, 'error' => 'Invalid request.']);
}

// Honeypot: bots fill it, humans never see it.
if (clean($data['website'] ?? null, 200) !== '') {
    respond(200, ['ok' => true]);
}

$name = clean($data['name'] ?? null, CROIX_MAX['name']);
$email = clean($data['email'] ?? null, CROIX_MAX['email']);
$message = clean($data['message'] ?? null, CROIX_MAX['message']);
$firm = clean($data['firm'] ?? null, CROIX_MAX['firm']);
$role = clean($data['role'] ?? null, CROIX_MAX['role']);
$phone = clean($data['phone'] ?? null, CROIX_MAX['phone']);
$location = clean($data['location'] ?? null, CROIX_MAX['location']);
$sector = clean($data['sector'] ?? null, CROIX_MAX['sector']);
$preferredPackage = clean($data['package'] ?? null, CROIX_MAX['package']);
$schedule = clean($data['schedule'] ?? null, CROIX_MAX['schedule']);

$files = [];
if (isset($data['files']) && is_array($data['files'])) {
    foreach (array_slice($data['files'], 0, 20) as $file) {
        $fileName = clean($file, 240);
        if ($fileName !== '') {
            $files[] = $fileName;
        }
    }
}

if ($name === '' || $email === '' || $message === '') {
    respond(400, ['ok' => false, 'error' => 'Name, email, and project notes are required.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, ['ok' => false, 'error' => 'Please provide a valid email address.']);
}

if ($apiKey === '') {
    respond(503, [
        'ok' => false,
        'error' => 'Email service is not configured yet. Please email info@croixlighting.com.ph.',
    ]);
}

if (!function_exists('curl_init')) {
    error_log('CROIX contact: the PHP cURL extension is not available.');
    respond(503, [
        'ok' => false,
        'error' => 'The email service is unavailable. Please email info@croixlighting.com.ph.',
    ]);
}

$rows = array_filter([
    'Name' => $name,
    'Firm' => $firm,
    'Role' => $role,
    'Email' => $email,
    'Phone' => $phone,
    'Project location' => $location,
    'Sector' => $sector,
    'Preferred package' => $preferredPackage,
    'Target schedule' => $schedule,
], static fn (string $value): bool => $value !== '');

$rowsHtml = '';
foreach ($rows as $label => $value) {
    $rowsHtml .= '<tr>'
        . '<td style="padding:8px 12px 8px 0;border-bottom:1px solid #ECEAE3;color:#6E6C67;font-size:12px;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap">' . e($label) . '</td>'
        . '<td style="padding:8px 0;border-bottom:1px solid #ECEAE3;font-size:14px">' . e($value) . '</td>'
        . '</tr>';
}

$filesHtml = '';
if ($files !== []) {
    $filesHtml = '<h3 style="margin:24px 0 8px;font-size:14px">Files named by the sender</h3>'
        . '<ul style="margin:0;padding-left:18px;font-size:14px">';
    foreach ($files as $file) {
        $filesHtml .= '<li>' . e($file) . '</li>';
    }
    $filesHtml .= '</ul><p style="color:#6E6C67;font-size:12px">Ask the sender to reply with the actual drawings attached.</p>';
}

$htmlContent = '<div style="font-family:Arial,sans-serif;color:#1D1E20;line-height:1.6">'
    . '<h2 style="margin:0 0 4px">New project enquiry</h2>'
    . '<p style="margin:0 0 20px;color:#6E6C67">CROIX Lighting Design Studio website</p>'
    . '<table style="border-collapse:collapse;width:100%;max-width:640px">' . $rowsHtml . '</table>'
    . '<h3 style="margin:24px 0 8px;font-size:14px">Project notes</h3>'
    . '<p style="margin:0;white-space:pre-wrap;font-size:14px">' . e($message) . '</p>'
    . $filesHtml
    . '</div>';

$textLines = ['New project enquiry — CROIX website', ''];
foreach ($rows as $label => $value) {
    $textLines[] = $label . ': ' . $value;
}
$textLines[] = '';
$textLines[] = 'Project notes:';
$textLines[] = $message;
if ($files !== []) {
    $textLines[] = '';
    $textLines[] = 'Files named by the sender: ' . implode(', ', $files);
}
$textContent = implode("\n", $textLines);

$payload = json_encode([
    'sender' => ['name' => 'CROIX Website', 'email' => $contactFrom],
    'to' => [['email' => $contactTo]],
    'replyTo' => ['email' => $email, 'name' => $name],
    'subject' => 'New project enquiry — ' . ($firm !== '' ? $firm : $name),
    'htmlContent' => $htmlContent,
    'textContent' => $textContent,
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

[$status, $responseBody, $transportError] = postJson(
    'https://api.brevo.com/v3/smtp/email',
    $apiKey,
    is_string($payload) ? $payload : '{}'
);

if ($status < 200 || $status >= 300) {
    error_log('CROIX contact: Brevo HTTP ' . $status . ' ' . $transportError . ' ' . substr($responseBody, 0, 500));
    respond(502, [
        'ok' => false,
        'error' => 'The email service rejected the message. Please try again.',
    ]);
}

respond(200, ['ok' => true]);
