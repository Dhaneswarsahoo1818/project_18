// Example starter JavaScript for disabling form submissions if there are invalid fields
  (() => {
    'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      // First, normalize required text inputs/areas by trimming whitespace
      const requiredTextControls = form.querySelectorAll('textarea[required], input[required]')
      requiredTextControls.forEach(ctrl => {
        // Only apply trimmed check to textual controls (skip checkboxes/radios)
        const type = ctrl.getAttribute('type') || ctrl.tagName.toLowerCase()
        if (type === 'textarea' || type === 'text' || type === 'search' || type === 'email' || type === 'url' || type === 'tel') {
          if ((ctrl.value || '').trim().length === 0) {
            // mark invalid via Constraint Validation API
            ctrl.setCustomValidity('Please fill out this field')
          } else {
            ctrl.setCustomValidity('')
          }
        }
      })

      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()