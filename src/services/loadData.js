const { Firestore } = require('@google-cloud/firestore');
 
async function loadData() {
  const db = new Firestore();
  const datas = []
 
  const data = await db.collection('prediction').get()
  data.forEach((doc) => {
    datas.push(doc.data())
  })
  return datas
}
 
module.exports = loadData;