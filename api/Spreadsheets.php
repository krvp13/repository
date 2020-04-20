<?php

class SpreadSheets
{

  private $response;
  private $spreadsheetId;
  private $service;

  public function __construct($keyFile, $spreadsheetId)
  {
    $this->spreadsheetId = $spreadsheetId;

    $googleAccountKeyFilePath = __DIR__ . $keyFile;

    putenv('GOOGLE_APPLICATION_CREDENTIALS=' . $googleAccountKeyFilePath);
// Документация https://developers.google.com/sheets/api/
    $client = new Google_Client();
    $client->useApplicationDefaultCredentials();

// Области, к которым будет доступ
// https://developers.google.com/identity/protocols/googlescopes
    $client->addScope('https://www.googleapis.com/auth/spreadsheets');

    $this->service = new Google_Service_Sheets($client);

    $response = $this->service->spreadsheets->get($spreadsheetId);
  }

  public function append($range, $values) {

    $body = new Google_Service_Sheets_ValueRange(['values' => $values]);
    $options = array('valueInputOption' => 'RAW');
    $this->service->spreadsheets_values->append($this->spreadsheetId, $range, $body, $options);
  }
}