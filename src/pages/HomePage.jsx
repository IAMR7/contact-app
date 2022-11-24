import React, { useContext, useEffect, useState } from "react";
import ContactList from "../components/ContactList";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";
import { getContacts, deleteContact } from "../utils/api";
import LocaleContext from "../contexts/LocaleContext";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [contacts, setContacs] = useState([]);
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });
  const { locale } = useContext(LocaleContext);

  useEffect(() => {
    getContacts().then(({ data }) => {
      setContacs(data);
    });
  }, []);

  async function onDeleteHandler(id) {
    await deleteContact(id);

    const { data } = await getContacts();
    setContacs(data);
  }

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <h2>{locale === "id" ? "Daftar Kontak" : "Contact List"}</h2>
      <ContactList contacts={filteredContacts} onDelete={onDeleteHandler} />
    </section>
  );
}

// function HomePageWrapper() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const keyword = searchParams.get("keyword");

//   function changeSearchParams(keyword) {
//     setSearchParams({ keyword });
//   }

//   return (
//     <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
//   );
// }

// class HomePage extends React.Component {
//   constructor(props) {
//     super(props);

//     //inisialisasi state
//     this.state = {
//       contacts: [],
//       keyword: props.defaultKeyword || "",
//     };

//     this.onDeleteHandler = this.onDeleteHandler.bind(this);
//     this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
//   }

//   async componentDidMount() {
//     const { data } = await getContacts();
//     this.setState(() => {
//       return {
//         contacts: data,
//       };
//     });
//   }

//   async onDeleteHandler(id) {
//     await deleteContact(id);

//     //update contact state from api.jsx
//     const { data } = await getContacts();

//     this.setState(() => {
//       return {
//         contacts: data,
//       };
//     });
//   }

//   onKeywordChangeHandler(keyword) {
//     this.setState(() => {
//       return {
//         keyword,
//       };
//     });
//     this.props.keywordChange(keyword);
//   }

//   render() {
//     const contacts = this.state.contacts.filter((contact) => {
//       return contact.name
//         .toLowerCase()
//         .includes(this.state.keyword.toLowerCase());
//     });

//     return (
//       <LocaleConsumer>
//         {({ locale }) => {
//           return (
//             <section>
//               <SearchBar
//                 keyword={this.state.keyword}
//                 keywordChange={this.onKeywordChangeHandler}
//               />
//               <h2>{locale === "id" ? "Daftar Kontak" : "Contact List"}</h2>
//               <ContactList
//                 contacts={contacts}
//                 onDelete={this.onDeleteHandler}
//               />
//             </section>
//           );
//         }}
//       </LocaleConsumer>
//     );
//   }
// }

// export default HomePageWrapper;

// Komponen HomePage dibuat dengan class component karena memanfaatkan state untuk menyimpan contacts yang ditampilkan pada ContactList.
