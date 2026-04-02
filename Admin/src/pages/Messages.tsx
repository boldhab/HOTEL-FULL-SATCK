import { useEffect, useRef, useState } from 'react';
import { 
  Mail,
  User,
  Calendar,
  CircleX,
  Search,
  Filter,
  RefreshCw,
  MailOpen,
  MessageCircleMore,
  Phone,
  GraduationCap,
  Star
} from 'lucide-react';
import api from '../services/api';

type MessageItem = {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  content: string;
  isRead?: boolean;
  isStarred?: boolean;
  createdAt: string;
  phone?: string;
  source?: 'contact' | 'booking' | 'feedback' | 'support';
};

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Unknown date';
  }
  
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else if (diffDays === 1) {
    return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString();
  }
};

const Messages = () => {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRead, setFilterRead] = useState<'all' | 'read' | 'unread'>('all');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const fetchMessages = async () => {
      try {
        const response = await api.get('/messages');
        const messagesData = Array.isArray(response.data?.data) ? response.data.data : [];
        // Add some sample starred status for demo
        const enrichedData = messagesData.map((msg: MessageItem, idx: number) => ({
          ...msg,
          isStarred: idx < 2, // First two messages starred for demo
          source: msg.source || ['contact', 'booking', 'feedback', 'support'][idx % 4] as any
        }));
        setMessages(enrichedData);
        setError(null);
      } catch {
        setError('Messages could not be loaded right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await api.patch(`/messages/${messageId}/read`);
      setMessages(prev => prev.map(msg => 
        msg.id === messageId ? { ...msg, isRead: true } : msg
      ));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleToggleStar = async (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isStarred: !msg.isStarred } : msg
    ));
    // API call would go here
  };

  const handleDelete = async (messageId: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await api.delete(`/messages/${messageId}`);
        setMessages(prev => prev.filter(msg => msg.id !== messageId));
        if (selectedMessage?.id === messageId) {
          setSelectedMessage(null);
        }
      } catch (error) {
        console.error('Failed to delete message:', error);
      }
    }
  };

  const handleReply = async () => {
    if (!replyText.trim() || !selectedMessage) return;
    
    setSendingReply(true);
    try {
      await api.post(`/messages/${selectedMessage.id}/reply`, { content: replyText });
      alert('Reply sent successfully!');
      setShowReplyModal(false);
      setReplyText('');
    } catch (error) {
      console.error('Failed to send reply:', error);
      alert('Failed to send reply. Please try again.');
    } finally {
      setSendingReply(false);
    }
  };

  const getSourceIcon = (source?: string) => {
    switch(source) {
      case 'contact':
        return <Mail className="h-4 w-4" />;
      case 'booking':
        return <Calendar className="h-4 w-4" />;
      case 'feedback':
        return <MessageCircleMore className="h-4 w-4" />;
      case 'support':
        return <GraduationCap className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  const getSourceLabel = (source?: string) => {
    switch(source) {
      case 'contact': return 'Contact Form';
      case 'booking': return 'Booking Inquiry';
      case 'feedback': return 'Guest Feedback';
      case 'support': return 'Support Request';
      default: return 'General Inquiry';
    }
  };

  const filteredMessages = messages
    .filter(msg => {
      const matchesSearch = msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (msg.subject && msg.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           msg.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesReadStatus = filterRead === 'all' || 
                                (filterRead === 'read' && msg.isRead) || 
                                (filterRead === 'unread' && !msg.isRead);
      
      const matchesSource = filterSource === 'all' || msg.source === filterSource;
      
      return matchesSearch && matchesReadStatus && matchesSource;
    })
    .sort((a, b) => {
      // Sort by unread first, then by date (newest first)
      if (a.isRead !== b.isRead) return a.isRead ? 1 : -1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const unreadCount = messages.filter(m => !m.isRead).length;
  const starredCount = messages.filter(m => m.isStarred).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="space-y-6 p-6 lg:p-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Messages & Inquiries
            </h1>
            <p className="text-gray-500 mt-1">Manage guest communications and feedback</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 shadow-sm"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="text-sm font-medium">Refresh</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                Total
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
            <p className="text-xs text-gray-500 mt-1">All Messages</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <MailOpen className="h-5 w-5 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                Unread
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
            <p className="text-xs text-gray-500 mt-1">Need Attention</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <Star className="h-5 w-5 text-amber-500 fill-current" />
              <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                Starred
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{starredCount}</p>
            <p className="text-xs text-gray-500 mt-1">Important</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <MessageCircleMore className="h-5 w-5 text-purple-600" />
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                Response Rate
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {messages.length ? Math.round((messages.filter(m => m.isRead).length / messages.length) * 100) : 0}%
            </p>
            <p className="text-xs text-gray-500 mt-1">Read Rate</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, subject, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Read Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterRead}
                onChange={(e) => setFilterRead(e.target.value as any)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white cursor-pointer"
              >
                <option value="all">All Messages</option>
                <option value="unread">Unread Only</option>
                <option value="read">Read Only</option>
              </select>
            </div>

            {/* Source Filter */}
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 bg-white cursor-pointer"
            >
              <option value="all">All Sources</option>
              <option value="contact">Contact Form</option>
              <option value="booking">Booking Inquiry</option>
              <option value="feedback">Guest Feedback</option>
              <option value="support">Support Request</option>
            </select>
          </div>
        </div>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center gap-2">
            <CircleX className="h-5 w-5 text-red-600" />
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading messages...</p>
            </div>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white text-center shadow-sm">
            <div>
              <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="font-medium text-gray-700 text-lg">No messages found</p>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filterRead !== 'all' || filterSource !== 'all' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'New contact submissions will appear here'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-2 space-y-4">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`bg-white rounded-xl shadow-sm border transition-all hover:shadow-md cursor-pointer ${
                    !message.isRead ? 'border-l-4 border-l-slate-900 bg-gradient-to-r from-white to-gray-50' : 'border-gray-100'
                  } ${selectedMessage?.id === message.id ? 'ring-2 ring-slate-500 shadow-lg' : ''}`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            !message.isRead ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            <User className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className={`font-semibold ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                              {message.name}
                            </h3>
                            {!message.isRead && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full text-xs font-medium">
                                <Mail className="h-3 w-3" />
                                New
                              </span>
                            )}
                            {message.isStarred && (
                              <Star className="h-4 w-4 text-amber-500 fill-current" />
                            )}
                            <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                              {getSourceIcon(message.source)}
                              {getSourceLabel(message.source)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 font-medium">{message.email}</p>
                          {message.phone && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                              <Phone className="h-3 w-3" />
                              {message.phone}
                            </div>
                          )}
                          {message.subject && (
                            <p className="mt-2 text-sm font-medium text-gray-700">
                              Subject: {message.subject}
                            </p>
                          )}
                          <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                            {message.content}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {formatDate(message.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-gray-100">
                      {!message.isRead && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkAsRead(message.id);
                          }}
                          className="px-3 py-1 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStar(message.id);
                        }}
                        className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                          message.isStarred 
                            ? 'text-amber-700 bg-amber-50 hover:bg-amber-100' 
                            : 'text-gray-600 bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        {message.isStarred ? 'Starred' : 'Star'}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(message.id);
                        }}
                        className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Details Panel */}
            <div className="lg:col-span-1">
              {selectedMessage ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-6">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-gray-100 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-slate-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{selectedMessage.name}</h3>
                          <p className="text-sm text-gray-500">{selectedMessage.email}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(selectedMessage.createdAt).toLocaleString()}
                      </span>
                    </div>
                    {selectedMessage.subject && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Subject</p>
                        <p className="text-gray-900 font-medium">{selectedMessage.subject}</p>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Message</p>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {selectedMessage.content}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowReplyModal(true)}
                        className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white py-2.5 rounded-xl font-medium hover:from-slate-800 hover:to-slate-700 transition-all"
                      >
                        Reply to Message
                      </button>
                      {!selectedMessage.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(selectedMessage.id)}
                          className="w-full border border-gray-200 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition-all"
                        >
                          Mark as Read
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(selectedMessage.id)}
                        className="w-full border border-red-200 text-red-600 py-2.5 rounded-xl font-medium hover:bg-red-50 transition-all"
                      >
                        Delete Message
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                  <MailOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">Select a message to view details</p>
                  <p className="text-sm text-gray-400 mt-1">Click on any message from the list</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reply Modal */}
        {showReplyModal && selectedMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Reply to {selectedMessage.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Your response will be sent via email</p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Reply</label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                    placeholder="Type your response here..."
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleReply}
                    disabled={sendingReply || !replyText.trim()}
                    className="flex-1 bg-slate-900 text-white py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sendingReply ? 'Sending...' : 'Send Reply'}
                  </button>
                  <button
                    onClick={() => {
                      setShowReplyModal(false);
                      setReplyText('');
                    }}
                    className="flex-1 border border-gray-200 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
