<!doctype html>
<html>
  <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <title>Tree App</title>
      <link href="css/bootstrap.css" rel="stylesheet">
      <link href="css/tree.css" rel="stylesheet">
      <script src="js/tree.js" type="text/javascript"></script>
  </head>
<body>

<div class="container justify-content-center mt-4">
    <div class="row justify-content-md-center">
        <div class="col-md-6">
        	<a href="#" type="button" class="btn btn-success" js-data-create="">Create Root</a>
        	<hr class="my-4">
            <div class="row">
                <div js-data-append="">
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal d-none" js-data-modal="">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLiveLabel">Root removing</h5>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to remove the root?</p>
            </div>
            <div class="modal-footer justify-content-between">
                <span class="" id="time">20</span>
                <div>
                    <button type="button" class="btn btn-primary" js-data-modal-yes="">Yes</button>
                    <button type="button" class="btn btn-secondary" js-data-modal-no="">No</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal-backdrop d-none" js-data-modal=""></div>

</body>
</html>
