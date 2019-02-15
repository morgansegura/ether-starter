export const toggleMobileNav = () => {
  const wrapper = document.querySelector('.wrapper')
  // toggle open/closed calsses for transition effects
  const superToggle = (element, class0, class1) => {
    element.classList.toggle(class0)
    element.classList.toggle(class1)
  }

  superToggle(wrapper, 'mobile-nav--is-open', 'mobile-nav--is-closed')
}

export const scrollHeader = () => {
  const header = document.getElementById('headerMain')
  window.onscroll = e => {
    scrollFunction()
    function scrollFunction() {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        header.classList.add('fill')
        header.classList.remove('unfill')
      } else {
        header.classList.remove('fill')
        header.classList.add('unfill')
      }
    }
  }
}
