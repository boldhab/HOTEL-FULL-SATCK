interface RoomDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: RoomDetailPageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-32">
      <h1 className="text-4xl font-serif text-[#1e3a5f]">Room Details</h1>
      <p className="mt-4 max-w-2xl text-gray-600">
        Detail page scaffolding is ready for room <span className="font-medium">{id}</span>.
      </p>
    </div>
  );
}
