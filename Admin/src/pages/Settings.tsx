const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Global Settings</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Hotel Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium"
                defaultValue="Ethioberno Luxury Hotel"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium"
                defaultValue="contact@ethioberno.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Hotel Address</label>
            <textarea
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all font-medium h-24"
              defaultValue="Debre Birhan, Ethiopia"
            />
          </div>
          <div className="pt-4 flex justify-end">
            <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-slate-200 hover:bg-slate-800 transition-all">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
