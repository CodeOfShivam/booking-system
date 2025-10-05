export default function DashboardPage() {
  return (
    <>
      <div className="grid grid-cols-1">
        <div className="grid grid-cols-1 lg:grid-cols-6 2xl:grid-cols-6">
          <div className="col-span-1 lg:col-span-6 2xl:col-span-4 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 2xl:grid-cols-8">
              <div className="col-span-1 md:col-span-1 lg:col-span-8 2xl:col-span-8">
                Admin
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
