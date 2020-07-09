$(function(){


  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }


    var currentDate; // Holds the day clicked when adding a new event
    var currentEvent; // Holds the event object when editing an event
    $('#color').colorpicker(); // Colopicker
    $('#time').timepicker({
      minuteStep: 5,
      showInputs: false,
      disableFocus: true,
      showMeridian: false
    });  // Timepicker
    // Fullcalendar
    $('#calendar').fullCalendar({
     monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
     monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
     dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
     dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
     buttonText: {
      prev: "Ant",
      next: "Sig",
      today: "Hoy",
      month: "Mes",
      week: "Semana",
      day: "Día",
      list: "Agenda"
    },
    weekText: "Sm",
    allDayText: "Todo el día",
    moreLinkText: "más",
    noEventsText: "No hay eventos para mostrar",

    timeFormat: 'H(:mm)',
    header: {
      left: 'prev, next, today',
      center: 'title',
      right: 'month, basicWeek, basicDay'
    },
        // Get all events stored in database
        events: 'crud/getEvents.php?cu='+getParameterByName('cu'),
        // Handle Day Click
        dayClick: function(date, event, view) {
          currentDate = date.format();
            // Open modal to add event
            modal({
                // Available buttons when adding
                buttons: {
                  add: {
                        id: 'add-event', // Buttons id
                        css: 'btn-success', // Buttons class
                        label: 'Agregar' // Buttons label
                      }
                    },
                title: 'Agregar evento (' + date.format() + ')' // Modal title
              });
          },
        // Event Mouseover
        eventMouseover: function(calEvent, jsEvent, view){
          var tooltip = '<div class="event-tooltip">' + calEvent.description + '</div>';
          $("body").append(tooltip);
          $(this).mouseover(function(e) {
            $(this).css('z-index', 10000);
            $('.event-tooltip').fadeIn('500');
            $('.event-tooltip').fadeTo('10', 1.9);
          }).mousemove(function(e) {
            $('.event-tooltip').css('top', e.pageY + 10);
            $('.event-tooltip').css('left', e.pageX + 20);
          });
        },
        eventMouseout: function(calEvent, jsEvent) {
          $(this).css('z-index', 8);
          $('.event-tooltip').remove();
        },
        // Handle Existing Event Click
        eventClick: function(calEvent, jsEvent, view) {
            // Set currentEvent variable according to the event clicked in the calendar
            currentEvent = calEvent;
            // Open modal to edit or delete event
            modal({
                // Available buttons when editing
                buttons: {
                  delete: {
                    id: 'delete-event',
                    css: 'btn-danger',
                    label: 'Eliminar'
                  },
                  update: {
                    id: 'update-event',
                    css: 'btn-success',
                    label: 'Actualizar'
                  }
                },
                title: 'Editar evento "' + calEvent.title + '"',
                event: calEvent
              });
          }
        });
    // Prepares the modal window according to data passed
    function modal(data) {
        // Set modal id_user
        $('.modal-id_user').html(data.id_user);
        // Set modal title
        $('.modal-title').html(data.title);
        // Clear buttons except Cancel
        $('.modal-footer button:not(".btn-default")').remove();
        // Set input values
        $('#title').val(data.event ? data.event.title : '');
        if( ! data.event) {
            // When adding set timepicker to current time
            var now = new Date();
            var time = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes());
          } else {
            // When editing set timepicker to event's time
            var time = data.event.date.split(' ')[1].slice(0, -3);
            time = time.charAt(0) === '0' ? time.slice(1) : time;
          }
          $('#time').val(time);
          $('#description').val(data.event ? data.event.description : '');
          $('#color').val(data.event ? data.event.color : '#3a87ad');
        // Create Butttons
        $.each(data.buttons, function(index, button){
          $('.modal-footer').prepend('<button type="button" id="' + button.id  + '" class="btn ' + button.css + '">' + button.label + '</button>')
        })
        //Show Modal
        $('.modal').modal('show');
      }
    // Handle Click on Add Button
    $('.modal').on('click', '#add-event',  function(e){
      if(validator(['title', 'description'])) {
        $.post('crud/addEvent.php', {
          id_user: $('#id_user').val(),
          title: $('#title').val(),
          description: $('#description').val(),
          color: $('#color').val(),
          date: currentDate + ' ' + getTime()
        }, function(result){
          $('.modal').modal('hide');
          $('#calendar').fullCalendar("refetchEvents");
        });
      }
    });
    // Handle click on Update Button
    $('.modal').on('click', '#update-event',  function(e){
      if(validator(['title', 'description'])) {
        $.post('crud/updateEvent.php', {
          id: currentEvent._id,
          title: $('#title').val(),
          description: $('#description').val(),
          color: $('#color').val(),
          date: currentEvent.date.split(' ')[0]  + ' ' +  getTime()
        }, function(result){
          $('.modal').modal('hide');
          $('#calendar').fullCalendar("refetchEvents");
        });
      }
    });
    // Handle Click on Delete Button
    $('.modal').on('click', '#delete-event',  function(e){
      $.get('crud/deleteEvent.php?id=' + currentEvent._id, function(result){
        $('.modal').modal('hide');
        $('#calendar').fullCalendar("refetchEvents");
      });
    });
    // Get Formated Time From Timepicker
    function getTime() {
      var time = $('#time').val();
      return (time.indexOf(':') == 1 ? '0' + time : time) + ':00';
    }
    // Dead Basic Validation For Inputs
    function validator(elements) {
      var errors = 0;
      $.each(elements, function(index, element){
        if($.trim($('#' + element).val()) == '') errors++;
      });
      if(errors) {
        $('.error').html('*Por favor inserte el título y la descripción<br><hr>');
        return false;
      }
      return true;
    }
  });