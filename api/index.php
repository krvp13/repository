<?php
header('Content-Type: application/json');
$_POST = json_decode(file_get_contents('php://input'), true);

require_once './vendor/autoload.php';
require_once './Spreadsheets.php';

$keyFile = '/truba-test-1b85ebbc7860.json';
$spreadsheetId = '1bWtYXv1yiNsUHk0Qg0w8iu-MtZqfTm1atkpnSawua0I';
$sheet = new SpreadSheets($keyFile, $spreadsheetId);
$range = 'test_one';
$correct = isset($_POST['correct']) ? $_POST['correct'] : [];
$results = isset($_POST['results']) ? $_POST['results'] : [];

$values = [
  array_merge([$correct], array_flatten($results, 0)),
];

try {
  $response = $sheet->append($range, $values);
} catch (Exception $e) {
  echo json_encode(array(
    'error' => 'Не записалось в БД',
    '$values' => $values,
    '$list' => $list,
    'message' => $e,
  ));
  exit;
}

function array_flatten($array, $preserve_keys = 1, &$newArray = Array()) {
  foreach ($array as $key => $child) {
    if (is_array($child)) {
      $newArray =& array_flatten($child, $preserve_keys, $newArray);
    } elseif ($preserve_keys + is_string($key) > 1) {
      $newArray[$key] = $child;
    } else {
      $newArray[] = $child;
    }
  }
  return $newArray;
}