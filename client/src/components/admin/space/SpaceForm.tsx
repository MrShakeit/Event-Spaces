import { Formik, Form, Field, ErrorMessage } from "formik";

import { CreateSpace } from "../../../pages/types/spaces";
import spaceValidationSchema from "../../../validation/createSpaceValidation";

interface Props {
  space?: CreateSpace;
  handleSubmit(space: CreateSpace): Promise<void>;
}
export const SpaceForm = ({ space, handleSubmit }: Props) => {
  const initialValues: CreateSpace = space || {
    name: "",
    address: {
      city: "",
      street: "",
      number: "",
      floor: 0,
      room_no: 0,
      other: "",
    },
    size: "",
    price: 0,
    resident_price: 0,
    image: "",
    images: [],
    videos: [],
    description: "",
    is_deleted: false,
    is_blocked: false,
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 pl-2 pt-2">
        {!!space ? "Update Space" : "Create Space"}
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={spaceValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Space Name
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Space Name"
                  className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.name && touched.name ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div>
                    <label
                      htmlFor="address.city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-1">
                      <div className="flex justify-center items-center">
                        <Field
                          type="text"
                          name="address.city"
                          placeholder="City"
                          className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-5"
                        />
                      </div>
                      <ErrorMessage
                        name="address.city"
                        component="div"
                        className="text-red-500 mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="address.street"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street
                    </label>
                    <div className="mt-2">
                      <div className="flex justify-center items-center">
                        <Field
                          type="text"
                          name="address.street"
                          placeholder="Street"
                          className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-5"
                        />
                      </div>
                      <ErrorMessage
                        name="address.street"
                        component="div"
                        className="text-red-500 mt-1"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="address.number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street Number
                  </label>
                  <div className="mt-2">
                    <div className="flex justify-center items-center">
                      <Field
                        type="text"
                        name="address.number"
                        placeholder="Street Number"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-5"
                      />
                    </div>
                    <ErrorMessage
                      name="address.number"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="address.floor"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Floor
                  </label>
                  <div className="mt-2">
                    <div className="flex justify-center items-center">
                      <Field
                        type="text"
                        name="address.floor"
                        placeholder="Floor"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="address.room_no"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Room Number
                  </label>
                  <div className="mt-2">
                    <div className="flex justify-center items-center">
                      <Field
                        type="text"
                        name="address.room_no"
                        placeholder="Room Number"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="address.other"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Other Address Info
                  </label>
                  <div className="mt-2">
                    <div className="flex justify-center items-center">
                      <Field
                        type="text"
                        name="address.other"
                        placeholder="Other Address Info"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="size"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Size
                  </label>
                  <Field
                    type="text"
                    name="size"
                    placeholder="Size"
                    className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.size && touched.size ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="size"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <Field
                    type="number"
                    name="price"
                    placeholder="Price"
                    className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.price && touched.price ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="resident_price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City resident price
                </label>
                <Field
                  type="number"
                  name="resident_price"
                  placeholder="resident_price"
                  className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.price && touched.price ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="City resident price"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image URL
                </label>
                <Field
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.image && touched.image ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="images"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Images (comma-separated URLs)
                </label>
                <Field
                  type="text"
                  name="images"
                  placeholder="Image URLs"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage
                  name="images"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="videos"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Videos (comma-separated URLs)
                </label>
                <Field
                  type="text"
                  name="videos"
                  placeholder="Video URLs"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <ErrorMessage
                  name="videos"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Description"
                  className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.description && touched.description
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="is_deleted"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Deleted
                </label>
                <Field
                  type="checkbox"
                  name="is_deleted"
                  className={`block rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.is_deleted && touched.is_deleted
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="is_deleted"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="is_blocked"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Blocked
                </label>
                <Field
                  type="checkbox"
                  name="is_blocked"
                  className={`block rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.is_blocked && touched.is_blocked
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="is_blocked"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
            </div>
            <div className="flex justify-center mb-8">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {!!space ? "Update Space " : "Create Space"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
