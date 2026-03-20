const Services = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Service Management</h1>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors">
          Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 mb-4 font-bold text-xl">
              S{i}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Hotel Service {i}</h3>
            <p className="text-gray-500 mt-2 text-sm leading-relaxed">
              Premium hospitality service including daily maintenance and luxury amenities.
            </p>
            <div className="mt-6 flex space-x-4 w-full">
              <button className="flex-1 text-slate-600 hover:text-slate-900 font-medium py-2 rounded-lg border border-gray-200">Edit</button>
              <button className="flex-1 text-red-500 hover:text-red-700 font-medium py-2 rounded-lg border border-gray-200">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
