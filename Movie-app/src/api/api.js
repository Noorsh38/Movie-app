import store from '../store';
import { auth, firestore } from '../../config/firebase';
import { collection, getDocs, doc, setDoc, addDoc, deleteDoc } from "firebase/firestore"


export const addVideosMethod = async (body) => {
    let res = null
    let user = store.getState().user
    // const userDocRef = doc(firestore, "Videos", user?.uid + Date.now())
    // await setDoc(userDocRef, body)
    // await firestore()
    //     .collection('Videos')
    //     .add(body)
    await addDoc(collection(firestore, 'Videos'), body)
        .then(() => {
            let result = { success: true, message: 'Added to Favorites' }
            res = result
        })
        .catch((error) => {
            let result = { success: false, message: error }
            res = result
        })

    return res

}

export const getVideosByUserIdMethod = async () => {
    let user = store.getState().user
    let result = []
    let res = null
    try {
        const productsRef = collection(firestore, "Videos");
        const productsSnapshot = await getDocs(productsRef)
        const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        // console.log(products.filter(item => item.createdBy === user?.uid))
        result = products.filter(item => item.createdBy === user?.uid)
        let response = { success: true, data: result }
        res = response
    } catch (error) {
        let response = { success: false, message: error }
        res = response
    }
    return res

}

export const deleteVideoById = async (param) => {
    let res = null
    // await firestore()
    //     .collection('Videos').doc(param)
    //     .delete()
    await deleteDoc(doc(firestore, "Videos", param))
        .then(() => {
            let result = { success: true, message: 'Removed From Favorites Successfully!' }
            res = result
        })
        .catch((error) => {
            let result = { success: false, message: error }
            res = result
        })
    return res

}

export const getUserById = async (param) => {
    let res = null
    await firestore()
        .collection('Users').doc(param)
        .get()
        .then(response => {
            console.log(response, '........');
            if (response.data() === 'undefined') {
                let result = { success: true, data: null }
                res = result
            }
            let result = { success: true, data: response.data() }
            res = result
        })
        .catch((error) => {
            let result = { success: false, message: error }
            res = result
        })
    return res

}


export const updateUserById = async (param, body) => {
    let res = null
    await firestore()
        .collection('Users').doc(param)
        .update(body)
        .then(() => {
            let result = { success: true, message: 'Updated Successfully!' }
            res = result
        })
        .catch((error) => {
            let result = { success: false, message: error }
            res = result

        })

    return res
}