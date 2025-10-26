import { boot } from 'quasar/wrappers'
import type { App } from 'vue'

export default boot(({ app }: { app: App }) => {
  if (process.env.DEV) {
    // Cast to a minimal type that just has devtools
    (app.config as unknown as { devtools: boolean }).devtools = true
    console.log('✅ Vue devtools hook enabled')
  }
})
