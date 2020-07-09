<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8' />
  <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel='stylesheet'>
  <link href='//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.1.1/fullcalendar.min.css' rel='stylesheet' />
  <link href='//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.1.1/fullcalendar.print.css' rel='stylesheet' media='print' />
  <link href="//cdnjs.cloudflare.com/ajax/libs/jquery.bootstrapvalidator/0.5.2/css/bootstrapValidator.min.css" rel="stylesheet" />
  <link href="css/bootstrap-colorpicker.min.css" rel="stylesheet" />
  <link href="css/bootstrap-timepicker.min.css" rel="stylesheet" />
  <script src='//cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.3/moment.min.js'></script>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery.bootstrapvalidator/0.5.2/js/bootstrapValidator.min.js"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/2.1.1/fullcalendar.min.js"></script>
  <script src='js/bootstrap-colorpicker.min.js'></script>
  <script src='js/bootstrap-timepicker.min.js'></script>
  <?php 
  require('crud/getUser.php');
  var_dump($curent_user_id);
  ?>
  <script src='js/main.js'></script>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap" rel="stylesheet">

  <style>
    body{
      font-family: 'Montserrat', sans-serif;
    }
  </style>
</head>
<body>
 <?php 
 require_once('crud/connect.php');
 $calendarUserData = $dbh->query("SELECT * FROM events WHERE id_user = 2 ORDER BY events.date ASC");
 $calendarUserData->execute();
 $users = $calendarUserData->fetchAll();
 foreach ($users as $row) {

  $data[] = array(
    'title' => $row['title'], 
    'start' => $row['date'], 
    'end' => $row['date']
  );
  
}
//echo $jData = json_encode($data);
?>
<div class="container">
  <div class="row clearfix">
    <div class="col-md-12 column">
      <br>
      <a href="" class="btn btn-primary">Regresar al panel</a><hr>
      <div id='calendar'></div>
      <br><br>
    </div>
  </div>
</div>
<div class="modal fade">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Cerrar</span></button>
        <h4 class="modal-title"></h4>
      </div>
      <div class="modal-body">
        <div class="error text-center"></div>
        <form class="form-horizontal" id="crud-form">
          <input id="id_user" name="id_user" type="hidden" value="<?php echo $curent_user_id; ?>" />
          <div class="form-group">
            <label class="col-md-4 control-label" for="title">Titulo</label>
            <div class="col-md-4">
              <input id="title" name="title" type="text" class="form-control input-md" />
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label" for="time">Hora</label>
            <div class="col-md-4 input-append bootstrap-timepicker">
              <input id="time" name="time" type="text" class="form-control input-md" />
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label" for="description">Descripcion</label>
            <div class="col-md-4">
              <textarea class="form-control" id="description" name="description"></textarea>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label" for="color">Color</label>
            <div class="col-md-4">
              <input id="color" name="color" type="text" class="form-control input-md" readonly="readonly" />
              <span class="help-block">Seleccione un color</span>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
</div>
</body>
</html>



