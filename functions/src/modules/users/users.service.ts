import { Request, Response } from "express";
import { firestore } from "../admin/admin.service";

const collectionName = "users";
const collectionPath = `/data/${collectionName}/items`;

//fetch one item from the db 
const getDocument = async (req: Request, res: Response) => {
  const documentID = req.params.documentID;
  const documentPath = `${collectionPath}/${documentID}`;
  console.log(`get ${collectionName} document : ${documentPath}`);

  const docReference = await firestore.doc(documentPath);

  console.log(`get document snapshot : ${documentID}`);
  const docSnapshot = await docReference.get();

  //check if the actual db exists
  if (!docSnapshot.exists) {
    const message = `${collectionName} document does not exist: ${req.params.documentID}`;
    console.log(message);
    // if not return 404 as a response
    return res.status(404).json({ message });
  }

  try {
    console.log(`get document data : ${documentID}`);
    const documentData = { id: docSnapshot.id, ...docSnapshot.data() };
    // if the db exists and it is not empty, return the data 
    return res.status(200).json({
      success: true,
      payload: documentData,
    });
  } catch (ex) {
    const message = `get ${collectionName} document [${documentPath}] exception : ${ex.message}`;
    console.log();
    // otherwise return 500 error code because the server does not respond
    return res.status(500).json({
      success: false,
      message,
    });
  }
};

// Fetch all items
const getAllDocuments = async (req: Request, res: Response) => {
  const documentPath = `${collectionPath}/`;

  const docReference = await firestore.collection(documentPath);

  const docSnapshot = await docReference.get();
  
  console.log(1, docSnapshot);

  if (docSnapshot.empty) {
    const message = `${collectionPath} does not exist`;
    console.log(message);
    return res.status(404).json({ message });
  }

  try {
    const documentData = docSnapshot

    return res.status(200).json({
      success: true,
      payload: documentData.docs.map(doc=>doc.data()),
    });
  } catch (ex) {
    const message = `get ${collectionName} document [${documentPath}] exception : ${ex.message}`;
    console.log();

    return res.status(500).json({
      success: false,
      message,
    });
  }
};

// create one item with a specific id which must be included in the body of the request
const createDocument = async (req: Request, res: Response) => {
  console.log(`create ${collectionName} document`, req.body);

  if (!req.body.id) {
    return res.status(400).json({
      success: false,
      message: "id is required",
    });
  }

  try {
    await firestore.collection(collectionPath).doc(req.body.id).set(req.body);
  } catch (ex) {
    const exceptionMessage = `${collectionName} exception : ${ex.message}`;
    return res.status(500).json({
      success: false,
      message: exceptionMessage,
    });
  }

  const successMessage = `${collectionName} create  success`;
  console.log(successMessage);
  return res.status(201).json({ success: true, message: successMessage });
};

// update one item with a specific id which must be included in the params of the request
const updateDocument = async (req: Request, res: Response) => {
  const documentID = req.params.documentID;
  const documentPath = `${collectionPath}/${documentID}`;
  const documentUpdateData = req.body;

  console.log(
    `${collectionName} document update : ${documentPath}`,
    documentUpdateData
  );

  const documentReference = await firestore.doc(documentPath);
  const documentSnapshot = await documentReference.get();

  if (!documentSnapshot.exists) {
    const notFoundMessage = `${collectionName} document not found : ${documentID}`;
    console.log(notFoundMessage);
    return res.status(404).json({ success: true, message: notFoundMessage });
  }

  try {
    await firestore.doc(documentPath).set(documentUpdateData, { merge: true });
  } catch (ex) {
    const exceptionMessage = `${collectionName}:${documentID} exception : ${ex.message}`;
    console.log(exceptionMessage);
    return res.status(500).send({ success: false, message: exceptionMessage });
  }

  const successMessage = `${collectionName} successful update : ${documentID}`;
  console.log(successMessage);
  return res.status(200).json({ success: true, message: successMessage });
};

// delete one item with a specific id which must be included in the params of the request
const deleteAttachment= async (req: Request, res: Response) =>{
  const documentID = req.params.documentID;


  await firestore
    .collection(collectionPath)
    .doc(documentID)
    .delete()
    .then(() => {
      res.json({
        id: `the document with id: ${documentID} has been deleted `
      });
    })
    .catch((err: any) => {
      res.status(404).send('id not found');
      console.log('oops.. nothing deleted');
    });
}
export { getDocument, getAllDocuments, createDocument, updateDocument, deleteAttachment };
