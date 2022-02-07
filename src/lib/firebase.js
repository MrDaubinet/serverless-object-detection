import { getApps, initializeApp} from 'firebase/app';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import moment from "moment"

const firebaseConfig = {
  apiKey: "AIzaSyD9cM6oiXNZlfmGu2IYLpa14jngNSWh7Yk",
  authDomain: "naked-insurance-interview.firebaseapp.com",
  databaseURL: "https://naked-insurance-interview.firebaseio.com",
  projectId: "naked-insurance-interview",
  storageBucket: "naked-insurance-interview.appspot.com",
  messagingSenderId: "1005709981194",
  appId: "1:1005709981194:web:1fc9c9c2cd3b567c5c51f3"
};

if (!getApps().length) {
    initializeApp(firebaseConfig);
}

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();
const storageReference = ref(storage);

export function getStorageReference() {
  // Create a reference with an initial file path and name
  return storageReference
}

export async function getDocuments() {
  const firestoreRef = getFirestore();
  const foodDataRef = collection(firestoreRef, "food");
  const documentQuery = query(foodDataRef)
  let result = await getDocs(documentQuery);
  let documents = result.docs.map((doc) => {
      return { id: doc.id, ...doc.data() }
    })
  return documents
}

export function groupDocuments(documents) {
  let data = []
  documents.forEach(marker => {
    // check if the data array is empty
    if(data.length == 0 || (data.filter(category => category.name == marker.label).length == 0)) {
      data.push({
        name: marker.label,
        images: [
          {
            url: marker.download,
            confidence: marker.score
          }
        ]
      })
    } else {
      // adding to existing category
      data.forEach(category => {
        if(marker.label == category.name) {
          category.images.push({
            url: marker.download,
            confidence: marker.score
          })
        }
      })
    }
  });
  return data
}

export function uploadFile(file){
  let date = moment(new Date()).format()
  let newFoodImageRef = ref(storage, date);
  uploadBytes(newFoodImageRef, file).then(() => {
    console.log('Uploaded a blob or file!');
  });
}