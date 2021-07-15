import React, { Fragment, useState } from "react";

function Home(props) {
  const [isFormFocus, setFormFocus] = useState(false);

  const onFormFocus = () => {
    setFormFocus(true);
  };

  return (
    <Fragment>
      <main>
        <div className="container mx-auto py-4 px-4">
          <div className="flex justify-center">
            <div
              id="form-group"
              className="w-full sm:w-2/4 md:w-2/5 border-2 border-black bg-gray-200 text-black px-4 py-2 rounded shadow-parent"
            >
              {isFormFocus ? (
                <Fragment>
                  <input
                    type="text"
                    className="w-full outline-none font-child bg-gray-200 text-black my-1 py-1 border-b-2 border-black"
                    placeholder="Judul"
                  />
                  <textarea
                    className="w-full outline-none font-child bg-gray-200 text-black my-1 py-1 h-40"
                    placeholder="Describe type here ..."
                    autoFocus
                  ></textarea>
                </Fragment>
              ) : (
                <input
                  type="text"
                  className="w-full outline-none font-child bg-gray-200 text-black my-1 py-1 border-b-2 border-black"
                  placeholder="Describe type here ..."
                  onFocus={onFormFocus}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default Home;
