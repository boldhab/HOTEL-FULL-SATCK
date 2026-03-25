import { useEffect, useRef, useState } from 'react';
import api from '../services/api';

type MessageItem = {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  content: string;
  isRead?: boolean;
  createdAt: string;
};

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Unknown date';
  }

  return date.toLocaleString();
};

const Messages = () => {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const fetchMessages = async () => {
      try {
        const response = await api.get('/messages');
        setMessages(Array.isArray(response.data?.data) ? response.data.data : []);
        setError(null);
      } catch {
        setError('Messages could not be loaded right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Inquiries & Messages</h1>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}

      {loading ? (
        <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-500 shadow-sm">
          Loading messages...
        </div>
      ) : messages.length === 0 ? (
        <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white text-center text-gray-500 shadow-sm">
          <div>
            <p className="font-medium text-gray-700">No messages yet</p>
            <p className="mt-1 text-sm text-gray-500">New contact submissions will appear here.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md ${
                message.isRead ? '' : 'border-l-4 border-l-slate-900'
              }`}
            >
              <div className="flex justify-between items-start mb-2 gap-4">
                <div>
                  <h3 className="font-bold text-gray-900">{message.name}</h3>
                  <p className="text-sm text-gray-500 font-medium">{message.email}</p>
                  {message.subject ? (
                    <p className="mt-1 text-xs text-slate-600 font-semibold">Subject: {message.subject}</p>
                  ) : null}
                </div>
                <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
                  {formatDate(message.createdAt)}
                </span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
