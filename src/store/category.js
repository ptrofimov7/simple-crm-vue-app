import { ref, child, push, get, set } from 'firebase/database';
import {db} from '../firebase-config'


export default {

   actions: {
      async fetchCategories({ commit, dispatch }) {

         try {
            const userId = await dispatch('getUID')
            const snapshot = await get(ref(db, 'users/' + userId + '/categories'));

            if (snapshot.exists()) {
               const res = snapshot.val()
               console.log(res);

               let cats = []

               Object.keys(res).forEach((key) => {
                  cats.push({name: res[key].name, limit: res[key].limit, id: key})
               })

               return cats;
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
      async createCategory({ commit, dispatch }, { name, limit }) {
         // const db = getDatabase();
         try {
            const userId = await dispatch('getUID')
            const snapshot = await push(ref(db, 'users/' + userId + '/categories'), {
               name,
               limit,
            });
            return { name, limit, id: snapshot.key }
         } catch (error) {

            commit('setError', error)

            throw error

         }

      },
      async updateCategory({ commit, dispatch }, { name, limit, currentId:id }) {
         // const db = getDatabase();
         console.log("ffffffffffffff");
         try {
            const userId = await dispatch('getUID')
            await set(child(ref(db, 'users/' + userId + '/categories'), id),
            {
               name,
               limit,
            })
          
         } catch (error) {

            commit('setError', error)

            throw error

         }

      }
   }

}