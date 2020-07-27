// import something here
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

import wings from 'wings4'
const $dbCon = wings('http://localhost:3030')

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ({ app, router, Vue }) => {
  // something to do
  Vue.use(Chartkick.use(Chart))
  Vue.prototype.$pdfMake = pdfMake
  Vue.prototype.$dbCon = $dbCon
}