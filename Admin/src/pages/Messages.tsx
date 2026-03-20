const Messages = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Inquiries & Messages</h1>

      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md cursor-pointer ${i === 1 ? 'border-l-4 border-l-slate-900' : ''}`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-900">John Doe {i}</h3>
                <p className="text-sm text-gray-500 font-medium">john.doe{i}@example.com</p>
              </div>
              <span className="text-xs text-gray-400 font-medium">2 hours ago</span>
            </div>
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              Hello, I would like to inquire about the availability of the Deluxe Ocean Suite for the upcoming weekend. Could you please provide more details...
            </p>
            <div className="mt-4 flex items-center space-x-4">
              <button className="text-slate-900 font-semibold text-sm hover:underline">Reply</button>
              <button className="text-gray-500 font-semibold text-sm hover:underline">Mark as Read</button>
              <button className="text-red-500 font-semibold text-sm hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
