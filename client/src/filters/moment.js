import Vue from 'vue'
import moment from 'moment'

Vue.filter('timeFormat', function (timestamp) {
    return moment(timestamp).format('h:mm a')
});
