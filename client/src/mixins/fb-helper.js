import fb from '../db/firebase'

export const fbHelper = {
  methods: {
    fbDeleteListener(ref) {
      const r = fb.db.ref(ref)
      r.off('value')
    },
  },
}
