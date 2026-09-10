import { ContactMessage } from "../../types/ContactMessage";

interface ContactMessageCardProps {
  message: ContactMessage;
  onMarkAsRead: (id: number) => Promise<void>;
}

export default function ContactMessageCard({
  message,
  onMarkAsRead,
}: ContactMessageCardProps) {
  return (
    <div
      className={`bg-white border rounded-xl p-6 shadow-sm ${
        !message.read
          ? "border-l-4 border-l-blue-500 bg-blue-50"
          : ""
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">
            {message.subject}
          </h3>

          <p className="text-sm text-gray-500">
            From:{" "}
            <span className="font-medium">
              {message.name}
            </span>{" "}
            ({message.email})
          </p>
        </div>

        <span className="text-xs text-gray-400">
          {new Date(message.createdAt).toLocaleString()}
        </span>
      </div>

      <p className="text-gray-700 mb-4 whitespace-pre-line">
        {message.message}
      </p>

      {!message.read && (
        <button
          onClick={() => onMarkAsRead(message.id)}
          className="text-sm text-blue-600 hover:underline"
        >
          Mark as Read
        </button>
      )}
    </div>
  );
}
