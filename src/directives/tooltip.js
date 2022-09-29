export default {
   mounted(el, { value }) {
      M.Tooltip.init(el, { html: value })
   },
   unmounted(el) {
      M.Tooltip.getInstance(el)?.destroy()
   }
}