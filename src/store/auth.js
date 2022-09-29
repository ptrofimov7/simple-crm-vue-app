
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from "firebase/auth";

// import { auth } from '@/main'
import { firebase, db } from "@/firebase-config";
import { ref, set } from "firebase/database";

const auth = getAuth(firebase)
export default {
   actions: {

      async login({ dispatch, commit }, { email, password }) {

         try {
            await signInWithEmailAndPassword(auth, email, password)
            localStorage.setItem('userUID', auth.currentUser.uid)
         } catch (error) {
            console.log(error);
            commit('setError', error)
            throw error;
         }

      },

      async register({ dispatch, commit }, { email, password, name }) {

         try {
            await createUserWithEmailAndPassword(auth, email, password)
            const userId = await dispatch('getUID')
            // const db = getDatabase();
            set(ref(db, 'users/' + userId), { info: {
               name,
               bill: 1000,
            }
            });
         } catch (error) {
            console.log(error);
            commit('setError', error)
            throw error;
         }

      },

      getUID() {
         const uid = auth.currentUser?.uid || localStorage.getItem('userUID')

         return uid
      },

      async logout({commit}) {
         try {
            await signOut(auth)
            commit('clearInfo')
            localStorage.removeItem("userUID")
         } catch (error) {
            console.log(error);
            commit('setError', error)
          }
      }

   }

}