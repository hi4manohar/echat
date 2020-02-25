import Vue from 'vue'
import moment from 'moment'

Vue.filter('timeFormat', function(timestamp) {
  return moment(timestamp).format('h:mm a')
})

Vue.filter('fulltimeFormat', function(timestamp) {
  return moment(timestamp).format('MMM D YYYY h:mm a')
})
