<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['message' => 'Method not allowed']);
  exit;
}

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
  http_response_code(400);
  echo json_encode(['message' => 'No file uploaded']);
  exit;
}

$file = $_FILES['file'];
$maxBytes = 8 * 1024 * 1024;
if ($file['size'] > $maxBytes) {
  http_response_code(400);
  echo json_encode(['message' => 'File too large (max 8 MB)']);
  exit;
}

$uploadsDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'uploads';
if (!is_dir($uploadsDir) && !mkdir($uploadsDir, 0755, true)) {
  http_response_code(500);
  echo json_encode(['message' => 'Unable to create uploads folder']);
  exit;
}

$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'doc', 'docx', 'xls', 'xlsx'];
if (!in_array($ext, $allowed, true)) {
  http_response_code(400);
  echo json_encode(['message' => 'File type not allowed']);
  exit;
}

$filename = date('YmdHis') . '-' . bin2hex(random_bytes(4)) . '.' . $ext;
$destination = $uploadsDir . DIRECTORY_SEPARATOR . $filename;

if (!move_uploaded_file($file['tmp_name'], $destination)) {
  http_response_code(500);
  echo json_encode(['message' => 'Unable to save uploaded file']);
  exit;
}

$url = '/uploads/' . $filename;
echo json_encode([
  'success' => true,
  'file_url' => $url,
  'filename' => $filename,
  'original_name' => $file['name'],
  'size' => $file['size'],
]);
