import { Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import useProjects from "../hooks/useProjects";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ModalSearch = () => {
  const { handleSearch, searchModal, projects } = useProjects();
  const [search, setSearch] = useState("");
  const projectsFilter =
    search === ""
      ? []
      : projects.filter((project) =>
          project.nameProject.toLowerCase().includes(search.toLowerCase())
        );
  return (
    <Transition.Root
      show={searchModal}
      as={Fragment}
      afterLeave={() => setSearch("")}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-20 md:p-20 backdrop-blur-sm "
        onClose={handleSearch}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
            onChange={(project) =>
              (window.location = `/projects/${project._id}`)
            }
          >
            <div className="relative">
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {projectsFilter.length > 0 && (
              <Combobox.Options
                static
                className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 border-none"
              >
                {projectsFilter.map((project) => (
                  <Combobox.Option
                    key={project.id}
                    value={project}
                    className={({ active }) =>
                      classNames(
                        "cursor-default select-none px-4 py-2",
                        active && "bg-emerald-600 text-white cursor-pointer"
                      )
                    }
                  >
                    {project.nameProject}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalSearch;
