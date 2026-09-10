import { useNavigate } from "react-router-dom";
import { useContactMessages } from "../hooks/useContactMessages";
import ContactMessageCard from "../Components/Admin/ContactMessageCard";

export default function AdminContactMessages() {
  const navigate = useNavigate();

  const {
    messages,
    loading,
    error,
    markAsRead,
  } = useContactMessages();

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading messages...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Contact Messages
      </h1>

      {messages.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          No messages yet
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <ContactMessageCard
              key={message.id}
              message={message}
              onMarkAsRead={markAsRead}
            />
          ))}
        </div>
      )}
    </div>
  );
}
