import { ref, push, get} from 'firebase/database';
import {db} from '../firebase-config'

export default {
   actions: {
      async createRecord({dispatch, commit}, record) {
         console.log({record});
         try {
            const userId = await dispatch('getUID')
            await push(ref(db, 'users/' + userId + '/records'), record);

         } catch (error) {
            commit('setError', error)
         }

      },
      async fetchRecords({ commit, dispatch }) {

         try {
            const userId = await dispatch('getUID')
            const snapshot = await get(ref(db, 'users/' + userId + '/records'));

            if (snapshot.exists()) {
               const res = snapshot.val()
               console.log(res);

               let recs = []

               Object.keys(res).forEach((key) => {
               recs.push({...res[key], id: key})
               })

               return recs;
               // commit('setCategories', info)
            } else {
               console.log("No data available");
               return [];
            }

         } catch (error) {

            commit('setError', error)

            throw error

         }

      },
   }
}