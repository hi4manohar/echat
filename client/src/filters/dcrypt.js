/* eslint-disable */
const b = 'er', host = `${b}` + 'os-%.s3.'
export default {
  pImg(n) {
    const c = new Buffer(n, 'base64')
    return '//' + host.replace('%', 'storage') + 'ap-south-1.amazonaws.com/profiles/' + c.toString('utf8')
  },
  photopack(n) {
    const c = new Buffer(n, 'base64')
    return '//' + host.replace('%', 'photopacks') + 'us-ea' + c.toString('utf-8')
  },
}
