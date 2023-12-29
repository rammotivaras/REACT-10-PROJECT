
import Modal from './Modal'
import { Formik, Form, Field } from "formik"; 
import {collection, addDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../config/firebase" ;
import { toast } from 'react-toastify';
const AddAndUpdateContact = ({isOpen, onClose,isUpdate, contact}) => {

  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);

      onClose();
      toast.success("AddContact Successfully");

    } catch (error) {
      console.log(error)
    }
  }
  const updateContact = async (contact,id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
onClose();
toast.success("UpdateContact Successfully");

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
        <Modal
      isOpen={isOpen}
      onClose={onClose}>
      <Formik 
      initialValues={isUpdate ? {
        name:contact.name,
        email:contact.email,
      } :{
        name:"",
        email:"",
      }} onSubmit={(values)=>{
        console.log(values) 
        isUpdate ?
        updateContact(values, contact.id) :
        addContact(values)
      }}
      >
        <Form className='flex flex-col gap-2'>
     <div className='flex flex-col gap-1'>
     <label htmlFor='name'>Name</label>
<Field name="name" className=" border h-10 rounded-xl" />
     </div>
     <div className='flex flex-col gap-1'>
     <label htmlFor='email'>Email</label>
<Field type="email" name="email" className=" border h-10 rounded-md" />
     </div>
       <button className='bg-orange px-3 py-1.5 border self-end rounded-md'>
        {isUpdate ? "update" : "Add"} contact
       </button>
        </Form>
      </Formik>
    </Modal>
    </div>
  )
}

export default AddAndUpdateContact