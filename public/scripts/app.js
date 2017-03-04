$(function () {

  const $step1 = $('#step-1');
  const $step2 = $('#step-2');
  const $step3 = $('#step-3');

  // STEP 1
  (function ($step) {
    const $form = $step.find('form');
    const $input = $step.find('input[type="file"]');
    const $btns = $step.find('.btn');
    const $submitBtn = $step.find('.btn[type="submit"]');
    const $resetBtn = $step.find('.btn[type="reset"]');
    const $respSelect = $step2.find('select');
    const $loader = $step.find('.loading');

    $input.on('input change', function (e) {
      updateButtons($btns, !!($input.val()));
    });
    updateButtons($btns, !!($input.val()));

    $form.on('reset', function (e) {
      setTimeout(function (e) {
        updateButtons($btns, !!($input.val()));
        hideStepPanel($step2);
        hideStepPanel($step3);
      }, 0);
    });

    $form.on('submit', function (e) {
      e.preventDefault();

      var formData = new FormData();

      $.each($input.get(0).files, function (key, value) {
        formData.append($input.attr('name'), value);
      });

      $.ajax('/build/', {
        data: formData,
        contentType: false,
        type: 'POST',
        method: 'POST',
        processData: false,
        beforeSend: handleStart($btns, $loader),
        complete: handleEnd($btns, $loader),
        success: handleSuccess(resolve, reject),
        failure: handleFaiure
      });
    });

    function resolve (data) {
      showStepPanel($step2);
      hideStepPanel($step3);
      
      var options = '<option disabled selected value></option>';

      data.graphNodes.forEach(function (node) {
        options += '<option value="' + node + '">' + node + '</option>';
      });

      $respSelect.empty().html(options);
    }

    function reject(data) {
      hideStepPanel($step2);
      hideStepPanel($step3);
      // console.log('rejected', data);
      displayError(data.error.message, data.error.name);
    }
  })($step1);


  // STEP 2
  (function ($step) {
    const $form = $step.find('form');
    const $input = $step.find('select');
    const $btns = $step.find('.btn');
    const $submitBtn = $step.find('.btn[type="submit"]');
    const $resetBtn = $step.find('.btn[type="reset"]');
    const $loader = $step.find('.loading');

    $input.on('change', function (e) {
      updateButtons($btns, !!($input.val()));
    });
    updateButtons($btns, !!($input.val()));

    $form.on('reset', function (e) {
      setTimeout(function (e) {
        updateButtons($btns, !!($input.val()));
        hideStepPanel($step3);
      }, 0);
    });

    $form.on('submit', function (e) {
      e.preventDefault();

      $.ajax('/topology/' + $input.val(), {
        // contentType: false,
        type: 'GET',
        method: 'GET',
        // processData: false,
        beforeSend: handleStart($btns, $loader),
        complete: handleEnd($btns, $loader),
        success: handleSuccess(resolve, reject),
        failure: handleFaiure
      });
    });

    function resolve (data) {
      showStepPanel($step3);
      $step3.find('.result__value').html(data.inbound);
    }

    function reject(data) {
      hideStepPanel($step3);
      // console.log('rejected', data);
      displayError(data.error.message, data.error.name);
    }

    function failure(data) {
      console.log('failure', data);
    }
  })($step2);


  function updateButtons(btns, hasValue) {
    btns.attr('disabled', hasValue ? null : true);
  }

  function showStepPanel($panel) {
    $panel.removeClass('hidden');
  }

  function hideStepPanel($panel) {
    $panel.addClass('hidden');
  }

  function handleStart($btns, $loader) {
    return function () {
      $btns.attr('disabled', true);
      $loader.removeClass('hidden');
    };
  }

  function handleFaiure(data) {
    console.log('Failure:');
    console.log(data);
  }

  function handleSuccess(resolve, reject) {
    return function (data) {
      data.error ? reject(data) : resolve(data);
    }
  }

  function handleEnd($btns, $loader) {
    return function () {
      $btns.attr('disabled', null);
      $loader.addClass('hidden');
    };
  }

  function displayError(msg, title) {
    console.log('displayError');
    alert('Name: ' + title + '\n\nMessage: ' + msg);
  }
  
});

