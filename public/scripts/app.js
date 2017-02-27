$(function () {
  const $form = $('#form__build');
  const $file = $('#f');
  const $btn = $('#form__build .btn');
  const $submitBtn = $('#form__build .btn[type="submit"]');
  const $resetBtn = $('#form__build .btn[type="reset"]');
  const $resultPanel = $('.panel.result');
  const $result = $('.result .panel-content');
  const $panelLoading = $('.panel .loading');

  // $file.data('prev-val', $file.val());

  // $file.on('keyup', function (e) {    
  //   if ($file.val() !== $file.data('prev-val')) {      
  //     hideResultsPanel();
  //   }
  //   $file.data('prev-val', $file.val());
  //   updateButtons();
  // });

  $file.on('input', function (e) {
    updateButtons();
  });

  $form.on('submit', function (e) {
    e.preventDefault();

    var files = $file.get(0).files;
    var formData = new FormData();


    $.each(files, function (key, value) {
      formData.append($file.get(0).name, value);
    });

    var serializedData = $form.serializeArray();

    $.each(serializedData, function (k, v) {
      formData.append(v.name, v.value);
    });

    $.ajax('/build/', {
      contentType: false,
      data: formData,
      type: 'POST',
      method: 'POST',
      processData: false,
      // xhr: function () {
      //   var myxhr = $.ajaxSettings.xhr();
      //   if (myxhr.upload) {
      //     myxhr.upload.addEventListener('progress', function (e) {
      //       if (e.lengthComputable) {
      //         console.log('Loaded: ' + e.loaded + ' Total: ' + e.total);
      //       }
      //     }, false);
      //   }
      //   return myxhr;
      // },

      beforeSend: handleStart,
      complete: handleEnd,
      success: handleSuccess,
      failure: handleFaiure
    });
  });

  $form.on('reset', function (e){
    setTimeout(function (){
    updateButtons();
    hideResultsPanel();
    }, 0);
  });

  function handleStart() {
    $btn.attr('disabled', true);
    $panelLoading.removeClass('hidden');
  }

  function handleEnd() {
    $btn.attr('disabled', null);
    $panelLoading.addClass('hidden');
  }
  
  function handleSuccess(data) {
    if (data.error) {
      hideResultsPanel();
      alert(data.error.message);
    } else {
      $result.parent().removeClass('hidden');
      $result.html(data.sorted);
    }
  }

  function handleFaiure(data) {
    console.log(data);
  }

  function hideResultsPanel() {
    $resultPanel.addClass('hidden');
  }

  function updateButtons() {
    if ($file.val()) {
      $submitBtn.attr('disabled', null);
      $resetBtn.attr('disabled', null);
    } else {
      $submitBtn.attr('disabled', true);
      $resetBtn.attr('disabled', true);
    }
  }
  updateButtons();
});

