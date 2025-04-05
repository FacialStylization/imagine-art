import type { Directive } from 'vue'

export const vLoading: Directive<HTMLElement, boolean> = {
  mounted(el, binding) {
    updateLoadingState(el, binding)
  },
  updated(el, binding) {
    updateLoadingState(el, binding)
  }
}

function updateLoadingState(el: HTMLElement, binding: DirectiveBinding<boolean>) {
  binding.value 
    ? el.classList.add('loading') 
    : el.classList.remove('loading')
}
