<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

header('Content-Type: application/json; charset=utf-8');

$dataDir = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'data';
$dataFile = $dataDir . DIRECTORY_SEPARATOR . 'activity-folders.json';

if (!is_dir($dataDir) && !mkdir($dataDir, 0755, true)) {
  http_response_code(500);
  echo json_encode(['message' => 'Unable to create data folder']);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  if (!file_exists($dataFile)) {
    echo json_encode([]);
    exit;
  }
  $raw = file_get_contents($dataFile);
  $decoded = json_decode($raw, true);
  echo json_encode(is_array($decoded) ? $decoded : []);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
  $raw = file_get_contents('php://input');
  $decoded = json_decode($raw, true);
  if (!is_array($decoded)) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid JSON body']);
    exit;
  }
  if (!file_put_contents($dataFile, json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES))) {
    http_response_code(500);
    echo json_encode(['message' => 'Unable to save activity folders']);
    exit;
  }
  echo json_encode(['success' => true, 'count' => count($decoded)]);
  exit;
}

http_response_code(405);
echo json_encode(['message' => 'Method not allowed']);
