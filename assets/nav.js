const settings = require('electron-settings')

document.body.addEventListener('click', (event) => {
  if (event.target.dataset.section) {
    handleSectionTrigger(event)
  }
})

function handleSectionTrigger(event) {
  hideAllSectionsAndDeselectButtons()
  // Highlight clicked button and show view
  event.target.classList.add('is-selected')
  // Display the current handleSectionTrigger
  const sectionId = `${event.target.dataset.section}-section`
  document.getElementById(sectionId).classList.add('is-shown')

  const buttonId = event.target.getAttribute('id')
  settings.set('activeSectionButtonId', buttonId)
}

function hideAllSectionsAndDeselectButtons() {
  const sections = document.querySelectorAll('.js-section.is-shown')
  Array.prototype.forEach.call(sections, (section) => {
    section.classList.remove('is-shown')
  })
  const buttons = document.querySelectorAll('.nav-button.is-selected')
  Array.prototype.forEach.call(buttons, (button) => {
    button.classList.remove('is-selected')
  })
}

function showMainContent() {
  document.querySelector('.js-content').classList.add('is-shown')
}

function activateDefaultSection() {
  document.getElementById('button-borrow-books').click()
}

const sectionId = settings.get('activeSectionButtonId')
if (sectionId) {
  showMainContent()
  const section = document.getElementById(sectionId)
  if (section) section.click()
} else {
  activateDefaultSection()
}
