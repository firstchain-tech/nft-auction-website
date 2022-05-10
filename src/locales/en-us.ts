import footer from './en-us/footer'
import home from './en-us/home'
import auction from './en-us/auction'

const en = {
  'app.link.btn': 'Connent Wallet',
  'app.link.logout': 'Logout',
  'app.link.suceess': 'Login Success',
  'app.link.disconnect': 'Logout Success',
  'app.link.modal.title': 'Connect Wallet',
  'app.link.modal.ftitle': 'Connect with one of our available wallet providers or create a new one.',
  'app.switch.language.tips': 'Switch {{msg}} Success',
  'app.no.chainid.tips': 'Please switch your wallet to a supported network',
  'app.no.chainid.btn': 'Change Network',
  'app.chainid.drawer.title': 'Select network',
  'app.copy.success': 'copy success',
  'app.copy.tips': 'Please open it through blockchain browser, wallet or PC',
  'app.copy.btn': 'Copy link',
  'app.404.title': 'The requested URL was not found',
  'app.404.btn': 'Back to Homepage',
  ...footer,
  ...home,
  ...auction,
}

export default en
