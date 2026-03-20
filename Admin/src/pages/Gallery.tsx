const Gallery = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors">
          Upload Image
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="group relative aspect-square bg-gray-200 rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
              <button className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-white/40">View</button>
              <button className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600 shadow-md">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
