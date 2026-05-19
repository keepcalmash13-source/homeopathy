// ============================================================
// HOMEOPATHY FINDER — Google Apps Script Backend
// ============================================================
// SETUP INSTRUCTIONS:
//
// 1. Open Google Sheets → create a new blank spreadsheet
//    Name it: "Homeopathy Medicine Data" (or anything you like)
//
// 2. Click: Extensions → Apps Script
//
// 3. Delete everything in the editor, then paste THIS ENTIRE FILE
//
// 4. Click the 💾 Save button (name the project anything)
//
// 5. Click: Deploy → New deployment
//    - Click the ⚙️ gear icon next to "Select type" → choose "Web app"
//    - Description: "Homeopathy API"
//    - Execute as: "Me"
//    - Who has access: "Anyone"
//    - Click "Deploy"
//
// 6. It will ask for permissions → click "Review permissions"
//    → Choose your Google account
//    → Click "Advanced" → "Go to (project name) (unsafe)"
//    → Click "Allow"
//
// 7. Copy the Web app URL (looks like: https://script.google.com/macros/s/XXXX/exec)
//
// 8. Paste that URL into the Homeopathy Finder app:
//    Settings → Cloud Sync → paste URL → click "Connect"
//
// That's it! Your data is now permanently saved in Google Sheets.
// ============================================================

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : '';

  try {
    var result;

    if (action === 'load') {
      result = loadData();
    } else if (action === 'save') {
      var postData = JSON.parse(e.postData.contents);
      result = saveData(postData);
    } else {
      result = { status: 'error', message: 'Unknown action. Use ?action=load or ?action=save' };
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

function saveData(data) {
  var sheet = getOrCreateSheet('AppData');

  // Store entire DB as JSON in cell A1, timestamp in B1
  sheet.getRange('A1').setValue(JSON.stringify(data));
  sheet.getRange('B1').setValue(new Date().toISOString());

  // Also maintain a readable "Medicines" sheet for easy viewing
  updateReadableSheet(data);

  return { status: 'ok', message: 'Data saved', timestamp: new Date().toISOString() };
}

function loadData() {
  var sheet = getOrCreateSheet('AppData');
  var raw = sheet.getRange('A1').getValue();

  if (!raw) {
    return { status: 'ok', data: null, message: 'No data found' };
  }

  try {
    var data = JSON.parse(raw);
    return { status: 'ok', data: data, timestamp: sheet.getRange('B1').getValue() };
  } catch (err) {
    return { status: 'error', message: 'Failed to parse stored data' };
  }
}

function updateReadableSheet(data) {
  var sheet = getOrCreateSheet('Medicines (Readable)');
  sheet.clear();

  // Header row
  sheet.getRange('A1').setValue('No.');
  sheet.getRange('B1').setValue('Medicine Name');
  sheet.getRange('C1').setValue('Symptoms');
  sheet.getRange('A1:C1').setFontWeight('bold').setBackground('#dcfce7');

  if (!data || !data.medicines) return;

  var medicines = [];
  for (var key in data.medicines) {
    medicines.push(data.medicines[key]);
  }

  // Sort alphabetically
  medicines.sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });

  for (var i = 0; i < medicines.length; i++) {
    var row = i + 2;
    sheet.getRange('A' + row).setValue(medicines[i].id);
    sheet.getRange('B' + row).setValue(medicines[i].name);
    sheet.getRange('C' + row).setValue(medicines[i].symptoms.join(', '));
  }

  // Auto-resize columns
  sheet.autoResizeColumns(1, 3);
}
