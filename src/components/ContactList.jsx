import React from "react";
import ContactItem from "./ContactItem";
import PropTypes from "prop-types";

export default function ContactList({ contacts, onDelete }) {
  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          id={contact.id}
          onDelete={onDelete}
          {...contact}
        />
      ))}
    </div>
  );
}

ContactList.propTypes = {
  contact: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};
