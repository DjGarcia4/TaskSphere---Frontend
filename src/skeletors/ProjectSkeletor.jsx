const ProjectSkeletor = () => {
  return (
    <div className="animate-pulse gray-300 rounded-md p-4 w-full mx-auto">
      <div className=" flex space-x-4">
        <div className="flex-1 space-y-2 py-1">
          <div className="flex gap-2 justify-between">
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gray-500 rounded"></div>
              <div className="grid grid-cols-3">
                <div className="h-3 bg-gray-500 rounded"></div>
              </div>
            </div>

            <div className="rounded bg-gray-500 h-8 w-12"></div>
          </div>
          <div className="rounded bg-gray-500 h-8 w-32"></div>
        </div>
      </div>
      <div className=" flex space-x-4 mt-5">
        <div className="flex-1 space-y-2 py-1">
          <div className="flex gap-2 justify-between items-center">
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-2">
                <div className="h-3 bg-gray-500 rounded"></div>
              </div>
            </div>
          </div>
          <div className="rounded bg-gray-500 h-16 w-full"></div>
        </div>
      </div>
      <div className=" flex space-x-4 mt-5">
        <div className="flex-1 space-y-2 py-1">
          <div className="flex gap-2 justify-between items-center">
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-2">
                <div className="h-3 bg-gray-500 rounded"></div>
              </div>
            </div>
            <div className="rounded bg-gray-500 h-8 w-12"></div>
          </div>
          <div className="rounded bg-gray-500 h-16 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSkeletor;
