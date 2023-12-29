import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import ContactCard from "./components/ContactCard";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, onSnapshot, query, where  } from "firebase/firestore";
import { db } from "./config/firebase";
import { HiOutlineUserCircle } from "react-icons/hi";
import {IoMdTrash} from "react-icons/io";
import {RiEditCircleLine} from "react-icons/ri";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [contacts, setContacts] = useState([]);
 const {isOpen, onClose, onOpen} = useDisclouse();
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot (contactsRef,(snapshot) => {
          const contactsLists = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setContacts(contactsLists);
          return contactsLists;
        })
       
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;
  
    const contactsRef = collection(db, "contacts");
    const q = query(contactsRef, where("name", ">=", value.toLowerCase()));
    onSnapshot(q, (snapshot) => {
      const contactsLists = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filteredContacts = contactsLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
      setContacts(filteredContacts);
    });
  };
  
  return (
    <>
    <div className="mx-auto max-w-[370px] px-4">
      <Navbar />
      <div className="flex gap-2">
        <div className="flex-grow relative items-center flex">
          <FiSearch className="ml-1 text-3xl text-white absolute" />
          <input
          onChange={filterContacts}
            type="text"
            className="h-10 flex-grow rounded-md border bg-transparent text-white pl-9"
          />
        </div>
        <AiFillPlusCircle onClick={onOpen} className="text-5xl text-white cursor-pointer" />
      </div>
      <div className="mt-4 gap-3 flex flex-col">
        {contacts.map((contact) => (
         <ContactCard key={contact.id} contact={contact}/>
        ))}
      </div>
    </div>
    <AddAndUpdateContact onClose={onClose} isOpen={isOpen}/>
    <ToastContainer/>
    </>
  );
};

export default App;
