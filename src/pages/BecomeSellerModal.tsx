import { useForm, SubmitHandler } from "react-hook-form";
type BecomeSellerProps = {
  isOpen: boolean;
  handleClose: () => void;
};

type BecomeSeller = {
  gst_num: string;
  pan_num: string;
};
const SellerModal: React.FC<BecomeSellerProps> = ({ isOpen, handleClose }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<BecomeSeller>();
  if (!isOpen) {
    return <></>;
  }

  const onFormSubmit: SubmitHandler<BecomeSeller> = data => {
    console.log(data);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] max-h-[85vh] overflow-y-auto">
        <h2 className="text-2xl mb-4 text-center font-semibold">
          Become a Seller
        </h2>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-4 md:grid-cols-1 gap-4">
            <div className="w-full">
              <label className="block text-gray-700 font-bold mb-2">
                Pan Number
              </label>
              <input
                type="text"
                placeholder="Enter Contact..."
                className="border rounded w-full py-2 px-3 text-gray-700"
                {...register("pan_num", {
                  required: "Pan number is required",
                })}
              />
              {errors.pan_num && (
                <p className="text-red-500 text-xs italic">
                  {errors.pan_num.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="block text-gray-700 font-bold mb-2">
                Gst Number
              </label>
              <input
                type="text"
                placeholder="Enter Contact..."
                className="border rounded w-full py-2 px-3 text-gray-700"
                {...register("gst_num", {
                  required: "GST number is required",
                })}
              />
              {errors.gst_num && (
                <p className="text-red-500 text-xs italic">
                  {errors.gst_num.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="mr-2 px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerModal;
