<html>
<head>
  <title>PMV (PDF Manga Viewer)</title>
  <meta name="description" content="WEBブラウザ上でPDFを漫画用見開き表示で閲覧できるサービス。">
  <meta name="keywords" content="PDF漫画ビューア,PDF,漫画,ビューア">
  <link rel="stylesheet" type="text/css" href="style.css">
  <script type="text/javascript" src="pdf.js"></script>
  <script type="text/javascript" src="pdf.worker.js"></script>
  <script type="text/javascript" src="jquery.min.js"></script>
</head>
<body>
  <?php include_once("analyticstracking.php") ?>
  <input id='pdf' type='file' accept="application/pdf">
  <div id="pages">
    <canvas id="canvas-left"></canvas>
    <canvas id="canvas-right"></canvas>
  </div>
  <div id="control">
    <img id="fullscreen" src="./img/fullscreen.png">
    <img id="window" src="./img/fullscreen_exit.png">
  </div>
  <nav>
    <p>PDFをドラッグ&amp;ドロップ</p>
    <span id="btn">PDFを選択</span>
  </nav>
  <script type="text/javascript" src="app.js"></script>
</body>
</html>
