import { getDatabase, set, ref, child, get, update } from "firebase/database";
import { db } from '../firebase-config'

export default {
   state: {
      info: {}
   },
   mutations: {
      setInfo(state, info) {
         state.info = info
         console.log({ state });
      },
      clearInfo(state) {
         state.info = {}
      }
   },
   actions: {
      async fetchInfo({ dispatch, commit }) {

         try {
            const userId = await dispatch('getUID')

            if (!userId) {
               return
            }

            const snapshot = await get(child(ref(db), `users/${userId}/info`))

            if (snapshot.exists()) {
               const info = snapshot.val()
               console.log(info);
               commit('setInfo', info)
            } else {
               console.log("No data available");
            }
         } catch (error) {
            console.log(error);
            commit('setError', error)
         }


      },
      async updateInfo({ commit, dispatch, getters }, toUpdate) {
         const userId = await dispatch('getUID')
         if (!userId) {
            return
         }
         try {
            const info = {...getters.info, ...toUpdate}
            await set(ref(db, `users/${userId}/info`), info);
            commit('setInfo', info)
         } catch (error) {
            commit('setError', error)
            throw error
         }
      }
   },

   getters: {
      info: (s) => s.info,
   }
}